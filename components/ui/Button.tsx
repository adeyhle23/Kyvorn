import Link from "next/link";
import { cn } from "@/lib/utils";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-headline text-lg tracking-wide uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40";

const variantClasses: Record<NonNullable<CommonProps["variant"]>, string> = {
  primary: "bg-rust text-ink hover:bg-rust-light active:bg-rust-dark",
  outline:
    "border border-bone/40 text-bone hover:border-rust hover:text-rust",
  ghost: "text-bone hover:text-rust",
};

const sizeClasses: Record<NonNullable<CommonProps["size"]>, string> = {
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = CommonProps & {
  href: string;
  prefetch?: boolean;
};

export function LinkButton({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  prefetch,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Link>
  );
}
