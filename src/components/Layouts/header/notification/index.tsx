"use client";

import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { BellIcon } from "./icons";

const notificationList = [
  {
    title: "Piter s-a alăturat echipei!",
    subTitle: "Felicită-l",
  },
  {
    title: "Mesaj nou",
    subTitle: "Devid a trimis un mesaj nou",
  },
  {
    title: "Plată nouă primită",
    subTitle: "Verifică-ți câștigurile",
  },
  {
    title: "Jolly a finalizat sarcini",
    subTitle: "Atribuie o sarcină nouă",
  },
  {
    title: "Roman s-a alăturat echipei!",
    subTitle: "Felicită-l",
  },
];

export function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDotVisible, setIsDotVisible] = useState(true);
  const [readNotifications, setReadNotifications] = useState<Set<number>>(
    new Set(),
  );
  const isMobile = useIsMobile();

  const unreadCount = notificationList.length - readNotifications.size;

  const markAllAsRead = () => {
    const allIndices = new Set(notificationList.map((_, index) => index));
    setReadNotifications(allIndices);
    setIsDotVisible(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={(open) => {
        setIsOpen(open);

        if (setIsDotVisible) setIsDotVisible(false);
      }}
    >
      <DropdownTrigger
        className="grid size-12 place-items-center rounded-full border bg-gray-2 text-dark outline-none hover:text-primary focus-visible:border-primary focus-visible:text-primary dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus-visible:border-primary"
        aria-label="View Notifications"
      >
        <span className="relative">
          <BellIcon />

          {isDotVisible && unreadCount > 0 && (
            <span
              className={cn(
                "absolute right-0 top-0 z-1 size-2 rounded-full bg-red-light ring-2 ring-gray-2 dark:ring-dark-3",
              )}
            >
              <span className="absolute inset-0 -z-1 animate-ping rounded-full bg-red-light opacity-75" />
            </span>
          )}
        </span>
      </DropdownTrigger>

      <DropdownContent
        align={isMobile ? "end" : "center"}
        className="border border-stroke bg-white px-3.5 py-3 shadow-md dark:border-dark-3 dark:bg-gray-dark min-[350px]:min-w-[20rem]"
      >
        <div className="mb-1 flex items-center justify-between px-2 py-1.5">
          <span className="text-lg font-medium text-dark dark:text-white">
            Notificări
          </span>
          {unreadCount > 0 && (
            <span className="rounded-md bg-primary px-[9px] py-0.5 text-xs font-medium text-white">
              {unreadCount} {unreadCount === 1 ? "nouă" : "noi"}
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="mb-2 w-full rounded-lg border border-primary bg-transparent px-2 py-1.5 text-center text-xs font-medium tracking-wide text-primary outline-none transition-colors hover:bg-blue-light-5 focus:bg-blue-light-5 focus:text-primary focus-visible:border-primary dark:border-dark-3 dark:text-dark-6 dark:hover:border-dark-5 dark:hover:bg-dark-3 dark:hover:text-dark-7 dark:focus-visible:border-dark-5 dark:focus-visible:bg-dark-3 dark:focus-visible:text-dark-7"
          >
            Marchează toate ca citite
          </button>
        )}

        <ul className="mb-3 max-h-[23rem] space-y-1.5 overflow-y-auto">
          {notificationList.map((item, index) => {
            const isRead = readNotifications.has(index);
            return (
              <li key={index} role="menuitem">
                <Link
                  href="#"
                  onClick={() => {
                    setReadNotifications((prev) => new Set(prev).add(index));
                    if (unreadCount === 1) {
                      setIsDotVisible(false);
                    }
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-4 rounded-lg px-2 py-1.5 outline-none hover:bg-gray-2 focus-visible:bg-gray-2 dark:hover:bg-dark-3 dark:focus-visible:bg-dark-3",
                    isRead && "opacity-60",
                  )}
                >
                  <div>
                    <strong
                      className={cn(
                        "block text-sm font-medium text-dark dark:text-white",
                        isRead && "font-normal",
                      )}
                    >
                      {item.title}
                    </strong>

                    <span className="truncate text-sm font-medium text-dark-5 dark:text-dark-6">
                      {item.subTitle}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="#"
          onClick={() => setIsOpen(false)}
          className="block rounded-lg border border-primary p-2 text-center text-sm font-medium tracking-wide text-primary outline-none transition-colors hover:bg-blue-light-5 focus:bg-blue-light-5 focus:text-primary focus-visible:border-primary dark:border-dark-3 dark:text-dark-6 dark:hover:border-dark-5 dark:hover:bg-dark-3 dark:hover:text-dark-7 dark:focus-visible:border-dark-5 dark:focus-visible:bg-dark-3 dark:focus-visible:text-dark-7"
        >
          Vezi toate notificările
        </Link>
      </DropdownContent>
    </Dropdown>
  );
}
