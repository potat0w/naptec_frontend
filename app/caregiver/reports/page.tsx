"use client";

import PortalShell from "@/components/portal/PortalShell";
import ReportCard from "@/components/portal/ReportCard";
import ReportSubmission from "@/components/portal/ReportSubmission";
import { DEMO_CAREGIVER_ID, assignments, reports } from "@/lib/portal/mock-data";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ReportsContent() {
  const searchParams = useSearchParams();
  const assignmentId = searchParams.get("assignment");
  const linked = assignments.find((a) => a.id === assignmentId);
  const myReports = reports.filter((r) => r.caregiverId === DEMO_CAREGIVER_ID);
  const [selected, setSelected] = useState<(typeof reports)[0] | null>(null);

  return (
    <>
      <section className="rounded-2xl border border-surface-card bg-white p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Submit visit report</h2>
        <p className="mt-1 text-sm text-muted">
          Enter raw notes from your visit. AI will organise them into a professional summary.
        </p>
        <div className="mt-6">
          <ReportSubmission clientName={linked?.clientName} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-neutral-900">Your submitted reports</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {myReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onView={() => setSelected(report)}
            />
          ))}
        </div>
      </section>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <h3 className="text-lg font-semibold text-neutral-900">{selected.clientName}</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-surface-alt p-4">
                <p className="text-xs font-medium uppercase text-muted">Original</p>
                <p className="mt-2 text-sm text-body">{selected.rawNotes}</p>
              </div>
              <div className="rounded-xl border border-brand/15 p-4">
                <p className="text-xs font-medium uppercase text-brand">AI organised</p>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-sm text-body">
                  {selected.organizedReport}
                </pre>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-6 rounded-xl border border-surface-card px-4 py-2 text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default function CaregiverReportsPage() {
  return (
    <PortalShell portal="caregiver" title="Reports">
      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
        <ReportsContent />
      </Suspense>
    </PortalShell>
  );
}
