"use client";

import { useState, useEffect } from "react";
import { PostCard } from "./post-card";

import { Comment } from "./comments-section";

export interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
    organization?: string; // Organizația autorului
    userId?: string; // ID-ul utilizatorului pentru verificare proprietate
  };
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  commentsList?: Comment[];
  type?: "post" | "poll";
  pollOptions?: { id: string; text: string; votes: number }[];
  pollVoted?: string; // ID-ul opțiunii votate
  status?: "pending" | "approved" | "rejected"; // Status moderare
}

interface CommunityFeedProps {
  communityId: string;
}

// Mock data - în producție vine din backend
const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Maria Popescu",
      avatar: "/images/user/user-03.png",
    },
    content:
      "Bună dimineața! Am organizat un workshop despre comunicare eficientă pentru voluntari. Mulțumesc tuturor celor care au participat! 🎉",
    createdAt: "2024-01-20T10:30:00",
    likes: 24,
    comments: 5,
    isLiked: false,
    commentsList: [
      {
        id: "c1",
        author: {
          name: "Ion Ionescu",
          avatar: "/images/user/user-03.png",
          organization: "Asociația ONedu",
          userId: "user-2",
        },
        content: "Foarte util workshop-ul! Mulțumesc!",
        createdAt: "2024-01-20T11:00:00",
      },
      {
        id: "c2",
        author: {
          name: "Ana Georgescu",
          organization: "Fundatia Voluntarilor",
          userId: "user-3",
        },
        content: "Când va fi următorul?",
        createdAt: "2024-01-20T11:15:00",
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "Ion Ionescu",
      avatar: "/images/user/user-03.png",
      organization: "Fundatia Voluntarilor",
      userId: "user-2",
    },
    status: "approved",
    content:
      "Am nevoie de ajutor pentru organizarea evenimentului de săptămâna viitoare. Cine este disponibil?",
    createdAt: "2024-01-19T15:45:00",
    likes: 12,
    comments: 8,
    isLiked: true,
    commentsList: [
      {
        id: "c3",
        author: {
          name: "Maria Popescu",
          organization: "Asociația ONedu",
          userId: "user-1",
        },
        content: "Eu sunt disponibilă!",
        createdAt: "2024-01-19T16:00:00",
      },
    ],
  },
  {
    id: "3",
    author: {
      name: "Ana Georgescu",
      avatar: "/images/user/user-03.png",
      organization: "Asociația pentru Dezvoltare",
      userId: "user-3",
    },
    status: "approved",
    content:
      "Rezultatele campaniei de donații: am strâns peste 10.000 RON! Mulțumim tuturor pentru sprijin! 🙏",
    image: "/images/placeholder.jpg",
    createdAt: "2024-01-18T09:15:00",
    likes: 45,
    comments: 12,
    isLiked: false,
    commentsList: [],
  },
];

interface CommunityFeedProps {
  communityId: string;
  newPost?: Omit<Post, "id" | "createdAt" | "likes" | "comments"> | null;
}

export function CommunityFeed({ communityId, newPost }: CommunityFeedProps) {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const handleAddComment = (postId: string, content: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: Date.now().toString(),
            author: {
              name: "Utilizator Curent", // TODO: Înlocuiește cu datele reale
              avatar: "/images/user/user-03.png",
              organization: "Asociația ONedu", // TODO: Din context
              userId: "current-user-id", // TODO: Din context
            },
            content,
            createdAt: new Date().toISOString(),
          };
          return {
            ...post,
            comments: (post.comments || 0) + 1,
            commentsList: [...(post.commentsList || []), newComment],
          };
        }
        return post;
      }),
    );
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: Math.max(0, (post.comments || 0) - 1),
            commentsList: (post.commentsList || []).filter(
              (comment) => comment.id !== commentId,
            ),
          };
        }
        return post;
      }),
    );
  };

  const handleReport = (postId: string, reason: string) => {
    // TODO: Trimite raportul la backend
    console.log("Raport pentru postarea", postId, "motiv:", reason);
  };

  const handleVote = (postId: string, optionId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId && post.type === "poll" && post.pollOptions) {
          const updatedOptions = post.pollOptions.map((opt) =>
            opt.id === optionId
              ? { ...opt, votes: opt.votes + 1 }
              : opt,
          );
          return {
            ...post,
            pollOptions: updatedOptions,
            pollVoted: optionId,
          };
        }
        return post;
      }),
    );
  };

  // Adaugă postarea nouă când este creată (cu status pending)
  useEffect(() => {
    if (newPost) {
      const post: Post = {
        ...newPost,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        isLiked: false,
        commentsList: [],
        type: newPost.type || "post",
        status: "pending", // Postarea este trimisă spre moderare
      };
      setPosts((prev) => [post, ...prev]);
    }
  }, [newPost]);

  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        posts
          .filter((post) => post.status !== "rejected") // Nu afișa postările respinse
          .map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onAddComment={handleAddComment}
              onVote={handleVote}
              onDelete={handleDeletePost}
              onReport={handleReport}
              currentUserId="current-user-id" // TODO: Din context/auth
            />
          ))
      ) : (
        <div className="rounded-lg border border-stroke bg-white p-12 text-center dark:border-dark-3 dark:bg-gray-dark">
          <p className="text-dark-4 dark:text-dark-6">
            Nu există postări încă. Fii primul care postează!
          </p>
        </div>
      )}
    </div>
  );
}

