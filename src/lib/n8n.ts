export async function sendToN8NWebhook(data: {
    firstName: string
    lastName: string
    email: string
    phoneNumber?: string
    message: string
    timestamp: string
}) {
    try {
        const webhookUrl = process.env.N8N_WEBHOOK_GOOGLESHEET_CONTACT_US_URL

        console.log('N8N_WEBHOOK_GOOGLESHEET_CONTACT_US_URL', webhookUrl)
        if (!webhookUrl) {
            console.warn('N8N_WEBHOOK_GOOGLESHEET_CONTACT_US_URL not configured')
            return { ok: false, error: 'Webhook URL not configured' }
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        console.log('N8N Webhook response', response)

        if (!response.ok) {
            return { ok: false, error: `Webhook returned ${response.status}` }
        }

        return { ok: true }
    } catch (error) {
        const err = error as { message?: string }
        return { ok: false, error: err?.message || 'Unknown error' }
    }
}
