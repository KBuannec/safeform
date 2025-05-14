import { useEffect, useState } from 'react';
import { z } from 'zod';

const formSchema = z.object({
    name: z.string().min(1, 'Nom requis'),
    email: z.string().email('Email invalide')
});

export type FormData = z.infer<typeof formSchema>;

export const useSafeForm = () => {
    const [form, setForm] = useState<FormData>({ name: '', email: '' });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [success, setSuccess] = useState<string | null>(null);
    const [csrfToken, setCsrfToken] = useState<string>('');

    useEffect(() => {
        fetch('http://localhost:3000/csrf-token', {
            credentials: 'include',
        })
            .then(res => res.json() as Promise<{ csrfToken: string }>)
            .then(data => {
                setCsrfToken(data.csrfToken);
                console.log('CSRF Token reçu');
            })
            .catch(() => {
                console.warn('Échec de récupération du token CSRF');
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = formSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                name: fieldErrors.name?.[0],
                email: fieldErrors.email?.[0],
            });
            return;
        }

        setErrors({});
        try {
            const res = await fetch('http://localhost:3000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken,
                },
                credentials: 'include',
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setSuccess('Formulaire envoyé avec succès !');
                setForm({ name: '', email: '' });
            } else {
                setSuccess("Erreur lors de l'envoi");
            }
        } catch (error) {
            console.error(error);
            setSuccess("Une erreur est survenue");
        }
    };

    return {
        form,
        errors,
        success,
        handleChange,
        handleSubmit
    };
};
