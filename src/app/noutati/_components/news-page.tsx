"use client";

import { useOrganization } from "@/contexts/organization-context";
import { useState, useMemo } from "react";
import { NewsHeader } from "./news-header";
import { NewsList } from "./news-list";
import { NewsItem } from "./news-card";
import { NewsDetailModal } from "./news-detail-modal";

// Noutăți generale de la iVoluntar (disponibile pentru toate organizațiile)
const iVoluntarNews: NewsItem[] = [
  {
    id: "1",
    title: "Workshop despre Managementul Proiectelor",
    content:
      "Vă invităm la un workshop interactiv despre managementul proiectelor, unde veți învăța tehnici practice și veți putea aplica cunoștințele în proiectele noastre.",
    author: "Maria Popescu",
    date: "2024-01-15",
    category: "Evenimente",
    isImportant: true,
  },
  {
    id: "2",
    title: "Nou program de voluntariat în comunitate",
    content:
      "Lansăm un nou program de voluntariat care vizează sprijinirea comunităților locale prin activități educaționale și sociale.",
    author: "Ion Ionescu",
    date: "2024-01-12",
    category: "Programe",
  },
  {
    id: "3",
    title: "Actualizare platformă iVoluntar",
    content:
      "Am lansat noi funcționalități în platformă pentru a vă facilita activitatea de voluntariat și comunicarea cu echipa.",
    author: "iVoluntar",
    date: "2024-01-10",
    category: "Anunțuri",
    isImportant: true,
  },
  {
    id: "4",
    title: "Reuniunea echipei - Ianuarie 2024",
    content:
      "Vă așteptăm la reuniunea lunară a echipei, unde vom discuta despre proiectele în curs și planurile pentru luna următoare.",
    author: "Ana Georgescu",
    date: "2024-01-08",
    category: "Evenimente",
  },
  {
    id: "5",
    title: "Rezultatele campaniei de donații",
    content:
      "Mulțumim tuturor pentru sprijinul acordat! Am strâns peste 50.000 RON în cadrul campaniei de donații pentru educație.",
    author: "Echipa Fundraising",
    date: "2024-01-05",
    category: "Rezultate",
  },
  {
    id: "6",
    title: "Oportunitate de formare: Comunicare eficientă",
    content:
      "Înscrieri deschise pentru cursul de comunicare eficientă, destinat tuturor voluntarilor care doresc să-și îmbunătățească abilitățile de comunicare.",
    author: "Laura Dumitrescu",
    date: "2024-01-03",
    category: "Formare",
  },
];

export function NewsPage() {
  const { getCurrentOrganizationData, currentOrganization } = useOrganization();
  const orgData = getCurrentOrganizationData();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Combină noutățile de la iVoluntar cu cele specifice organizației
  const allNews = useMemo(() => {
    const orgNews = (orgData.noutati || []).map((news) => ({
      id: `org-${currentOrganization.id}-${news.id}`, // Prefixează ID-ul pentru a evita duplicatele
      title: news.title,
      content: news.excerpt,
      author: news.author,
      date: news.date,
      category: news.category,
      isImportant: false,
    }));

    return [...iVoluntarNews, ...orgNews].sort((a, b) => {
      // Sortează după dată (cele mai recente primele)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [orgData.noutati, currentOrganization.id]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <NewsHeader />
      <NewsList
        news={allNews}
        onNewsClick={(news) => setSelectedNews(news)}
      />
      {selectedNews && (
        <NewsDetailModal
          news={selectedNews}
          isOpen={!!selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </div>
  );
}

