import { NextResponse } from 'next/server'
import { destroySession } from '@/lib/auth/utils'
import type { ApiResponse } from '@/lib/auth/types'

export async function POST() {
  try {
    await destroySession()
    return NextResponse.json<ApiResponse>({ ok: true })
  } catch (err) {
    console.error('Logout error:', err)
    return NextResponse.json<ApiResponse>({ ok: false, error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
