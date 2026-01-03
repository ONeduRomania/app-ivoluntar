"use client";

import { useOrganization } from "@/contexts/organization-context";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";

interface TimesheetCalendarProps {
  searchQuery: string;
  selectedActivity: string;
  period: string;
}

interface CalendarEntry {
  id: string;
  date: string;
  hours: number;
  minutes: number;
  activity: string;
  status: "approved" | "pending" | "rejected";
}

const filterByPeriod = (entries: CalendarEntry[], period: string) => {
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

export function TimesheetCalendar({
  searchQuery,
  selectedActivity,
  period,
}: TimesheetCalendarProps) {
  const { getCurrentOrganizationData } = useOrganization();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weekDays = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthNames = [
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie",
  ];

  const filteredEntries = useMemo(() => {
    const orgData = getCurrentOrganizationData();
    const mockEntries = (orgData.timesheetEntries || []) as CalendarEntry[];
    
    return filterByPeriod(mockEntries, period).filter((entry) => {
      const matchesSearch =
        !searchQuery ||
        entry.activity.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesActivity = !selectedActivity || entry.activity === selectedActivity;
      return matchesSearch && matchesActivity;
    });
  }, [searchQuery, selectedActivity, period, getCurrentOrganizationData]);

  const getEntriesForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return filteredEntries.filter((entry) => {
      const entryDate = new Date(entry.date).toISOString().split("T")[0];
      return entryDate === dateStr;
    });
  };

  const getTotalHoursForDay = (day: number) => {
    const entries = getEntriesForDay(day);
    const totalMinutes = entries.reduce(
      (sum, entry) => sum + entry.hours * 60 + entry.minutes,
      0,
    );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-dark dark:text-white">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={goToPreviousMonth}
            className="rounded-lg border border-stroke bg-white px-3 py-1.5 text-sm font-medium text-dark transition-colors hover:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:bg-dark-3"
          >
            ←
          </button>
          <button
            onClick={goToNextMonth}
            className="rounded-lg border border-stroke bg-white px-3 py-1.5 text-sm font-medium text-dark transition-colors hover:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:bg-dark-3"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-semibold text-dark-4 dark:text-dark-6"
          >
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "min-h-[60px] rounded-lg border border-stroke p-2 dark:border-dark-3",
              day
                ? "bg-white dark:bg-dark-2"
                : "bg-transparent border-transparent",
            )}
          >
            {day && (
              <>
                <div className="mb-1 text-sm font-medium text-dark dark:text-white">
                  {day}
                </div>
                {(() => {
                  const entries = getEntriesForDay(day);
                  const total = getTotalHoursForDay(day);
                  if (entries.length > 0) {
                    return (
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-primary dark:text-primary">
                          {total.hours > 0 && `${total.hours}h`}
                          {total.minutes > 0 && ` ${total.minutes}m`}
                        </div>
                        {entries.slice(0, 2).map((entry) => (
                          <div
                            key={entry.id}
                            className="truncate text-xs text-dark-4 dark:text-dark-6"
                            title={entry.activity}
                          >
                            {entry.activity}
                          </div>
                        ))}
                        {entries.length > 2 && (
                          <div className="text-xs text-primary dark:text-primary">
                            +{entries.length - 2} mai multe
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })()}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

