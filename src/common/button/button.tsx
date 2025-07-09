import React from "react";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "./types";
import { Spinner } from "@/components/spinner";

/**
 * A reusable button component with customizable variants, sizes, and loading states.
 *
 * @param children - The content to be displayed inside the button.
 * @param loading - Indicates whether the button is in a loading state. Defaults to `false`.
 * @param variant - The visual style of the button. Options are `"primary"`, `"secondary"`, `"outline"`, and `"ghost"`. Defaults to `"primary"`.
 * @param size - The size of the button. Options are `"sm"`, `"md"`, and `"lg"`. Defaults to `"md"`.
 * @param className - Additional custom class names for styling.
 * @param disabled - Disables the button when set to `true`.
 * @param rest - Additional props passed to the button element.
 * @param ref - A ref to the underlying HTML button element.
 *
 * @returns A styled button element with optional loading spinner and text.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      loading = false,
      variant = "primary",
      size = "md",
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
      secondary:
        "bg-slate-800 text-white hover:bg-slate-900 focus-visible:ring-slate-800",
      outline:
        "border border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-300",
      ghost: "hover:bg-slate-100 focus-visible:ring-slate-200",
    };

    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "cursor-pointer",
          base,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...rest}
      >
        {loading && <Spinner />}

        {loading ? "Please wait..." : children}
      </button>
    );
  }
);
