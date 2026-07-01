import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/auth/db'
import { getSession } from '@/lib/auth/utils'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ ok: false, error: 'Не авторизован' }, { status: 401 })
    }

    const db = getDb()
    const now = new Date().toISOString()

    // Cancel active subscription
    const result = db.prepare(`
      UPDATE subscriptions
      SET status = 'cancelled', updated_at = ?
      WHERE user_id = ? AND status = 'active' AND expires_at > ?
      RETURNING id
    `).get(now, session.userId, now)

    if (!result) {
      return NextResponse.json({
        ok: false,
        error: 'Нет активной подписки для отмены',
      })
    }

    return NextResponse.json({
      ok: true,
      data: { message: 'Подписка отменена' },
    })
  } catch (err) {
    console.error('POST /api/subscription/cancel error:', err)
    return NextResponse.json({ ok: false, error: 'Ошибка сервера' }, { status: 500 })
  }
}
