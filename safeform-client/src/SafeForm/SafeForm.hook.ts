import { useState } from 'react';
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
            return; // ✅ on bloque l'envoi si les données sont invalides
        }

        setErrors({});
        try {
            const res = await fetch('http://localhost:3000/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
