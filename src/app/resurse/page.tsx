import { Suspense } from "react";
import { ResourcesPage } from "./_components/resources-page";

function ResourcesPageWrapper() {
  return <ResourcesPage />;
}

export default function ResursePage() {
  return (
    <Suspense fallback={<div className="p-6">Se încarcă...</div>}>
      <ResourcesPageWrapper />
    </Suspense>
  );
}

