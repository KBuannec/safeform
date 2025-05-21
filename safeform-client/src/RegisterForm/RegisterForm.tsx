import { useState } from 'react';
import './RegisterForm.scss';

interface RegisterFormProps {
    form: {
        name: string;
        email: string;
        password: string;
    };
    errors: {
        name?: string;
        email?: string;
        password?: string;
    };
    success: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const RegisterForm = ({ form, errors, success, onChange, onSubmit }: RegisterFormProps) => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <form className='register-form' onSubmit={onSubmit} role='form'>
            <h2>Créer un compte</h2>

            <label htmlFor='name'>Nom</label>
            <input id='name' name='name' value={form.name} onChange={onChange} placeholder='Nom' />
            {errors.name && <p className="error">{errors.name}</p>}

            <label htmlFor='email'>Email</label>
            <input id='email' name='email' value={form.email} onChange={onChange} placeholder='test@example.fr'/>
            {errors.email && <p className="error">{errors.email}</p>}

            <label htmlFor='password'>Mot de passe</label>
            <div className="input-wrapper">
                <input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={onChange}
                    placeholder='••••••••'
                />
                <span className='eye-icon' onClick={togglePasswordVisibility}>
                    {showPassword ? '🙈' : '👁️'}
                </span>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}

            <button type='submit'>S'inscrire</button>

            {success && <p className='success'>{success}</p>}
        </form>
    );
};

export default RegisterForm;