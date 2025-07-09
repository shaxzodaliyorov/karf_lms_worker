import { Button } from "@/common";
import { EmptyTable } from "@/components/empty-table";
import { TableLoader } from "@/components/table-loader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MOCKWORKERS } from "@/mock";
import { Download, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { WorkerTableRow } from "./_components/table-row/table-row";

export const SheetMetalPaintingMaintenancePage = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      <div className="top-0 z-10 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <div className="px-4 sm:px-6 lg:px-0">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200 flex-shrink-0">
              Sheet Metal painting Maintenance
            </h1>
            <div className="flex gap-x-2">
              <div className="relative flex-shrink-0 w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Search by email…"
                  className="pl-10 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600"
                />
              </div>
              <Button
                variant="outline"
                className="h-9 border-green-700 text-green-700 "
              >
                <Download className="mr-2 h-4 w-4" />
                Download excel
              </Button>
              <Button className="h-9">
                <Plus className="mr-2 h-4 w-4" />
                Add Worker
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <Card className="border-zinc-200 dark:border-zinc-700">
          {isLoading ? (
            <TableLoader
              headers={[
                "#",
                "",
                "Name",
                "Career / Work Experience",
                "Major (Field of Study)",
                "Age",
                "School",
                "Nationality",
                "CV / Resume",
                "Interview Video",
                "Skill Video",
              ]}
              rowCount={12}
              column={11}
            />
          ) : MOCKWORKERS.length === 0 ? (
            <EmptyTable />
          ) : (
            <div className="overflow-x-auto">
              <table id="members-table" className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-3 text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center min-w-[60px]">
                      #
                    </th>
                    <th className="px-4 py-3 text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center min-w-[60px]"></th>
                    <th className="px-4 py-3 text-left text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Career / Work Experience
                    </th>

                    <th className="px-4 py-3 text-left text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Major (Field of Study)
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      School
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Nationality
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      CV / Resume
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Interview Video
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Skill Video
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
                  {MOCKWORKERS.map((worker) => (
                    <WorkerTableRow key={worker.id} worker={worker} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
