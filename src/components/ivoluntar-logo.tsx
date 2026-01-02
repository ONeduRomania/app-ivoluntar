import { cn } from "@/lib/utils";

interface IVoluntarLogoProps {
  className?: string;
}

export function IVoluntarLogo({ className }: IVoluntarLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Logo shape - person with outstretched arms / checkmark */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A90E2" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        {/* Head */}
        <circle cx="12" cy="12" r="5" fill="url(#logoGradient)" />
        {/* Body - curved C/U shape */}
        <path
          d="M12 18C8 18 5 21 5 25C5 29 8 32 12 32C16 32 19 29 19 25"
          stroke="url(#logoGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arm extension - upward sweep */}
        <path
          d="M19 25C22 22 26 20 30 18"
          stroke="url(#logoGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      
      {/* Text */}
      <span className="text-xl font-semibold text-[#3B82F6] dark:text-[#60A5FA]">
        <span className="text-[#4A90E2] dark:text-[#93C5FD]">i</span>
        Voluntar
      </span>
    </div>
  );
}

