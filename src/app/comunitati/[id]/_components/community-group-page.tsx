"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Community } from "../../_components/community-card";
import { CommunityGroupHeader } from "./community-group-header";
import { CommunityFeed, Post } from "./community-feed";
import { CreatePostModal } from "./create-post-modal";
import { createSlug } from "@/lib/slug";

// Mock data - în producție vine din backend
const mockCommunities: Community[] = [
  {
    id: "1",
    name: "Comunitatea Voluntarilor din București",
    description:
      "O comunitate activă de voluntari din București care organizează evenimente locale, campanii de donații și activități educaționale pentru copii și adulți.",
    category: "Regională",
    membersCount: 245,
    location: "București, România",
    isMember: true,
  },
  {
    id: "2",
    name: "Echipa de Comunicare",
    description:
      "Comunitate dedicată voluntarilor care lucrează în domeniul comunicării, marketingului și relațiilor publice. Organizăm sesiuni de training și workshop-uri periodice.",
    category: "Departament",
    membersCount: 32,
    isMember: true,
  },
];

export function CommunityGroupPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.id as string;

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState<Omit<Post, "id" | "createdAt" | "likes" | "comments"> | null>(null);

  // Găsește comunitatea după slug sau id
  const community = mockCommunities.find((c) => 
    c.slug === slug || c.id === slug || createSlug(c.name) === slug
  );

  // Dacă comunitatea nu există sau utilizatorul nu este membru, redirecționează
  useEffect(() => {
    if (!community || !community.isMember) {
      router.push("/comunitati");
    }
  }, [community, router]);

  if (!community || !community.isMember) {
    return null;
  }

  const handlePostCreated = (post: Omit<Post, "id" | "createdAt" | "likes" | "comments">) => {
    setNewPost(post);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <CommunityGroupHeader
        community={community}
        onCreatePostClick={() => setShowCreatePost(true)}
      />
      <CommunityFeed communityId={community.id} newPost={newPost} />
      {showCreatePost && (
        <CreatePostModal
          isOpen={showCreatePost}
          onClose={() => setShowCreatePost(false)}
          communityId={community.id}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
}

