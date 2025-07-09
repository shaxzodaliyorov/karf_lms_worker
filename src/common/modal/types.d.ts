export type Variant = "default" | "lg" | "xl" | "fullscreen";

export interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}
