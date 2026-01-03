interface CommunitiesHeaderProps {
  onCreateClick?: () => void;
}

export function CommunitiesHeader({ onCreateClick }: CommunitiesHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">
          Comunități
        </h1>
        <p className="mt-1 text-sm text-dark-4 dark:text-dark-6">
          Alătură-te comunităților de voluntari și participă la activități comune
        </p>
      </div>
      {onCreateClick && (
        <button
          onClick={onCreateClick}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          + Creează comunitate
        </button>
      )}
    </div>
  );
}

