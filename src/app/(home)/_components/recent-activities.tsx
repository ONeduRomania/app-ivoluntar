"use client";

import { useOrganization } from "@/contexts/organization-context";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  activity: string;
  hours: number;
  minutes: number;
  date: string;
  status: "approved" | "pending" | "rejected";
}

const statusConfig = {
  approved: {
    label: "Aprobat",
    className: "bg-green/10 text-green dark:bg-green/20 dark:text-green-light",
  },
  pending: {
    label: "În așteptare",
    className:
      "bg-[#F59460]/10 text-[#F59460] dark:bg-[#F59460]/20 dark:text-[#F59460]",
  },
  rejected: {
    label: "Refuzat",
    className: "bg-red/10 text-red dark:bg-red/20 dark:text-red",
  },
};

export function RecentActivities() {
  const { getCurrentOrganizationData } = useOrganization();
  const orgData = getCurrentOrganizationData();
  
  // Obține ultimele 5 activități din pontaj, sortate după dată (cele mai recente primele)
  const recentActivities = [...orgData.timesheetEntries]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
    .map((entry) => ({
      id: entry.id,
      activity: entry.activity,
      hours: entry.hours,
      minutes: entry.minutes,
      date: entry.date,
      status: entry.status,
    }));

  return (
    <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark">
      <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
        Activități recente
      </h2>

      <div className="space-y-3">
        {recentActivities.map((activity) => {
          const status = statusConfig[activity.status];
          return (
            <div
              key={activity.id}
              className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-dark dark:text-white">
                  {activity.activity}
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs text-dark-4 dark:text-dark-6">
                  <span>
                    {activity.hours}h {activity.minutes}m
                  </span>
                  <span>•</span>
                  <span>{new Date(activity.date).toLocaleDateString("ro-RO")}</span>
                </div>
              </div>
              <div
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  status.className,
                )}
              >
                {status.label}
              </div>
            </div>
          );
        })}
      </div>

      {recentActivities.length === 0 && (
        <p className="py-4 text-center text-sm text-dark-4 dark:text-dark-6">
          Nu există activități recente
        </p>
      )}
    </div>
  );
}

