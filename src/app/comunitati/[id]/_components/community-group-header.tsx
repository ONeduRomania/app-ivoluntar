import { Community } from "../../_components/community-card";
import { UsersIcon, LocationIcon } from "../../_components/communities-icons";

interface CommunityGroupHeaderProps {
  community: Community;
  onCreatePostClick?: () => void;
}

export function CommunityGroupHeader({
  community,
  onCreatePostClick,
}: CommunityGroupHeaderProps) {
  return (
    <div className="rounded-lg border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {community.category}
            </span>
            {community.isPrivate && (
              <span className="rounded-full bg-gray-4 px-3 py-1 text-xs font-medium text-dark">
                Privată
              </span>
            )}
          </div>
          <h1 className="mb-2 text-2xl font-bold text-dark dark:text-white">
            {community.name}
          </h1>
          <p className="text-sm text-dark-4 dark:text-dark-6">
            {community.description}
          </p>
        </div>
        {onCreatePostClick && (
          <button
            onClick={onCreatePostClick}
            className="ml-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
          >
            + Postează
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-6 border-t border-stroke pt-4 dark:border-dark-3">
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
    </div>
  );
}

