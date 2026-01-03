"use client";

import { useState } from "react";
import { CommunityCard, Community } from "./community-card";

type FilterType = "all" | "my-communities";

interface CommunitiesListProps {
  communities: Community[];
  onCommunityClick?: (community: Community) => void;
}

export function CommunitiesList({
  communities,
  onCommunityClick,
}: CommunitiesListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "all",
    ...Array.from(new Set(communities.map((c) => c.category))),
  ];

  const filteredCommunities = communities.filter((community) => {
    const matchesCategory =
      selectedCategory === "all" || community.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "my-communities" && community.isMember === true);
    return matchesCategory && matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Căutare */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Caută comunități..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
        />
      </div>

      {/* Filtre principale */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedFilter("all")}
          className={`
            rounded-lg border px-4 py-2 text-sm font-medium transition-colors
            ${
              selectedFilter === "all"
                ? "border-primary bg-primary text-white"
                : "border-stroke bg-white text-dark hover:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:bg-dark-3"
            }
          `}
        >
          Toate comunitățile
        </button>
        <button
          onClick={() => setSelectedFilter("my-communities")}
          className={`
            rounded-lg border px-4 py-2 text-sm font-medium transition-colors
            ${
              selectedFilter === "my-communities"
                ? "border-primary bg-primary text-white"
                : "border-stroke bg-white text-dark hover:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:bg-dark-3"
            }
          `}
        >
          Comunitățile mele
        </button>
      </div>

      {/* Filtre categorii */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              rounded-lg border px-4 py-2 text-sm font-medium transition-colors
              ${
                selectedCategory === category
                  ? "border-primary bg-primary text-white"
                  : "border-stroke bg-white text-dark hover:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:bg-dark-3"
              }
            `}
          >
            {category === "all" ? "Toate categoriile" : category}
          </button>
        ))}
      </div>

      {/* Lista de comunități */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCommunities.length > 0 ? (
          filteredCommunities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
              onClick={() => onCommunityClick?.(community)}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-dark-4 dark:text-dark-6">
            Nu există comunități care să corespundă criteriilor de căutare.
          </div>
        )}
      </div>
    </div>
  );
}

