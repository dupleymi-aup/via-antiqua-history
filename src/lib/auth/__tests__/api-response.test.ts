import { describe, it, expect } from 'vitest'
import { apiOk, apiError } from '../api-response'

describe('api-response', () => {
  describe('apiOk', () => {
    it('returns a 200 response with ok: true', () => {
      const res = apiOk({ message: 'hello' })
      expect(res.status).toBe(200)
      return res.json().then((json) => {
        expect(json.ok).toBe(true)
        expect(json.data).toEqual({ message: 'hello' })
      })
    })

    it('returns a response with no data', () => {
      const res = apiOk()
      expect(res.status).toBe(200)
      return res.json().then((json) => {
        expect(json.ok).toBe(true)
        expect(json.data).toBeUndefined()
      })
    })

    it('includes no-cache headers', () => {
      const res = apiOk({ test: 1 })
      expect(res.headers.get('cache-control')).toContain('no-store')
      expect(res.headers.get('cache-control')).toContain('no-cache')
    })

    it('merges custom headers', () => {
      const res = apiOk({ test: 1 }, {
        headers: { 'X-Custom': 'value' },
      })
      expect(res.headers.get('x-custom')).toBe('value')
      expect(res.headers.get('cache-control')).toContain('no-store')
    })

    it('accepts custom status code', () => {
      const res = apiOk({ created: true }, { status: 201 })
      expect(res.status).toBe(201)
      return res.json().then((json) => {
        expect(json.ok).toBe(true)
      })
    })
  })

  describe('apiError', () => {
    it('returns a 400 response with ok: false', () => {
      const res = apiError('Bad request', 400)
      expect(res.status).toBe(400)
      return res.json().then((json) => {
        expect(json.ok).toBe(false)
        expect(json.error).toBe('Bad request')
      })
    })

    it('returns a 401 response', () => {
      const res = apiError('Unauthorized', 401)
      expect(res.status).toBe(401)
      return res.json().then((json) => {
        expect(json.error).toBe('Unauthorized')
      })
    })

    it('returns a 500 response', () => {
      const res = apiError('Internal error', 500)
      expect(res.status).toBe(500)
      return res.json().then((json) => {
        expect(json.error).toBe('Internal error')
      })
    })

    it('includes no-cache headers', () => {
      const res = apiError('Error', 400)
      expect(res.headers.get('cache-control')).toContain('no-store')
    })

    it('merges custom headers', () => {
      const res = apiError('Error', 429, {
        headers: { 'X-Rate-Limit': 'true' },
      })
      expect(res.headers.get('x-rate-limit')).toBe('true')
    })

    it('includes Retry-After header when provided', () => {
      const res = apiError('Rate limited', 429, {
        headers: { 'Retry-After': '60' },
      })
      expect(res.headers.get('retry-after')).toBe('60')
    })
  })
})
