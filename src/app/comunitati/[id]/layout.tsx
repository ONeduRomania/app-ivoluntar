import type { PropsWithChildren } from "react";
import { Metadata } from "next";
import { getCommunityBySlug } from "@/lib/mock-data";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const community = getCommunityBySlug(id);
  
  if (community) {
    return {
      title: community.name,
    };
  }
  
  return {
    title: "Comunitate",
  };
}

export default async function Layout({ children, params }: Props) {
  return children;
}

