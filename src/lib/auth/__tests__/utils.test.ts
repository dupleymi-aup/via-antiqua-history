import { describe, it, expect, beforeAll } from 'vitest'
import {
  getJwtSecret,
  hashPassword,
  verifyPassword,
  generateToken,
  generateNumericCode,
  signJwt,
  verifyJwt,
} from '../utils'

beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret-for-unit-tests'
})

describe('auth/utils', () => {
  describe('getJwtSecret', () => {
    it('returns the JWT_SECRET from env', () => {
      expect(getJwtSecret()).toBe('test-secret-for-unit-tests')
    })
  })

  describe('password hashing', () => {
    it('hashes and verifies a password', async () => {
      const password = 'MyP4ssw0rd!'
      const hash = await hashPassword(password)
      expect(hash).not.toBe(password)
      expect(await verifyPassword(password, hash)).toBe(true)
    })

    it('rejects wrong password', async () => {
      const hash = await hashPassword('correct-password')
      expect(await verifyPassword('wrong-password', hash)).toBe(false)
    })
  })

  describe('generateToken', () => {
    it('generates a hex string of expected length', () => {
      const token = generateToken(16)
      expect(token).toHaveLength(32) // 16 bytes = 32 hex chars
      expect(token).toMatch(/^[0-9a-f]+$/)
    })

    it('generates a default 32-byte token', () => {
      const token = generateToken()
      expect(token).toHaveLength(64)
    })

    it('generates unique tokens', () => {
      const t1 = generateToken()
      const t2 = generateToken()
      expect(t1).not.toBe(t2)
    })
  })

  describe('generateNumericCode', () => {
    it('generates a 6-digit code by default', () => {
      const code = generateNumericCode()
      expect(code).toHaveLength(6)
      expect(code).toMatch(/^\d{6}$/)
    })

    it('generates a code of specified length', () => {
      const code = generateNumericCode(4)
      expect(code).toHaveLength(4)
      expect(code).toMatch(/^\d{4}$/)
    })
  })

  describe('JWT sign/verify', () => {
    it('signs and verifies a payload', () => {
      const payload = {
        userId: 'user-123',
        email: 'test@example.com',
      }
      const token = signJwt(payload)
      const verified = verifyJwt(token)
      expect(verified).not.toBeNull()
      expect(verified!.userId).toBe('user-123')
      expect(verified!.email).toBe('test@example.com')
    })

    it('returns null for invalid token', () => {
      expect(verifyJwt('invalid-token')).toBeNull()
    })

    it('returns null for token signed with different secret', async () => {
      const { default: jwt } = await import('jsonwebtoken')
      const token = jwt.sign(
        { userId: 'x', email: 'x@x.com' },
        'wrong-secret',
        { expiresIn: 3600 }
      )
      expect(verifyJwt(token)).toBeNull()
    })

    it('includes passwordChangedAt when provided', () => {
      const payload = {
        userId: 'user-456',
        email: 'test2@example.com',
        passwordChangedAt: '2025-01-01T00:00:00Z',
      }
      const token = signJwt(payload)
      const verified = verifyJwt(token)
      expect(verified!.passwordChangedAt).toBe('2025-01-01T00:00:00Z')
    })
  })
})
