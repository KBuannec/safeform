import { describe, it, expect } from 'vitest'
import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'trop court'),
})

describe('Login form validation', () => {
    it('should pass with valid data', () => {
        const result = loginSchema.safeParse({
            email: 'test@example.com',
            password: '123456',
        })

        expect(result.success).toBe(true)
    })

    it('should fail with invalid email', () => {
        const result = loginSchema.safeParse({
            email: 'invalid',
            password: '123456',
        })

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toContain('email')
        }
    })

    it('should fail with short password', () => {
        const result = loginSchema.safeParse({
            email: 'test@example.com',
            password: '123',
        })

        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toContain('trop court')
        }
    })
})
