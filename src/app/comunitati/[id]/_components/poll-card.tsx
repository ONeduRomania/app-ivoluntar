"use client";

import { Post } from "./community-feed";
import { cn } from "@/lib/utils";

interface PollCardProps {
  post: Post;
  onVote?: (postId: string, optionId: string) => void;
}

export function PollCard({ post, onVote }: PollCardProps) {
  if (post.type !== "poll" || !post.pollOptions) return null;

  const totalVotes = post.pollOptions.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="mt-4 space-y-3 rounded-lg border border-stroke bg-gray-2 p-4 dark:border-dark-3 dark:bg-dark-2">
      <h4 className="font-semibold text-dark dark:text-white">
        {post.content}
      </h4>
      <div className="space-y-2">
        {post.pollOptions.map((option) => {
          const percentage =
            totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const isVoted = post.pollVoted === option.id;
          const isSelected = post.pollVoted === option.id;

          return (
            <button
              key={option.id}
              onClick={() => !post.pollVoted && onVote?.(post.id, option.id)}
              disabled={!!post.pollVoted}
              className={cn(
                "relative w-full rounded-lg border p-3 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-stroke bg-white hover:border-primary dark:border-dark-3 dark:bg-gray-dark",
                post.pollVoted && "cursor-default",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-dark dark:text-white">
                  {option.text}
                </span>
                {post.pollVoted && (
                  <span className="text-xs text-dark-4 dark:text-dark-6">
                    {percentage.toFixed(0)}% ({option.votes} voturi)
                  </span>
                )}
              </div>
              {post.pollVoted && (
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-4 dark:bg-dark-3">
                  <div
                    className={cn(
                      "h-full transition-all",
                      isSelected ? "bg-primary" : "bg-gray-4 dark:bg-dark-3",
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
      {totalVotes > 0 && (
        <p className="text-xs text-dark-4 dark:text-dark-6">
          Total voturi: {totalVotes}
        </p>
      )}
    </div>
  );
}

