import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/auth/db'
import { hashPassword, generateToken, createSession } from '@/lib/auth/utils'
import { validateEmail, validatePassword } from '@/lib/utils'
import { checkRateLimit, rateLimitResponse } from '@/lib/auth/rate-limit'
import type { ApiResponse } from '@/lib/auth/types'

const RATE_LIMIT = { windowMs: 60 * 60 * 1000, max: 5 }

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json()

    if (!email || !password || !name) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Заполните все поля' }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rl = checkRateLimit(`register:${ip}`, RATE_LIMIT)
    if (!rl.allowed) {
      return rateLimitResponse(rl.resetMs)
    }

    const trimmedName = name.trim()
    if (trimmedName.length < 1 || trimmedName.length > 100) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Имя должно содержать от 1 до 100 символов' }, { status: 400 })
    }

    const emailError = validateEmail(email)
    if (emailError) {
      return NextResponse.json<ApiResponse>({ ok: false, error: emailError }, { status: 400 })
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      return NextResponse.json<ApiResponse>({ ok: false, error: passwordError }, { status: 400 })
    }

    const db = getDb()
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase())
    if (existing) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Пользователь с таким email уже существует' }, { status: 409 })
    }

    const id = generateToken(16)
    const passwordHash = await hashPassword(password)

    db.prepare('INSERT INTO users (id, email, password_hash, name) VALUES (?, ?, ?, ?)').run(
      id, email.toLowerCase(), passwordHash, trimmedName
    )

    await createSession(id, email.toLowerCase())

    return NextResponse.json<ApiResponse>({
      ok: true,
      data: {
        id,
        email: email.toLowerCase(),
        name: trimmedName,
        emailVerified: 0,
        totpEnabled: 0,
        createdAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json<ApiResponse>({ ok: false, error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
