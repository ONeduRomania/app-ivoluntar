"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ResourcesHeader } from "./resources-header";
import { WikiBanner } from "./wiki-banner";
import { ResourcesList, ResourceCategory } from "./resources-list";
import { Article } from "./article-card";
import { createSlug } from "@/lib/slug";

// Mock data - în producție vine din backend
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Ghid complet pentru organizarea evenimentelor",
    excerpt:
      "Învață pașii esențiali pentru planificarea și organizarea unui eveniment de succes, de la bugetare până la evaluare.",
    category: "organizare",
    author: "Echipa iVoluntar",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Cum să gestionezi documentele contabile",
    excerpt:
      "Ghid practic pentru gestionarea corectă a documentelor contabile în organizațiile non-profit.",
    category: "contabilitate",
    author: "Echipa iVoluntar",
    date: "2024-01-12",
  },
  {
    id: "3",
    title: "Proceduri de secretariat pentru ONG-uri",
    excerpt:
      "Toate informațiile necesare despre procedurile de secretariat, întocmirea actelor și gestionarea arhivei.",
    category: "secretariat",
    author: "Echipa iVoluntar",
    date: "2024-01-10",
  },
  {
    id: "4",
    title: "Ghid pentru radierea unei asociații",
    excerpt:
      "Pașii legali necesari pentru radierea corectă a unei asociații, documentele necesare și procedurile de urmat.",
    category: "radiere",
    author: "Echipa iVoluntar",
    date: "2024-01-08",
  },
  {
    id: "5",
    title: "Managementul proiectelor în organizații non-profit",
    excerpt:
      "Tehnici și instrumente pentru managementul eficient al proiectelor în contextul organizațiilor non-profit.",
    category: "organizare",
    author: "Echipa iVoluntar",
    date: "2024-01-05",
  },
  {
    id: "6",
    title: "Rapoarte financiare pentru ONG-uri",
    excerpt:
      "Cum să întocmești și să prezinti rapoarte financiare conforme pentru organizațiile non-profit.",
    category: "contabilitate",
    author: "Echipa iVoluntar",
    date: "2024-01-03",
  },
  {
    id: "7",
    title: "Gestionarea arhivei documentelor",
    excerpt:
      "Sisteme și proceduri pentru organizarea și gestionarea eficientă a arhivei documentelor.",
    category: "secretariat",
    author: "Echipa iVoluntar",
    date: "2024-01-01",
  },
  {
    id: "8",
    title: "Proceduri legale pentru asociații",
    excerpt:
      "Ghid despre procedurile legale importante pentru asociații, de la înființare la modificări statutare.",
    category: "organizare",
    author: "Echipa iVoluntar",
    date: "2023-12-28",
  },
];

export function ResourcesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [initialCategory, setInitialCategory] = useState<ResourceCategory>("all");

  // Verifică dacă există o categorie în URL (din submeniu)
  useEffect(() => {
    const category = searchParams.get("categorie");
    if (category) {
      const validCategories: ResourceCategory[] = [
        "all",
        "organizare",
        "contabilitate",
        "secretariat",
        "radiere",
      ];
      if (validCategories.includes(category as ResourceCategory)) {
        setInitialCategory(category as ResourceCategory);
      }
    }
  }, [searchParams]);

  const handleArticleClick = (article: Article) => {
    const slug = article.slug || createSlug(article.title);
    router.push(`/resurse/${slug}`);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <ResourcesHeader />
      <WikiBanner />
      <ResourcesList
        articles={mockArticles}
        onArticleClick={handleArticleClick}
        initialCategory={initialCategory}
      />
    </div>
  );
}

