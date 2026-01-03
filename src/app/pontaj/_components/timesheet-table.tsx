"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useOrganization } from "@/contexts/organization-context";
import { CheckIcon, ClockIcon } from "./timesheet-icons";
import { EntryActionsDropdown } from "./entry-actions-dropdown";
import { EntryDetailsModal } from "./entry-details-modal";
import { EditTimeModal } from "./edit-time-modal";

interface TimesheetEntry {
  id: string;
  date: string;
  hours: number;
  minutes: number;
  activity: string;
  description?: string;
  status: "approved" | "pending" | "rejected";
}

const statusConfig = {
  approved: {
    label: "Aprobat",
    className: "bg-green/10 text-green dark:bg-green/20 dark:text-green-light",
    icon: CheckIcon,
  },
  pending: {
    label: "În așteptare",
    className:
      "bg-[#F59460]/10 text-[#F59460] dark:bg-[#F59460]/20 dark:text-[#F59460]",
    icon: ClockIcon,
  },
  rejected: {
    label: "Refuzat",
    className: "bg-red/10 text-red dark:bg-red/20 dark:text-red",
    icon: ClockIcon,
  },
};

interface TimesheetTableProps {
  searchQuery: string;
  selectedActivity: string;
  period: string;
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

export function TimesheetTable({
  searchQuery,
  selectedActivity,
  period,
}: TimesheetTableProps) {
  const { getCurrentOrganizationData } = useOrganization();
  const orgData = getCurrentOrganizationData();
  const mockEntries = (orgData.timesheetEntries || []) as TimesheetEntry[];
  
  const [selectedEntry, setSelectedEntry] = useState<TimesheetEntry | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);

  // TODO: Implementare filtrare reală
  const filteredEntries = filterByPeriod(mockEntries, period).filter((entry) => {
    const matchesSearch =
      !searchQuery ||
      entry.activity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesActivity = !selectedActivity || entry.activity === selectedActivity;
    return matchesSearch && matchesActivity;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-gray-2 dark:bg-dark-2 [&>th]:py-4 [&>th]:text-sm [&>th]:font-semibold [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead className="min-w-[120px]">Data</TableHead>
              <TableHead className="min-w-[80px]">Ore</TableHead>
              <TableHead className="min-w-[200px]">Activitate</TableHead>
              <TableHead className="min-w-[140px]">Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredEntries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-dark-4 dark:text-dark-6">
                  Nu există înregistrări de pontaj
                </TableCell>
              </TableRow>
            ) : (
              filteredEntries.map((entry) => {
                const status = statusConfig[entry.status];
                const StatusIcon = status.icon;
                return (
                  <TableRow
                    key={entry.id}
                    className="border-stroke dark:border-dark-3"
                  >
                    <TableCell className="text-sm text-dark dark:text-white">
                      {formatDate(entry.date)}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-dark dark:text-white">
                      {entry.hours}h{entry.minutes > 0 && ` ${entry.minutes}m`}
                    </TableCell>
                    <TableCell className="text-sm text-dark-4 dark:text-dark-6">
                      {entry.activity}
                    </TableCell>
                    <TableCell>
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                          status.className,
                        )}
                      >
                        <StatusIcon className="size-3.5" />
                        {status.label}
                      </div>
                    </TableCell>
                    <TableCell>
                      <EntryActionsDropdown
                        entry={entry}
                        onView={() => {
                          setSelectedEntry(entry);
                          setShowDetailsModal(true);
                        }}
                        onEdit={() => {
                          setEditingEntry(entry);
                          setShowEditModal(true);
                        }}
                        onDelete={() => {
                          // TODO: Implementare ștergere
                          console.log("Ștergere:", entry.id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {selectedEntry && (
        <EntryDetailsModal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedEntry(null);
          }}
          entry={selectedEntry}
        />
      )}

      {editingEntry && (
        <EditTimeModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingEntry(null);
          }}
          entry={editingEntry}
          onSave={(data) => {
            // TODO: Implementare actualizare în backend
            console.log("Actualizare pontaj:", data);
            setShowEditModal(false);
            setEditingEntry(null);
          }}
        />
      )}
    </div>
  );
}

