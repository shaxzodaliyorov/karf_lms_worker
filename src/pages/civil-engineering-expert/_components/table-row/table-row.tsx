import React from "react";
import { Check, X } from "lucide-react";
import type { WorkerTableRowProps } from "./types";

export const WorkerTableRow: React.FC<WorkerTableRowProps> = ({ worker }) => {
  return (
    <tr>
      <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-200 text-center">
        {worker.id}
      </td>
      <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-200 text-center">
        <div className="w-8 h-8 rounded-full overflow-hidden inline-block">
          <img
            src={
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt={worker.name}
            className="w-full h-full object-cover"
          />
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-200">
        {worker.name}
      </td>
      <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-200">
        {worker.career}
      </td>
      <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-200">
        {worker.major}
      </td>
      <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-200">
        {worker.age}
      </td>
      <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-200">
        {worker.school}
      </td>
      <td className="px-4 py-3 text-xs text-slate-700 dark:text-slate-200">
        {worker.nationality}
      </td>
      <td className="px-4 py-3 text-center">
        {worker.cv ? (
          <Check className="h-4 w-4 text-green-500 mx-auto" />
        ) : (
          <X className="h-4 w-4 text-red-500 mx-auto" />
        )}
      </td>
      <td className="px-4 py-3 text-center">
        {worker.interviewVideo ? (
          <Check className="h-4 w-4 text-green-500 mx-auto" />
        ) : (
          <X className="h-4 w-4 text-red-500 mx-auto" />
        )}
      </td>
      <td className="px-4 py-3 text-center">
        {worker.skillVideo ? (
          <Check className="h-4 w-4 text-green-500 mx-auto" />
        ) : (
          <X className="h-4 w-4 text-red-500 mx-auto" />
        )}
      </td>
    </tr>
  );
};
