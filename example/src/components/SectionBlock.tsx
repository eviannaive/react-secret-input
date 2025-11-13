import React, { forwardRef } from "react";

interface SectionBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

// forwardRef 用法，ref 會指向最外層的 div
const SectionBlock = forwardRef<HTMLDivElement, SectionBlockProps>(
  ({ title, children, ...rest }, ref) => {
    return (
      <div ref={ref} className="py-10 px-2 border-b border-zinc-500" {...rest}>
        <div className="text-xl font-bold text-teal-500 mb-4">{title}</div>
        <div className="px-2">{children}</div>
      </div>
    );
  },
);

SectionBlock.displayName = "SectionBlock";

export default SectionBlock;
