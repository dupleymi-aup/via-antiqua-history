import { describe, it, expect } from 'vitest'
import { cn, withAlpha, passwordStrength } from '../utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'extra')).toBe('base extra')
  })

  it('resolves Tailwind conflicts', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6')
  })
})

describe('withAlpha', () => {
  it('adds alpha to oklch colors', () => {
    expect(withAlpha('oklch(0.5 0.1 50)', 0.12)).toBe('oklch(0.5 0.1 50 / 0.12)')
  })

  it('returns non-oklch colors unchanged', () => {
    expect(withAlpha('#fff', 0.5)).toBe('#fff')
  })
})

describe('passwordStrength', () => {
  it('returns empty for empty password', () => {
    expect(passwordStrength('')).toEqual({ score: 0, label: '', color: '' })
  })

  it('scores weak passwords', () => {
    const result = passwordStrength('short')
    expect(result.score).toBeLessThanOrEqual(1)
    expect(result.label).toBe('Слабый')
  })

  it('scores strong passwords', () => {
    const result = passwordStrength('Str0ng!Pass')
    expect(result.score).toBeGreaterThanOrEqual(4)
    expect(result.label).toBe('Отличный')
  })

  it('requires both uppercase and lowercase for case score', () => {
    const onlyUpper = passwordStrength('ABCDEFGH1!')
    const onlyLower = passwordStrength('abcdefgh1!')
    const mixed = passwordStrength('AbcdEfgh1!')
    expect(mixed.score).toBeGreaterThan(onlyUpper.score)
    expect(mixed.score).toBeGreaterThan(onlyLower.score)
  })
})
