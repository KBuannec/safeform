import RegisterForm from "./RegisterForm";
import { useRegisterForm } from "./RegisterForm.hook";

const RegisterFormContainer = () => {
    const { form, errors, success, handleChange, handleSubmit } = useRegisterForm();

    return (
        <div className="register-form-wrapper">
            <RegisterForm form={form} errors={errors} success={success} onChange={handleChange} onSubmit={handleSubmit} />
        </div>
    );
};

export default RegisterFormContainer;