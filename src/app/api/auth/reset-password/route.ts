import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/auth/db'
import { hashPassword } from '@/lib/auth/utils'
import { validatePassword } from '@/lib/utils'
import { checkRateLimit, rateLimitResponse } from '@/lib/auth/rate-limit'
import type { ApiResponse } from '@/lib/auth/types'

const RATE_LIMIT = { windowMs: 15 * 60 * 1000, max: 5 }
const USER_RATE_LIMIT = { windowMs: 15 * 60 * 1000, max: 3 }

export async function POST(req: NextRequest) {
  try {
    const { email, code, password } = await req.json()

    if (!email || !code || !password) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Заполните все поля' }, { status: 400 })
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      return NextResponse.json<ApiResponse>({ ok: false, error: passwordError }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rl = checkRateLimit(`reset:${ip}:${email.toLowerCase()}`, RATE_LIMIT)
    if (!rl.allowed) {
      return rateLimitResponse(rl.resetMs)
    }

    const userRl = checkRateLimit(`reset-user:${email.toLowerCase()}`, USER_RATE_LIMIT)
    if (!userRl.allowed) {
      return rateLimitResponse(userRl.resetMs)
    }

    const db = getDb()
    const user = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase()) as Record<string, unknown> | undefined

    if (!user) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Неверный код или email' }, { status: 400 })
    }

    const token = db.prepare(
      `SELECT id FROM verification_tokens
       WHERE user_id = ? AND type = 'password_reset' AND code = ? AND used = 0 AND expires_at > datetime('now')
       ORDER BY created_at DESC LIMIT 1`
    ).get(user.id, code) as Record<string, unknown> | undefined

    if (!token) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Код недействителен или истёк' }, { status: 400 })
    }

    const passwordHash = await hashPassword(password)
    const now = new Date().toISOString()

    const updateTransactions = db.transaction(() => {
      db.prepare('UPDATE users SET password_hash = ?, password_changed_at = ?, updated_at = ? WHERE id = ?').run(passwordHash, now, now, user.id)
      db.prepare('UPDATE verification_tokens SET used = 1 WHERE id = ?').run(token.id)
      db.prepare("UPDATE verification_tokens SET used = 1 WHERE user_id = ? AND type = 'password_reset' AND used = 0").run(user.id)
    })
    updateTransactions()

    return NextResponse.json<ApiResponse>({ ok: true, data: { message: 'Пароль успешно изменён' } })
  } catch (err) {
    console.error('Reset password error:', err)
    return NextResponse.json<ApiResponse>({ ok: false, error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
