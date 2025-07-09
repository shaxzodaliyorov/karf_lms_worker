import { Inbox } from "lucide-react";
import type { EmptyTableProps } from "./types";

export const EmptyTable = ({ description, title }: EmptyTableProps) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <Inbox
      className="h-18 w-18 text-zinc-400 dark:text-zinc-500 mb-4"
      size={72}
    />
    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
      {title || "No data found"}
    </h3>
    <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">
      {description || "Try adjusting your filters or search keywords."}
    </p>
  </div>
);
