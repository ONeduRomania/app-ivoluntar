"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useOrganization } from "@/contexts/organization-context";
import { PhonebookHeader } from "./phonebook-header";
import { PhonebookFilters } from "./phonebook-filters";
import { ContactList } from "./contact-list";
import { ContactProfilePanel } from "./contact-profile-panel";

export type ContactCategory = string; // "all" sau orice categorie definită de manager

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  category?: string; // Categorie dinamică
  organization: string;
  function?: string;
  department?: string;
  emails: string[];
  mobilePhone?: string;
  workPhone?: string;
  landlinePhone?: string;
  address?: string;
  notes?: string;
  avatar?: string;
  // Control acces - dacă e false, doar managerii pot vedea
  isPublic: boolean;
}

// TODO: Înlocuiește cu verificare reală din backend/auth
const isManager = true; // Pentru testare - în producție vine din context/auth

export function PhonebookPage() {
  const { currentOrganization } = useOrganization();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ContactCategory>("all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Verifică dacă există un contact în URL (din rezultatele de căutare)
  useEffect(() => {
    const contactId = searchParams.get("contact");
    if (contactId) {
      // TODO: Încarcă contactul din backend
      // Pentru moment, contactul va fi selectat când se navighează la pagină
      // Resetăm parametrul din URL
      const url = new URL(window.location.href);
      url.searchParams.delete("contact");
      window.history.replaceState({}, "", url);
    }
  }, [searchParams]);

  // Reset contactul selectat și pagina când se schimbă organizația
  useEffect(() => {
    setSelectedContact(null);
    setCurrentPage(1);
  }, [currentOrganization.id]);

  // Reset la prima pagină când se schimbă căutarea
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleCategoryChange = (category: ContactCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset la prima pagină când schimbi categoria
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset la prima pagină când cauți
  };

  return (
    <div className="space-y-6">
      <PhonebookHeader />
      <PhonebookFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className="flex gap-6">
        <div className={`${selectedContact ? "w-full lg:w-1/2" : "w-full"}`}>
          <ContactList
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedContactId={selectedContact?.id}
            onContactClick={handleContactClick}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            isManager={isManager}
          />
        </div>
        {selectedContact && (
          <div className="hidden w-full lg:block lg:w-1/2">
            <ContactProfilePanel
              contact={selectedContact}
              onClose={() => setSelectedContact(null)}
            />
          </div>
        )}
      </div>
      {selectedContact && (
        <div className="lg:hidden">
          <ContactProfilePanel
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
          />
        </div>
      )}
    </div>
  );
}

