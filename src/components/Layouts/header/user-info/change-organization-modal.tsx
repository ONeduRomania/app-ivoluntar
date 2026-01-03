"use client";

import { createPortal } from "react-dom";
import { Organization, useOrganization } from "@/contexts/organization-context";
import { OrganizationIcon } from "./icons";

interface ChangeOrganizationModalProps {
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

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M16.667 5L7.5 14.167 3.333 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChangeOrganizationModal({
  isOpen,
  onClose,
}: ChangeOrganizationModalProps) {
  const { currentOrganization, organizations, setCurrentOrganization } =
    useOrganization();

  const handleSelectOrganization = (organization: Organization) => {
    if (organization.id === currentOrganization.id) {
      // Dacă e deja selectată, doar închide modalul
      onClose();
      return;
    }

    setCurrentOrganization(organization);
    // Aici se vor actualiza toate datele legate de organizație
    // În producție, aici se va face un request către backend
    onClose();
    
    // Nu mai reîmprospătăm pagina - React va actualiza automat componentele
    // care folosesc useOrganization()
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-dark dark:text-white">
            Selectează organizația
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-dark-4 transition-colors hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <div className="space-y-2">
          {organizations.map((org) => (
            <button
              key={org.id}
              onClick={() => handleSelectOrganization(org)}
              className="flex w-full items-center gap-3 rounded-lg border border-stroke bg-gray-2 p-4 text-left transition-colors hover:bg-gray-3 dark:border-dark-3 dark:bg-dark-2 dark:hover:bg-dark-3"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <OrganizationIcon className="size-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-dark dark:text-white">
                  {org.name}
                </p>
              </div>
              {currentOrganization.id === org.id && (
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <CheckIcon className="size-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return typeof window !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

