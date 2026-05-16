"use client";

import PortalShell from "@/components/portal/PortalShell";
import StatCard from "@/components/portal/StatCard";
import { ReportStatusBadge } from "@/components/portal/badges";
import {
  assignments,
  caregivers,
  recentActivities,
  reports,
} from "@/lib/portal/mock-data";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  FileText,
  Users,
} from "lucide-react";

export default function AdminDashboardPage() {
  const activeAssignments = assignments.filter(
    (a) => a.status !== "completed"
  ).length;
  const pendingReports = reports.filter((r) => r.status === "pending").length;

  return (
    <PortalShell portal="admin" title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total caregivers"
          value={caregivers.filter((c) => c.status === "active").length}
          icon={Users}
        />
        <StatCard label="Active assignments" value={activeAssignments} icon={CalendarDays} />
        <StatCard label="Submitted reports" value={reports.length} icon={FileText} />
        <StatCard label="Pending reports" value={pendingReports} icon={ClipboardList} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-surface-card bg-white p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-neutral-900">Reports overview</h2>
          <div className="mt-6 flex h-48 items-center justify-center rounded-xl border border-dashed border-surface-card bg-surface-alt/50">
            <div className="flex items-center gap-2 text-sm text-muted">
              <BarChart3 className="h-5 w-5 text-brand" />
              Chart placeholder — connect analytics later
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-surface-card bg-white p-5">
          <h2 className="text-sm font-semibold text-neutral-900">Recent activity</h2>
          <ul className="mt-4 space-y-3">
            {recentActivities.map((item) => (
              <li key={item.id} className="border-b border-surface-card pb-3 last:border-0">
                <p className="text-sm text-body">{item.message}</p>
                <p className="mt-0.5 text-xs text-muted">{item.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-8 rounded-2xl border border-surface-card bg-white overflow-hidden">
        <div className="border-b border-surface-card px-5 py-4">
          <h2 className="text-sm font-semibold text-neutral-900">Recent reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-alt/80 text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Caregiver</th>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Submitted</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-t border-surface-card">
                  <td className="px-5 py-3 text-neutral-900">{report.caregiverName}</td>
                  <td className="px-5 py-3 text-body">{report.clientName}</td>
                  <td className="px-5 py-3 text-muted">
                    {new Date(report.submittedAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-5 py-3">
                    <ReportStatusBadge status={report.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PortalShell>
  );
}
