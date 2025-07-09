import type { Control, FieldValues, Path } from "react-hook-form";

export type TextFieldProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: React.ReactNode;
  placeholder?: string;
  description?: React.ReactNode;
} & Omit<React.ComponentProps<"input">, "name">;
