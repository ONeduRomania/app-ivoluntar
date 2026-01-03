"use client";

import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MoreIcon, EditIcon, TrashIcon, EyeIcon } from "./timesheet-icons";

interface EntryActionsDropdownProps {
  entry: {
    id: string;
    status: "approved" | "pending" | "rejected";
    description?: string;
  };
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function EntryActionsDropdown({
  entry,
  onView,
  onEdit,
  onDelete,
}: EntryActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const canEditOrDelete = entry.status === "pending" || entry.status === "rejected";

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="rounded-lg p-1.5 text-dark-4 transition-colors hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2">
        <MoreIcon className="size-5" />
        <span className="sr-only">Mai multe opțiuni</span>
      </DropdownTrigger>

      <DropdownContent
        align="end"
        className="min-w-[180px] rounded-lg border border-stroke bg-white p-1.5 shadow-1 dark:border-dark-3 dark:bg-gray-dark"
      >
        <button
          onClick={() => {
            onView();
            setIsOpen(false);
          }}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-dark transition-colors hover:bg-gray-2 hover:text-dark dark:text-white dark:hover:bg-dark-2"
        >
          <EyeIcon className="size-4" />
          Vezi detalii
        </button>

        {canEditOrDelete && (
          <>
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-dark transition-colors hover:bg-gray-2 hover:text-dark dark:text-white dark:hover:bg-dark-2"
            >
              <EditIcon className="size-4" />
              Editează
            </button>

            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red transition-colors hover:bg-red/10 dark:text-red dark:hover:bg-red/20"
            >
              <TrashIcon className="size-4" />
              Șterge
            </button>
          </>
        )}
      </DropdownContent>
    </Dropdown>
  );
}

