interface BrevoContactData {
  email: string
  firstName?: string
  lastName?: string
  name?: string
  listIds?: number[]
}

interface SendEmailData {
  email: string
  firstName: string
  lastName?: string
  subject: string
  message: string
  phoneNumber?: string
  toEmail?: string
}

const DEFAULT_BREVO_API = process.env.BREVO_API_KEY!
const DEFAULT_BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID!)
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || 'nhat1234559@gmail.com'
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Tax Zero'

export async function addToBrevoList({
  email,
  firstName,
  lastName,
  name,
  listIds = [DEFAULT_BREVO_LIST_ID],
}: BrevoContactData) {
  // Derive names if only `name` was provided
  let derivedFirst = firstName
  let derivedLast = lastName
  if ((!derivedFirst || !derivedLast) && name) {
    const parts = name.trim().split(/\s+/)
    derivedFirst = derivedFirst || parts[0]
    derivedLast = derivedLast || parts.slice(1).join(' ')
  }
  const payload = {
    email,
    attributes: {
      FIRSTNAME: derivedFirst || '',
      LASTNAME: derivedLast || '',
    },
    listIds,
    updateEnabled: true,
  }

  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': DEFAULT_BREVO_API,
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  return {
    ok: response.ok,
    status: response.status,
    data,
  }
}

export async function sendEmail({
  email,
  firstName,
  lastName,
  subject,
  message,
  phoneNumber,
  toEmail,
}: SendEmailData) {
  const recipientEmail = toEmail || CONTACT_EMAIL_TO

  const senderEmail = BREVO_SENDER_EMAIL || email
  const senderName = BREVO_SENDER_NAME || `${firstName} ${lastName || ''}`.trim()
  
  // Simple and concise email template
  const emailContent = `
    <section style="font-family: Arial, sans-serif; color: #222; max-width: 600px">
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phoneNumber || ''}</p>
      <p><strong>Message:</strong><br/>${(message || '').replace(/\n/g, '<br/>')}</p>
    </section>
  `

  const payload = {
    sender: {
      name: senderName,
      email: senderEmail,
    },
    to: [
      {
        email: recipientEmail,
        name: 'Tax Zero Team',
      },
    ],
    subject: subject,
    htmlContent: emailContent,
    replyTo: {
      email: email,
      name: `${firstName} ${lastName || ''}`.trim(),
    },
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': DEFAULT_BREVO_API,
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json().catch(() => ({}))

  return {
    ok: response.ok,
    status: response.status,
    data,
  }
}
