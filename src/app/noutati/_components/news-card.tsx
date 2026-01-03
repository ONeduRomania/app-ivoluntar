import { CalendarIcon, UserIcon } from "./news-icons";
import { cn } from "@/lib/utils";

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image?: string;
  isImportant?: boolean;
}

interface NewsCardProps {
  news: NewsItem;
  onClick?: () => void;
}

export function NewsCard({ news, onClick }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-lg border border-stroke bg-white p-6 shadow-1 transition-all hover:shadow-2 dark:border-dark-3 dark:bg-gray-dark",
        news.isImportant && "border-primary bg-primary/5 dark:border-primary",
      )}
    >
      {news.image && (
        <div className="mb-4 h-48 w-full overflow-hidden rounded-lg">
          <img
            src={news.image}
            alt={news.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {news.category}
            </span>
            {news.isImportant && (
              <span className="rounded-full bg-orange-light-DEFAULT px-3 py-1 text-xs font-medium text-dark dark:text-white">
                Important
              </span>
            )}
          </div>

          <h2 className="mb-2 text-lg font-semibold text-dark dark:text-white group-hover:text-primary">
            {news.title}
          </h2>

          <p className="mb-4 line-clamp-3 text-sm text-dark-4 dark:text-dark-6">
            {news.content}
          </p>

          <div className="flex items-center gap-4 text-xs text-dark-4 dark:text-dark-6">
            <div className="flex items-center gap-1.5">
              <UserIcon className="size-4" />
              <span>{news.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="size-4" />
              <span>{formatDate(news.date)}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

