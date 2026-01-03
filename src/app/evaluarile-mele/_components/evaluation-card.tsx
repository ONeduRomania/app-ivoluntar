"use client";

import { Evaluation } from "./evaluations-list";
import { cn } from "@/lib/utils";

interface EvaluationCardProps {
  evaluare: Evaluation;
  onViewDetails: () => void;
}

export function EvaluationCard({ evaluare, onViewDetails }: EvaluationCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "finalizata":
        return "bg-green-light-DEFAULT text-green-dark";
      case "in_progres":
        return "bg-yellow-light-DEFAULT text-yellow-dark-2";
      case "draft":
        return "bg-gray-3 text-dark-4";
      default:
        return "bg-gray-3 text-dark-4";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "finalizata":
        return "Finalizată";
      case "in_progres":
        return "În progres";
      case "draft":
        return "Ciornă";
      default:
        return status;
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-3">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                getStatusColor(evaluare.status),
              )}
            >
              {getStatusLabel(evaluare.status)}
            </span>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {evaluare.categorie}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold text-dark dark:text-white">
              {evaluare.categorie}
            </h3>
            <div className="space-y-1 text-sm text-dark-4 dark:text-dark-6">
              <div className="flex items-center gap-2">
                <span className="font-medium">Superior direct:</span>
                <span>{evaluare.superiorDirect}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Manager HR:</span>
                <span>{evaluare.managerHR}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Data:</span>
                <span>{formatDate(evaluare.data)}</span>
              </div>
              {evaluare.notaGenerala !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Notă generală:</span>
                  <span className="text-lg font-bold text-primary">
                    {evaluare.notaGenerala}/10
                  </span>
                </div>
              )}
            </div>
          </div>

          {evaluare.comentariiGenerale && (
            <div className="mb-4 rounded-lg border border-stroke bg-gray-1 p-4 dark:border-dark-3 dark:bg-dark-2">
              <p className="line-clamp-2 text-sm text-dark dark:text-white">
                {evaluare.comentariiGenerale}
              </p>
            </div>
          )}

          <button
            onClick={onViewDetails}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Vezi detalii
          </button>
        </div>
      </div>
    </div>
  );
}

