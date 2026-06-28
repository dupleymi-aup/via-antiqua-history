import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/auth/db'
import { hashPassword, generateToken } from '@/lib/auth/utils'
import type { ApiResponse } from '@/lib/auth/types'

export async function POST(req: NextRequest) {
  try {
    const { email, code, password } = await req.json()

    if (!email || !code || !password) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Заполните все поля' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Пароль должен быть не менее 8 символов' }, { status: 400 })
    }

    const db = getDb()
    const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase()) as Record<string, unknown> | undefined

    if (!user) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Неверный код или email' }, { status: 400 })
    }

    const token = db.prepare(
      `SELECT * FROM verification_tokens
       WHERE user_id = ? AND type = 'password_reset' AND code = ? AND used = 0 AND expires_at > datetime('now')
       ORDER BY created_at DESC LIMIT 1`
    ).get(user.id, code) as Record<string, unknown> | undefined

    if (!token) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Код недействителен или истёк' }, { status: 400 })
    }

    const passwordHash = await hashPassword(password)
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(passwordHash, user.id)
    db.prepare('UPDATE verification_tokens SET used = 1 WHERE id = ?').run(token.id)

    return NextResponse.json<ApiResponse>({ ok: true, data: { message: 'Пароль успешно изменён' } })
  } catch (err) {
    console.error('Reset password error:', err)
    return NextResponse.json<ApiResponse>({ ok: false, error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
