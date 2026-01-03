"use client";

import { useState, useMemo } from "react";
import { EvaluationCard } from "./evaluation-card";
import { EvaluationDetailModal } from "./evaluation-detail-modal";

export interface Evaluation {
  id: string;
  data: string;
  superiorDirect: string;
  managerHR: string;
  categorie: string;
  notaGenerala?: number;
  comentariiGenerale?: string;
  criterii?: Array<{
    nume: string;
    nota: number;
    comentarii?: string;
  }>;
  puncteForte?: string[];
  puncteDeImbunatatire?: string[];
  recomandari?: string[];
  status: "finalizata" | "in_progres" | "draft";
}

interface EvaluationsListProps {
  evaluari: Evaluation[];
}

export function EvaluationsList({ evaluari }: EvaluationsListProps) {
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extrage categoriile unice
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(evaluari.map((e) => e.categorie)));
    return ["all", ...uniqueCategories];
  }, [evaluari]);

  // Filtrează evaluările după categorie
  const filteredEvaluari = useMemo(() => {
    const filtered =
      selectedCategory === "all"
        ? evaluari
        : evaluari.filter((e) => e.categorie === selectedCategory);

    // Sortează după dată (cele mai recente primele)
    return [...filtered].sort((a, b) => {
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    });
  }, [evaluari, selectedCategory]);

  if (evaluari.length === 0) {
    return (
      <div className="rounded-[10px] bg-white p-12 text-center shadow-1 dark:bg-gray-dark">
        <p className="text-dark-4 dark:text-dark-6">
          Nu există evaluări disponibile.
        </p>
      </div>
    );
  }

  return (
    <>
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

      {/* Grid cu evaluări */}
      {filteredEvaluari.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvaluari.map((evaluare) => (
            <EvaluationCard
              key={evaluare.id}
              evaluare={evaluare}
              onViewDetails={() => setSelectedEvaluation(evaluare)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[10px] bg-white p-12 text-center shadow-1 dark:bg-gray-dark">
          <p className="text-dark-4 dark:text-dark-6">
            Nu există evaluări în această categorie.
          </p>
        </div>
      )}

      {selectedEvaluation && (
        <EvaluationDetailModal
          evaluare={selectedEvaluation}
          isOpen={!!selectedEvaluation}
          onClose={() => setSelectedEvaluation(null)}
        />
      )}
    </>
  );
}

