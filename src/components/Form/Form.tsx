import styles from './Form.module.css';
import { useState, FormEvent, ChangeEvent } from 'react';
import SvgContent from '../../assets/icon-error.svg';

type FormData = {
    firstname: string,
    lastname: string,
    email: string,
    password: string
};

type Error = {
    message: string;
    fieldName: string;
};

const InputWithError: React.FC<{
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
    placeholder: string;
    error: Error | undefined;
    type: string;
    onFocus: (fieldName: string) => void;
    fieldName: string;
}> = ({ value, onChange, name, placeholder, error, type, onFocus, fieldName }) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const handleFocus = () => {
        setIsFocused(true)
        onFocus(fieldName);
    }
    const errorClassName = error ? styles.inputError : '';

    return (
        <div className={styles.inputContainer}>
            <input
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                type={type}
                name={name}
                placeholder={placeholder}
                className={`${styles.input} ${errorClassName} ${isFocused ? styles.focused : ''}`}
            />
            {error && error.fieldName === name && (
                <div className={styles.errorContainer}>
                    <p className={styles.errorMessage}>{error.message}</p>
                    <img src={SvgContent} className={styles.errorIcon} alt="Error Icon" />
                </div>
            )}
        </div>
    );
};

const Form = () => {
    const [formData, setFormData] = useState<FormData>({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Error[]>([]);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: Error[] = [];

        Object.entries(formData).forEach(([fieldName, value]) => {
            if (fieldName === 'firstname' && value === '') {
                newErrors.push({ fieldName, message: 'First Name cannot be empty' })
            } else if (fieldName === 'lastname' && value === "") {
                newErrors.push({ fieldName, message: 'Last Name cannot be empty' })
            } else if (fieldName === 'email' && value === '') {
                newErrors.push({ fieldName, message: 'Email cannot be empty' })
            } else if (fieldName === 'email' && !isValidEmail(value)) {
                newErrors.push({ fieldName, message: 'Invalid email format' });
            } else if (fieldName === 'password' && value === '') {
                newErrors.push({ fieldName, message: 'Password cannot be empty' })
            }
        });

        setErrors(newErrors);
    };

    const clearErrors = (fieldName: string) => {
        setErrors(prevErrors => prevErrors.filter(error => error.fieldName !== fieldName));
    };

    return (
        <section>
            <div className={styles.promo}>
                <p className={styles.promoParagraph}>
                    <span><span className={styles.tryItFree}>Try it free 7 days</span> then</span>
                    <span> $20/mo. thereafter</span>
                </p>
            </div>

            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputWrapper}>
                        <InputWithError
                            value={formData.firstname}
                            onChange={handleChange}
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            error={errors.find(error => error.fieldName === 'firstname')}
                            onFocus={clearErrors}
                            fieldName='firstname'
                        />
                        <InputWithError
                            value={formData.lastname}
                            onChange={handleChange}
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            error={errors.find(error => error.fieldName === 'lastname')}
                            onFocus={clearErrors}
                            fieldName='lastname'
                        />
                        <InputWithError
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            type="text"
                            placeholder="Email Address"
                            error={errors.find(error => error.fieldName === 'email')}
                            onFocus={clearErrors}
                            fieldName='email'
                        />
                        <InputWithError
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            type="password"
                            placeholder="Password"
                            error={errors.find(error => error.fieldName === 'password')}
                            onFocus={clearErrors}
                            fieldName='password'
                        />
                    </div>
                    <button id={styles.claimBtn}>Claim Your Free Trial</button>
                    <p className={styles.bottomParagraph}>
                        By clicking the button, you are agreeing to our
                        <span style={{ color: '#FF7979', fontWeight: 700 }}> Terms and Services</span>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Form;
