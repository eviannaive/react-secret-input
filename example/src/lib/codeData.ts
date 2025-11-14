export const commands = [
  {
    label: "npm",
    code: "npm install @arisevan/react-secret-input",
  },
  {
    label: "pnpm",
    code: "pnpm add @arisevan/react-secret-inputt",
  },
  {
    label: "yarn",
    code: "yarn add @arisevan/react-secret-input",
  },
];

export const code_tailwind = [
  {
    language: "css",
    filename: "global.css",
    code: `@import "tailwindcss";
/* Note: You may need to change the path to fit your project structure */
@source "../../node_modules/@arisevan/react-secret-input/dist/index.{js,ts,jsx,tsx}";`,
  },
];

export const code_usage = [
  {
    language: "tsx",
    filename: "page.tsx",
    code: `import SecretInput from "@arisevan/react-secret-input";

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
    `,
  },
];

export const code_validation = [
  {
    language: "tsx",
    filename: "page.tsx",
    code: `import * as yup from "yup";
import SecretInput from "react-secret-input";
import { useForm, Controller } from "react-hook-form";

const schemaDemo = yup.object({
  name: yup.string().min(10, "Name must be at least 10 characters long"),
});

export default function Page() {
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaDemo),
    mode: "onChange",
  });

  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <SecretInput
          label="ID Number"
          className="w-full"
          errorMessage={errors.name?.message}
          {...field}
        />
      )}
    />
  );
}
    `,
  },
];
export const code_styles = [
  {
    language: "tsx",
    filename: "page.tsx",
    code: `import SecretInput from "react-secret-input";

export default function Page() {
  return (
    <>
      <SecretInput
        label="Blink"
        defaultValue="Blink Blink Blink"
        errorMessage="Please enter a valid format."
        customClass={{
          label: "text-amber-400",
          input:
            "border-amber-400/30  dark:border-amber-200/50 bg-amber-100/10 text-teal-400",
          error: "text-pink-700 before:content-['*']",
          disabled: "",
        }}
      />
      <SecretInput
        label="Disabled"
        defaultValue="Blink Blink Blink"
        disabled={true}
        className="mt-4"
        customClass={{
          disabled: "opacity-50 bg-amber-100/40",
        }}
      />
    </>
  );
};
    `,
  },
];
