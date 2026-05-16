"use client";

import { useAuth } from "@/components/AuthProvider";
import PortalShell from "@/components/portal/PortalShell";
import { formInputClass, formLabelClass } from "@/lib/auth/form-styles";
import { DEMO_CAREGIVER_ID, assignments, reports } from "@/lib/portal/mock-data";
import { Mail, Phone, User } from "lucide-react";

export default function CaregiverProfilePage() {
  const { user } = useAuth();
  const activeCount = assignments.filter((a) => a.caregiverId === DEMO_CAREGIVER_ID).length;
  const reportCount = reports.filter((r) => r.caregiverId === DEMO_CAREGIVER_ID).length;

  return (
    <PortalShell portal="caregiver" title="Profile">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-2xl border border-surface-card bg-white p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <User className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-sm text-muted">Caregiver · Naptec field team</p>
            </div>
          </div>

          <dl className="mt-6 space-y-4">
            <div>
              <dt className="flex items-center gap-2 text-sm text-muted">
                <Mail className="h-4 w-4" /> Email
              </dt>
              <dd className="mt-1 text-sm text-neutral-900">{user?.email}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-sm text-muted">
                <Phone className="h-4 w-4" /> Phone
              </dt>
              <dd className="mt-1 text-sm text-neutral-900">{user?.phone || "07700 900101"}</dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-surface-card bg-white p-5 text-center">
            <p className="text-2xl font-semibold text-brand">{activeCount}</p>
            <p className="mt-1 text-sm text-muted">Active assignments</p>
          </div>
          <div className="rounded-2xl border border-surface-card bg-white p-5 text-center">
            <p className="text-2xl font-semibold text-brand">{reportCount}</p>
            <p className="mt-1 text-sm text-muted">Reports submitted</p>
          </div>
        </div>

        <form className="rounded-2xl border border-surface-card bg-white p-6 space-y-4">
          <h3 className="font-semibold text-neutral-900">Update contact details</h3>
          <label className="block">
            <span className={formLabelClass}>Phone</span>
            <input
              type="tel"
              defaultValue={user?.phone || "07700 900101"}
              className={formInputClass}
            />
          </label>
          <button
            type="button"
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark"
          >
            Save changes
          </button>
        </form>
      </div>
    </PortalShell>
  );
}
