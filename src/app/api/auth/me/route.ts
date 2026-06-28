import { NextResponse } from 'next/server'
import { getDb } from '@/lib/auth/db'
import { getSession } from '@/lib/auth/utils'
import type { ApiResponse, User } from '@/lib/auth/types'

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Не авторизован' }, { status: 401 })
    }

    const db = getDb()
    const user = db.prepare('SELECT id, email, name, email_verified, totp_enabled, created_at FROM users WHERE id = ?').get(session.userId) as Record<string, unknown> | undefined

    if (!user) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Пользователь не найден' }, { status: 404 })
    }

    return NextResponse.json<ApiResponse<User>>({
      ok: true,
      data: {
        id: user.id as string,
        email: user.email as string,
        name: user.name as string,
        emailVerified: user.email_verified as number,
        totpEnabled: user.totp_enabled as number,
        createdAt: user.created_at as string,
      },
    })
  } catch (err) {
    console.error('Me error:', err)
    return NextResponse.json<ApiResponse>({ ok: false, error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
