import './SafeForm.scss';

type Props = {
    form: { name: string; email: string };
    errors: { name?: string; email?: string };
    success: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
};

const SafeForm = ({ form, errors, success, onChange, onSubmit }: Props) => {
    return (
        <form onSubmit={onSubmit} className="safeform">
            <h2>🛡️ SafeForm</h2>

            <label>Nom</label>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <label>Email</label>
            <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <button type="submit">Envoyer</button>

            {success && <p className="success">{success}</p>}
        </form>

    );
};

export default SafeForm;
