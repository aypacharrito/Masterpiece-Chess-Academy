import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Kept in sync with the intentionally short one-page enrollment form.
// Removed questionnaire fields are no longer required for submission.
const schema = z.object({
  studentName: z.string().trim().min(1).max(120),
  guardianName: z.string().trim().min(1).max(120),
  email: z.email().max(254),
  phone: z.string().max(50).optional().default(''),
  consent: z.literal(true),
  website: z.string().max(500).optional().default(''),
});

const htmlEntities: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
};
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => htmlEntities[character] || character);

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the form and try again.' }, { status: 400 });
  }

  const data = parsed.data;
  if (data.website) return NextResponse.json({ success: true }); // Honeypot

  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.INQUIRY_TO;
  if (!key || !from || !to) {
    return NextResponse.json({ error: 'The inquiry form is not configured yet. Please contact the academy directly.' }, { status: 503 });
  }

  const fields = [
    ['Student', data.studentName],
    ['Parent / guardian / contact', data.guardianName],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Contact consent', 'Yes'],
  ];

  try {
    const resend = new Resend(key);
    const response = await resend.emails.send({
      from,
      to: to.split(',').map(address => address.trim()).filter(Boolean),
      replyTo: data.email,
      subject: `New chess inquiry: ${data.studentName.replace(/[\r\n]/g, ' ')}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:650px"><h1>New Masterpiece Chess Inquiry</h1><table style="border-collapse:collapse;width:100%">${fields.map(([key, value]) => `<tr><th style="text-align:left;padding:12px;border-bottom:1px solid #ddd">${escapeHtml(key)}</th><td style="padding:12px;border-bottom:1px solid #ddd">${escapeHtml(value || '—')}</td></tr>`).join('')}</table></div>`,
      text: fields.map(([key, value]) => `${key}: ${value || '—'}`).join('\n'),
    });
    if (response.error) throw new Error(response.error.message);
    return NextResponse.json({ success: true });
  } catch (reason) {
    console.error('Resend inquiry failed', reason);
    return NextResponse.json({ error: 'Email delivery is temporarily unavailable. Please call the academy directly.' }, { status: 502 });
  }
}
