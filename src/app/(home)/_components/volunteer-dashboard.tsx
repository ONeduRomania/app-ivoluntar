import { Birthdays } from "./birthdays";
import { DocumentsToSign } from "./documents-to-sign";
import { RecentActivities } from "./recent-activities";
import { TimeTrackingCard } from "./time-tracking-card";
import { VolunteerStatsCard } from "./volunteer-stats-card";
import {
  ChartIcon,
  ClockIcon,
  OrganizationIcon,
} from "./volunteer-stats-icons";

export function VolunteerDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="mb-2 text-3xl font-bold text-dark dark:text-white">
          Bine ai venit! 👋
        </h1>
        <p className="text-base text-dark-4 dark:text-dark-6">
          Iată activitatea ta de voluntariat.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <TimeTrackingCard />

        <VolunteerStatsCard
          title="Ore Luna Aceasta"
          value="24"
          subtitle="din 30 planificate"
          growth="+15% vs luna trecută"
          icon={<ClockIcon className="text-white" />}
          variant="primary"
        />

        <VolunteerStatsCard
          title="Total Ore Voluntariat"
          value="156"
          subtitle="din ian. 2024"
          growth="+8% vs luna trecută"
          icon={<ChartIcon className="text-dark-4 dark:text-dark-6" />}
        />

        <VolunteerStatsCard
          title="Vechime în organizație"
          value="2 ani"
          subtitle="din ian. 2022"
          icon={<OrganizationIcon className="text-dark-4 dark:text-dark-6" />}
        />
      </div>

      {/* Additional Sections */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <RecentActivities />
        <DocumentsToSign />
        <Birthdays />
      </div>
    </div>
  );
}

