"use client";

import { useMemo } from "react";
import { useOrganization } from "@/contexts/organization-context";
import { Contact, ContactCategory } from "./phonebook-page";
import { PhoneIcon, MailIcon } from "./phonebook-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "./phonebook-icons";

// Contacte generale de la iVoluntar (disponibile pentru toate organizațiile)
const iVoluntarContacts: Contact[] = [
  {
    id: "1",
    firstName: "Maria",
    lastName: "Popescu",
    category: "voluntari",
    organization: "iVoluntar",
    function: "Voluntar",
    emails: ["maria.popescu@example.com"],
    mobilePhone: "+40 712 345 678",
    landlinePhone: "+40 21 123 4567",
    address: "București, Sector 1, Str. Exemplu nr. 10",
    notes: "Disponibil în weekend",
    isPublic: true,
  },
  {
    id: "2",
    firstName: "Ion",
    lastName: "Ionescu",
    category: "voluntari",
    organization: "iVoluntar",
    function: "Coordonator proiecte",
    emails: ["ion.ionescu@example.com", "ion.ionescu.work@example.com"],
    mobilePhone: "+40 723 456 789",
    address: "Cluj-Napoca, Str. Principală nr. 5",
    isPublic: true,
  },
  {
    id: "3",
    firstName: "Ana",
    lastName: "Georgescu",
    category: "voluntari",
    organization: "iVoluntar",
    function: "Voluntar",
    emails: ["ana.georgescu@example.com"],
    mobilePhone: "+40 734 567 890",
    landlinePhone: "+40 21 234 5678",
    isPublic: false, // Doar pentru manageri
  },
  {
    id: "4",
    firstName: "Ion",
    lastName: "Popescu",
    category: "organizatie",
    organization: "iVoluntar",
    function: "Director",
    department: "Management",
    emails: ["director@ivoluntar.org", "ion.popescu@ivoluntar.org"],
    mobilePhone: "+40 711 111 111",
    workPhone: "+40 21 111 1111",
    landlinePhone: "+40 21 111 1112",
    address: "București, Str. Exemplu nr. 1",
    isPublic: true,
  },
  {
    id: "5",
    firstName: "Elena",
    lastName: "Marinescu",
    category: "organizatie",
    organization: "iVoluntar",
    function: "Manager HR",
    department: "Resurse Umane",
    emails: ["hr@ivoluntar.org", "elena.marinescu@ivoluntar.org"],
    mobilePhone: "+40 722 222 222",
    workPhone: "+40 21 222 2222",
    address: "București, Str. HR nr. 2",
    isPublic: true,
  },
  {
    id: "6",
    firstName: "Mihai",
    lastName: "Constantinescu",
    category: "organizatie",
    organization: "iVoluntar",
    function: "Contabil",
    department: "Contabilitate",
    emails: ["contabilitate@ivoluntar.org"],
    workPhone: "+40 21 333 3333",
    address: "București, Str. Contabilitate nr. 3",
    isPublic: false, // Doar pentru manageri
  },
  {
    id: "7",
    firstName: "Asociația",
    lastName: "Parteneră X",
    category: "parteneri",
    organization: "Asociația Parteneră X",
    function: "Reprezentant",
    emails: ["contact@partenerx.ro", "info@partenerx.ro"],
    mobilePhone: "+40 744 444 444",
    workPhone: "+40 21 444 4444",
    address: "București, Str. Parteneri nr. 4",
    isPublic: true,
  },
  {
    id: "8",
    firstName: "Fundația",
    lastName: "Y",
    category: "parteneri",
    organization: "Fundația Y",
    function: "Director",
    emails: ["info@fundatiay.ro"],
    workPhone: "+40 21 555 5555",
    address: "București, Str. Fundații nr. 5",
    isPublic: true,
  },
  {
    id: "9",
    firstName: "Alexandru",
    lastName: "Dumitrescu",
    category: "voluntari",
    organization: "iVoluntar",
    function: "Voluntar",
    emails: ["alexandru.dumitrescu@example.com"],
    mobilePhone: "+40 745 678 901",
    isPublic: true,
  },
  {
    id: "10",
    firstName: "Andreea",
    lastName: "Stoica",
    category: "voluntari",
    organization: "iVoluntar",
    function: "Voluntar",
    emails: ["andreea.stoica@example.com"],
    mobilePhone: "+40 756 789 012",
    address: "Timișoara, Str. Voluntarilor nr. 6",
    isPublic: true,
  },
  {
    id: "11",
    firstName: "Cristian",
    lastName: "Radu",
    category: "organizatie",
    organization: "iVoluntar",
    function: "Manager Proiecte",
    department: "Proiecte",
    emails: ["proiecte@ivoluntar.org"],
    mobilePhone: "+40 767 890 123",
    workPhone: "+40 21 666 6666",
    isPublic: true,
  },
  {
    id: "12",
    firstName: "Laura",
    lastName: "Nicolae",
    category: "voluntari",
    organization: "iVoluntar",
    function: "Voluntar",
    emails: ["laura.nicolae@example.com"],
    mobilePhone: "+40 778 901 234",
    isPublic: false, // Doar pentru manageri
  },
];

const filterContacts = (
  contacts: Contact[],
  searchQuery: string,
  category: ContactCategory,
  isManager: boolean,
) => {
  let filtered = contacts;

  // Filtrare după acces - voluntarii văd doar contactele publice
  if (!isManager) {
    filtered = filtered.filter((contact) => contact.isPublic);
  }

  // Filtrare după categorie
  if (category !== "all" && category) {
    filtered = filtered.filter((contact) => contact.category === category);
  }

  // Filtrare după căutare
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (contact) =>
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(query) ||
        contact.organization.toLowerCase().includes(query) ||
        contact.function?.toLowerCase().includes(query) ||
        contact.department?.toLowerCase().includes(query) ||
        (contact.emails && contact.emails.length > 0 && contact.emails.some((email) => email.toLowerCase().includes(query))) ||
        contact.mobilePhone?.includes(query) ||
        contact.workPhone?.includes(query) ||
        contact.landlinePhone?.includes(query),
    );
  }

  return filtered;
};

interface ContactListProps {
  searchQuery: string;
  selectedCategory: ContactCategory;
  selectedContactId?: string;
  onContactClick: (contact: Contact) => void;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  isManager: boolean;
}

export function ContactList({
  searchQuery,
  selectedCategory,
  selectedContactId,
  onContactClick,
  currentPage,
  itemsPerPage,
  onPageChange,
  isManager,
}: ContactListProps) {
  const { getCurrentOrganizationData, currentOrganization } = useOrganization();
  const orgData = getCurrentOrganizationData();
  
  // Folosim doar contactele organizației curente
  // Folosim useMemo pentru a re-calcula când se schimbă organizația
  const allContacts = useMemo(() => {
    const orgContacts = (orgData.contacte || []).map((contact) => ({
      ...contact,
      // Asigurăm că emails este întotdeauna un array
      emails: contact.emails || [],
      // Folosim categoria din contact dacă există, altfel generăm una default
      category: contact.category || (contact.function ? "Organizație" : "Voluntari"),
    }));
    
    return orgContacts;
  }, [orgData.contacte, currentOrganization.id]);
  
  const filteredContacts = filterContacts(
    allContacts,
    searchQuery,
    selectedCategory,
    isManager,
  );

  // Calculare paginare
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

  const getFullName = (contact: Contact) => {
    return `${contact.firstName} ${contact.lastName}`;
  };

  const getInitials = (contact: Contact) => {
    return `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase();
  };

  return (
    <div className="rounded-lg border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      {filteredContacts.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-dark-4 dark:text-dark-6">
            Nu s-au găsit contacte care să corespundă criteriilor.
          </p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-stroke dark:divide-dark-3">
            {paginatedContacts.map((contact) => {
              const isSelected = selectedContactId === contact.id;
              const fullName = getFullName(contact);
              return (
                <div
                  key={contact.id}
                  onClick={() => onContactClick(contact)}
                  className={`
                    cursor-pointer p-4 transition-colors
                    ${
                      isSelected
                        ? "bg-primary/5 border-l-4 border-l-primary"
                        : "hover:bg-gray-2 dark:hover:bg-dark-2"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        flex size-12 shrink-0 items-center justify-center rounded-full
                        ${
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-gray-2 text-dark-4 dark:bg-dark-2 dark:text-dark-6"
                        }
                      `}
                    >
                      <span className="text-lg font-semibold">
                        {getInitials(contact)}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`
                            font-semibold truncate
                            ${
                              isSelected
                                ? "text-primary"
                                : "text-dark dark:text-white"
                            }
                          `}
                        >
                          {fullName}
                        </h3>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        {contact.function && (
                          <span className="text-xs text-dark-4 dark:text-dark-6">
                            {contact.function}
                          </span>
                        )}
                        {contact.organization && (
                          <>
                            {contact.function && (
                              <span className="text-xs text-dark-4 dark:text-dark-6">
                                •
                              </span>
                            )}
                            <span className="text-xs font-medium text-primary">
                              {contact.organization}
                            </span>
                          </>
                        )}
                        {contact.department && (
                          <>
                            <span className="text-xs text-dark-4 dark:text-dark-6">
                              •
                            </span>
                            <span className="text-xs text-dark-4 dark:text-dark-6">
                              {contact.department}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-dark-4 dark:text-dark-6">
                        {contact.emails && contact.emails.length > 0 && (
                          <div className="flex items-center gap-1">
                            <MailIcon className="size-3" />
                            <span className="truncate max-w-[200px]">
                              {contact.emails[0]}
                              {contact.emails.length > 1 && ` +${contact.emails.length - 1}`}
                            </span>
                          </div>
                        )}
                        {contact.mobilePhone && (
                          <div className="flex items-center gap-1">
                            <PhoneIcon className="size-3" />
                            <span>{contact.mobilePhone}</span>
                          </div>
                        )}
                        {contact.workPhone && (
                          <div className="flex items-center gap-1">
                            <PhoneIcon className="size-3" />
                            <span>{contact.workPhone}</span>
                          </div>
                        )}
                        {contact.landlinePhone && !contact.workPhone && (
                          <div className="flex items-center gap-1">
                            <PhoneIcon className="size-3" />
                            <span>{contact.landlinePhone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paginare */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-stroke px-4 py-3 dark:border-dark-3">
              <div className="text-sm text-dark-4 dark:text-dark-6">
                Afișare {startIndex + 1}-{Math.min(endIndex, filteredContacts.length)} din{" "}
                {filteredContacts.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`
                    rounded-lg p-2 transition-colors
                    ${
                      currentPage === 1
                        ? "cursor-not-allowed text-dark-4 dark:text-dark-6"
                        : "text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-dark-2"
                    }
                  `}
                >
                  <ChevronLeftIcon className="size-4" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => {
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`
                              rounded-lg px-3 py-1 text-sm font-medium transition-colors
                              ${
                                page === currentPage
                                  ? "bg-primary text-white"
                                  : "text-dark-4 hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
                              }
                            `}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span
                            key={page}
                            className="px-1 text-dark-4 dark:text-dark-6"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    },
                  )}
                </div>
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`
                    rounded-lg p-2 transition-colors
                    ${
                      currentPage === totalPages
                        ? "cursor-not-allowed text-dark-4 dark:text-dark-6"
                        : "text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-dark-2"
                    }
                  `}
                >
                  <ChevronRightIcon className="size-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
