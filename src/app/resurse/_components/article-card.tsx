import { BookIcon, CalendarIcon } from "./resources-icons";
import { cn } from "@/lib/utils";

export interface Article {
  id: string;
  title: string;
  slug?: string; // Slug pentru URL
  excerpt: string;
  category: "organizare" | "contabilitate" | "secretariat" | "radiere";
  author: string;
  date: string;
  image?: string;
  content?: string; // Conținutul complet al articolului (markdown sau HTML)
  images?: Array<{ url: string; alt?: string; caption?: string }>; // Imagini în articol
  documents?: Array<{ name: string; url: string; size?: string }>; // Documente atașate
}

interface ArticleCardProps {
  article: Article;
  onClick?: () => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      organizare: "Organizare",
      contabilitate: "Contabilitate",
      secretariat: "Secretariat",
      radiere: "Radiere",
    };
    return labels[category] || category;
  };

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-lg border border-stroke bg-white p-6 shadow-1 transition-all hover:shadow-2 dark:border-dark-3 dark:bg-gray-dark"
    >
      {article.image && (
        <div className="mb-4 h-48 w-full overflow-hidden rounded-lg">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {getCategoryLabel(article.category)}
            </span>
          </div>

          <h2 className="mb-2 text-lg font-semibold text-dark dark:text-white group-hover:text-primary">
            {article.title}
          </h2>

          <p className="mb-4 line-clamp-2 text-sm text-dark-4 dark:text-dark-6">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-dark-4 dark:text-dark-6">
            <div className="flex items-center gap-1.5">
              <BookIcon className="size-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="size-4" />
              <span>{formatDate(article.date)}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

