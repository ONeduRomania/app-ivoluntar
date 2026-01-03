"use client";

import { OrgNode } from "./organization-chart-page";
import { cn } from "@/lib/utils";

interface OrganizationChartProps {
  data: OrgNode;
}

function OrgNodeCard({ node, level = 0 }: { node: OrgNode; level?: number }) {
  const getInitials = () => {
    return `${node.firstName[0]}${node.lastName[0]}`.toUpperCase();
  };

  const getFullName = () => {
    return `${node.firstName} ${node.lastName}`;
  };

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "relative rounded-lg border border-stroke bg-white p-4 shadow-1 transition-all hover:shadow-2 dark:border-dark-3 dark:bg-gray-dark",
          level === 0 && "min-w-[220px]",
          level > 0 && "min-w-[200px]",
        )}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="text-xl font-semibold">{getInitials()}</span>
          </div>
          <h3 className="font-semibold text-dark dark:text-white">
            {getFullName()}
          </h3>
          <p className="mt-1 text-sm font-medium text-primary">
            {node.position}
          </p>
          {node.department && (
            <p className="mt-1 text-xs text-dark-4 dark:text-dark-6">
              {node.department}
            </p>
          )}
          {node.email && (
            <p className="mt-2 truncate text-xs text-dark-4 dark:text-dark-6">
              {node.email}
            </p>
          )}
          {node.phone && (
            <p className="mt-1 text-xs text-dark-4 dark:text-dark-6">
              {node.phone}
            </p>
          )}
        </div>
      </div>

      {hasChildren && (
        <>
          {/* Linie verticală de la nod la copii */}
          <div className="my-4 h-8 w-0.5 bg-stroke dark:bg-dark-3" />

          {/* Container pentru copii cu linii orizontale */}
          {node.children && (
            <div className="relative flex gap-6">
              {/* Linie orizontală deasupra copiilor */}
              {node.children.length > 1 && (
                <div
                  className="absolute -top-8 h-0.5 bg-stroke dark:bg-dark-3"
                  style={{
                    left: `${100 / (node.children.length * 2)}%`,
                    right: `${100 / (node.children.length * 2)}%`,
                  }}
                />
              )}

              {node.children.map((child, index) => (
              <div key={child.id} className="relative flex flex-col items-center">
                {/* Linie verticală de la linia orizontală la nod */}
                <div className="absolute -top-8 h-8 w-0.5 bg-stroke dark:bg-dark-3" />

                <OrgNodeCard node={child} level={level + 1} />
              </div>
            ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function OrganizationChart({ data }: OrganizationChartProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-stroke bg-white p-8 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="flex min-w-full justify-center">
        <OrgNodeCard node={data} />
      </div>
    </div>
  );
}

