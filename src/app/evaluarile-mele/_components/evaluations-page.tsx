"use client";

import { useOrganization } from "@/contexts/organization-context";
import { EvaluationsHeader } from "./evaluations-header";
import { EvaluationsList } from "./evaluations-list";

export function EvaluationsPage() {
  const { getCurrentOrganizationData } = useOrganization();
  const orgData = getCurrentOrganizationData();

  const evaluari = orgData.evaluari || [];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <EvaluationsHeader />
      <EvaluationsList evaluari={evaluari} />
    </div>
  );
}

