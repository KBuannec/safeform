import { useState } from 'react';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
    const [form, setForm] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = registerSchema.safeParse(form);

        if (!result.success) {
            const fieldsErrors = result.error.flatten().fieldErrors;
            setErrors({
                name: fieldsErrors.name?.[0],
                email: fieldsErrors.email?.[0],
                password: fieldsErrors.password?.[0],
            });
            return;
        }

        setErrors({});
        try {
            const res = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setSuccess(null);
                setErrors({ email: data.message || 'Erreur inconnue' });
                return;
            }

            setSuccess('Compte créé avec succès !');
            setForm({ name: '', email: '', password: '' })
        } catch (err) {
            console.error(err);
            setSuccess("Une erreur est survenue");
        }
    };

    return {
        form,
        errors,
        success,
        handleChange,
        handleSubmit,
    };
};