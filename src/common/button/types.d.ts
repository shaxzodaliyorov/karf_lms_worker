export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};
