import { Button } from "@/common";
import { EmptyTable } from "@/components/empty-table";
import { TableLoader } from "@/components/table-loader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterModal } from "./_components";

interface Job {
  id: string;
  position: string;
  country: string;
  company: string;
  period: string;
  information: string;
  registrationCompany: string;
}

function useJobPosting() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const sampleJobs: Job[] = [
        {
          id: "1",
          position: "Software Engineer",
          country: "United States",
          company: "Tech Company",
          period: "Full-time",
          information: "Develop and maintain software applications.",
          registrationCompany: "Startup Inc.",
        },
        {
          id: "2",
          position: "UI/UX Designer",
          country: "United States",
          company: "Design Studio",
          period: "Part-time",
          information:
            "Design and create user interfaces for web and mobile applications.",
          registrationCompany: "Startup Inc.",
        },
        {
          id: "3",
          position: "Marketing Manager",
          country: "United States",
          company: "Marketing Agency",
          period: "Full-time",
          information:
            "Plan and execute marketing campaigns to promote products and services.",
          registrationCompany: "Startup Inc.",
        },
        {
          id: "4",
          position: "Sales Representative",
          country: "United States",
          company: "Sales Team",
          period: "Part-time",
          information:
            "Represent and sell products and services to potential customers.",
          registrationCompany: "Startup Inc.",
        },
        {
          id: "5",
          position: "Data Analyst",
          country: "United States",
          company: "Data Science Lab",
          period: "Full-time",
          information:
            "Analyze and interpret data to inform business decisions.",
          registrationCompany: "Startup Inc.",
        },
      ];

      setJobs(sampleJobs);
      setLoading(false);
    };

    fetchMembers();
  }, []);

  return { jobs, loading };
}

const TableRow = ({ job, index }: { job: Job; index: number }) => {
  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 transition-all duration-200">
      <td className="px-4 py-4 text-center text-xs font-medium text-slate-700 dark:text-slate-300 min-w-[60px]">
        {index + 1}
      </td>
      <td className="px-4 py-4 text-xs text-slate-700 dark:text-slate-300">
        {job.position}
      </td>
      <td className="px-4 py-4 text-xs text-slate-700 dark:text-slate-300">
        {job.country}
      </td>
      <td className="px-4 py-4 text-xs text-slate-700 dark:text-slate-300">
        {job.company}
      </td>
      <td className="px-4 py-4 text-xs text-slate-700 dark:text-slate-300">
        {job.company}
      </td>
      <td className="px-4 py-4 text-xs text-slate-700 dark:text-slate-300">
        <Link to={`/admin/job-posting/${job.id}`} className="text-indigo-600 ">
          See more information
        </Link>
      </td>
      <td className="px-4 py-4 text-xs text-slate-700 dark:text-slate-300">
        {job.period}
      </td>
      <td className="px-4 py-4 text-xs text-slate-700 dark:text-slate-300">
        10
      </td>
    </tr>
  );
};

export const AdminJobPostingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { jobs, loading } = useJobPosting();
  const [open, setOpen] = useState(false);
  const filteredMembers = jobs.filter((member) => {
    const matchesSearch = member.position
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <section>
      <div className="top-0 z-10 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <div className="px-4 sm:px-6 lg:px-0">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200 flex-shrink-0">
              Job Postings (10)
            </h1>

            <div className="flex gap-x-2">
              <div className="relative flex-shrink-0 w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                  type="text"
                  placeholder="Search by email…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600"
                />
              </div>
              <Button onClick={() => setOpen(true)} className="h-9">
                <Filter size={13} className="mr-2" />
                <span>Filter</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4">
        <Card className="border-zinc-200 dark:border-zinc-700">
          <div className="overflow-x-auto">
            {loading ? (
              <TableLoader
                headers={[
                  "#",
                  "Position",
                  "Country",
                  "Company",
                  "Period",
                  "Action",
                ]}
                rowCount={6}
              />
            ) : filteredMembers.length === 0 ? (
              <EmptyTable />
            ) : (
              <table id="members-table" className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center min-w-[60px]">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Country
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Information
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Registered Company
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
                  {filteredMembers.map((job, index) => (
                    <TableRow key={job.id} job={job} index={index} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </div>

      <FilterModal onClose={() => setOpen(false)} open={open} />
    </section>
  );
};
