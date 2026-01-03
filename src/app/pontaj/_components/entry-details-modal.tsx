"use client";

import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { XIcon } from "./timesheet-icons";

interface EntryDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: {
    date: string;
    hours: number;
    minutes: number;
    activity: string;
    description?: string;
    status: "approved" | "pending" | "rejected";
  };
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

export function EntryDetailsModal({
  isOpen,
  onClose,
  entry,
}: EntryDetailsModalProps) {
  if (!isOpen) return null;

  const status = statusConfig[entry.status];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            Detalii pontaj
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-dark-4 transition-colors hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-1 text-sm font-medium text-dark-4 dark:text-dark-6">
              Data
            </p>
            <p className="text-base font-medium text-dark dark:text-white">
              {formatDate(entry.date)}
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-dark-4 dark:text-dark-6">
              Ore
            </p>
            <p className="text-base font-medium text-dark dark:text-white">
              {entry.hours}h {entry.minutes > 0 && `${entry.minutes}m`}
            </p>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-dark-4 dark:text-dark-6">
              Activitate
            </p>
            <p className="text-base font-medium text-dark dark:text-white">
              {entry.activity}
            </p>
          </div>

          {entry.description && (
            <div>
              <p className="mb-1 text-sm font-medium text-dark-4 dark:text-dark-6">
                Descriere
              </p>
              <p className="text-sm text-dark dark:text-white">
                {entry.description}
              </p>
            </div>
          )}

          <div>
            <p className="mb-1 text-sm font-medium text-dark-4 dark:text-dark-6">
              Status
            </p>
            <div
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                status.className,
              )}
            >
              {status.label}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Închide
          </button>
        </div>
      </div>
    </div>
  );

  return typeof window !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

