"use client";

import { createPortal } from "react-dom";
import { Evaluation } from "./evaluations-list";

interface EvaluationDetailModalProps {
  evaluare: Evaluation;
  isOpen: boolean;
  onClose: () => void;
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 5L5 15M5 5l10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EvaluationDetailModal({
  evaluare,
  isOpen,
  onClose,
}: EvaluationDetailModalProps) {
  if (!isOpen) return null;

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

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              Detalii evaluare
            </h2>
            <p className="mt-1 text-sm text-dark-4 dark:text-dark-6">
              {evaluare.categorie}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-dark-4 transition-colors hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Informații generale */}
          <div className="rounded-lg border border-stroke bg-gray-1 p-4 dark:border-dark-3 dark:bg-dark-2">
            <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">
              Informații generale
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <span className="text-sm font-medium text-dark-4 dark:text-dark-6">
                  Data evaluării:
                </span>
                <p className="text-dark dark:text-white">{formatDate(evaluare.data)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-dark-4 dark:text-dark-6">
                  Status:
                </span>
                <p>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(evaluare.status)}`}
                  >
                    {getStatusLabel(evaluare.status)}
                  </span>
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-dark-4 dark:text-dark-6">
                  Superior direct:
                </span>
                <p className="text-dark dark:text-white">{evaluare.superiorDirect}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-dark-4 dark:text-dark-6">
                  Manager HR:
                </span>
                <p className="text-dark dark:text-white">{evaluare.managerHR}</p>
              </div>
              {evaluare.notaGenerala !== undefined && (
                <div>
                  <span className="text-sm font-medium text-dark-4 dark:text-dark-6">
                    Notă generală:
                  </span>
                  <p className="text-2xl font-bold text-primary">
                    {evaluare.notaGenerala}/10
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Criterii de evaluare */}
          {evaluare.criterii && evaluare.criterii.length > 0 && (
            <div className="rounded-lg border border-stroke bg-gray-1 p-4 dark:border-dark-3 dark:bg-dark-2">
              <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">
                Criterii de evaluare
              </h3>
              <div className="space-y-4">
                {evaluare.criterii.map((criteriu, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-stroke bg-white p-4 dark:border-dark-3 dark:bg-dark-2"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-dark dark:text-white">
                        {criteriu.nume}
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {criteriu.nota}/10
                      </span>
                    </div>
                    {criteriu.comentarii && (
                      <p className="text-sm text-dark-4 dark:text-dark-6">
                        {criteriu.comentarii}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comentarii generale */}
          {evaluare.comentariiGenerale && (
            <div className="rounded-lg border border-stroke bg-gray-1 p-4 dark:border-dark-3 dark:bg-dark-2">
              <h3 className="mb-3 text-lg font-semibold text-dark dark:text-white">
                Comentarii generale
              </h3>
              <p className="text-dark dark:text-white whitespace-pre-line">
                {evaluare.comentariiGenerale}
              </p>
            </div>
          )}

          {/* Puncte forte */}
          {evaluare.puncteForte && evaluare.puncteForte.length > 0 && (
            <div className="rounded-lg border border-stroke bg-green-light-7 p-4 dark:border-dark-3 dark:bg-green-light-7/20">
              <h3 className="mb-3 text-lg font-semibold text-green-dark dark:text-green-light-1">
                Puncte forte
              </h3>
              <ul className="space-y-2">
                {evaluare.puncteForte.map((punct, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-dark dark:text-green-light-1">✓</span>
                    <span className="text-dark dark:text-white">{punct}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Puncte de îmbunătățire */}
          {evaluare.puncteDeImbunatatire &&
            evaluare.puncteDeImbunatatire.length > 0 && (
              <div className="rounded-lg border border-stroke bg-yellow-light-4 p-4 dark:border-dark-3 dark:bg-yellow-light-4/20">
                <h3 className="mb-3 text-lg font-semibold text-yellow-dark-2 dark:text-yellow-light-DEFAULT">
                  Puncte de îmbunătățire
                </h3>
                <ul className="space-y-2">
                  {evaluare.puncteDeImbunatatire.map((punct, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-dark-2 dark:text-yellow-light-DEFAULT">
                        →
                      </span>
                      <span className="text-dark dark:text-white">{punct}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Recomandări */}
          {evaluare.recomandari && evaluare.recomandari.length > 0 && (
            <div className="rounded-lg border border-stroke bg-primary/5 p-4 dark:border-dark-3 dark:bg-primary/10">
              <h3 className="mb-3 text-lg font-semibold text-primary">
                Recomandări
              </h3>
              <ul className="space-y-2">
                {evaluare.recomandari.map((recomandare, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-dark dark:text-white">{recomandare}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
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

