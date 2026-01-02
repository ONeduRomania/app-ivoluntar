"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon } from "./time-tracking-icons";
import { SaveTimeModal } from "./save-time-modal";

export function TimeTrackingCard() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    if (time > 0) {
      setIsRunning(false);
      setShowSaveModal(true);
    }
  };

  const handleSave = (data: {
    hours: number;
    minutes: number;
    activity: string;
    customActivity?: string;
    description?: string;
  }) => {
    // TODO: Implementare salvare în backend
    console.log("Salvare pontaj:", data);
    setTime(0);
    setShowSaveModal(false);
  };

  const handleCancelSave = () => {
    setShowSaveModal(false);
    setTime(0);
  };

  return (
    <>
      <div className="rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-dark-4 dark:text-dark-6">
            Pontare
          </h3>

          <div className="text-center">
            <p className="text-3xl font-bold text-dark dark:text-white">
              {formatTime(time)}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleToggle}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                isRunning
                  ? "bg-red text-white hover:bg-red-dark"
                  : "bg-primary text-white hover:bg-primary/90",
              )}
            >
              {isRunning ? (
                <>
                  <PauseIcon className="size-4" />
                  Pauză
                </>
              ) : (
                <>
                  <PlayIcon className="size-4" />
                  Start
                </>
              )}
            </button>
            {time > 0 && (
              <button
                onClick={handleStop}
                className="flex-1 rounded-lg border border-stroke bg-white px-4 py-2 text-sm font-medium text-dark-4 transition-colors hover:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6 dark:hover:bg-dark-3"
              >
                Stop
              </button>
            )}
          </div>
        </div>
      </div>

      <SaveTimeModal
        isOpen={showSaveModal}
        onClose={handleCancelSave}
        onSave={handleSave}
        totalSeconds={time}
      />
    </>
  );
}

