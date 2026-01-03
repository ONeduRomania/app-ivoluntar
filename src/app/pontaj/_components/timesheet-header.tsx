"use client";

import { Button } from "@/components/ui-elements/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, ListIcon, PlusIcon } from "./timesheet-icons";

interface TimesheetHeaderProps {
  onAddClick: () => void;
  viewMode: "table" | "calendar";
  onViewModeChange: (mode: "table" | "calendar") => void;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

const PERIODS = [
  { value: "current-month", label: "Luna curentă" },
  { value: "last-month", label: "Luna trecută" },
  { value: "current-year", label: "Anul curent" },
  { value: "all", label: "Toate" },
];

export function TimesheetHeader({
  onAddClick,
  viewMode,
  onViewModeChange,
  selectedPeriod,
  onPeriodChange,
}: TimesheetHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-dark dark:text-white">
          Pontaj
        </h1>
        <p className="mt-1 text-base text-dark-4 dark:text-dark-6">
          Gestionează orele de voluntariat
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-stroke bg-white p-1 dark:border-dark-3 dark:bg-dark-2">
          <button
            onClick={() => onViewModeChange("table")}
            className={cn(
              "flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium transition-colors",
              viewMode === "table"
                ? "bg-primary text-white"
                : "text-dark-4 hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-3",
            )}
          >
            <ListIcon className="size-4" />
            Tabel
          </button>
          <button
            onClick={() => onViewModeChange("calendar")}
            className={cn(
              "flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium transition-colors",
              viewMode === "calendar"
                ? "bg-primary text-white"
                : "text-dark-4 hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-3",
            )}
          >
            <CalendarIcon className="size-4" />
            Calendar
          </button>
        </div>

        <select
          value={selectedPeriod}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-sm font-medium text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        >
          {PERIODS.map((period) => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>

        <button
          onClick={onAddClick}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-dark focus:outline-none"
        >
          <PlusIcon className="size-4" />
          Adaugă Ore
        </button>
      </div>
    </div>
  );
}

