"use client";

import { createPortal } from "react-dom";
import { NewsItem } from "./news-card";
import { CalendarIcon, UserIcon } from "./news-icons";

interface NewsDetailModalProps {
  news: NewsItem;
  isOpen: boolean;
  onClose: () => void;
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M15 5L5 15M5 5l10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NewsDetailModal({
  news,
  isOpen,
  onClose,
}: NewsDetailModalProps) {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {news.category}
            </span>
            {news.isImportant && (
              <span className="rounded-full bg-orange-light-DEFAULT px-3 py-1 text-xs font-medium text-dark dark:text-white">
                Important
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-dark-4 transition-colors hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {news.image && (
          <div className="mb-4 h-64 w-full overflow-hidden rounded-lg">
            <img
              src={news.image}
              alt={news.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
          {news.title}
        </h2>

        <div className="mb-6 flex items-center gap-4 text-sm text-dark-4 dark:text-dark-6">
          <div className="flex items-center gap-1.5">
            <UserIcon className="size-4" />
            <span>{news.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="size-4" />
            <span>{formatDate(news.date)}</span>
          </div>
        </div>

        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="whitespace-pre-line text-dark dark:text-white">
            {news.content}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            Închide
          </button>
        </div>
      </div>
    </div>
  );

  return typeof window !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

