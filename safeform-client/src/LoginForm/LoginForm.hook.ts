import { useEffect, useState } from 'react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe requis'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const [form, setForm] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3000/csrf-token', {
      credentials: 'include',
    })
      .then(res => res.json() as Promise<{ csrfToken: string }>)
      .then(data => {
        setCsrfToken(data.csrfToken);
        console.log('✅ Token CSRF (login) :', data.csrfToken);
      })
      .catch(() => {
        console.warn('Échec récupération token CSRF (login)');
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setErrors({});
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setSuccess(null);
        setErrors({ email: data.message || 'Identifiants incorrects' });
        return;
      }

      setSuccess('Connexion réussie !');
      setForm({ email: '', password: '' });
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
