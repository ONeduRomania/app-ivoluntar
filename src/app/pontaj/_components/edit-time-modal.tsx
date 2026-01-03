"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "./timesheet-icons";

interface EditTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: {
    id: string;
    date: string;
    hours: number;
    minutes: number;
    activity: string;
    description?: string;
  };
  onSave: (data: {
    id: string;
    date: string;
    hours: number;
    minutes: number;
    activity: string;
    customActivity?: string;
    description?: string;
  }) => void;
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

export function EditTimeModal({
  isOpen,
  onClose,
  entry,
  onSave,
}: EditTimeModalProps) {
  const [date, setDate] = useState(entry.date);
  const [hours, setHours] = useState(entry.hours);
  const [minutes, setMinutes] = useState(entry.minutes);
  const [selectedActivity, setSelectedActivity] = useState(entry.activity);
  const [customActivity, setCustomActivity] = useState("");
  const [description, setDescription] = useState(entry.description || "");

  useEffect(() => {
    if (isOpen) {
      setDate(entry.date);
      setHours(entry.hours);
      setMinutes(entry.minutes);
      setSelectedActivity(entry.activity);
      setDescription(entry.description || "");
    }
  }, [isOpen, entry]);

  if (!isOpen) return null;

  const isOtherSelected = selectedActivity === "Altele";
  const canSave =
    date &&
    (hours > 0 || minutes > 0) &&
    selectedActivity &&
    (isOtherSelected ? customActivity.trim() : true);

  const handleSave = () => {
    if (!canSave) return;

    onSave({
      id: entry.id,
      date,
      hours,
      minutes,
      activity: selectedActivity,
      customActivity: isOtherSelected ? customActivity.trim() : undefined,
      description: description.trim() || undefined,
    });
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            Editează pontaj
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-dark-4 transition-colors hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-dark-4 dark:text-dark-6">
              Data <span className="text-red">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-dark-4 dark:text-dark-6">
                Ore <span className="text-red">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-dark-4 dark:text-dark-6">
                Minute <span className="text-red">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-dark-4 dark:text-dark-6">
              Activitate <span className="text-red">*</span>
            </label>
            <select
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
            <div>
              <label className="mb-2 block text-sm font-medium text-dark-4 dark:text-dark-6">
                Specifică activitatea <span className="text-red">*</span>
              </label>
              <input
                type="text"
                value={customActivity}
                onChange={(e) => setCustomActivity(e.target.value)}
                placeholder="Introdu numele activității..."
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-2.5 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
                required
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-dark-4 dark:text-dark-6">
              Descriere (opțional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adaugă o descriere pentru această sesiune de voluntariat..."
              className="h-24 w-full rounded-lg border border-stroke bg-transparent px-4 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
              rows={3}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
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

  return typeof window !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

