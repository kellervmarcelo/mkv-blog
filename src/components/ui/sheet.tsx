"use client";

import { Dialog } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;
const SheetTitle = Dialog.Title;

type SheetContentProps = {
  side: "left" | "bottom";
  className?: string;
  children: React.ReactNode;
};

const sideClasses = {
  left: "inset-y-0 left-0 w-80 max-w-full data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
  bottom:
    "inset-x-0 bottom-0 max-h-11/12 rounded-t-3xl data-starting-style:translate-y-full data-ending-style:translate-y-full",
};

function SheetContent({ side, className, children }: SheetContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 z-50 bg-primary/50 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
      <Dialog.Popup
        className={cn(
          "fixed z-50 flex flex-col bg-card transition-transform duration-300 ease-out outline-none motion-reduce:transition-none",
          sideClasses[side],
          className,
        )}
      >
        {children}
      </Dialog.Popup>
    </Dialog.Portal>
  );
}

export { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger };
