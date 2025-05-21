import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RegisterForm from '../RegisterForm'

describe('RegisterForm component', () => {
    const baseProps = {
        form: {
            name: '',
            email: '',
            password: '',
        },
        errors: {},
        success: null,
        onChange: vi.fn(),
        onSubmit: vi.fn(),
    }

    it('affiche les champs et le titre', () => {
        render(<RegisterForm {...baseProps} />)

        expect(screen.getByRole('heading', { name: /créer un compte/i })).toBeInTheDocument()
        expect(screen.getByLabelText(/nom/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument()
    })

    it("affiche les erreurs si présentes", () => {
        render(
            <RegisterForm
                {...baseProps}
                errors={{
                    name: 'Nom requis',
                    email: 'Email invalide',
                    password: 'Mot de passe trop court',
                }}
            />
        )

        expect(screen.getByText('Nom requis')).toBeInTheDocument()
        expect(screen.getByText('Email invalide')).toBeInTheDocument()
        expect(screen.getByText('Mot de passe trop court')).toBeInTheDocument()
    })

    it("permet d'afficher le mot de passe", () => {
        render(<RegisterForm {...baseProps} />)

        const eyeIcon = screen.getByText('👁️')
        fireEvent.click(eyeIcon)

        expect(screen.getByPlaceholderText('••••••••')).toHaveAttribute('type', 'text')
    })

    it('soumet le formulaire', () => {
        render(<RegisterForm {...baseProps} />)

        fireEvent.submit(screen.getByRole('form'))
        expect(baseProps.onSubmit).toHaveBeenCalled()
    })

    it('correspond au snapshot', () => {
        const { asFragment } = render(<RegisterForm {...baseProps} />)
        expect(asFragment()).toMatchSnapshot()
    })
})