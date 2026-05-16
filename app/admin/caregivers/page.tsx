"use client";

import PortalShell from "@/components/portal/PortalShell";
import { formInputClass } from "@/lib/auth/form-styles";
import { caregivers } from "@/lib/portal/mock-data";
import type { Caregiver } from "@/lib/portal/types";
import { Search, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";

export default function AdminCaregiversPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Caregiver | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return caregivers;
    return caregivers.filter(
      (c) =>
        c.firstName.toLowerCase().includes(q) ||
        c.lastName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <PortalShell portal="admin" title="Caregivers">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative min-w-[240px] flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            placeholder="Search caregivers…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`${formInputClass} pl-10`}
          />
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          <UserPlus className="h-4 w-4" />
          Add caregiver
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-surface-card bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-surface-alt/80 text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Assignments</th>
              <th className="px-5 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-t border-surface-card">
                <td className="px-5 py-3 font-medium text-neutral-900">
                  {c.firstName} {c.lastName}
                </td>
                <td className="px-5 py-3 text-body">{c.email}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.status === "active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-body">{c.activeAssignments}</td>
                <td className="px-5 py-3">
                  <button
                    type="button"
                    onClick={() => setSelected(c)}
                    className="text-sm font-medium text-brand hover:text-brand-dark"
                  >
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
          >
            <h3 className="text-lg font-semibold text-neutral-900">
              {selected.firstName} {selected.lastName}
            </h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-muted">Email</dt>
                <dd className="text-body">{selected.email}</dd>
              </div>
              <div>
                <dt className="text-muted">Phone</dt>
                <dd className="text-body">{selected.phone}</dd>
              </div>
              <div>
                <dt className="text-muted">Reports completed</dt>
                <dd className="text-body">{selected.completedReports}</dd>
              </div>
            </dl>
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-xl bg-brand py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
              >
                Assign to home
              </button>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl border border-surface-card px-4 py-2.5 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </PortalShell>
  );
}
