import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyTable } from "@/components/empty-table";
import { TableLoader } from "@/components/table-loader";

type MemberStatus = "pending" | "approved" | "rejected";
// type TabFilter = "all" | "pending" | "approved" | "rejected";

interface Member {
  id: string;
  email: string;
  registrationDate: string;
  status: MemberStatus;
  full_name: string;
}

function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const sampleMembers: Member[] = [
        {
          id: "1",
          email: "alice.johnson@example.com",
          registrationDate: "2024-12-15",
          status: "pending",
          full_name: "Alice Johnson",
        },
        {
          id: "2",
          email: "bob.smith@company.org",
          registrationDate: "2024-12-10",
          status: "approved",
          full_name: "Bob Smith",
        },
        {
          id: "3",
          email: "carol.davis@startup.io",
          registrationDate: "2024-12-08",
          status: "rejected",
          full_name: "Carol Davis",
        },
        {
          id: "4",
          email: "david.wilson@tech.com",
          registrationDate: "2024-12-05",
          status: "approved",
          full_name: "David Wilson",
        },
        {
          id: "5",
          email: "emma.brown@design.co",
          registrationDate: "2024-12-01",
          status: "pending",
          full_name: "Emma Brown",
        },
        {
          id: "6",
          email: "frank.miller@agency.net",
          registrationDate: "2024-11-28",
          status: "approved",
          full_name: "Frank Miller",
        },
        {
          id: "7",
          email: "grace.taylor@freelance.me",
          registrationDate: "2024-11-25",
          status: "rejected",
          full_name: "Grace Taylor",
        },
        {
          id: "8",
          email: "henry.clark@consulting.biz",
          registrationDate: "2024-11-20",
          status: "pending",
          full_name: "Henry Clark",
        },
      ];

      setMembers(sampleMembers);
      setLoading(false);
    };

    fetchMembers();
  }, []);

  const updateMemberStatus = (id: string, status: MemberStatus) => {
    setMembers((prev) =>
      prev.map((member) => (member.id === id ? { ...member, status } : member))
    );
  };

  return { members, loading, updateMemberStatus };
}

function TableRow({
  member,
  index,
  onStatusUpdate,
}: {
  member: Member;
  index: number;
  onStatusUpdate: (id: string, status: MemberStatus) => void;
}) {
  const handleApprove = () => {
    onStatusUpdate(member.id, "approved");
    // toast({
    //   description: "Member approved",
    //   duration: 2000,
    // });
  };

  const handleReject = () => {
    onStatusUpdate(member.id, "rejected");
    // toast({
    //   description: "Member rejected",
    //   duration: 2000,
    // });
  };

  const getStatusBadge = (status: MemberStatus) => {
    const variants = {
      pending:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
      approved:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
      rejected: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    };

    return (
      <Badge className={`${variants[status]} border-0 font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 transition-all duration-200">
      <td className="px-4 py-4 text-center text-sm font-medium text-slate-700 dark:text-slate-300 min-w-[60px]">
        {index + 1}
      </td>
      <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
        {member.full_name}
      </td>
      <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
        {member.email}
      </td>
      <td className="px-4 py-4 text-sm text-slate-700 dark:text-slate-300">
        {member.registrationDate}
      </td>
      <td className="px-4 py-4">{getStatusBadge(member.status)}</td>
      <td className="px-4 py-4">
        <div className="flex gap-2 max-[480px]:flex-col">
          <Button
            size="sm"
            onClick={handleApprove}
            disabled={member.status === "approved"}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            aria-label="Approve member"
          >
            <span className="sr-only">Approve member {member.email}</span>
            Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReject}
            disabled={member.status === "rejected"}
            className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
            aria-label="Reject member"
          >
            <span className="sr-only">Reject member {member.email}</span>
            Reject
          </Button>
        </div>
      </td>
    </tr>
  );
}

export const AdminMembershipManagementPage = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { members, loading, updateMemberStatus } = useMembers();

  const filteredMembers = members.filter((member) => {
    const matchesTab = activeTab === "all" || member.status === activeTab;
    const matchesSearch = member.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const TABS: { key: string; label: string }[] = [
    { key: "all", label: "All" },
    { key: "company", label: "Company" },
    { key: "agency", label: "Agency" },
    { key: "worker", label: "Worker" },
  ];

  return (
    <div>
      <div className="top-0 z-10 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <div className="px-4 sm:px-6 lg:px-0">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold text-slate-700 dark:text-slate-200 flex-shrink-0">
              Membership Management (10)
            </h1>

            {/* Search Field */}
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
          </div>
        </div>
      </div>
      <div className="py-4">
        <div
          className="flex space-x-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg"
          role="tablist"
          aria-label="Membership status filters"
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              aria-controls="members-table"
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <Card className="border-zinc-200 dark:border-zinc-700">
        {loading ? (
          <TableLoader
            headers={["#", "Name", "Email", "Date", "Status", ""]}
            rowCount={6}
          />
        ) : filteredMembers.length === 0 ? (
          <EmptyTable />
        ) : (
          <div className="overflow-x-auto">
            <table id="members-table" className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center min-w-[60px]">
                    #
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Email
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
                {filteredMembers.map((member, index) => (
                  <TableRow
                    key={member.id}
                    member={member}
                    index={index}
                    onStatusUpdate={updateMemberStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
