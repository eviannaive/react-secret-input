"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => SecretInput_default
});
module.exports = __toCommonJS(index_exports);

// src/utils/cn.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
var cn = (...inputs) => {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
};

// src/utils/createMaskedText.ts
function createMaskText(visibleCountFront = 1, visibleCountEnd = 1, maskChar = "*") {
  return (value) => {
    if (!value) return "";
    const len = value.length;
    const prefix = value.slice(0, visibleCountFront);
    const suffix = value.slice(
      Math.max(len - visibleCountEnd, visibleCountFront)
    );
    const masked = Math.max(0, len - visibleCountFront - visibleCountEnd);
    return prefix + maskChar.repeat(masked) + suffix;
  };
}

// src/SecretInput.tsx
var import_react = require("react");

// src/components/icons/IconUnVisible.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var IconUnVisible = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "svg",
    {
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0",
      viewBox: "0 0 640 512",
      height: "1em",
      width: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z" })
    }
  );
};

// src/components/icons/IconVisible.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var IconVisible = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "svg",
    {
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0",
      viewBox: "0 0 512 512",
      height: "1em",
      width: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "256", cy: "256", r: "64" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M394.82 141.18C351.1 111.2 304.31 96 255.76 96c-43.69 0-86.28 13-126.59 38.48C88.52 160.23 48.67 207 16 256c26.42 44 62.56 89.24 100.2 115.18C159.38 400.92 206.33 416 255.76 416c49 0 95.85-15.07 139.3-44.79C433.31 345 469.71 299.82 496 256c-26.38-43.43-62.9-88.56-101.18-114.82zM256 352a96 96 0 1 1 96-96 96.11 96.11 0 0 1-96 96z" })
      ]
    }
  );
};

// src/SecretInput.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var SecretInput = ({
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
  iconVisible = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconVisible, {}),
  iconUnVisible = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconUnVisible, {}),
  defaultVisible = false,
  value,
  type,
  ...rest
}) => {
  const [visible, setVisible] = (0, import_react.useState)(defaultVisible);
  const [rawValue, setRawValue] = (0, import_react.useState)("");
  const [realValue, setRealValue] = (0, import_react.useState)("");
  const [inputRange, setInputRange] = (0, import_react.useState)([0, 0]);
  const [selection, setSelection] = (0, import_react.useState)([0, 0]);
  const inputRef = (0, import_react.useRef)(null);
  const maskId = (0, import_react.useCallback)(
    createMaskText(visibleCountFront, visibleCountEnd, maskChar),
    [visibleCountFront, visibleCountEnd]
  );
  const updateValue = (0, import_react.useCallback)(
    (value2, e) => {
      const cleanValue = value2.slice(0, maxLength);
      setRealValue(cleanValue);
      if (visible) setRawValue(cleanValue);
      else setRawValue(maskId(cleanValue));
      e ? onChange?.({
        ...e,
        target: {
          ...e.target,
          name: e.currentTarget.name,
          value: cleanValue
        }
      }) : onChange?.({
        target: {
          value: cleanValue
        }
      });
    },
    [visible, maxLength, onChange]
  );
  const handleSelect = (e) => {
    const [start, end] = selection;
    const el = e.currentTarget;
    const selectionStart = el.selectionStart || 0;
    const selectionEnd = el.selectionEnd || 0;
    if (start !== selectionStart || end !== selectionEnd) {
      setSelection([selectionStart, selectionEnd]);
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const [start, end] = selection;
    const transEvent = e;
    const pastedText = e.clipboardData.getData("text");
    const ind = start + pastedText.length;
    const result = realValue.slice(0, start) + pastedText + realValue.slice(end);
    updateValue(result, transEvent);
    setInputRange([ind, ind]);
  };
  const handleChange = (e) => {
    const [start, end] = selection;
    const input = e.target;
    const inputValue = input.value;
    const ind = input?.selectionStart || 0;
    const selectionDelta = ind - start;
    const isAdd = inputValue.length > realValue.length;
    const num = Math.abs(realValue.length - inputValue.length);
    if (inputValue.length === 0) return updateValue("", e);
    if (isAdd) {
      const result = realValue.slice(0, ind - num) + inputValue.slice(ind - num, ind) + realValue.slice(ind - num);
      updateValue(result, e);
    } else {
      const result = selectionDelta > 0 ? realValue.slice(0, start) + inputValue.slice(start, start + 1) + realValue.slice(end) : realValue.slice(0, ind) + realValue.slice(ind + num);
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
  (0, import_react.useEffect)(() => {
    updateValue(defaultValue ?? "");
  }, [defaultValue]);
  (0, import_react.useEffect)(() => {
    inputRef.current?.setSelectionRange(...inputRange);
  }, [inputRange]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: cn(className), children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        className: cn("mb-3 px-1 text-base font-bold", customClass?.label),
        children: label
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        className: cn(
          `rounded-md border-2 border-zinc-300/70 px-4 py-3 flex w-full`,
          disabled ? "opacity-70" : "",
          customClass?.input,
          disabled ? customClass?.disabled : ""
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative w-full", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "input",
              {
                ref: inputRef,
                type: "text",
                value: rawValue,
                onChange: handleChange,
                onSelect: handleSelect,
                onPaste: handlePaste,
                maxLength,
                placeholder,
                className: cn("relative z-10 w-full focus-visible:outline-none"),
                disabled
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "input",
              {
                ref,
                type: "text",
                value: realValue,
                placeholder,
                readOnly: true,
                className: "cursor-pointer-none invisible absolute left-0 top-0 w-full",
                ...rest
              }
            )
          ] }),
          toggleVisible && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onClick: handleToggleVisible,
              className: "pl-2",
              children: visible ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconVisible, {}) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconUnVisible, {})
            }
          )
        ]
      }
    ),
    errorMessage && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: cn("text-red-500 mt-1", customClass?.error), children: errorMessage })
  ] });
};
var SecretInput_default = SecretInput;
