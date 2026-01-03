"use client";

import { cn } from "@/lib/utils";
import { SetStateActionType } from "@/types/set-state-action-type";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type DropdownContextType = {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdownContext must be used within a Dropdown");
  }
  return context;
}

type DropdownProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: SetStateActionType<boolean>;
};

export function Dropdown({ children, isOpen, setIsOpen }: DropdownProps) {
  const triggerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;

      document.body.style.pointerEvents = "none";
    } else {
      document.body.style.removeProperty("pointer-events");

      setTimeout(() => {
        triggerRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  return (
    <DropdownContext.Provider value={{ isOpen, handleOpen, handleClose, containerRef }}>
      <div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

type DropdownContentProps = {
  align?: "start" | "end" | "center";
  className?: string;
  children: React.ReactNode;
  position?: "top" | "bottom";
};

export function DropdownContent({
  children,
  align = "center",
  className,
  position = "bottom",
}: DropdownContentProps) {
  const { isOpen, handleClose, containerRef } = useDropdownContext();
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClose, containerRef]);

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const contentHeight = contentRef.current?.offsetHeight || 0;
      const contentWidth = contentRef.current?.offsetWidth || 200;

      let top = 0;
      let left = 0;

      if (position === "bottom") {
        top = containerRect.bottom + window.scrollY + 8;
      } else {
        top = containerRect.top + window.scrollY - contentHeight - 8;
      }

      if (align === "start") {
        left = containerRect.left + window.scrollX;
      } else if (align === "end") {
        left = containerRect.right + window.scrollX - contentWidth;
      } else {
        left = containerRect.left + window.scrollX + (containerRect.width - contentWidth) / 2;
      }

      setPositionStyle({
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 10000,
      });
    }
  }, [isOpen, align, position, containerRef]);

  if (!isOpen) return null;

  const content = (
    <div
      ref={contentRef}
      role="menu"
      aria-orientation="vertical"
      style={positionStyle}
      className={cn(
        "pointer-events-auto min-w-[8rem] rounded-lg border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark",
        className,
      )}
    >
      {children}
    </div>
  );

  return typeof window !== "undefined"
    ? createPortal(content, document.body)
    : null;
}

type DropdownTriggerProps = React.HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function DropdownTrigger({ children, className }: DropdownTriggerProps) {
  const { handleOpen, isOpen } = useDropdownContext();

  return (
    <button
      className={className}
      onClick={handleOpen}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
    </button>
  );
}

export function DropdownClose({ children }: PropsWithChildren) {
  const { handleClose } = useDropdownContext();

  return <div onClick={handleClose}>{children}</div>;
}
