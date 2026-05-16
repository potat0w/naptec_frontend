import {
  AssignmentStatusBadge,
  PriorityBadge,
} from "@/components/portal/badges";
import type { Assignment } from "@/lib/portal/types";
import { Clock, MapPin } from "lucide-react";
import Link from "next/link";

type AssignmentCardProps = {
  assignment: Assignment;
  showCaregiver?: boolean;
  adminView?: boolean;
};

export default function AssignmentCard({
  assignment,
  showCaregiver = false,
  adminView = false,
}: AssignmentCardProps) {
  return (
    <article className="rounded-2xl border border-surface-card bg-white p-5 shadow-[0_8px_32px_-16px_rgba(63,45,98,0.15)]">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-neutral-900">{assignment.clientName}</h3>
          {showCaregiver ? (
            <p className="mt-0.5 text-sm text-muted">{assignment.caregiverName}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <PriorityBadge priority={assignment.priority} />
          <AssignmentStatusBadge status={assignment.status} />
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-body">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          {assignment.address}
        </p>
        <p className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-brand" />
          {assignment.date} · {assignment.shiftStart} – {assignment.shiftEnd}
        </p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {assignment.tasks.map((task) => (
          <li
            key={task}
            className="rounded-full bg-surface-alt px-3 py-1 text-xs text-body"
          >
            {task}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-xl border border-surface-card px-4 py-2 text-sm font-medium text-body transition-colors hover:bg-surface-alt"
        >
          View Details
        </button>
        {!adminView ? (
          <Link
            href={`/caregiver/reports?assignment=${assignment.id}`}
            className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Submit Report
          </Link>
        ) : null}
      </div>
    </article>
  );
}
