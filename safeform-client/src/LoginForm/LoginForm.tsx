import { useState } from 'react';
import './LoginForm.scss';

interface LoginFormProps {
  form: {
    email: string;
    password: string;
  };
  errors: {
    email?: string;
    password?: string;
  };
  success: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const LoginForm = ({ form, errors, success, onChange, onSubmit }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className='register-form' onSubmit={onSubmit}>
      <h2>Connexion</h2>

      <label htmlFor='email'>Email</label>
      <input id='email' name='email' value={form.email} onChange={onChange} placeholder='Email' />
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
        <span className='eye-icon' onClick={() => setShowPassword(p => !p)}>
          {showPassword ? '🙈' : '👁️'}
        </span>
      </div>
      {errors.password && <p className="error">{errors.password}</p>}

      <button type='submit'>Se connecter</button>

      {success && <p className='success'>{success}</p>}
    </form>
  );
};

export default LoginForm;
