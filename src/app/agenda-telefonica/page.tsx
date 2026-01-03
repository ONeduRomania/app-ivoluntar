import { Suspense } from "react";
import { PhonebookPage } from "./_components/phonebook-page";

function PhonebookPageWrapper() {
  return <PhonebookPage />;
}

export default function AgendaTelefonicaPage() {
  return (
    <Suspense fallback={<div className="p-6">Se încarcă...</div>}>
      <PhonebookPageWrapper />
    </Suspense>
  );
}

