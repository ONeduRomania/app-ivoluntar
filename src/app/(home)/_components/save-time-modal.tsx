"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { XIcon } from "./time-tracking-icons";

interface SaveTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    hours: number;
    minutes: number;
    activity: string;
    customActivity?: string;
    description?: string;
  }) => void;
  totalSeconds: number;
}

// TODO: Aceste activități ar trebui să vină din backend/organizație
const ACTIVITIES = [
  "Activități administrative",
  "Suport pentru evenimente",
  "Comunicare și marketing",
  "Fundraising",
  "Proiecte sociale",
  "Training și dezvoltare",
  "Altele",
];

export function SaveTimeModal({
  isOpen,
  onClose,
  onSave,
  totalSeconds,
}: SaveTimeModalProps) {
  const [description, setDescription] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [customActivity, setCustomActivity] = useState("");

  if (!isOpen) return null;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const totalMinutes = hours * 60 + minutes;
  const isMinimumTime = totalMinutes >= 5;

  const isOtherSelected = selectedActivity === "Altele";
  const canSave = selectedActivity && (isOtherSelected ? customActivity.trim() : true) && isMinimumTime;

  const handleSave = () => {
    if (!canSave) return;

    onSave({
      hours,
      minutes,
      activity: selectedActivity,
      customActivity: isOtherSelected ? customActivity.trim() : undefined,
      description: description.trim() || undefined,
    });
    setDescription("");
    setSelectedActivity("");
    setCustomActivity("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            Salvează ora de pontaj
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-dark-4 transition-colors hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-dark-4 dark:text-dark-6">
            Timp înregistrat:
          </p>
          <p className="text-2xl font-bold text-dark dark:text-white">
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}
          </p>
          {!isMinimumTime && (
            <p className="mt-2 text-xs text-red">
              Timpul minim pentru salvare este de 5 minute
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="activity"
            className="mb-2 block text-sm font-medium text-dark-4 dark:text-dark-6"
          >
            Activitate / Proiect <span className="text-red">*</span>
          </label>
          <select
            id="activity"
            value={selectedActivity}
            onChange={(e) => {
              setSelectedActivity(e.target.value);
              if (e.target.value !== "Altele") {
                setCustomActivity("");
              }
            }}
            className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
            required
          >
            <option value="">Selectează o activitate</option>
            {ACTIVITIES.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </div>

        {isOtherSelected && (
          <div className="mb-4">
            <label
              htmlFor="customActivity"
              className="mb-2 block text-sm font-medium text-dark-4 dark:text-dark-6"
            >
              Specifică activitatea <span className="text-red">*</span>
            </label>
            <input
              id="customActivity"
              type="text"
              value={customActivity}
              onChange={(e) => setCustomActivity(e.target.value)}
              placeholder="Introdu numele activității..."
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
              required
            />
          </div>
        )}

        <div className="mb-6">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-dark-4 dark:text-dark-6"
          >
            Descriere (opțional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Adaugă o descriere pentru această sesiune de voluntariat..."
            className="h-24 w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
            rows={3}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-stroke bg-white px-4 py-2.5 text-sm font-medium text-dark-4 transition-colors hover:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-dark-6 dark:hover:bg-dark-3"
          >
            Anulează
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className={cn(
              "flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors",
              canSave
                ? "bg-primary hover:bg-primary/90"
                : "cursor-not-allowed bg-gray-4 dark:bg-dark-3",
            )}
          >
            Salvează
          </button>
        </div>
      </div>
    </div>
  );
}

