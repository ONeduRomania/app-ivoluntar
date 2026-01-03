"use client";

import { SearchIcon } from "./timesheet-icons";

interface TimesheetFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedActivity: string;
  onActivityChange: (activity: string) => void;
  selectedProject: string;
  onProjectChange: (project: string) => void;
}

// TODO: Înlocuiește cu date reale din backend
const ACTIVITIES = [
  "Activități administrative",
  "Suport pentru evenimente",
  "Comunicare și marketing",
  "Fundraising",
  "Proiecte sociale",
  "Training și dezvoltare",
];

export function TimesheetFilters({
  searchQuery,
  onSearchChange,
  selectedActivity,
  onActivityChange,
}: TimesheetFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-dark-4 dark:text-dark-6" />
        <input
          type="text"
          placeholder="Caută după activitate..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-12 pr-4 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        />
      </div>

      <select
        value={selectedActivity}
        onChange={(e) => onActivityChange(e.target.value)}
        className="rounded-lg border border-stroke bg-white px-4 py-2.5 text-sm font-medium text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
      >
        <option value="">Toate activitățile</option>
        {ACTIVITIES.map((activity) => (
          <option key={activity} value={activity}>
            {activity}
          </option>
        ))}
      </select>
    </div>
  );
}

