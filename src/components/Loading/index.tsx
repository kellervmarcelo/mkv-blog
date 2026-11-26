import { LoaderCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type LoadingProps = {
  label?: string;
  className?: string;
};

export default function Loading({
  label = "Carregando...",
  className,
}: LoadingProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground",
        className,
      )}
    >
      <LoaderCircleIcon
        className="size-8 animate-spin motion-reduce:animate-none"
        aria-hidden
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}
