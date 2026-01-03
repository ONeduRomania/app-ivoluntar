import { UsersIcon, CalendarIcon, MessageIcon, LocationIcon } from "./communities-icons";
import { cn } from "@/lib/utils";

export interface Community {
  id: string;
  name: string;
  slug?: string; // Slug pentru URL
  description: string;
  category: string;
  membersCount: number;
  location?: string;
  image?: string;
  isPrivate?: boolean;
  isMember?: boolean; // Dacă utilizatorul curent este membru
  createdBy?: string; // ID-ul creatorului
}

interface CommunityCardProps {
  community: Community;
  onClick?: () => void;
}

export function CommunityCard({ community, onClick }: CommunityCardProps) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-lg border border-stroke bg-white p-6 shadow-1 transition-all hover:shadow-2 dark:border-dark-3 dark:bg-gray-dark"
    >
      {community.image && (
        <div className="mb-4 h-48 w-full overflow-hidden rounded-lg">
          <img
            src={community.image}
            alt={community.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
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

          <h2 className="mb-2 text-lg font-semibold text-dark dark:text-white group-hover:text-primary">
            {community.name}
          </h2>

          <p className="mb-4 line-clamp-2 text-sm text-dark-4 dark:text-dark-6">
            {community.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-dark-4 dark:text-dark-6">
              <UsersIcon className="size-4" />
              <span>{community.membersCount} membri</span>
            </div>

            {community.location && (
              <div className="flex items-center gap-2 text-xs text-dark-4 dark:text-dark-6">
                <LocationIcon className="size-4" />
                <span>{community.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

