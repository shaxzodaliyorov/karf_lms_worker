import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ModalProps, Variant } from "./types";

const sizeClasses: Record<Variant, string> = {
  default: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
  fullscreen: "w-screen h-dvh rounded-none max-w-none",
};

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  footer,
  children,
  variant = "default",
  className,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

    <DialogContent
      className={cn(sizeClasses[variant], "sm:rounded-2xl", className)}
    >
      {(title || description) && (
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
      )}

      {children}

      {footer && <DialogFooter>{footer}</DialogFooter>}
    </DialogContent>
  </Dialog>
);
