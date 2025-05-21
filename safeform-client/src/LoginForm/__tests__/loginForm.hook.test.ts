import { renderHook } from '@testing-library/react';
import { useLoginForm } from '../LoginForm.hook';
import { describe, it, expect } from 'vitest';

describe('useLoginForm', () => {
    it('should initialize form correctly', () => {
        const { result } = renderHook(() => useLoginForm());
        expect(result.current.form).toEqual({ email: '', password: '' });
    });
});
