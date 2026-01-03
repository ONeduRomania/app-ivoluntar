"use client";

import { useState } from "react";
import { ContactCategory } from "./phonebook-page";
import { SearchIcon } from "./phonebook-icons";
import { useOrganization } from "@/contexts/organization-context";
import { Dropdown, DropdownContent, DropdownTrigger } from "@/components/ui/dropdown";

interface PhonebookFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ContactCategory;
  onCategoryChange: (category: ContactCategory) => void;
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhonebookFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: PhonebookFiltersProps) {
  const { getCurrentOrganizationData } = useOrganization();
  const orgData = getCurrentOrganizationData();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Obține categorii din contactele existente
  const allContacts = orgData.contacte || [];
  const availableCategories = new Set<string>();
  allContacts.forEach((contact) => {
    if (contact.category) {
      availableCategories.add(contact.category);
    }
  });

  // Obține categorii din organizație sau folosește categorii default
  const orgCategories = orgData.contactCategories && orgData.contactCategories.length > 0
    ? orgData.contactCategories
    : ["Voluntari", "Organizație", "Parteneri"];

  // Filtrează categoriile să apară doar cele care au contacte
  const categoriesWithContacts = orgCategories.filter((cat) => 
    cat === "Toate" || availableCategories.has(cat)
  );

  // Adaugă "Toate" la început dacă nu există
  const allCategories = categoriesWithContacts.includes("Toate") 
    ? categoriesWithContacts 
    : ["Toate", ...categoriesWithContacts];

  const getCategoryLabel = (category: string) => {
    if (category === "all") return "Toate";
    return category;
  };

  const getCategoryValue = (label: string) => {
    if (label === "Toate") return "all";
    return label;
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {/* Bara de căutare */}
      <div className="relative flex-1">
        <SearchIcon className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-dark-4 dark:text-dark-6" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Caută după nume, email sau telefon..."
          className="w-full rounded-lg border border-stroke bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
        />
      </div>
      
      {/* Dropdown pentru categorii */}
      <Dropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen}>
        <DropdownTrigger
          className="flex items-center gap-2 rounded-lg border border-stroke bg-white px-4 py-2.5 text-sm font-medium text-dark transition-colors hover:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:bg-dark-3"
        >
          <span>{getCategoryLabel(selectedCategory)}</span>
          <ChevronDownIcon className="size-4" />
        </DropdownTrigger>
        <DropdownContent align="end" className="min-w-[180px]">
          <div className="p-1">
            {allCategories.map((category) => {
              const value = getCategoryValue(category);
              return (
                <button
                  key={value}
                  onClick={() => {
                    onCategoryChange(value);
                    setIsDropdownOpen(false);
                  }}
                  className={`
                    w-full rounded-lg px-3 py-2 text-left text-sm transition-colors
                    ${
                      selectedCategory === value
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-dark-3"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

