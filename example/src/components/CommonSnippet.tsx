"use client";

import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "@/components/kibo-ui/Snippet";
import { cn } from "@/utils/cn";
import { useState } from "react";

interface InstallSnippetProps {
  className?: string;
  commands: {
    label: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }>;
    code: string;
  }[];
}

/**
 * A reusable install snippet that supports npm, yarn, pnpm, and bun.
 * Example usage:
 * <InstallSnippet command="next-forge@latest init" />
 */
const CommonSnippet = ({ className, commands }: InstallSnippetProps) => {
  const [value, setValue] = useState(commands[0].label);
  const activeCommand = commands.find((c) => c.label === value);

  return (
    <Snippet
      onValueChange={setValue}
      value={value}
      className={cn("my-4", className)}
    >
      <SnippetHeader>
        <SnippetTabsList>
          {commands.map((c) => (
            <SnippetTabsTrigger key={c.label} value={c.label}>
              {c.icon && <c.icon size={24} />}
              {c.label}
            </SnippetTabsTrigger>
          ))}
        </SnippetTabsList>
        {activeCommand && <SnippetCopyButton value={activeCommand.code} />}
      </SnippetHeader>

      {commands.map((c) => (
        <SnippetTabsContent key={c.label} value={c.label}>
          {c.code}
        </SnippetTabsContent>
      ))}
    </Snippet>
  );
};

export default CommonSnippet;
