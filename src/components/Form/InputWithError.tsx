import { useState, ChangeEvent } from 'react';
import SvgContent from '../../assets/icon-error.svg';
import styles from './Form.module.css'

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

export default InputWithError;