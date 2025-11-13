import * as react_jsx_runtime from 'react/jsx-runtime';
import { ComponentPropsWithRef } from 'react';

type Props = {
    label?: string;
    className?: string;
    inputClassName?: string;
    errorMessage?: string;
    toggleVisible?: boolean;
    size?: string;
    value?: string;
} & Omit<ComponentPropsWithRef<"input">, "size" | "value">;
declare const SecretInput: ({ ref, label, className, inputClassName, errorMessage, toggleVisible, maxLength, size, placeholder, value, onChange, ...rest }: Props) => react_jsx_runtime.JSX.Element;

export { type Props as SecretInputProps, SecretInput as default };
