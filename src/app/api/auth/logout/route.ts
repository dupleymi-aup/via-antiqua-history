import { destroySession } from '@/lib/auth/utils'
import { apiOk, apiError } from '@/lib/auth/api-response'

export async function POST() {
  try {
    await destroySession()
    return apiOk()
  } catch (err) {
    console.error('Logout error:', err)
    return apiError('Внутренняя ошибка сервера', 500)
  }
}
