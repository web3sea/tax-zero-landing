interface BrevoContactData {
  email: string
  firstName?: string
  lastName?: string
  name?: string
  listIds?: number[]
}

const DEFAULT_BREVO_API = process.env.BREVO_API_KEY!
const DEFAULT_BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID!)

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
