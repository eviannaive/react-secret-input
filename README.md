# React Secret Input

It’s a lightweight input component for securely masking sensitive data, fully styled with Tailwind CSS and compatible with React Hook Form for validation.

---

## Features

- Fully styled with Tailwind CSS
- Seamless integration with React Hook Form
- Toggle visibility of input values (show/hide password)
- Easy to use and customize
- TypeScript ready
- Lightweight and fast

---

## Demo

Check out the live demo here: [React Secret Input Demo](https://eviannaive.github.io/react-secret-input/)

---

## Installation

To install the package, run:

```bash
npm install @arisevan/react-secret-input
```

## Usage

```typescript
import SecretInput from "react-secret-input";

export default function Page() {
  const [value, setValue] = useState("");
  return (
    <SecretInput
      label="Full Name"
      defaultValue="Zola Hanna"
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```
