"use client";

import Image from "next/image";
import { CameraIcon } from "./icons";

interface ProfileHeaderProps {
  profilePhoto: string;
  name: string;
  organization: string;
  status: string;
  vechime: string;
  onPhotoChange: (file: File) => void;
  onViewOrgChart?: () => void;
}

export function ProfileHeader({
  profilePhoto,
  name,
  organization,
  status,
  vechime,
  onPhotoChange,
  onViewOrgChart,
}: ProfileHeaderProps) {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoChange(file);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      activ: "bg-green text-white",
      inactiv: "bg-gray-4 text-dark",
      suspendat: "bg-orange-light text-white",
      "reziliat contract": "bg-red-light text-white",
    };
    return colors[status.toLowerCase()] || "bg-gray-4 text-dark";
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-gray-dark sm:flex-row sm:items-start">
      <div className="relative">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg dark:border-gray-dark">
          <Image
            src={profilePhoto}
            alt="Profile photo"
            fill
            className="object-cover"
          />
        </div>
        <label
          htmlFor="profile-photo"
          className="absolute bottom-0 right-0 flex size-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110"
        >
          <CameraIcon />
          <input
            type="file"
            id="profile-photo"
            className="sr-only"
            accept="image/png, image/jpg, image/jpeg"
            onChange={handlePhotoChange}
          />
        </label>
      </div>

      <div className="flex flex-1 flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex-1">
          <h1 className="mb-1 text-2xl font-bold text-dark dark:text-white">
            {name}
          </h1>
          <p className="mb-1 text-sm text-dark-4 dark:text-dark-6">
            {organization}
          </p>
          <p className="mb-2 text-xs text-dark-4 dark:text-dark-6">
            Vechime: {vechime}
          </p>
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(status)}`}
          >
            {status}
          </span>
        </div>
        {onViewOrgChart && (
          <button
            onClick={onViewOrgChart}
            className="rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 dark:border-primary dark:bg-primary/10 dark:hover:bg-primary/20"
          >
            Vezi organigrama
          </button>
        )}
      </div>
    </div>
  );
}

