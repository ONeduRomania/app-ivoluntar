"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_DATA } from "./data";
import { ArrowLeftIcon } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";
import { Dropdown, DropdownContent, DropdownTrigger } from "@/components/ui/dropdown";

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));

    // Uncomment the following line to enable multiple expanded items
    // setExpandedItems((prev) =>
    //   prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    // );
  };

  // Helper function to check if a URL matches the current pathname
  const isUrlActive = (url: string) => {
    // Remove query params for comparison
    const path = url.split("?")[0];
    return pathname === path;
  };

  // Nu mai avem submenus, deci nu mai este necesară această verificare

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "max-w-[240px] border-r border-gray-200 bg-white transition-[width] duration-200 ease-linear dark:border-gray-800 dark:bg-gray-dark",
          isMobile ? "fixed bottom-0 top-0 z-50 overflow-hidden" : "sticky top-0 h-screen overflow-visible",
          isOpen ? "w-full" : "w-0",
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col">
          <div className="relative px-4 py-5">
            <Link
              href={"/"}
              onClick={() => isMobile && toggleSidebar()}
              className="flex items-center justify-center"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-dark-4 transition-colors hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
              >
                <span className="sr-only">Close Menu</span>
                <ArrowLeftIcon className="size-5" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar flex-1 overflow-y-auto overflow-x-visible px-3 py-4">
            {NAV_DATA.map((section, index) => (
              <div key={index}>
                <nav role="navigation" aria-label="Main navigation">
                  <ul className="space-y-0.5">
                    {section.items.map((item) => {
                      const href =
                        "url" in item && item.url
                          ? item.url
                          : "/" + item.title.toLowerCase().split(" ").join("-");

                      return (
                        <li key={item.title}>
                          <MenuItem
                            className="flex items-center gap-3"
                            as="link"
                            href={href}
                            isActive={isUrlActive(href)}
                          >
                            <item.icon
                              className="size-5 shrink-0"
                              aria-hidden="true"
                            />

                            <span>{item.title}</span>
                          </MenuItem>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-stroke px-4 py-4 dark:border-dark-3">
            <div className="flex flex-wrap items-center justify-start gap-2 text-xs text-dark-4 dark:text-dark-6">
              <a
                href="https://ivoluntar.org/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Confidențialitate
              </a>
              <span>·</span>
              <a
                href="https://ivoluntar.org/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Condiții de utilizare
              </a>
              <span>·</span>
              <a
                href="https://onedu.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Asociația ONedu
              </a>
              <span>·</span>
              <Dropdown isOpen={isMoreDropdownOpen} setIsOpen={setIsMoreDropdownOpen}>
                <DropdownTrigger className="hover:text-primary transition-colors">
                  Mai mult
                </DropdownTrigger>
                  <DropdownContent align="start" position="top" className="min-w-[160px]">
                    <div className="p-1">
                      <a
                        href="https://support.onedu.ro/ivoluntar-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMoreDropdownOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-dark transition-colors hover:bg-gray-2 hover:text-primary dark:text-white dark:hover:bg-dark-2"
                      >
                        Suport
                      </a>
                      <a
                        href="https://status.onedu.ro"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMoreDropdownOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-dark transition-colors hover:bg-gray-2 hover:text-primary dark:text-white dark:hover:bg-dark-2"
                      >
                        Starea serviciilor
                      </a>
                      <a
                        href="https://ivoluntar.org/despre"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMoreDropdownOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-dark transition-colors hover:bg-gray-2 hover:text-primary dark:text-white dark:hover:bg-dark-2"
                      >
                        Despre
                      </a>
                      <a
                        href="https://ivoluntar.org/plan"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMoreDropdownOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-dark transition-colors hover:bg-gray-2 hover:text-primary dark:text-white dark:hover:bg-dark-2"
                      >
                        Planul nostru
                      </a>
                      <a
                        href="https://ivoluntar.org/doneaza"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMoreDropdownOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-dark transition-colors hover:bg-gray-2 hover:text-primary dark:text-white dark:hover:bg-dark-2"
                      >
                        Donează
                      </a>
                      <a
                        href="https://onedu.ro/rapoarte"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMoreDropdownOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-dark transition-colors hover:bg-gray-2 hover:text-primary dark:text-white dark:hover:bg-dark-2"
                      >
                        Rapoarte
                      </a>
                      <a
                        href="https://ivoluntar.org/blog"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMoreDropdownOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-dark transition-colors hover:bg-gray-2 hover:text-primary dark:text-white dark:hover:bg-dark-2"
                      >
                        Blog
                    </a>
                  </div>
                </DropdownContent>
              </Dropdown>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
