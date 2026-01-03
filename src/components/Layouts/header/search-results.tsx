"use client";

import { useSearch } from "@/contexts/search-context";
import { useRouter } from "next/navigation";
import { Contact } from "@/app/agenda-telefonica/_components/phonebook-page";
import { PhoneIcon, MailIcon } from "@/app/agenda-telefonica/_components/phonebook-icons";
import { useEffect, useMemo } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useOrganization } from "@/contexts/organization-context";

// TODO: Înlocuiește cu date reale din backend
const mockContacts: Contact[] = [
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
    isPublic: false,
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
    isPublic: false,
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
    isPublic: false,
  },
];

// TODO: Înlocuiește cu verificare reală din backend/auth
const isManager = true;

const filterContacts = (contacts: Contact[], query: string) => {
  if (!query.trim()) return [];

  const searchQuery = query.toLowerCase();
  let filtered = contacts;

  // Filtrare după acces
  if (!isManager) {
    filtered = filtered.filter((contact) => contact.isPublic);
  }

  // Filtrare după căutare
  filtered = filtered.filter(
    (contact) =>
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery) ||
      contact.organization.toLowerCase().includes(searchQuery) ||
      contact.function?.toLowerCase().includes(searchQuery) ||
      contact.department?.toLowerCase().includes(searchQuery) ||
      (contact.emails && contact.emails.length > 0 && contact.emails.some((email) => email.toLowerCase().includes(searchQuery))) ||
      contact.mobilePhone?.includes(query) ||
      contact.workPhone?.includes(query) ||
      contact.landlinePhone?.includes(query),
  );

  return filtered.slice(0, 5); // Maxim 5 rezultate
};

interface SearchResultsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchResults({ isOpen, onClose }: SearchResultsProps) {
  const { searchQuery } = useSearch();
  const router = useRouter();
  const { getCurrentOrganizationData } = useOrganization();
  const orgData = getCurrentOrganizationData();

  const resultsRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) {
      onClose();
    }
  });

  // Folosim doar contactele organizației curente
  const orgContacts = useMemo(() => {
    return (orgData.contacte || []).map((contact) => ({
      ...contact,
      // Asigurăm că emails este întotdeauna un array
      emails: contact.emails || [],
      category: (contact.function ? "organizatie" : "voluntari") as "voluntari" | "organizatie" | "parteneri",
    }));
  }, [orgData.contacte]);

  const results = filterContacts(orgContacts, searchQuery);

  const getFullName = (contact: Contact) => {
    return `${contact.firstName} ${contact.lastName}`;
  };

  const getInitials = (contact: Contact) => {
    return `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase();
  };

  const handleContactClick = (contact: Contact) => {
    router.push(`/agenda-telefonica?contact=${contact.id}`);
    onClose();
  };

  if (!isOpen || !searchQuery.trim() || results.length === 0) {
    return null;
  }

  return (
    <div
      ref={resultsRef}
      className="absolute left-0 right-0 top-full z-[9999] mt-2 max-h-[400px] overflow-y-auto rounded-lg border border-stroke bg-white shadow-2 dark:border-dark-3 dark:bg-gray-dark"
    >
      <div className="p-2">
        <div className="mb-2 px-3 py-2 text-xs font-semibold text-dark-4 dark:text-dark-6">
          Rezultate ({results.length})
        </div>
        <div className="space-y-1">
          {results.map((contact) => (
            <button
              key={contact.id}
              onClick={() => handleContactClick(contact)}
              className="w-full rounded-lg p-3 text-left transition-colors hover:bg-gray-2 dark:hover:bg-dark-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-sm font-semibold">
                    {getInitials(contact)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-dark dark:text-white">
                      {getFullName(contact)}
                    </p>
                    {contact.function && (
                      <span className="text-xs text-dark-4 dark:text-dark-6">
                        • {contact.function}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-primary">
                    {contact.organization}
                  </p>
                  {contact.department && (
                    <p className="mt-0.5 text-xs text-dark-4 dark:text-dark-6">
                      {contact.department}
                    </p>
                  )}
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-dark-4 dark:text-dark-6">
                    {contact.emails && contact.emails.length > 0 && (
                      <div className="flex items-center gap-1">
                        <MailIcon className="size-3" />
                        <span className="truncate max-w-[150px]">
                          {contact.emails[0]}
                        </span>
                      </div>
                    )}
                    {contact.mobilePhone && (
                      <div className="flex items-center gap-1">
                        <PhoneIcon className="size-3" />
                        <span>{contact.mobilePhone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

