import { NextResponse } from 'next/server'
import { getSession } from './utils'
import { getDb } from './db'
import { SUBSCRIPTION_PRICE } from '@/lib/constants'

/**
 * Middleware для проверки активной подписки пользователя
 * 
 * Использование:
 * 1. Импортируйте в API route
 * 2. Вызовите checkSubscription() перед обработкой запроса
 * 3. Если подписка активна - продолжайте обработку
 * 4. Если нет - возвращайте 402 Payment Required
 */
export async function checkSubscription(): Promise<NextResponse | null> {
  try {
    // Получаем сессию пользователя
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json(
        { ok: false, error: 'Требуется авторизация' },
        { status: 401 }
      )
    }

    const db = getDb()
    const now = new Date().toISOString()

    // Проверяем активную подписку
    const subscription = db.prepare(`
      SELECT id, expires_at 
      FROM subscriptions 
      WHERE user_id = ? 
        AND status = 'active' 
        AND expires_at > ?
      LIMIT 1
    `).get(session.userId, now) as {
      id: string
      expires_at: string
    } | undefined

    if (!subscription) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Требуется активная подписка',
          upgradeUrl: '/profile',
          price: SUBSCRIPTION_PRICE
        },
        { status: 402 } // Payment Required
      )
    }

    // Подписка активна, возвращаем null чтобы продолжить обработку
    return null
  } catch (err) {
    console.error('Subscription check error:', err)
    return NextResponse.json(
      { ok: false, error: 'Ошибка проверки подписки' },
      { status: 500 }
    )
  }
}

/**
 * Проверка доступа к платному контенту
 * Можно использовать в Server Components или API routes
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  try {
    const db = getDb()
    const now = new Date().toISOString()

    const subscription = db.prepare(`
      SELECT id FROM subscriptions 
      WHERE user_id = ? 
        AND status = 'active' 
        AND expires_at > ?
      LIMIT 1
    `).get(userId, now)

    return !!subscription
  } catch (err) {
    console.error('hasActiveSubscription error:', err)
    return false
  }
}

/**
 * Получить информацию о текущей подписке пользователя
 */
export async function getSubscriptionInfo(userId: string) {
  try {
    const db = getDb()
    const now = new Date().toISOString()

    const subscription = db.prepare(`
      SELECT 
        id,
        status,
        amount,
        started_at,
        expires_at
      FROM subscriptions 
      WHERE user_id = ? 
        AND status = 'active' 
        AND expires_at > ?
      LIMIT 1
    `).get(userId, now) as {
      id: string
      status: string
      amount: number
      started_at: string
      expires_at: string
    } | undefined

    if (!subscription) {
      return null
    }

    const daysLeft = Math.max(0, Math.ceil(
      (new Date(subscription.expires_at).getTime() - Date.now()) / 86400000
    ))

    return {
      id: subscription.id,
      status: subscription.status,
      amount: subscription.amount,
      startedAt: subscription.started_at,
      expiresAt: subscription.expires_at,
      daysLeft,
      isActive: true
    }
  } catch (err) {
    console.error('getSubscriptionInfo error:', err)
    return null
  }
}