"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface InfoSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export function InfoSection({
  title,
  children,
  className,
  actionButton,
}: InfoSectionProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-gray-dark",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-dark dark:text-white">
          {title}
        </h3>
        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="text-sm font-medium text-primary hover:underline"
          >
            {actionButton.label}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string | ReactNode;
  className?: string;
}

export function InfoRow({ label, value, className }: InfoRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-b border-stroke py-3 last:border-0 dark:border-dark-3 sm:flex-row sm:items-center",
        className,
      )}
    >
      <span className="min-w-[140px] text-sm font-medium text-dark-4 dark:text-dark-6">
        {label}
      </span>
      <span className="flex-1 text-sm text-dark dark:text-white">{value}</span>
    </div>
  );
}

