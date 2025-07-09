// "use client";

// import type { Control, FieldValues } from "react-hook-form";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormDescription,
//   FormMessage,
// } from "@/components/ui/form";
// import { cn } from "@/lib/utils";

// import PhoneInput from "react-phone-input-2";
// import { isValidPhoneNumber } from "libphonenumber-js";
// import "react-phone-input-2/lib/style.css";

// const baseInputClasses =
//   "file:text-foreground h-10 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm " +
//   "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] " +
//   "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

// type PhoneFieldProps<T extends FieldValues> = {
//   control: Control<T>;
//   name: keyof T & string;
//   label?: string;
//   placeholder?: string;
//   description?: string;
//   required?: boolean;
//   disabled?: boolean;
//   defaultCountry?: string;
// };

// export function PhoneField<T extends FieldValues>({
//   control,
//   name,
//   label,
//   placeholder = "Telefon raqam",
//   description,
//   required = true,
//   disabled,
//   defaultCountry = "uz",
// }: PhoneFieldProps<T>) {
//   const validate = (value: string) => {
//     if (!value) return required ? "Telefon raqam kiritish majburiy" : true;
//     return isValidPhoneNumber("+" + value) ? true : "Telefon raqam noto‘g‘ri";
//   };

//   return (
//     <FormField
//       control={control}
//       name={name}
//       rules={{ validate }}
//       render={({ field, fieldState }) => (
//         <FormItem>
//           {label && <FormLabel>{label}</FormLabel>}

//           <FormControl>
//             <div className="relative">
//               <PhoneInput
//                 country={defaultCountry}
//                 value={field.value}
//                 onChange={(val) => field.onChange(val)}
//                 placeholder={placeholder}
//                 disabled={disabled}
//                 countryCodeEditable={false}
//                 enableSearch
//                 disableSearchIcon
//                 // === dizayn ===
//                 containerClass="w-full"
//                 inputClass={cn(
//                   baseInputClasses,
//                   fieldState.error && "border-destructive aria-invalid"
//                 )}
//                 buttonClass={cn(
//                   "border-input bg-transparent rounded-l-md hover:bg-accent hover:text-accent-foreground",
//                   fieldState.error && "border-destructive"
//                 )}
//                 dropdownClass="bg-background border border-input rounded-md shadow-md"
//                 searchClass={cn(baseInputClasses, "px-3 py-2 text-sm h-auto")}
//                 specialLabel=""
//               />
//             </div>
//           </FormControl>

//           {description && <FormDescription>{description}</FormDescription>}
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }

export const PhoneField = () => {
  return <div>PhoneField</div>;
};
