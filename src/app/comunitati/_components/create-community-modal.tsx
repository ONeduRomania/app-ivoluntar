"use client";

import { createPortal } from "react-dom";
import { useState } from "react";
import { Community } from "./community-card";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (community: Omit<Community, "id" | "membersCount">) => void;
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 5L5 15M5 5l10 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CreateCommunityModal({
  isOpen,
  onClose,
  onCreate,
}: CreateCommunityModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Regională",
    location: "",
    isPrivate: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ["Regională", "Departament", "Program"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Șterge eroarea când utilizatorul începe să scrie
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Numele comunității este obligatoriu";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrierea este obligatorie";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Descrierea trebuie să aibă cel puțin 20 de caractere";
    }

    if (!formData.category) {
      newErrors.category = "Categoria este obligatorie";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onCreate({
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category,
      location: formData.location.trim() || undefined,
      isPrivate: formData.isPrivate,
      isMember: true, // Creatorul este automat membru
      createdBy: "current-user", // TODO: Înlocuiește cu ID-ul utilizatorului curent
    });

    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "Regională",
      location: "",
      isPrivate: false,
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            Creează o comunitate nouă
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-dark-4 transition-colors hover:bg-gray-2 dark:text-dark-6 dark:hover:bg-dark-2"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
              Numele comunității *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-dark-2 dark:text-white ${
                errors.name
                  ? "border-red-light"
                  : "border-stroke dark:border-dark-3"
              }`}
              placeholder="ex: Comunitatea Voluntarilor din Cluj"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-light">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
              Descriere *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-dark-2 dark:text-white ${
                errors.description
                  ? "border-red-light"
                  : "border-stroke dark:border-dark-3"
              }`}
              placeholder="Descrie comunitatea ta, obiectivele și activitățile planificate..."
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-light">{errors.description}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                Categorie *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary dark:bg-dark-2 dark:text-white ${
                  errors.category
                    ? "border-red-light"
                    : "border-stroke dark:border-dark-3"
                }`}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-xs text-red-light">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
                Locație (opțional)
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-lg border border-stroke px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
                placeholder="ex: București, România"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPrivate"
              id="isPrivate"
              checked={formData.isPrivate}
              onChange={handleChange}
              className="size-4 rounded border-stroke text-primary focus:ring-primary dark:border-dark-3"
            />
            <label
              htmlFor="isPrivate"
              className="text-sm text-dark dark:text-white"
            >
              Comunitate privată (doar cu invitație)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-dark transition-colors hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3"
            >
              Anulează
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Creează comunitatea
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return typeof window !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

