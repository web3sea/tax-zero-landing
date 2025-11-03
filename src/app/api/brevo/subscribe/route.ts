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

    return NextResponse.json(
      {
        success: result.ok,
        status: result.status,
        brevo: result.data,
      },
      { status: result.status },
    )
  } catch (error) {
    const err = error as { message?: string }
    return NextResponse.json({ error: err?.message || 'Unexpected server error' }, { status: 500 })
  }
}
