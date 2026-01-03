"use client";

import { createPortal } from "react-dom";
import { OrgNode } from "@/app/organigrama/_components/organization-chart-page";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { useOrganization } from "@/contexts/organization-context";

interface MyPositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    firstName: string;
    lastName: string;
    position: string;
    department?: string;
  };
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

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 8h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Funcție helper pentru a converti datele din context în format OrgNode
const getOrgContext = (
  currentUser: { firstName: string; lastName: string; position: string; department?: string },
  orgData: { organigrama?: { superior?: { name: string; position: string }; colleagues?: Array<{ name: string; position: string }>; subordinates?: Array<{ name: string; position: string }> } },
): {
  superior?: OrgNode;
  current: OrgNode;
  colleagues: OrgNode[];
  subordinates: OrgNode[];
} => {
  const orgChart = orgData.organigrama || {};
  
  // Superior
  const superior: OrgNode | undefined = orgChart.superior
    ? {
        id: "superior-1",
        firstName: orgChart.superior.name.split(" ")[0] || "",
        lastName: orgChart.superior.name.split(" ").slice(1).join(" ") || "",
        position: orgChart.superior.position,
        department: currentUser.department,
      }
    : undefined;

  // Current user
  const current: OrgNode = {
    id: "current-1",
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    position: currentUser.position,
    department: currentUser.department,
  };

  // Colleagues
  const colleagues: OrgNode[] = (orgChart.colleagues || []).map((colleague, index) => ({
    id: `colleague-${index + 1}`,
    firstName: colleague.name.split(" ")[0] || "",
    lastName: colleague.name.split(" ").slice(1).join(" ") || "",
    position: colleague.position,
    department: currentUser.department,
  }));

  // Subordinates
  const subordinates: OrgNode[] = (orgChart.subordinates || []).map((subordinate, index) => ({
    id: `subordinate-${index + 1}`,
    firstName: subordinate.name.split(" ")[0] || "",
    lastName: subordinate.name.split(" ").slice(1).join(" ") || "",
    position: subordinate.position,
    department: currentUser.department,
  }));

  return {
    superior,
    current,
    colleagues,
    subordinates,
  };
}

function OrgCard({
  node,
  isCurrent = false,
  cardRef,
}: {
  node: OrgNode;
  isCurrent?: boolean;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const getInitials = () => {
    return `${node.firstName[0]}${node.lastName[0]}`.toUpperCase();
  };

  const getFullName = () => {
    return `${node.firstName} ${node.lastName}`;
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-lg border p-3 shadow-1 transition-all hover:shadow-2 dark:bg-gray-dark",
        isCurrent
          ? "border-primary bg-primary/5 dark:border-primary"
          : "border-stroke bg-white dark:border-dark-3",
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={cn(
            "mb-2 flex size-12 items-center justify-center rounded-full",
            isCurrent
              ? "bg-primary text-white"
              : "bg-primary/10 text-primary",
          )}
        >
          <span className="text-lg font-semibold">{getInitials()}</span>
        </div>
        <h3
          className={cn(
            "text-sm font-semibold",
            isCurrent
              ? "text-primary"
              : "text-dark dark:text-white",
          )}
        >
          {getFullName()}
        </h3>
        <p className="mt-0.5 text-xs font-medium text-primary">
          {node.position}
        </p>
        {node.department && (
          <p className="mt-0.5 text-xs text-dark-4 dark:text-dark-6">
            {node.department}
          </p>
        )}
      </div>
    </div>
  );
}

export function MyPositionModal({
  isOpen,
  onClose,
  currentUser,
}: MyPositionModalProps) {
  const { getCurrentOrganizationData } = useOrganization();
  const orgData = getCurrentOrganizationData();
  
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const superiorRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const subordinatesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const orgContext = getOrgContext(
    {
      ...currentUser,
      position: orgData.functie,
      department: orgData.departament,
    },
    orgData,
  );

  // Inițializare refs pentru subordonați
  useEffect(() => {
    subordinatesRefs.current = subordinatesRefs.current.slice(
      0,
      orgContext.subordinates.length,
    );
  }, [orgContext.subordinates.length]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            Poziția mea în organizație
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-dark-4 transition-colors hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <div className="relative flex gap-4">
          {/* Butoane zoom */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="flex size-10 items-center justify-center rounded-lg border border-stroke bg-white text-dark-4 transition-colors hover:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6 dark:hover:bg-dark-3"
              aria-label="Zoom in"
            >
              <PlusIcon className="size-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="flex size-10 items-center justify-center rounded-lg border border-stroke bg-white text-dark-4 transition-colors hover:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6 dark:hover:bg-dark-3"
              aria-label="Zoom out"
            >
              <MinusIcon className="size-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="mt-2 rounded-lg border border-stroke bg-white px-3 py-1.5 text-xs font-medium text-dark-4 transition-colors hover:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6 dark:hover:bg-dark-3"
            >
              Reset
            </button>
          </div>

          {/* Container cu organigrama */}
          <div
            ref={containerRef}
            className="relative flex-1 overflow-auto rounded-lg border border-stroke bg-gray-2 p-8 dark:border-dark-3 dark:bg-dark-2"
            style={{ maxHeight: "70vh" }}
          >
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top center",
                transition: "transform 0.2s",
                minWidth: "100%",
              }}
            >
              <div className="relative flex min-h-[500px] flex-col items-center justify-center">
                {/* Superior direct */}
                {orgContext.superior && (
                  <div className="flex flex-col items-center">
                    <div ref={superiorRef}>
                      <OrgCard node={orgContext.superior} />
                    </div>
                    {/* Linie verticală de la superior la nivelul curent */}
                    <div className="my-4 h-8 w-0.5 bg-stroke dark:bg-dark-3" />
                  </div>
                )}

                {/* Nivelul curent cu colegii */}
                <div className="relative flex flex-wrap justify-center gap-4">
                  {/* Linie orizontală deasupra nivelului curent (dacă există superior) */}
                  {orgContext.superior &&
                    (orgContext.colleagues.length > 0 || orgContext.subordinates.length > 0) && (
                      <div
                        className="absolute -top-8 h-0.5 bg-stroke dark:bg-dark-3"
                        style={{
                          left: "10%",
                          right: "10%",
                        }}
                      />
                    )}

                  {orgContext.colleagues.map((colleague, index) => (
                    <div
                      key={colleague.id}
                      className="relative flex flex-col items-center"
                    >
                      {/* Linie verticală de la linia orizontală la nod (dacă există superior) */}
                      {orgContext.superior && (
                        <div className="absolute -top-8 h-8 w-0.5 bg-stroke dark:bg-dark-3" />
                      )}
                      <OrgCard node={colleague} />
                    </div>
                  ))}
                  
                  {/* Utilizatorul curent cu subordonații săi */}
                  <div className="relative flex flex-col items-center">
                    {/* Linie verticală de la linia orizontală la nod (dacă există superior) */}
                    {orgContext.superior && (
                      <div className="absolute -top-8 h-8 w-0.5 bg-stroke dark:bg-dark-3" />
                    )}
                    <OrgCard
                      node={orgContext.current}
                      isCurrent={true}
                      cardRef={currentRef}
                    />
                    
                    {/* Linie verticală de la utilizatorul curent la subordonați */}
                    {orgContext.subordinates.length > 0 && (
                      <div className="my-4 h-8 w-0.5 bg-stroke dark:bg-dark-3" />
                    )}

                    {/* Subordonați - poziționați direct sub utilizatorul curent */}
                    {orgContext.subordinates.length > 0 && (
                      <div className="relative flex flex-wrap justify-center gap-4">
                        {/* Linie orizontală deasupra subordonaților */}
                        {orgContext.subordinates.length > 1 && (
                          <div
                            className="absolute -top-8 h-0.5 bg-stroke dark:bg-dark-3"
                            style={{
                              left: `${100 / (orgContext.subordinates.length * 2)}%`,
                              right: `${100 / (orgContext.subordinates.length * 2)}%`,
                            }}
                          />
                        )}

                        {orgContext.subordinates.map((subordinate, index) => (
                          <div
                            key={subordinate.id}
                            className="relative flex flex-col items-center"
                            ref={(el) => {
                              subordinatesRefs.current[index] = el;
                            }}
                          >
                            {/* Linie verticală de la linia orizontală la nod */}
                            <div className="absolute -top-8 h-8 w-0.5 bg-stroke dark:bg-dark-3" />
                            <OrgCard node={subordinate} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
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
