import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/auth/db'
import { getSession } from '@/lib/auth/utils'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ ok: false, error: 'Не авторизован' }, { status: 401 })
    }

    const db = getDb()
    const now = new Date().toISOString()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

    // Check for pending payment
    const payment = db.prepare(`
      SELECT * FROM payments
      WHERE user_id = ? AND status = 'pending'
      ORDER BY created_at DESC
      LIMIT 1
    `).get(session.userId) as {
      id: string
      amount: number
      sbp_qr_data: string
    } | undefined

    if (!payment) {
      return NextResponse.json({
        ok: false,
        error: 'Нет активного платежа',
      })
    }

    // Update payment status
    db.prepare(`
      UPDATE payments SET status = 'paid', updated_at = ? WHERE id = ?
    `).run(now, payment.id)

    // Update subscription to active
    db.prepare(`
      UPDATE subscriptions
      SET status = 'active', payment_id = ?, updated_at = ?, expires_at = ?
      WHERE user_id = ? AND status = 'pending' AND payment_id = ?
    `).run(payment.id, now, expiresAt, session.userId, payment.id)

    return NextResponse.json({
      ok: true,
      data: {
        message: 'Подписка активирована',
        expiresAt,
      },
    })
  } catch (err) {
    console.error('POST /api/subscription/confirm error:', err)
    return NextResponse.json({ ok: false, error: 'Ошибка сервера' }, { status: 500 })
  }
}
