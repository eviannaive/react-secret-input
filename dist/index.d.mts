import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ComponentPropsWithRef } from 'react';

type Props = {
    label?: string;
    className?: string;
    customClass?: {
        label?: string;
        input?: string;
        error?: string;
        disabled?: string;
    };
    maskChar?: string;
    errorMessage?: string;
    toggleVisible?: boolean;
    defaultValue?: string;
    visibleCountFront?: number;
    visibleCountEnd?: number;
    iconVisible?: React.ReactNode;
    iconUnVisible?: React.ReactNode;
    disabled?: boolean;
    defaultVisible?: boolean;
} & Omit<ComponentPropsWithRef<"input">, "size" | "defaultValue">;
declare const SecretInput: ({ ref, label, className, customClass, errorMessage, toggleVisible, maxLength, placeholder, defaultValue, onChange, visibleCountFront, visibleCountEnd, maskChar, disabled, iconVisible, iconUnVisible, defaultVisible, value, type, ...rest }: Props) => react_jsx_runtime.JSX.Element;

export { type Props as SecretInputProps, SecretInput as default };
