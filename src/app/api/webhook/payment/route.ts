import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/auth/db'

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const secret = request.headers.get('X-Webhook-Secret')
    if (!secret || secret !== process.env.FASTPAY_WEBHOOK_SECRET) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { paymentId, status, externalId } = body

    if (!paymentId) {
      return NextResponse.json({ ok: false, error: 'Missing paymentId' }, { status: 400 })
    }

    const db = getDb()
    const now = new Date().toISOString()
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

    // Update payment
    db.prepare(`
      UPDATE payments
      SET status = ?, external_payment_id = ?, updated_at = ?
      WHERE id = ?
    `).run(status === 'paid' ? 'paid' : 'failed', externalId || null, now, paymentId)

    if (status === 'paid') {
      // Get user_id from payment
      const payment = db.prepare(`
        SELECT user_id FROM payments WHERE id = ?
      `).get(paymentId) as { user_id: string } | undefined

      if (payment) {
        // Activate subscription
        db.prepare(`
          UPDATE subscriptions
          SET status = 'active', payment_id = ?, updated_at = ?, expires_at = ?
          WHERE user_id = ? AND status = 'pending' AND payment_id = ?
        `).run(paymentId, now, expiresAt, payment.user_id, paymentId)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('POST /api/webhook/payment error:', err)
    return NextResponse.json({ ok: false, error: 'Ошибка webhook' }, { status: 500 })
  }
}
