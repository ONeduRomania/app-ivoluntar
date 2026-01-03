"use client";

import { createPortal } from "react-dom";
import { Community } from "./community-card";
import { UsersIcon, LocationIcon } from "./communities-icons";

interface CommunityDetailModalProps {
  community: Community;
  isOpen: boolean;
  onClose: () => void;
  onJoin?: () => void;
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

export function CommunityDetailModal({
  community,
  isOpen,
  onClose,
  onJoin,
}: CommunityDetailModalProps) {
  if (!isOpen) return null;

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
              {community.category}
            </span>
            {community.isPrivate && (
              <span className="rounded-full bg-gray-4 px-3 py-1 text-xs font-medium text-dark">
                Privată
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

        {community.image && (
          <div className="mb-4 h-64 w-full overflow-hidden rounded-lg">
            <img
              src={community.image}
              alt={community.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <h2 className="mb-4 text-2xl font-bold text-dark dark:text-white">
          {community.name}
        </h2>

        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-dark-4 dark:text-dark-6">
            <UsersIcon className="size-4" />
            <span>{community.membersCount} membri</span>
          </div>

          {community.location && (
            <div className="flex items-center gap-2 text-sm text-dark-4 dark:text-dark-6">
              <LocationIcon className="size-4" />
              <span>{community.location}</span>
            </div>
          )}
        </div>

        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="whitespace-pre-line text-dark dark:text-white">
            {community.description}
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3"
          >
            Închide
          </button>
          {onJoin && (
            <button
              onClick={onJoin}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Alătură-te
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return typeof window !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

