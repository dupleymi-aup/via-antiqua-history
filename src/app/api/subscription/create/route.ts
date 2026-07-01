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
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 min to pay

    // Check if user already has active subscription
    const existingSub = db.prepare(`
      SELECT id FROM subscriptions
      WHERE user_id = ? AND status = 'active' AND expires_at > ?
      LIMIT 1
    `).get(session.userId, now)

    if (existingSub) {
      return NextResponse.json({
        ok: false,
        error: 'У вас уже есть активная подписка',
      })
    }

    // Check for pending payment
    const pendingPayment = db.prepare(`
      SELECT id FROM payments
      WHERE user_id = ? AND status = 'pending' AND created_at > datetime('now', '-30 minutes')
      LIMIT 1
    `).get(session.userId) as { id: string } | undefined

    if (pendingPayment) {
      return NextResponse.json({
        ok: true,
        data: {
          paymentId: pendingPayment.id,
          qrData: null,
          message: 'Используйте предыдущий QR-код',
        },
      })
    }

    // Create payment record
    const paymentId = randomUUID()
    const amount = 999.00
    const phone = '+79150480249'

    // Generate SBP QR data (STUB format for SBP)
    // Format: https://qr.nspk.ru/[Account]/[Amount]/[Comment]
    // For simplicity, we use a direct SBP payment link
    const sbpQrData = JSON.stringify({
      type: 'sbp',
      phone: phone,
      amount: amount,
      currency: 'RUB',
      description: 'Подписка «Исторический Лабиринт» — образовательный контент',
      paymentId: paymentId,
    })

    db.prepare(`
      INSERT INTO payments (id, user_id, amount, currency, status, payment_method, sbp_phone, sbp_qr_data)
      VALUES (?, ?, ?, ?, 'pending', 'sbp', ?, ?)
    `).run(paymentId, session.userId, amount, 'RUB', phone, sbpQrData)

    // Create pending subscription
    const subId = randomUUID()
    const subExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
    db.prepare(`
      INSERT INTO subscriptions (id, user_id, status, payment_id, amount, started_at, expires_at)
      VALUES (?, ?, 'pending', ?, ?, datetime('now'), datetime('now', '+30 days'))
    `).run(subId, session.userId, paymentId, amount)

    // Generate QR code URL (using a QR code API)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(sbpQrData)}`

    return NextResponse.json({
      ok: true,
      data: {
        paymentId,
        subId,
        amount,
        phone,
        qrCodeUrl,
        qrData: sbpQrData,
        expiresAt,
      },
    })
  } catch (err) {
    console.error('POST /api/subscription/create error:', err)
    return NextResponse.json({ ok: false, error: 'Ошибка сервера' }, { status: 500 })
  }
}
