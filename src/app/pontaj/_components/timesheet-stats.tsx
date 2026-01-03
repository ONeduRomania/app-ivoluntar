"use client";

import { useOrganization } from "@/contexts/organization-context";
import { ClockIcon, CheckIcon } from "./timesheet-icons";

interface TimesheetStatsProps {
  period: string;
}

interface TimesheetEntry {
  id: string;
  date: string;
  hours: number;
  minutes: number;
  activity: string;
  description?: string;
  status: "approved" | "pending" | "rejected";
}

const filterByPeriod = (entries: TimesheetEntry[], period: string) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  switch (period) {
    case "current-month":
      return entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getMonth() === currentMonth &&
          entryDate.getFullYear() === currentYear
        );
      });
    case "last-month":
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getMonth() === lastMonth &&
          entryDate.getFullYear() === lastMonthYear
        );
      });
    case "current-year":
      return entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate.getFullYear() === currentYear;
      });
    case "all":
    default:
      return entries;
  }
};

// TODO: Înlocuiește cu date reale din backend
const getStats = (period: string, entries: TimesheetEntry[]) => {
  const filteredEntries = filterByPeriod(entries, period);

  const totalHours = filteredEntries.reduce((total, entry) => {
    return total + entry.hours + entry.minutes / 60;
  }, 0);

  const approvedHours = filteredEntries
    .filter((entry) => entry.status === "approved")
    .reduce((total, entry) => {
      return total + entry.hours + entry.minutes / 60;
    }, 0);

  const pendingCount = filteredEntries.filter(
    (entry) => entry.status === "pending"
  ).length;

  return {
    totalHours: Math.round(totalHours * 10) / 10,
    approvedHours: Math.round(approvedHours * 10) / 10,
    pendingCount,
  };
};

export function TimesheetStats({ period }: TimesheetStatsProps) {
  const { getCurrentOrganizationData } = useOrganization();
  const orgData = getCurrentOrganizationData();
  const mockEntries = orgData.timesheetEntries || [];
  const stats = getStats(period, mockEntries);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-dark-4 dark:text-dark-6">
              Total Ore
            </p>
            <p className="text-2xl font-bold text-dark dark:text-white">
              {stats.totalHours}h
            </p>
          </div>
          <div className="flex size-12 items-center justify-center rounded-lg bg-green/10">
            <ClockIcon className="text-green" />
          </div>
        </div>
      </div>

      <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-dark-4 dark:text-dark-6">
              Ore Aprobate
            </p>
            <p className="text-2xl font-bold text-dark dark:text-white">
              {stats.approvedHours}h
            </p>
          </div>
          <div className="flex size-12 items-center justify-center rounded-lg bg-green/10">
            <CheckIcon className="text-green" />
          </div>
        </div>
      </div>

      <div className="rounded-[10px] bg-white p-4 shadow-1 shadow-1 dark:bg-gray-dark">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-dark-4 dark:text-dark-6">
              În Așteptare
            </p>
            <p className="text-2xl font-bold text-dark dark:text-white">
              {stats.pendingCount}
            </p>
          </div>
          <div className="flex size-12 items-center justify-center rounded-lg bg-[#F59460]/10">
            <ClockIcon className="text-[#F59460]" />
          </div>
        </div>
      </div>
    </div>
  );
}

