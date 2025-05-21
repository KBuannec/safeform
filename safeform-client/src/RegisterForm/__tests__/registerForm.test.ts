import { describe, it, expect } from 'vitest';
import { z } from 'zod';

const registerSchema = z.object({
    name: z.string().min(1, 'Nom requis'),
    email: z.string().email('Email invalide'),
    password: z.string().min(6, 'Mot de passe trop court'),
});

describe('Register form validation', () => {
    it('should pass with valid data', () => {
        const result = registerSchema.safeParse({
            name: 'Shumix',
            email: 'test@example.com',
            password: '123456',
        });

        expect(result.success).toBe(true);
    });

    it('should fail with missing name', () => {
        const result = registerSchema.safeParse({
            name: '',
            email: 'test@example.com',
            password: '123456',
        });

        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toContain('Nom requis');
    });

    it('should fail with invalid email', () => {
        const result = registerSchema.safeParse({
            name: 'Shumix',
            email: 'invalid',
            password: '123456',
        });

        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toContain('Email invalide');
    });

    it('should fail with short password', () => {
        const result = registerSchema.safeParse({
            name: 'Shumix',
            email: 'test@example.com',
            password: '123',
        });

        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toContain('trop court');
    });
});
