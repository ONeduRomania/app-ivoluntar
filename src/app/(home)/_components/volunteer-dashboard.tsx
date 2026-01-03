"use client";

import { useOrganization } from "@/contexts/organization-context";
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

// Funcție pentru calcularea vechimii reale
const calculateVechime = (dataInceput: string): string => {
  const startDate = new Date(dataInceput);
  const now = new Date();
  
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (years === 0) {
    return `${months} ${months === 1 ? "lună" : "luni"}`;
  } else if (months === 0) {
    return `${years} ${years === 1 ? "an" : "ani"}`;
  } else {
    return `${years} ${years === 1 ? "an" : "ani"}, ${months} ${months === 1 ? "lună" : "luni"}`;
  }
};

export function VolunteerDashboard() {
  const { getCurrentOrganizationData } = useOrganization();
  const orgData = getCurrentOrganizationData();

  // Calculează orele din timesheetEntries pentru luna curentă
  const calculateCurrentMonthHours = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthEntries = orgData.timesheetEntries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear
      );
    });

    const totalMinutes = currentMonthEntries.reduce(
      (sum, entry) => sum + entry.hours * 60 + entry.minutes,
      0,
    );
    return Math.round((totalMinutes / 60) * 10) / 10;
  };

  // Calculează total ore din toate entries
  const calculateTotalHours = () => {
    const totalMinutes = orgData.timesheetEntries.reduce(
      (sum, entry) => sum + entry.hours * 60 + entry.minutes,
      0,
    );
    return Math.round((totalMinutes / 60) * 10) / 10;
  };

  const oreLunaAceasta = calculateCurrentMonthHours();
  const totalOre = calculateTotalHours();

  // Calculează creșterea procentuală reală bazată pe datele din pontaj
  const calculateGrowth = (currentHours: number, period: "month" | "total") => {
    const now = new Date();
    
    if (period === "month") {
      // Compară cu luna trecută
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      
      const lastMonthEntries = orgData.timesheetEntries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= lastMonth && entryDate <= lastMonthEnd;
      });
      
      const lastMonthMinutes = lastMonthEntries.reduce(
        (sum, entry) => sum + entry.hours * 60 + entry.minutes,
        0,
      );
      const lastMonthHours = lastMonthMinutes / 60;
      
      if (lastMonthHours === 0) {
        return currentHours > 0 ? "+100% vs luna trecută" : "0% vs luna trecută";
      }
      
      const growth = ((currentHours - lastMonthHours) / lastMonthHours) * 100;
      const sign = growth >= 0 ? "+" : "";
      return `${sign}${Math.round(growth)}% vs luna trecută`;
    } else {
      // Compară cu luna trecută pentru total (ultimele 30 de zile vs 30-60 zile în urmă)
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const sixtyDaysAgo = new Date(now);
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
      
      const last30DaysEntries = orgData.timesheetEntries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= thirtyDaysAgo && entryDate < now;
      });
      
      const previous30DaysEntries = orgData.timesheetEntries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= sixtyDaysAgo && entryDate < thirtyDaysAgo;
      });
      
      const last30DaysMinutes = last30DaysEntries.reduce(
        (sum, entry) => sum + entry.hours * 60 + entry.minutes,
        0,
      );
      const previous30DaysMinutes = previous30DaysEntries.reduce(
        (sum, entry) => sum + entry.hours * 60 + entry.minutes,
        0,
      );
      
      const last30DaysHours = last30DaysMinutes / 60;
      const previous30DaysHours = previous30DaysMinutes / 60;
      
      if (previous30DaysHours === 0) {
        return last30DaysHours > 0 ? "+100% vs perioada anterioară" : "0% vs perioada anterioară";
      }
      
      const growth = ((last30DaysHours - previous30DaysHours) / previous30DaysHours) * 100;
      const sign = growth >= 0 ? "+" : "";
      return `${sign}${Math.round(growth)}% vs perioada anterioară`;
    }
  };

  const growthLunaAceasta = calculateGrowth(oreLunaAceasta, "month");
  const growthTotal = calculateGrowth(totalOre, "total");

  // Formatează data de început pentru vechime
  const formatDataInceput = (dataInceput: string) => {
    const date = new Date(dataInceput);
    const month = date.toLocaleDateString("ro-RO", { month: "short" });
    const year = date.getFullYear();
    return `din ${month} ${year}`;
  };

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
          value={oreLunaAceasta.toString()}
          subtitle={`din ${orgData.orePlanificate} planificate`}
          growth={growthLunaAceasta}
          icon={<ClockIcon className="text-white" />}
          variant="primary"
        />

        <VolunteerStatsCard
          title="Total Ore Voluntariat"
          value={totalOre.toString()}
          subtitle={formatDataInceput(orgData.dataInceput)}
          icon={<ChartIcon className="text-dark-4 dark:text-dark-6" />}
        />

        <VolunteerStatsCard
          title="Vechime în organizație"
          value={calculateVechime(orgData.dataInceput)}
          subtitle={formatDataInceput(orgData.dataInceput)}
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

