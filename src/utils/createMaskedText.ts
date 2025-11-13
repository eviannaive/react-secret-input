export function createMaskText(
  visibleCountFront = 1,
  visibleCountEnd = 1,
  maskChar = "*",
) {
  return (value: string): string => {
    if (!value) return "";

    const len = value.length;
    const prefix = value.slice(0, visibleCountFront);
    const suffix = value.slice(
      Math.max(len - visibleCountEnd, visibleCountFront),
    );
    const masked = Math.max(0, len - visibleCountFront - visibleCountEnd);

    return prefix + maskChar.repeat(masked) + suffix;
  };
}
