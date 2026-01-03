"use client";

import { useState } from "react";
import { NewsCard, NewsItem } from "./news-card";

interface NewsListProps {
  news: NewsItem[];
  onNewsClick?: (news: NewsItem) => void;
}

export function NewsList({ news, onNewsClick }: NewsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(news.map((n) => n.category)))];

  const filteredNews =
    selectedCategory === "all"
      ? news
      : news.filter((n) => n.category === selectedCategory);

  return (
    <div>
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
            {category === "all" ? "Toate" : category}
          </button>
        ))}
      </div>

      {/* Lista de știri */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <NewsCard
              key={item.id}
              news={item}
              onClick={() => onNewsClick?.(item)}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-dark-4 dark:text-dark-6">
            Nu există știri în această categorie.
          </div>
        )}
      </div>
    </div>
  );
}

