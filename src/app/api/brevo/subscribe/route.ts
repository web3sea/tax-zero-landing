import { NextResponse } from 'next/server'
import { addToBrevoList } from '@/lib/brevo'

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, listId } = await req.json()

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await addToBrevoList({
      email,
      firstName,
      lastName,
      listIds: listId ? [Number(listId)] : undefined,
    })

    // Some Brevo responses may be 204 No Content. Our client expects JSON.
    // Normalize to a 200 JSON response while preserving upstream status in payload.
    return NextResponse.json(
      {
        success: result.ok,
        status: result.status,
        brevo: result.data ?? null,
      },
      { status: result.ok ? 200 : result.status },
    )
  } catch (error) {
    const err = error as { message?: string }
    return NextResponse.json({ error: err?.message || 'Unexpected server error' }, { status: 500 })
  }
}
