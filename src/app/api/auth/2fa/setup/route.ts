import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { getDb } from '@/lib/auth/db'
import { getSession, verifyPassword } from '@/lib/auth/utils'
import { totp } from '@/lib/auth/totp'
import type { ApiResponse } from '@/lib/auth/types'

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Не авторизован' }, { status: 401 })
    }

    const db = getDb()
    const user = db.prepare('SELECT totp_enabled FROM users WHERE id = ?').get(session.userId) as Record<string, unknown> | undefined

    if (user && user.totp_enabled) {
      return NextResponse.json<ApiResponse>({ ok: false, error: '2FA уже включена. Сначала отключите её в профиле' }, { status: 400 })
    }

    const secret = totp.generateSecret()
    const uri = totp.toURI({ label: session.email, issuer: 'Исторический Лабиринт', secret })
    const { toDataURL } = await import('qrcode')
    const qrCode = await toDataURL(uri)

    db.prepare('UPDATE users SET totp_secret = ? WHERE id = ?').run(secret, session.userId)

    return NextResponse.json<ApiResponse>({
      ok: true,
      data: { secret, qrCode },
    })
  } catch (err) {
    console.error('2FA setup error:', err)
    return NextResponse.json<ApiResponse>({ ok: false, error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Не авторизован' }, { status: 401 })
    }

    const { code, password } = await req.json()
    if (!code) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Укажите код' }, { status: 400 })
    }

    if (!password) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Введите пароль для подтверждения' }, { status: 400 })
    }

    const db = getDb()
    const user = db.prepare('SELECT totp_secret, password_hash FROM users WHERE id = ?').get(session.userId) as Record<string, unknown> | undefined

    if (!user || !user.totp_secret) {
      return NextResponse.json<ApiResponse>({ ok: false, error: '2FA не настроен. Запросите setup сначала' }, { status: 400 })
    }

    const valid = await verifyPassword(password, user.password_hash as string)
    if (!valid) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Неверный пароль' }, { status: 401 })
    }

    const result = await totp.verify(code, { secret: user.totp_secret as string, epochTolerance: 1 })
    if (!result.valid) {
      return NextResponse.json<ApiResponse>({ ok: false, error: 'Неверный код' }, { status: 400 })
    }

    const recoveryCodes = Array.from({ length: 8 }, () =>
      randomBytes(4).toString('hex').toUpperCase()
    )

    db.prepare('UPDATE users SET totp_enabled = 1, recovery_codes = ? WHERE id = ?').run(
      JSON.stringify(recoveryCodes), session.userId
    )

    return NextResponse.json<ApiResponse>({
      ok: true,
      data: { recoveryCodes },
    })
  } catch (err) {
    console.error('2FA confirm error:', err)
    return NextResponse.json<ApiResponse>({ ok: false, error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
