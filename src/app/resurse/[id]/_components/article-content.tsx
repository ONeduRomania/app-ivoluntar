"use client";

import Image from "next/image";
import { Article } from "../../_components/article-card";
import { DownloadIcon, ExternalLinkIcon } from "./article-icons";

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  // Parsează conținutul markdown simplu (pentru demo)
  const renderContent = () => {
    if (!article.content) {
      return <p className="text-dark dark:text-white">{article.excerpt}</p>;
    }

    // Simplu parser pentru markdown de bază
    const lines = article.content.split("\n");
    const elements: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={index} className="mb-4 mt-6 text-2xl font-bold text-dark dark:text-white">
            {line.substring(2)}
          </h1>,
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={index} className="mb-3 mt-5 text-xl font-semibold text-dark dark:text-white">
            {line.substring(3)}
          </h2>,
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={index} className="mb-2 mt-4 text-lg font-semibold text-dark dark:text-white">
            {line.substring(4)}
          </h3>,
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={index} className="ml-6 list-disc text-dark dark:text-white">
            {line.substring(2)}
          </li>,
        );
      } else if (line.trim() === "") {
        elements.push(<br key={index} />);
      } else {
        elements.push(
          <p key={index} className="mb-4 leading-relaxed text-dark dark:text-white">
            {line}
          </p>,
        );
      }
    });

    return elements;
  };

  return (
    <article className="rounded-lg border border-stroke bg-white p-8 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      {/* Conținut articol */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div className="article-content">{renderContent()}</div>
      </div>

      {/* Imagini (dacă există) */}
      {article.images && article.images.length > 0 && (
        <div className="my-8 space-y-4">
          {article.images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg">
              <Image
                src={image.url}
                alt={image.alt || `Imagine ${index + 1}`}
                width={800}
                height={400}
                className="h-auto w-full object-cover"
              />
              {image.caption && (
                <p className="mt-2 text-center text-sm text-dark-4 dark:text-dark-6">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Documente */}
      {article.documents && article.documents.length > 0 && (
        <div className="mt-8 border-t border-stroke pt-6 dark:border-dark-3">
          <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">
            Documente atașate
          </h3>
          <div className="space-y-2">
            {article.documents.map((doc, index) => (
              <a
                key={index}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-stroke bg-gray-2 p-3 transition-colors hover:bg-gray-3 dark:border-dark-3 dark:bg-dark-2 dark:hover:bg-dark-3"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <DownloadIcon className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-dark dark:text-white">
                    {doc.name}
                  </p>
                  {doc.size && (
                    <p className="text-xs text-dark-4 dark:text-dark-6">
                      {doc.size}
                    </p>
                  )}
                </div>
                <ExternalLinkIcon className="size-4 text-dark-4 dark:text-dark-6" />
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

