import * as React from "react";
import type { FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import type { TextFieldProps } from "./types";

export const TextField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type,
  ...inputProps
}: TextFieldProps<T>) => {
  const [show, setShow] = React.useState(false);
  const isPassword = type === "password";

  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <div className="relative">
            <FormControl>
              <Input
                type={inputType}
                placeholder={placeholder}
                {...field}
                {...inputProps}
              />
            </FormControl>

            {isPassword && (
              <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 outline-none transition hover:bg-muted"
              >
                {show ? (
                  <EyeOff size={18} strokeWidth={1.75} />
                ) : (
                  <Eye size={18} strokeWidth={1.75} />
                )}
              </button>
            )}
          </div>

          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
