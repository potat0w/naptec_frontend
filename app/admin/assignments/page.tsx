"use client";

import AssignmentCard from "@/components/portal/AssignmentCard";
import PortalShell from "@/components/portal/PortalShell";
import {
  formInputClass,
  formLabelClass,
  formSelectClass,
  formTextareaClass,
} from "@/lib/auth/form-styles";
import { assignments, caregivers } from "@/lib/portal/mock-data";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function AdminAssignmentsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <PortalShell portal="admin" title="Assignments">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">Assign caregivers to homes and set shift details.</p>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          <Plus className="h-4 w-4" />
          New assignment
        </button>
      </div>

      {showForm ? (
        <form className="mt-6 grid gap-4 rounded-2xl border border-surface-card bg-white p-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={formLabelClass}>Caregiver</span>
            <select className={formSelectClass} defaultValue="">
              <option value="" disabled>
                Select caregiver
              </option>
              {caregivers
                .filter((c) => c.status === "active")
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName}
                  </option>
                ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className={formLabelClass}>Home / client name</span>
            <input type="text" className={formInputClass} placeholder="Client name" />
          </label>
          <label className="block sm:col-span-2">
            <span className={formLabelClass}>Address</span>
            <input type="text" className={formInputClass} placeholder="Full address" />
          </label>
          <label className="block">
            <span className={formLabelClass}>Date</span>
            <input type="date" className={formInputClass} />
          </label>
          <label className="block">
            <span className={formLabelClass}>Priority</span>
            <select className={formSelectClass} defaultValue="medium">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label className="block">
            <span className={formLabelClass}>Shift start</span>
            <input type="time" className={formInputClass} />
          </label>
          <label className="block">
            <span className={formLabelClass}>Shift end</span>
            <input type="time" className={formInputClass} />
          </label>
          <label className="block sm:col-span-2">
            <span className={formLabelClass}>Tasks (one per line)</span>
            <textarea
              rows={3}
              className={formTextareaClass}
              placeholder="Medication reminder&#10;Personal care"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="button"
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
            >
              Create assignment
            </button>
          </div>
        </form>
      ) : null}

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {assignments.map((a) => (
          <AssignmentCard key={a.id} assignment={a} showCaregiver adminView />
        ))}
      </div>
    </PortalShell>
  );
}
