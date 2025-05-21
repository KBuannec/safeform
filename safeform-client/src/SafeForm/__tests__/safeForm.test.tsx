import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SafeForm from '../SafeForm';

describe('SafeForm component', () => {
    const baseProps = {
        form: { name: '', email: '' },
        errors: {},
        success: null,
        onChange: vi.fn(),
        onSubmit: vi.fn(),
    };

    it('affiche le titre et les champs', () => {
        render(<SafeForm {...baseProps} />);

        expect(screen.getByRole('heading', { name: /safeform/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it("affiche les messages d'erreur", () => {
        render(
            <SafeForm
                {...baseProps}
                errors={{ name: 'Nom requis', email: 'Email invalide' }}
            />
        );

        expect(screen.getByText('Nom requis')).toBeInTheDocument();
        expect(screen.getByText('Email invalide')).toBeInTheDocument();
    });

    it('appelle onChange au changement de champ', () => {
        render(<SafeForm {...baseProps} />);

        fireEvent.change(screen.getByLabelText(/nom/i), {
            target: { value: 'Jean', name: 'name' },
        });
        expect(baseProps.onChange).toHaveBeenCalled();

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'jean@example.com', name: 'email' },
        });
        expect(baseProps.onChange).toHaveBeenCalled();
    });

    it('appelle onSubmit lors de la soumission du formulaire', () => {
        render(<SafeForm {...baseProps} />);

        fireEvent.submit(screen.getByText('Envoyer').closest('form')!);
        expect(baseProps.onSubmit).toHaveBeenCalled();
    });

    it('correspond au snapshot', () => {
        const { asFragment } = render(<SafeForm {...baseProps} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
