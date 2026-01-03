"use client";

import { useState } from "react";
import Image from "next/image";
import { HeartIcon, CommentIcon, TrashIcon, FlagIcon, MoreIcon } from "./community-group-icons";
import { Post } from "./community-feed";
import { CommentsSection, Comment } from "./comments-section";
import { PollCard } from "./poll-card";
import { cn } from "@/lib/utils";
import { useOrganization } from "@/contexts/organization-context";
import { Dropdown, DropdownContent, DropdownTrigger } from "@/components/ui/dropdown";

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onAddComment?: (postId: string, content: string) => void;
  onVote?: (postId: string, optionId: string) => void;
  onDelete?: (postId: string) => void;
  onReport?: (postId: string, reason: string) => void;
  currentUserId?: string; // ID-ul utilizatorului curent pentru verificare proprietate
}

export function PostCard({ post, onLike, onAddComment, onVote, onDelete, onReport, currentUserId }: PostCardProps) {
  const { currentOrganization } = useOrganization();
  const [showComments, setShowComments] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const isOwner = post.author.userId === currentUserId;
  const isPending = post.status === "pending";
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
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <article className="rounded-lg border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          {post.author.avatar ? (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <span className="text-sm font-semibold">
              {getInitials(post.author.name)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-dark dark:text-white">
                {post.author.name}
              </h3>
              <span className="text-xs text-dark-4 dark:text-dark-6">
                {formatDate(post.createdAt)}
              </span>
            </div>
            <Dropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen}>
              <DropdownTrigger
                className="rounded-lg p-1.5 text-dark transition-colors hover:bg-gray-2 dark:text-white dark:hover:bg-dark-2"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MoreIcon className="size-5" />
              </DropdownTrigger>
              <DropdownContent align="end" className="min-w-[150px]">
                <div className="p-1">
                  {isOwner && (
                    <button
                      onClick={() => {
                        if (confirm("Ești sigur că vrei să ștergi această postare?")) {
                          onDelete?.(post.id);
                        }
                        setIsDropdownOpen(false);
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-light transition-colors hover:bg-red-light/10"
                    >
                      <div className="flex items-center gap-2">
                        <TrashIcon className="size-4" />
                        <span>Șterge</span>
                      </div>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowReportModal(true);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-dark transition-colors hover:bg-gray-2 dark:text-white dark:hover:bg-dark-3"
                  >
                    <div className="flex items-center gap-2">
                      <FlagIcon className="size-4" />
                      <span>Raportează</span>
                    </div>
                  </button>
                </div>
              </DropdownContent>
            </Dropdown>
          </div>
          {post.author.organization && (
            <p className="mb-2 text-xs text-dark-4 dark:text-dark-6">
              {post.author.organization}
            </p>
          )}
          {isPending && (
            <div className="mb-2 rounded-lg bg-yellow-light/10 px-3 py-1.5 text-xs text-yellow-dark dark:bg-yellow-dark/20">
              ⏳ Postare în așteptarea moderării
            </div>
          )}
          <p className="whitespace-pre-line text-sm text-dark dark:text-white">
            {post.content}
          </p>
        </div>
      </div>

      {post.image && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image
            src={post.image}
            alt="Post image"
            width={800}
            height={400}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {/* Sondaj */}
      {post.type === "poll" && (
        <PollCard post={post} onVote={onVote} />
      )}

      {/* Nu afișa acțiunile dacă postarea este în așteptarea moderării */}
      {!isPending && (
        <div className="flex items-center gap-6 border-t border-stroke pt-4 dark:border-dark-3">
          <button
            onClick={onLike}
            className={cn(
              "flex items-center gap-2 text-sm transition-colors",
              post.isLiked
                ? "text-red-light"
                : "text-dark-4 hover:text-red-light dark:text-dark-6",
            )}
          >
            <HeartIcon
              className={cn("size-5", post.isLiked && "fill-current")}
            />
            <span>{post.likes}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-sm text-dark-4 transition-colors hover:text-primary dark:text-dark-6"
          >
            <CommentIcon className="size-5" />
            <span>{post.comments}</span>
          </button>
        </div>
      )}

      {/* Secțiunea de comentarii */}
      {showComments && onAddComment && (
        <CommentsSection
          postId={post.id}
          comments={post.commentsList || []}
          onAddComment={(content) => {
            onAddComment(post.id, content);
            setShowComments(true); // Păstrează secțiunea deschisă după adăugare
          }}
          onDeleteComment={onDelete}
          currentUserId={currentUserId}
        />
      )}

      {/* Modal raportare */}
      {showReportModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
            <h3 className="mb-4 text-lg font-semibold text-dark dark:text-white">
              Raportează conținut
            </h3>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-dark dark:text-white">
                Motivul raportării
              </label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              >
                <option value="">Selectează un motiv</option>
                <option value="spam">Spam</option>
                <option value="harassment">Hărțuire</option>
                <option value="inappropriate">Conținut neadecvat</option>
                <option value="false_info">Informații false</option>
                <option value="other">Alt motiv</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowReportModal(false);
                  setReportReason("");
                }}
                className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3"
              >
                Anulează
              </button>
              <button
                onClick={() => {
                  if (reportReason) {
                    onReport?.(post.id, reportReason);
                    setShowReportModal(false);
                    setReportReason("");
                    alert("Raportul a fost trimis. Mulțumim pentru feedback!");
                  }
                }}
                disabled={!reportReason}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trimite raport
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

