"use client";

type LogoProps = {
  variant?: "white" | "black";
};

export default function Logo({ variant = "black" }: LogoProps) {
  const logoVariants = {
    black: "text-ink",
    white: "text-paper",
  };

  return (
    <div className="font-title flex items-end gap-1">
      <h1 className={`text-3xl font-bold ${logoVariants[variant]}`}>mkv</h1>
      <span className="inline px-2 bg-lime font-bold text-[16px] rounded-sm">
        store
      </span>
    </div>
  );
}
