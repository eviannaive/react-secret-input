"use client";
import { cn, createMaskText } from "./utils";
import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconUnVisible, IconVisible } from "./components/icons";

export type Props = {
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

const SecretInput = ({
  ref,
  label,
  className,
  customClass,
  errorMessage,
  toggleVisible = true,
  maxLength,
  placeholder,
  defaultValue,
  onChange,
  visibleCountFront = 1,
  visibleCountEnd = 1,
  maskChar = "*",
  disabled = false,
  iconVisible = <IconVisible />,
  iconUnVisible = <IconUnVisible />,
  defaultVisible = false,
  value,
  type,
  ...rest
}: Props) => {
  const [visible, setVisible] = useState(defaultVisible);
  const [rawValue, setRawValue] = useState<string>("");
  const [realValue, setRealValue] = useState<string>("");
  const [inputRange, setInputRange] = useState<[number, number]>([0, 0]);
  const [selection, setSelection] = useState<[number, number]>([0, 0]);
  const inputRef = useRef<HTMLInputElement>(null);

  const maskId = useCallback(
    createMaskText(visibleCountFront, visibleCountEnd, maskChar),
    [visibleCountFront, visibleCountEnd],
  );

  const updateValue = useCallback(
    (value: string, e?: React.ChangeEvent<HTMLInputElement>) => {
      const cleanValue = value.slice(0, maxLength);
      setRealValue(cleanValue);
      if (visible) setRawValue(cleanValue);
      else setRawValue(maskId(cleanValue));
      e
        ? onChange?.({
            ...e,
            target: {
              ...e.target,
              name: e.currentTarget.name,
              value: cleanValue,
            },
          } as React.ChangeEvent<HTMLInputElement>)
        : onChange?.({
            target: {
              value: cleanValue,
            },
          } as React.ChangeEvent<HTMLInputElement>);
    },
    [visible, maxLength, onChange],
  );

  const handleSelect = (e: React.MouseEvent<HTMLInputElement>) => {
    const [start, end] = selection;
    const el = e.currentTarget;
    const selectionStart = el.selectionStart || 0;
    const selectionEnd = el.selectionEnd || 0;

    if (start !== selectionStart || end !== selectionEnd) {
      setSelection([selectionStart, selectionEnd]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const [start, end] = selection;
    const transEvent = e as unknown as React.ChangeEvent<HTMLInputElement>;
    const pastedText = e.clipboardData.getData("text");
    const ind = start + pastedText.length;
    const result =
      realValue.slice(0, start) + pastedText + realValue.slice(end);
    updateValue(result, transEvent);
    setInputRange([ind, ind]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [start, end] = selection;
    const input = e.target;
    const inputValue = input.value;
    const ind = input?.selectionStart || 0;
    const selectionDelta = ind - start;

    const isAdd = inputValue.length > realValue.length;
    const num = Math.abs(realValue.length - inputValue.length);
    if (inputValue.length === 0) return updateValue("", e);
    if (isAdd) {
      const result =
        realValue.slice(0, ind - num) +
        inputValue.slice(ind - num, ind) +
        realValue.slice(ind - num);

      updateValue(result, e);
    } else {
      const result =
        selectionDelta > 0
          ? realValue.slice(0, start) +
            inputValue.slice(start, start + 1) +
            realValue.slice(end)
          : realValue.slice(0, ind) + realValue.slice(ind + num);
      updateValue(result, e);
    }

    setInputRange([ind, ind]);
  };

  const handleToggleVisible = () => {
    const visitState = !visible;
    setVisible((prev) => !prev);
    if (visitState) setRawValue(realValue);
    else setRawValue(maskId(realValue));
  };

  // initial value
  useEffect(() => {
    updateValue(defaultValue ?? "");
  }, [defaultValue]);

  useEffect(() => {
    inputRef.current?.setSelectionRange(...inputRange);
  }, [inputRange]);

  return (
    <div className={cn(className)}>
      {label && (
        <div
          className={cn("mb-3 px-1 text-base font-bold", customClass?.label)}
        >
          {label}
        </div>
      )}
      <div
        className={cn(
          `rounded-md border-2 border-zinc-300/70 px-4 py-3 flex w-full`,
          disabled ? "opacity-70" : "",
          customClass?.input,
          disabled ? customClass?.disabled : "",
        )}
      >
        <div className="relative w-full">
          {/* 真實輸入框 */}
          <input
            ref={inputRef}
            type="text"
            value={rawValue}
            onChange={handleChange}
            onSelect={handleSelect}
            // onMouseMove={handleSelect} //似乎onSelect就夠了？
            onPaste={handlePaste}
            maxLength={maxLength}
            placeholder={placeholder}
            className={cn("relative z-10 w-full focus-visible:outline-none")}
            disabled={disabled}
          />
          <input
            ref={ref}
            type="text"
            value={realValue}
            placeholder={placeholder}
            readOnly
            className={
              "cursor-pointer-none invisible absolute left-0 top-0 w-full"
            }
            {...rest}
          />
        </div>
        {toggleVisible && (
          <button
            type="button"
            tabIndex={-1}
            onClick={handleToggleVisible}
            className="pl-2"
          >
            {visible ? <IconVisible /> : <IconUnVisible />}
          </button>
        )}
      </div>
      {errorMessage && (
        <p className={cn("text-red-500 mt-1", customClass?.error)}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default SecretInput;
