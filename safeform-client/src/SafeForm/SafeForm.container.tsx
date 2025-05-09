import SafeForm from './SafeForm';
import { useSafeForm } from './SafeForm.hook';

const SafeFormContainer = () => {
    const { form, errors, success, handleChange, handleSubmit } = useSafeForm();

    return (
        <SafeForm
            form={form}
            errors={errors}
            success={success}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
};

export default SafeFormContainer;
