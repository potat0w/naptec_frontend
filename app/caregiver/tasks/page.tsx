"use client";

import AssignmentCard from "@/components/portal/AssignmentCard";
import PortalShell from "@/components/portal/PortalShell";
import { DEMO_CAREGIVER_ID, assignments } from "@/lib/portal/mock-data";

export default function CaregiverTasksPage() {
  const myAssignments = assignments.filter((a) => a.caregiverId === DEMO_CAREGIVER_ID);

  return (
    <PortalShell portal="caregiver" title="Assigned Tasks">
      <p className="mb-6 text-sm text-muted">
        Your scheduled visits and care tasks for assigned homes.
      </p>
      <div className="grid gap-4 lg:grid-cols-2">
        {myAssignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </PortalShell>
  );
}
