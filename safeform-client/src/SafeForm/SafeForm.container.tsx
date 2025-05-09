import SafeForm from './SafeForm';
import { useSafeForm } from './SafeForm.hook';

const SafeFormContainer = () => {
    const { form, errors, success, handleChange, handleSubmit } = useSafeForm();

    return (
        <div className='safeform-wrapper'>
            <SafeForm
                form={form}
                errors={errors}
                success={success}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default SafeFormContainer;
