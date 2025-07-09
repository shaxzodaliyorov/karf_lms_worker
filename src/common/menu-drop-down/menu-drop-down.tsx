// src/components/common/MenuDropdown.tsx
import React from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";

export interface MenuOption {
  label: string;
  onSelect?: () => void;
  divider?: boolean;
  isLabel?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  rightSlot?: React.ReactNode;
  loading?: boolean;
}

export interface MenuDropdownProps {
  trigger: React.ReactNode;
  options: MenuOption[];
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  contentClassName?: string;
}

export function MenuDropdown({
  trigger,
  options,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  contentClassName,
}: MenuDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn("w-48 z-[222]", contentClassName)}
      >
        {options.map((opt, idx) => {
          if (opt.divider) {
            return <DropdownMenuSeparator key={`sep-${idx}`} />;
          }

          if (opt.isLabel) {
            return (
              <DropdownMenuLabel key={`lbl-${idx}`}>
                {opt.label}
              </DropdownMenuLabel>
            );
          }

          return (
            <DropdownMenuItem
              key={opt.label + idx}
              onSelect={(e) => {
                if (opt.disabled || opt.loading) {
                  e.preventDefault();
                  return;
                }
                opt.onSelect?.();
              }}
              disabled={opt.disabled || opt.loading}
              className={cn(
                opt.destructive &&
                  "text-red-600 focus:bg-red-50 data-[disabled]:text-red-400"
              )}
            >
              {opt.loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : opt.icon ? (
                <span className="mr-2 h-4 w-4">{opt.icon}</span>
              ) : (
                <span className="mr-2 h-4 w-4" />
              )}

              <span className="flex-1">{opt.label}</span>

              {opt.rightSlot}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
