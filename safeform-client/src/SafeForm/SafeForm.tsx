type Props = {
    form: { name: string; email: string };
    errors: { name?: string; email?: string };
    success: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
};

const SafeForm = ({ form, errors, success, onChange, onSubmit }: Props) => (
    <form onSubmit={onSubmit}>
        <div>
            <label>Nom :</label>
            <input name="name" value={form.name} onChange={onChange} />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div>
            <label>Email :</label>
            <input name="email" value={form.email} onChange={onChange} />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <button type="submit">Envoyer</button>
        {success && <p>{success}</p>}
    </form>
);

export default SafeForm;
