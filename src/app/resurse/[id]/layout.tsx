import type { PropsWithChildren } from "react";
import { Metadata } from "next";
import { getArticleBySlug } from "@/lib/mock-data";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleBySlug(id);
  
  if (article) {
    return {
      title: article.title,
    };
  }
  
  return {
    title: "Articol",
  };
}

export default async function Layout({ children, params }: Props) {
  return children;
}

