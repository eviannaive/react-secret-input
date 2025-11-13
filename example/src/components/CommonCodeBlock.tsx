"use client";

import React from "react";
import type { BundledLanguage } from "@/components/kibo-ui/CodeBlock";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from "@/components/kibo-ui/CodeBlock";
import { cn } from "@/utils/cn";

export interface CodeExample {
  language: string;
  filename: string;
  code: string;
}

interface CodeBlockSwitcherProps {
  data: CodeExample[];
  onCopy?: () => void;
  onCopyError?: () => void;
  lineNumbers?: boolean;
  syntaxHighlighting?: boolean;
  className?: string;
}

const CommonCodeBlock: React.FC<CodeBlockSwitcherProps> = ({
  data,
  onCopy,
  onCopyError,
  lineNumbers = true,
  syntaxHighlighting = true,
  className,
}) => (
  <CodeBlock
    data={data}
    defaultValue={data[0].language}
    className={cn("my-4", className)}
  >
    <CodeBlockHeader>
      <CodeBlockFiles>
        {(item) => (
          <CodeBlockFilename key={item.language} value={item.language}>
            {item.filename}
          </CodeBlockFilename>
        )}
      </CodeBlockFiles>

      {data.length > 1 && (
        <CodeBlockSelect>
          <CodeBlockSelectTrigger>
            <CodeBlockSelectValue />
          </CodeBlockSelectTrigger>

          <CodeBlockSelectContent>
            {(item) => (
              <CodeBlockSelectItem key={item.language} value={item.language}>
                {item.language}
              </CodeBlockSelectItem>
            )}
          </CodeBlockSelectContent>
        </CodeBlockSelect>
      )}
      <CodeBlockCopyButton
        onCopy={onCopy ?? (() => console.log("Copied!"))}
        onError={onCopyError ?? (() => console.error("Copy failed"))}
      />
    </CodeBlockHeader>
    <CodeBlockBody>
      {(item) => (
        <CodeBlockItem
          key={item.language}
          value={item.language}
          lineNumbers={lineNumbers}
        >
          <CodeBlockContent
            language={item.language as BundledLanguage}
            syntaxHighlighting={syntaxHighlighting}
          >
            {item.code}
          </CodeBlockContent>
        </CodeBlockItem>
      )}
    </CodeBlockBody>
  </CodeBlock>
);

export default CommonCodeBlock;
