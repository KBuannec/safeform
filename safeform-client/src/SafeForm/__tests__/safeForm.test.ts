import { describe, it, expect } from 'vitest';
import { z } from 'zod';

const safeFormSchema = z.object({
    name: z.string().min(1, 'Nom requis'),
    email: z.string().email('Email invalide'),
});

describe('SafeForm validation', () => {
    it('should pass with valid data', () => {
        const result = safeFormSchema.safeParse({
            name: 'Shumix',
            email: 'test@example.com',
        });

        expect(result.success).toBe(true);
    });

    it('should fail with empty name', () => {
        const result = safeFormSchema.safeParse({
            name: '',
            email: 'test@example.com',
        });

        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toContain('Nom requis');
    });

    it('should fail with invalid email', () => {
        const result = safeFormSchema.safeParse({
            name: 'Shumix',
            email: 'invalid',
        });

        expect(result.success).toBe(false);
        expect(result.error?.issues[0].message).toContain('Email invalide');
    });
});
