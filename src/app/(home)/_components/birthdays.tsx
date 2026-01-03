"use client";

import { useOrganization } from "@/contexts/organization-context";
import { cn } from "@/lib/utils";

interface Birthday {
  id: string;
  name: string;
  date: string; // Format: YYYY-MM-DD
  daysUntil: number;
}

export function Birthdays() {
  const { getCurrentOrganizationData } = useOrganization();
  const orgData = getCurrentOrganizationData();
  const mockBirthdays = orgData.zileDeNastere || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      day: "numeric",
      month: "long",
    });
  };

  return (
    <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark">
      <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
        Zile de naștere
      </h2>

      <div className="space-y-3">
        {mockBirthdays.map((birthday) => (
          <div
            key={birthday.id}
            className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-dark dark:text-white">
                {birthday.name}
              </p>
              <p className="mt-1 text-xs text-dark-4 dark:text-dark-6">
                {formatDate(birthday.date)}
              </p>
            </div>
            <div
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                birthday.daysUntil <= 7
                  ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
                  : "bg-gray-2 text-dark-4 dark:bg-dark-2 dark:text-dark-6",
              )}
            >
              {birthday.daysUntil === 0
                ? "Astăzi"
                : birthday.daysUntil === 1
                  ? "Mâine"
                  : `În ${birthday.daysUntil} zile`}
            </div>
          </div>
        ))}
      </div>

      {mockBirthdays.length === 0 && (
        <p className="py-4 text-center text-sm text-dark-4 dark:text-dark-6">
          Nu există zile de naștere în această perioadă
        </p>
      )}
    </div>
  );
}

