"use client";

import { useState } from "react";
import { TimesheetHeader } from "./timesheet-header";
import { TimesheetStats } from "./timesheet-stats";
import { TimesheetFilters } from "./timesheet-filters";
import { TimesheetTable } from "./timesheet-table";
import { TimesheetCalendar } from "./timesheet-calendar";
import { AddTimeModal } from "./add-time-modal";

type ViewMode = "table" | "calendar";

export function TimesheetPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");

  return (
    <div className="space-y-6">
      <TimesheetHeader
        onAddClick={() => setShowAddModal(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <TimesheetStats period={selectedPeriod} />

      <TimesheetFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedActivity={selectedActivity}
        onActivityChange={setSelectedActivity}
        selectedProject=""
        onProjectChange={() => {}}
      />

      {viewMode === "table" ? (
        <TimesheetTable
          searchQuery={searchQuery}
          selectedActivity={selectedActivity}
          period={selectedPeriod}
        />
      ) : (
        <TimesheetCalendar
          searchQuery={searchQuery}
          selectedActivity={selectedActivity}
          period={selectedPeriod}
        />
      )}

      <AddTimeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={(data) => {
          // TODO: Implementare salvare în backend
          console.log("Salvare pontaj:", data);
          setShowAddModal(false);
        }}
      />
    </div>
  );
}

