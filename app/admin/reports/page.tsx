"use client";

import PortalShell from "@/components/portal/PortalShell";
import ReportCard from "@/components/portal/ReportCard";
import { formInputClass, formSelectClass } from "@/lib/auth/form-styles";
import { caregivers, reports } from "@/lib/portal/mock-data";
import type { CareReport } from "@/lib/portal/types";
import { useMemo, useState } from "react";

export default function AdminReportsPage() {
  const [caregiverFilter, setCaregiverFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selected, setSelected] = useState<CareReport | null>(null);

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      if (caregiverFilter !== "all" && r.caregiverId !== caregiverFilter) return false;
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (dateFilter && !r.submittedAt.startsWith(dateFilter)) return false;
      return true;
    });
  }, [caregiverFilter, statusFilter, dateFilter]);

  return (
    <PortalShell portal="admin" title="Reports">
      <div className="flex flex-wrap gap-3">
        <select
          value={caregiverFilter}
          onChange={(e) => setCaregiverFilter(e.target.value)}
          className={`${formSelectClass} w-auto min-w-[180px]`}
        >
          <option value="all">All caregivers</option>
          {caregivers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.firstName} {c.lastName}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`${formSelectClass} w-auto min-w-[140px]`}
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="submitted">Submitted</option>
          <option value="reviewed">Reviewed</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className={`${formInputClass} w-auto`}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {filtered.map((report) => (
          <ReportCard key={report.id} report={report} onView={() => setSelected(report)} />
        ))}
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <div
            className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <h3 className="text-lg font-semibold text-neutral-900">
              {selected.clientName} — {selected.caregiverName}
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-surface-alt p-4">
                <p className="text-xs font-medium uppercase text-muted">Original notes</p>
                <p className="mt-2 text-sm text-body">{selected.rawNotes}</p>
              </div>
              <div className="rounded-xl border border-brand/15 p-4">
                <p className="text-xs font-medium uppercase text-brand">AI organised report</p>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-body">
                  {selected.organizedReport}
                </pre>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-6 rounded-xl border border-surface-card px-4 py-2 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </PortalShell>
  );
}
