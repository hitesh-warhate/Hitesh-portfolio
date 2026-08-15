import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Basic length limits
    if (name.length > 100 || email.length > 150 || subject.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { success: false, message: 'Input exceeds maximum allowed length.' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
      console.error('Missing Resend API Key or Contact Email environment variables.');
      return NextResponse.json(
        { success: false, message: 'Server configuration error.' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Replace with your verified domain in production if you have one
      to: process.env.CONTACT_EMAIL as string,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name:\n${name}\n\nEmail:\n${email}\n\nSubject:\n${subject}\n\nMessage:\n${message}\n\n\n---\nSent from Hitesh Warhate's Portfolio`,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send message via Resend.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
