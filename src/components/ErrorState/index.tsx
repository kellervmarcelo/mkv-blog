import { CircleAlertIcon, RotateCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
};

export default function ErrorState({
  title,
  description,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center gap-4 rounded-lg border border-dashed px-6 py-16 text-center",
        className,
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-destructive-soft text-destructive">
        <CircleAlertIcon className="size-6" aria-hidden />
      </span>

      <div className="flex flex-col gap-1">
        <h2 className="font-display text-xl font-bold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="max-w-sm text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          <RotateCwIcon aria-hidden />
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
