"use client";

import { Contact } from "./phonebook-page";
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  UserIcon,
  BuildingIcon,
} from "./phonebook-icons";

interface ContactProfilePanelProps {
  contact: Contact;
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

export function ContactProfilePanel({
  contact,
  onClose,
}: ContactProfilePanelProps) {
  const categoryLabels = {
    voluntari: "Voluntar",
    organizatie: "Organizație",
    parteneri: "Partener",
  };

  const getFullName = () => {
    return `${contact.firstName} ${contact.lastName}`;
  };

  const getInitials = () => {
    return `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase();
  };

  return (
    <div className="sticky top-6 h-fit rounded-lg border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stroke p-4 dark:border-dark-3">
        <h2 className="text-lg font-bold text-dark dark:text-white">
          Profil contact
        </h2>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-dark-4 transition-colors hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
          aria-label="Închide profil"
        >
          <XIcon className="size-5" />
        </button>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Header cu nume și categorie */}
          <div className="flex items-start gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="text-2xl font-semibold">{getInitials()}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-dark dark:text-white">
                {getFullName()}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {contact.category && categoryLabels[contact.category as keyof typeof categoryLabels] 
                    ? categoryLabels[contact.category as keyof typeof categoryLabels]
                    : contact.category || "Contact"}
                </span>
                {contact.function && (
                  <span className="text-sm text-dark-4 dark:text-dark-6">
                    {contact.function}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Organizație și departament */}
          <div className="rounded-lg border border-stroke bg-gray-2 p-4 dark:border-dark-3 dark:bg-dark-2">
            <div className="flex items-center gap-2 text-sm font-medium text-dark-4 dark:text-dark-6">
              <BuildingIcon className="size-4" />
              <span>Organizație</span>
            </div>
            <p className="mt-1 text-base font-semibold text-dark dark:text-white">
              {contact.organization}
            </p>
            {contact.department && (
              <p className="mt-1 text-sm text-dark-4 dark:text-dark-6">
                Departament: {contact.department}
              </p>
            )}
            {contact.function && (
              <p className="mt-1 text-sm text-dark-4 dark:text-dark-6">
                Funcție: {contact.function}
              </p>
            )}
          </div>

          {/* Date de contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-dark dark:text-white">
              Date de contact
            </h4>

            {contact.emails && contact.emails.length > 0 && (
              <div className="space-y-2">
                {contact.emails.map((email, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gray-2 dark:bg-dark-2">
                      <MailIcon className="size-5 text-dark-4 dark:text-dark-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-dark-4 dark:text-dark-6">
                        Email {contact.emails && contact.emails.length > 1 ? `${index + 1}` : ""}
                      </p>
                      <a
                        href={`mailto:${email}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {contact.mobilePhone && (
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-gray-2 dark:bg-dark-2">
                  <PhoneIcon className="size-5 text-dark-4 dark:text-dark-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    Telefon mobil
                  </p>
                  <a
                    href={`tel:${contact.mobilePhone.replace(/\s/g, "")}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {contact.mobilePhone}
                  </a>
                </div>
              </div>
            )}

            {contact.workPhone && (
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-gray-2 dark:bg-dark-2">
                  <PhoneIcon className="size-5 text-dark-4 dark:text-dark-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    Telefon de serviciu
                  </p>
                  <a
                    href={`tel:${contact.workPhone.replace(/\s/g, "")}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {contact.workPhone}
                  </a>
                </div>
              </div>
            )}

            {contact.landlinePhone && (
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-gray-2 dark:bg-dark-2">
                  <PhoneIcon className="size-5 text-dark-4 dark:text-dark-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    Telefon fix
                  </p>
                  <a
                    href={`tel:${contact.landlinePhone.replace(/\s/g, "")}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {contact.landlinePhone}
                  </a>
                </div>
              </div>
            )}

            {contact.address && (
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-gray-2 dark:bg-dark-2">
                  <MapPinIcon className="size-5 text-dark-4 dark:text-dark-6" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    Adresă
                  </p>
                  <p className="text-sm font-medium text-dark dark:text-white">
                    {contact.address}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Note */}
          {contact.notes && (
            <div className="rounded-lg border border-stroke bg-gray-2 p-4 dark:border-dark-3 dark:bg-dark-2">
              <h4 className="mb-2 text-sm font-semibold text-dark dark:text-white">
                Note
              </h4>
              <p className="text-sm text-dark-4 dark:text-dark-6">
                {contact.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

