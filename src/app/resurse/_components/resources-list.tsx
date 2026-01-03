"use client";

import { useState, useEffect } from "react";
import { ArticleCard, Article } from "./article-card";

export type ResourceCategory = "all" | "organizare" | "contabilitate" | "secretariat" | "radiere";

interface ResourcesListProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  initialCategory?: ResourceCategory;
}

export function ResourcesList({
  articles,
  onArticleClick,
  initialCategory = "all",
}: ResourcesListProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ResourceCategory>(initialCategory);

  // Actualizează categoria când se schimbă initialCategory
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories: { value: ResourceCategory; label: string }[] = [
    { value: "all", label: "Toate" },
    { value: "organizare", label: "Organizare" },
    { value: "contabilitate", label: "Contabilitate" },
    { value: "secretariat", label: "Secretariat" },
    { value: "radiere", label: "Radiere" },
  ];

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <div>
      {/* Filtre categorii */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`
              rounded-lg border px-4 py-2 text-sm font-medium transition-colors
              ${
                selectedCategory === category.value
                  ? "border-primary bg-primary text-white"
                  : "border-stroke bg-white text-dark hover:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:bg-dark-3"
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Lista de articole */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => onArticleClick?.(article)}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-dark-4 dark:text-dark-6">
            Nu există articole în această categorie.
          </div>
        )}
      </div>
    </div>
  );
}

