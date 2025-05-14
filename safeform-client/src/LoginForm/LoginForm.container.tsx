import LoginForm from './LoginForm';
import { useLoginForm } from './LoginForm.hook';

const LoginFormContainer = () => {
    const { form, errors, success, handleChange, handleSubmit } = useLoginForm();

    return (
        <div className="register-form-wrapper">
            <LoginForm
                form={form}
                errors={errors}
                success={success}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default LoginFormContainer;
