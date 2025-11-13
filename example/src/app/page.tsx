"use client";
import { useEffect, useRef, useState } from "react";
import SecretInput from "react-secret-input";
import { HiOutlineChevronDoubleUp } from "react-icons/hi2";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import CommonCodeBlock from "@/components/CommonCodeBlock";
import SectionBlock from "@/components/SectionBlock";
import CommonSnippet from "@/components/CommonSnippet";
import { useAtom } from "jotai";
import { block } from "@/utils/stores";
import {
  code_styles,
  code_tailwind,
  code_usage,
  code_validation,
  commands,
} from "@/lib/codeData";

const schemaDemo = yup.object({
  name: yup.string().min(10, "Name must be at least 10 characters long"),
});

export default function Home() {
  const [value1, setValue1] = useState("");
  const sections = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollBlock, setScrollBlock] = useAtom(block);
  const {
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaDemo),
    mode: "onChange",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setScrollBlock(id);
          }
        });
      },
      {
        threshold: 0.6,
      },
    );

    sections.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sections.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [setScrollBlock]);

  return (
    <div>
      <h1 className="text-5xl font-bold text-pink-500 mb-4">
        React Secret Input
      </h1>
      <p className="text-lg mb-8">
        React Secret Input is a lightweight React component for securely masking
        sensitive form data, allowing you to easily show or hide input values.
      </p>
      <ul className="flex flex-col gap-4 text-sm">
        <li>
          ✨ Fully styled with
          <Link href="https://tailwindcss.com/" target="_blank">
            <code className="mx-2">Tailwind CSS</code>
          </Link>
          for effortless customization.
        </li>
        <li>
          💪 Seamlessly integrates with
          <Link href="https://react-hook-form.com/" target="_blank">
            <code className="mx-2">React Hook Form</code>
          </Link>
          for validation and state management.
        </li>
      </ul>
      <SectionBlock
        title="Installation"
        id="installation"
        ref={(el) => {
          sections.current[0] = el;
        }}
      >
        <div className="">
          <div className="flex items-center my-2 px-2">
            <div className="font-bold">Step 1</div>
            <div className="mx-3 text-xs">▶</div>
            <div className="mx-2">Install the package.</div>
          </div>
          <CommonSnippet commands={commands} />
        </div>
        <div className="mt-4">
          <div className="flex items-center my-2 px-2">
            <div className="font-bold">Step 2</div>
            <div className="mx-3 text-xs">▶</div>
            <div className="mx-2">
              Add the following code to your main css file.
            </div>
          </div>
          <CommonCodeBlock data={code_tailwind} />
        </div>
      </SectionBlock>
      <SectionBlock
        title="Usage"
        id="usage"
        ref={(el) => {
          sections.current[1] = el;
        }}
      >
        <SecretInput
          defaultValue="Zola Hanna"
          placeholder="Please enter your name"
          label="Full Name"
          onChange={(e) => setValue1(e.target.value)}
        />
        <div className="mt-4">
          <span className="text-pink-500">Real Value：</span>
          <span>{value1}</span>
        </div>
        <CommonCodeBlock data={code_usage} className="mt-6" />
      </SectionBlock>
      <SectionBlock
        title="Custom Styles"
        id="styles"
        ref={(el) => {
          sections.current[2] = el;
        }}
      >
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
        <CommonCodeBlock data={code_styles} className="mt-6" />
      </SectionBlock>
      <SectionBlock title="Supports validation with React Hook Form">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <SecretInput
              label="ID Number"
              className="w-full"
              errorMessage={errors.name?.message}
              placeholder="Please enter your ID number"
              {...field}
            />
          )}
        />
        <CommonCodeBlock data={code_validation} className="mt-6" />
      </SectionBlock>
      <SectionBlock
        title="Props"
        id="props"
        ref={(el) => {
          sections.current[3] = el;
        }}
      >
        <p className="text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
          This component extends the native
          <code> &lt;input&gt; </code>
          element, meaning you can use all standard input props (like
          <code> id </code>,<code> disabled </code>,<code> maxLength </code>, or
          <code> autoFocus </code> along with these additional custom props:
        </p>
        <div className="overflow-x-scroll w-full">
          <table className="w-full min-w-220 text-left">
            <thead>
              <tr className="">
                <th className="px-4 py-3 font-semibold border-b-2 border-teal-500/60">
                  Prop
                </th>
                <th className="px-4 py-3 font-semibold border-b-2 border-teal-500/60">
                  Type
                </th>
                <th className="px-4 py-3 font-semibold border-b-2 border-teal-500/60">
                  Default
                </th>
                <th className="px-4 py-3 font-semibold border-b-2 border-teal-500/60">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-300 dark:divide-zinc-500/90">
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-100/10">
                <td className="px-4 py-3">
                  <code> label </code>
                </td>
                <td className="px-4 py-3">string</td>
                <td className="px-4 py-3">－</td>
                <td className="px-4 py-3">
                  The label text displayed above the input field.
                </td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-100/10">
                <td className="px-4 py-3">
                  <code>toggleVisible</code>
                </td>
                <td className="px-4 py-3">boolean</td>
                <td className="px-4 py-3">true</td>
                <td className="px-4 py-3">
                  Determines whether the visibility toggle button is shown.
                </td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-100/10">
                <td className="px-4 py-3">
                  <code>defaultVisible</code>
                </td>
                <td className="px-4 py-3">boolean</td>
                <td className="px-4 py-3">false</td>
                <td className="px-4 py-3">
                  Sets whether the input value is visible by default when the
                  component is rendered.
                </td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-100/10">
                <td className="px-4 py-3">
                  <code>visibleCountFront</code>
                </td>
                <td className="px-4 py-3">number</td>
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">
                  Number of characters to remain visible at the start of the
                  masked value.
                </td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-100/10">
                <td className="px-4 py-3">
                  <code>visibleCountEnd</code>
                </td>
                <td className="px-4 py-3">number</td>
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">
                  Number of characters to remain visible at the end of the
                  masked value.
                </td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-100/10">
                <td className="px-4 py-3 ">
                  <code>maskChar</code>
                </td>
                <td className="px-4 py-3">string</td>
                <td className="px-4 py-3">{"*"}</td>
                <td className="px-4 py-3">
                  The character used to mask hidden parts of the input value.
                </td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-100/10">
                <td className="px-4 py-3">
                  <code>errorMessage</code>
                </td>
                <td className="px-4 py-3">string</td>
                <td className="px-4 py-3">－</td>
                <td className="px-4 py-3">
                  The character used to mask hidden parts of the input value.
                </td>
              </tr>
              <tr className="hover:bg-gray-100 dark:hover:bg-gray-100/10">
                <td className="px-4 py-3">
                  <code className="block">iconVisible</code>
                  <div className="w-[50%] h-px bg-zinc-300 dark:bg-zinc-500/90 my-2"></div>
                  <code className="block">iconUnVisible</code>
                </td>
                <td className="px-4 py-3" rowSpan={2}>
                  ReactNode
                </td>
                <td className="px-4 py-3" rowSpan={2}>
                  －
                </td>
                <td className="px-4 py-3" rowSpan={2}>
                  {`You can pass any React element (e.g., an icon component or
                  JSX) to render a "show/hide" icon inside an input field.`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionBlock>
      <button
        className="block mx-auto mt-16 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <HiOutlineChevronDoubleUp className="mx-auto text-gray-400" size={20} />
        <div className="bg-pink-500 text-white w-12 h-12 rounded-full grid place-content-center mt-2">
          Top
        </div>
      </button>
    </div>
  );
}
