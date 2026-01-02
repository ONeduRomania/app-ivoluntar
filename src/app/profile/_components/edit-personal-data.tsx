"use client";

import { useState } from "react";
import { Modal } from "./modal";
import { InfoRow } from "./info-section";

interface EditPersonalDataProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    numePrenume: string;
    dataNasterii: string;
    domiciliu: string;
    resedinta: string;
    telefon: string;
    email: string;
    cnp: string;
  };
  onSave: (data: typeof props.data) => void;
}

export function EditPersonalData({
  isOpen,
  onClose,
  data,
  onSave,
}: EditPersonalDataProps) {
  const [formData, setFormData] = useState(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editează datele personale" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
            Nume prenume
          </label>
          <input
            type="text"
            name="numePrenume"
            value={formData.numePrenume}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
            Data nașterii
          </label>
          <input
            type="date"
            name="dataNasterii"
            value={formData.dataNasterii}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
            Domiciliu
          </label>
          <input
            type="text"
            name="domiciliu"
            value={formData.domiciliu}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
            Reședință
          </label>
          <input
            type="text"
            name="resedinta"
            value={formData.resedinta}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
            Telefon
          </label>
          <input
            type="tel"
            name="telefon"
            value={formData.telefon}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
            CNP
          </label>
          <input
            type="text"
            name="cnp"
            value={formData.cnp}
            onChange={handleChange}
            maxLength={13}
            className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
            required
          />
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

