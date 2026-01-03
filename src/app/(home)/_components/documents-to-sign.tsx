"use client";

import { useOrganization } from "@/contexts/organization-context";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  type: string;
  deadline?: string;
  priority: "high" | "medium" | "low";
}

const priorityConfig = {
  high: {
    label: "Prioritate ridicată",
    className: "bg-red/10 text-red dark:bg-red/20 dark:text-red",
  },
  medium: {
    label: "Prioritate medie",
    className:
      "bg-[#F59460]/10 text-[#F59460] dark:bg-[#F59460]/20 dark:text-[#F59460]",
  },
  low: {
    label: "Prioritate scăzută",
    className: "bg-gray-4 text-dark-4 dark:bg-dark-4 dark:text-dark-6",
  },
};

export function DocumentsToSign() {
  const { getCurrentOrganizationData } = useOrganization();
  const orgData = getCurrentOrganizationData();
  const mockDocuments = orgData.documenteDeSemnat || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ro-RO", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark">
      <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
        Documente de semnat
      </h2>

      <div className="space-y-3">
        {mockDocuments.map((doc) => {
          const priority = priorityConfig[doc.priority];
          return (
            <div
              key={doc.id}
              className="flex items-start justify-between rounded-lg border border-stroke p-3 dark:border-dark-3"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-dark dark:text-white">
                  {doc.title}
                </p>
                <div className="mt-1 flex items-center gap-3 text-xs text-dark-4 dark:text-dark-6">
                  <span>{doc.type}</span>
                  {doc.deadline && (
                    <>
                      <span>•</span>
                      <span>Termen: {formatDate(doc.deadline)}</span>
                    </>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  "ml-3 rounded-full px-3 py-1 text-xs font-medium",
                  priority.className,
                )}
              >
                {priority.label}
              </div>
            </div>
          );
        })}
      </div>

      {mockDocuments.length === 0 && (
        <p className="py-4 text-center text-sm text-dark-4 dark:text-dark-6">
          Nu există documente de semnat
        </p>
      )}
    </div>
  );
}

