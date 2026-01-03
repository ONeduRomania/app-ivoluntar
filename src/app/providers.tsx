"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider } from "next-themes";
import { SearchProvider } from "@/contexts/search-context";
import { OrganizationProvider } from "@/contexts/organization-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <SidebarProvider>
        <SearchProvider>
          <OrganizationProvider>{children}</OrganizationProvider>
        </SearchProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
