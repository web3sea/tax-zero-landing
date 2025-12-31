import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/brevo'
import { sendToN8NWebhook } from '@/lib/n8n'

export async function POST(req: Request) {
  try {
    const { workEmail, firstName, lastName, phoneNumber, message } = await req.json()

    if (!workEmail || !firstName || !lastName || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const subject = `[Landing Page Form] - New Contact from ${firstName} ${lastName}`

    // // Send email via Brevo
    const emailResult = await sendEmail({
      email: workEmail,
      firstName,
      lastName,
      subject,
      message,
      phoneNumber,
    })

    // Send to N8N webhook for Google Sheets (non-blocking - don't fail if this fails)
    const webhookResult = await sendToN8NWebhook({
      firstName,
      lastName,
      email: workEmail,
      phoneNumber,
      message,
      timestamp: new Date().toISOString(),
    })

    // Log webhook result but don't fail the request if it fails
    if (!webhookResult.ok) {
      console.warn('Failed to send to N8N webhook:', webhookResult.error)
    }

    return NextResponse.json(
      {
        success: emailResult.ok,
        status: emailResult.status,
        brevo: emailResult.data ?? null,
        googleSheet: webhookResult.ok ? 'Saved via N8N' : 'Not configured or failed',
      },
      { status: emailResult.ok ? 200 : emailResult.status },
    )
  } catch (error) {
    const err = error as { message?: string }
    return NextResponse.json({ error: err?.message || 'Unexpected server error' }, { status: 500 })
  }
}
