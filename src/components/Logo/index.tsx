"use client";

import { cn } from "@/lib/utils";

const sizes = {
  sm: {
    gap: "gap-1",
    mkv: "text-2xl",
    store: "text-xs rounded-sm px-1.5 pb-0.5",
  },
  md: {
    gap: "gap-1.5",
    mkv: "text-3xl",
    store: "text-base rounded-md px-2 pt-0.5 pb-1",
  },
  lg: {
    gap: "gap-2",
    mkv: "text-6xl",
    store: "text-3xl rounded-lg px-3 pt-1 pb-2",
  },
  xl: {
    gap: "gap-4",
    mkv: "text-9xl",
    store: "text-6xl rounded-2xl px-6 pt-2 pb-4",
  },
};

type LogoProps = {
  size?: keyof typeof sizes;
  className?: string;
};

export default function Logo({ size = "md", className }: LogoProps) {
  const current = sizes[size];

  return (
    <span
      className={cn(
        "inline-flex items-baseline font-display leading-none",
        current.gap,
        className,
      )}
    >
      <span className={cn("font-bold tracking-tighter", current.mkv)}>mkv</span>
      <span
        className={cn(
          "bg-brand font-medium text-brand-foreground",
          current.store,
        )}
      >
        store
      </span>
    </span>
  );
}
