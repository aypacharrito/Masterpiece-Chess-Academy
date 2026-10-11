import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
const schema=z.object({studentName:z.string().trim().min(1).max(120),age:z.string().min(1).max(50),experience:z.string().min(1).max(100),program:z.string().min(1).max(100),preferredFormat:z.string().min(1).max(100),goals:z.string().max(2000).optional().default(''),availability:z.string().max(300).optional().default(''),guardianName:z.string().trim().min(1).max(120),email:z.email().max(254),phone:z.string().max(50).optional().default(''),notes:z.string().max(2000).optional().default(''),consent:z.literal(true),website:z.string().optional().default('')});
const escape=(v:string)=>v.replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
export async function POST(request:Request){
 let body:unknown;try{body=await request.json();}catch{return NextResponse.json({error:'Invalid request.'},{status:400});}
 const parsed=schema.safeParse(body);if(!parsed.success)return NextResponse.json({error:'Please check the form and try again.'},{status:400});
 const d=parsed.data;if(d.website)return NextResponse.json({success:true});
 const key=process.env.RESEND_API_KEY,from=process.env.RESEND_FROM,to=process.env.INQUIRY_TO;
 if(!key||!from||!to)return NextResponse.json({error:'The enrollment form is not configured yet. Please contact the academy directly.'},{status:503});
 const fields=[['Student',d.studentName],['Age',d.age],['Experience',d.experience],['Program',d.program],['Learning format',d.preferredFormat],['Goals',d.goals],['Availability',d.availability],['Contact name',d.guardianName],['Email',d.email],['Phone',d.phone],['Additional notes',d.notes],['Contact consent','Yes']];
 try{const resend=new Resend(key);const response=await resend.emails.send({from,to:to.split(',').map(s=>s.trim()),replyTo:d.email,subject:`New chess inquiry: ${d.studentName.replace(/[\r\n]/g,' ')}`,html:`<div style="font-family:Arial,sans-serif;max-width:650px"><h1>New Masterpiece Chess Inquiry</h1><table style="border-collapse:collapse;width:100%">${fields.map(([k,v])=>`<tr><th style="text-align:left;padding:12px;border-bottom:1px solid #ddd">${escape(k)}</th><td style="padding:12px;border-bottom:1px solid #ddd">${escape(v||'—')}</td></tr>`).join('')}</table></div>`,text:fields.map(([k,v])=>`${k}: ${v||'—'}`).join('\n')});if(response.error)throw new Error(response.error.message);return NextResponse.json({success:true});}catch(err){console.error('Resend inquiry failed',err);return NextResponse.json({error:'Email delivery is temporarily unavailable. Please call the academy directly.'},{status:502});}
}
