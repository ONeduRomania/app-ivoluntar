import { cn } from "@/lib/utils";

interface VolunteerStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  growth?: string;
  icon: React.ReactNode;
  variant?: "primary" | "default";
  className?: string;
}

export function VolunteerStatsCard({
  title,
  value,
  subtitle,
  growth,
  icon,
  variant = "default",
  className,
}: VolunteerStatsCardProps) {
  const isPrimary = variant === "primary";

  return (
    <div
      className={cn(
        "rounded-[10px] p-4 shadow-1",
        isPrimary
          ? "bg-gradient-to-br from-primary to-blue dark:from-primary dark:to-blue"
          : "bg-white dark:bg-gray-dark",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3
            className={cn(
              "mb-1.5 text-sm font-medium",
              isPrimary ? "text-white/90" : "text-dark-4 dark:text-dark-6",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "mb-1 text-2xl font-bold",
              isPrimary ? "text-white" : "text-dark dark:text-white",
            )}
          >
            {value}
          </p>
          {subtitle && (
            <p
              className={cn(
                "text-xs font-medium",
                isPrimary ? "text-white/80" : "text-dark-4 dark:text-dark-6",
              )}
            >
              {subtitle}
            </p>
          )}
          {growth && (
            <p
              className={cn(
                "mt-1.5 text-xs font-medium",
                isPrimary ? "text-white/90" : "text-green dark:text-green-light",
              )}
            >
              {growth}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-lg",
            isPrimary
              ? "bg-white/20"
              : "bg-gray-2 dark:bg-dark-2",
          )}
        >
          <div className="flex items-center justify-center">{icon}</div>
        </div>
      </div>
    </div>
  );
}

