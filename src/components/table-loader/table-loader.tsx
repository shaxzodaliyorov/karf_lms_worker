import React from "react";
import type { TableLoaderProps } from "./types";

export const DefaultSkeletonRow: React.FC<{
  index?: number;
  column?: number;
}> = ({ column = 6, index }) => (
  <tr className="animate-pulse" key={index}>
    {[...Array(column)].map((_, i) => (
      <td key={i} className="px-4 py-3">
        <div className="h-4 rounded bg-zinc-200 dark:bg-zinc-700 w-full" />
      </td>
    ))}
  </tr>
);

export const TableLoader: React.FC<TableLoaderProps> = ({
  headers,
  rowCount = 5,
  scrollable = true,
  tableClassName = "w-full",
  column,
}) => {
  const Wrapper: React.ElementType = scrollable ? "div" : React.Fragment;
  const wrapperProps = scrollable ? { className: "overflow-x-auto" } : {};

  return (
    <Wrapper {...wrapperProps}>
      <table className={tableClassName}>
        <thead className="bg-zinc-50 dark:bg-zinc-800">
          <tr>
            {headers.map((text, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
              >
                {text}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
          {Array.from({ length: rowCount }).map((_, i) => (
            <DefaultSkeletonRow column={column} key={i} index={i} />
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};
