import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type QuantitySelectorProps = {
  value: number;
  label: string;
  compact?: boolean;
};

export default function QuantitySelector({ value, label, compact = false }: QuantitySelectorProps) {
  return (
    <div role="group" aria-label={label} className="flex items-center rounded-md border bg-card">
      <Button variant="ghost" size="icon" className={cn(compact && "size-10")} aria-label="Diminuir quantidade">
        <MinusIcon />
      </Button>
      <span className={cn("text-center font-semibold", compact ? "min-w-6 text-sm" : "min-w-8")}>{value}</span>
      <Button variant="ghost" size="icon" className={cn(compact && "size-10")} aria-label="Aumentar quantidade">
        <PlusIcon />
      </Button>
    </div>
  );
}
