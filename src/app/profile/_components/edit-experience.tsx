"use client";

import { useState } from "react";
import { Modal } from "./modal";

interface Experience {
  id: string;
  organizatie: string;
  pozitie?: string;
  locatie?: string;
  perioada?: string;
  descriere?: string;
}

interface EditExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  experiences: Experience[];
  onSave: (experiences: Experience[]) => void;
}

export function EditExperience({
  isOpen,
  onClose,
  experiences,
  onSave,
}: EditExperienceProps) {
  const [formExperiences, setFormExperiences] = useState<Experience[]>(experiences);

  const addExperience = () => {
    setFormExperiences((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        organizatie: "",
        pozitie: "",
        locatie: "",
        perioada: "",
        descriere: "",
      },
    ]);
  };

  const removeExperience = (id: string) => {
    setFormExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setFormExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formExperiences);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editează experiența"
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {formExperiences.map((exp, index) => (
            <div
              key={exp.id}
              className="rounded-lg border border-stroke p-4 dark:border-dark-3"
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-medium text-dark dark:text-white">
                  Experiență {index + 1}
                </h4>
                {formExperiences.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="text-sm text-red-light hover:underline"
                  >
                    Șterge
                  </button>
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    Organizație/Companie *
                  </label>
                  <input
                    type="text"
                    value={exp.organizatie}
                    onChange={(e) =>
                      updateExperience(exp.id, "organizatie", e.target.value)
                    }
                    className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    Poziție
                  </label>
                  <input
                    type="text"
                    value={exp.pozitie || ""}
                    onChange={(e) =>
                      updateExperience(exp.id, "pozitie", e.target.value)
                    }
                    className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    Locație
                  </label>
                  <input
                    type="text"
                    value={exp.locatie || ""}
                    onChange={(e) =>
                      updateExperience(exp.id, "locatie", e.target.value)
                    }
                    placeholder="ex: București, România"
                    className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    Perioadă
                  </label>
                  <input
                    type="text"
                    value={exp.perioada || ""}
                    onChange={(e) =>
                      updateExperience(exp.id, "perioada", e.target.value)
                    }
                    placeholder="ex: 2020 - 2023"
                    className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    Descriere
                  </label>
                  <textarea
                    value={exp.descriere || ""}
                    onChange={(e) =>
                      updateExperience(exp.id, "descriere", e.target.value)
                    }
                    rows={3}
                    className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="w-full rounded-lg border-2 border-dashed border-stroke px-4 py-2 text-sm font-medium text-dark hover:border-primary dark:border-dark-3 dark:text-white"
        >
          + Adaugă experiență
        </button>

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

