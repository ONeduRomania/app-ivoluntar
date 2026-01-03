"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { TrashIcon } from "./community-group-icons";

export interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
    organization?: string; // Organizația autorului
    userId?: string; // ID-ul utilizatorului pentru verificare proprietate
  };
  content: string;
  createdAt: string;
}

interface CommentsSectionProps {
  postId: string;
  comments: Comment[];
  onAddComment: (content: string) => void;
  onDeleteComment?: (postId: string, commentId: string) => void;
  currentUserId?: string;
}

export function CommentsSection({
  postId,
  comments,
  onAddComment,
  onDeleteComment,
  currentUserId,
}: CommentsSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "acum";
    if (diffInSeconds < 3600)
      return `acum ${Math.floor(diffInSeconds / 60)} min`;
    if (diffInSeconds < 86400)
      return `acum ${Math.floor(diffInSeconds / 3600)} ore`;
    if (diffInSeconds < 604800)
      return `acum ${Math.floor(diffInSeconds / 86400)} zile`;

    return date.toLocaleDateString("ro-RO", {
      day: "numeric",
      month: "short",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(newComment.trim());
    setNewComment("");
  };

  return (
    <div className="mt-4 border-t border-stroke pt-4 dark:border-dark-3">
      <div className="space-y-4">
          {/* Formular pentru comentariu nou */}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="text-xs font-semibold">UC</span>
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Scrie un comentariu..."
                className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trimite
            </button>
          </form>

          {/* Lista de comentarii */}
          <div className="space-y-3">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {comment.author.avatar ? (
                      <Image
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="text-xs font-semibold">
                        {getInitials(comment.author.name)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-dark dark:text-white">
                          {comment.author.name}
                        </span>
                        <span className="text-xs text-dark-4 dark:text-dark-6">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      {comment.author.userId === currentUserId && onDeleteComment && (
                        <button
                          onClick={() => {
                            if (confirm("Ești sigur că vrei să ștergi acest comentariu?")) {
                              onDeleteComment(postId, comment.id);
                            }
                          }}
                          className="rounded-lg p-1 text-red-light transition-colors hover:bg-red-light/10"
                        >
                          <TrashIcon className="size-4" />
                        </button>
                      )}
                    </div>
                    {comment.author.organization && (
                      <p className="mb-1 text-xs text-dark-4 dark:text-dark-6">
                        {comment.author.organization}
                      </p>
                    )}
                    <p className="text-sm text-dark dark:text-white">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-dark-4 dark:text-dark-6">
                Nu există comentarii încă.
              </p>
            )}
          </div>
      </div>
    </div>
  );
}

