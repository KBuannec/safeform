import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm';

describe('LoginForm component', () => {
    const baseProps = {
        form: {
            email: '',
            password: '',
        },
        errors: {},
        success: null,
        onChange: vi.fn(),
        onSubmit: vi.fn(),
    };

    it('affiche le titre de connexion', () => {
        render(<LoginForm { ...baseProps } />);
        expect(screen.getByRole('heading', { name: /connexion/i })).toBeInTheDocument();
    });

    it('affiche les champs email et mot de passe', () => {
        render(<LoginForm { ...baseProps } />);
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    });

    it('affiche les erreurs si présentes', () => {
        render(
            <LoginForm
        { ...baseProps }
        errors = {{ email: 'Email invalide', password: 'Mot de passe requis' }}
      />
    );
    expect(screen.getByText('Email invalide')).toBeInTheDocument();
    expect(screen.getByText('Mot de passe requis')).toBeInTheDocument();
});

it('bascule la visibilité du mot de passe au clic sur l’icône', () => {
    render(<LoginForm { ...baseProps } />);
    const toggleIcon = screen.getByText('👁️');
    fireEvent.click(toggleIcon);
    expect(screen.getByPlaceholderText('••••••••')).toHaveAttribute('type', 'text');
});

it('correspond au snapshot', () => {
    const { asFragment } = render(<LoginForm { ...baseProps } />);
    expect(asFragment()).toMatchSnapshot();
});
});
