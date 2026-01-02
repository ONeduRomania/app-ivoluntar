"use client";

import { useState } from "react";
import { Modal } from "./modal";

interface AvailabilityData {
  zile: string;
  intervale: string;
  onsite: boolean;
  online: boolean;
  deplasari: boolean;
}

interface EditAvailabilityProps {
  isOpen: boolean;
  onClose: () => void;
  data: AvailabilityData;
  onSave: (data: AvailabilityData) => void;
}

export function EditAvailability({
  isOpen,
  onClose,
  data,
  onSave,
}: EditAvailabilityProps) {
  const [formData, setFormData] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editează disponibilitatea"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
            Zile disponibile
          </label>
          <input
            type="text"
            name="zile"
            value={formData.zile}
            onChange={handleChange}
            placeholder="ex: Luni - Vineri"
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
            Intervale orare
          </label>
          <input
            type="text"
            name="intervale"
            value={formData.intervale}
            onChange={handleChange}
            placeholder="ex: 09:00 - 18:00"
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
            Tipuri de activități
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="onsite"
                checked={formData.onsite}
                onChange={handleChange}
                className="rounded border-stroke text-primary focus:ring-primary dark:border-dark-3"
              />
              <span className="text-sm text-dark dark:text-white">Onsite</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="online"
                checked={formData.online}
                onChange={handleChange}
                className="rounded border-stroke text-primary focus:ring-primary dark:border-dark-3"
              />
              <span className="text-sm text-dark dark:text-white">Online</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="deplasari"
                checked={formData.deplasari}
                onChange={handleChange}
                className="rounded border-stroke text-primary focus:ring-primary dark:border-dark-3"
              />
              <span className="text-sm text-dark dark:text-white">
                Deplasări
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3"
          >
            Anulează
          </button>
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
          >
            Salvează
          </button>
        </div>
      </form>
    </Modal>
  );
}

