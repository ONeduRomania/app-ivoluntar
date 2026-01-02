"use client";

import { useState } from "react";
import { Modal } from "./modal";

interface EditSkillsProps {
  isOpen: boolean;
  onClose: () => void;
  skills: string;
  onSave: (skills: string) => void;
}

export function EditSkills({
  isOpen,
  onClose,
  skills,
  onSave,
}: EditSkillsProps) {
  const [skillsList, setSkillsList] = useState<string[]>(
    skills ? skills.split(",").map((s) => s.trim()) : [],
  );
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skillsList.includes(newSkill.trim())) {
      setSkillsList((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkillsList((prev) => prev.filter((s) => s !== skill));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(skillsList.join(", "));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editează aptitudinile" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
            Adaugă aptitudine
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="ex: Comunicare"
              className="flex-1 rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
            />
            <button
              type="button"
              onClick={addSkill}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              Adaugă
            </button>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
            Aptitudini
          </label>
          <div className="flex flex-wrap gap-2 rounded-lg border border-stroke p-3 dark:border-dark-3">
            {skillsList.length > 0 ? (
              skillsList.map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary dark:bg-primary/20"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 text-primary hover:text-red-light"
                  >
                    ×
                  </button>
                </span>
              ))
            ) : (
              <p className="text-sm text-dark-4 dark:text-dark-6">
                Nu există aptitudini adăugate
              </p>
            )}
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

