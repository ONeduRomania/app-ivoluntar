"use client";

import { ExternalLinkIcon } from "./resources-icons";

export function WikiBanner() {
  const handleWikiClick = () => {
    window.open("https://wiki.ivoluntar.org", "_blank");
  };

  return (
    <div className="mb-8 rounded-lg border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center dark:from-primary/20 dark:to-primary/10">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-3 text-2xl font-bold text-dark dark:text-white">
          WikiVoluntariat
        </h2>
        <p className="mb-6 text-dark-4 dark:text-dark-6">
          Accesează baza noastră de cunoștințe completă cu ghiduri detaliate,
          tutoriale pas cu pas și răspunsuri la întrebările frecvente despre
          voluntariat, organizare și management.
        </p>
        <button
          onClick={handleWikiClick}
          className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-all hover:bg-primary/90 hover:shadow-lg"
        >
          <span>Accesează WikiVoluntariat</span>
          <ExternalLinkIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}

