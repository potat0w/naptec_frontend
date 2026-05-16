"use client";

import AssignmentCard from "@/components/portal/AssignmentCard";
import PortalShell from "@/components/portal/PortalShell";
import StatCard from "@/components/portal/StatCard";
import { DEMO_CAREGIVER_ID, assignments, reports } from "@/lib/portal/mock-data";
import { CalendarDays, CheckCircle2, Clock, FileText } from "lucide-react";

const today = "2026-05-16";

export default function CaregiverDashboardPage() {
  const myAssignments = assignments.filter((a) => a.caregiverId === DEMO_CAREGIVER_ID);
  const todayHomes = myAssignments.filter((a) => a.date === today);
  const upcoming = myAssignments.filter((a) => a.date > today);
  const myReports = reports.filter((r) => r.caregiverId === DEMO_CAREGIVER_ID);
  const pendingReports = myReports.filter((r) => r.status === "pending").length;
  const completedReports = myReports.filter((r) => r.status !== "pending").length;

  return (
    <PortalShell portal="caregiver" title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's homes" value={todayHomes.length} icon={CalendarDays} />
        <StatCard label="Upcoming" value={upcoming.length} hint="Next 7 days" icon={Clock} />
        <StatCard label="Pending reports" value={pendingReports} icon={FileText} />
        <StatCard label="Completed reports" value={completedReports} icon={CheckCircle2} />
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-neutral-900">Today&apos;s assigned homes</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {todayHomes.length ? (
            todayHomes.map((a) => <AssignmentCard key={a.id} assignment={a} />)
          ) : (
            <p className="text-sm text-muted">No visits scheduled for today.</p>
          )}
        </div>
      </section>

      {upcoming.length ? (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">Upcoming schedules</h2>
          <ul className="mt-3 space-y-2">
            {upcoming.map((a) => (
              <li
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-surface-card bg-white px-4 py-3 text-sm"
              >
                <span className="font-medium text-neutral-900">{a.clientName}</span>
                <span className="text-muted">
                  {a.date} · {a.shiftStart} – {a.shiftEnd}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </PortalShell>
  );
}
