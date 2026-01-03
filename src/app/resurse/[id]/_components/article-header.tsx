import { Article } from "../../_components/article-card";
import { BookIcon, CalendarIcon } from "../../_components/resources-icons";
import { useRouter } from "next/navigation";

interface ArticleHeaderProps {
  article: Article;
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.5 15l-5-5 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
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
    <div className="space-y-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-dark-4 transition-colors hover:text-primary dark:text-dark-6"
      >
        <ArrowLeftIcon className="size-4" />
        <span>Înapoi la resurse</span>
      </button>

      <div>
        <div className="mb-4">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {getCategoryLabel(article.category)}
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-dark dark:text-white">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-dark-4 dark:text-dark-6">
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
  );
}

