"use client";

import Image from "next/image";
import { useState } from "react";
import { Modal } from "./modal";

interface IdDocumentData {
  seriaBuletin: string;
  numarBuletin: string;
  dataEmiteriiBuletin: string;
  dataExpirareBuletin: string;
  emitentBuletin: string;
  documentImage?: string;
}

interface EditIdDocumentProps {
  isOpen: boolean;
  onClose: () => void;
  data: IdDocumentData;
  onSave: (data: IdDocumentData) => void;
}

export function EditIdDocument({
  isOpen,
  onClose,
  data,
  onSave,
}: EditIdDocumentProps) {
  const [formData, setFormData] = useState(data);
  const [preview, setPreview] = useState<string | null>(
    data.documentImage || null,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFormData((prev) => ({
        ...prev,
        documentImage: url,
      }));
    }
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
      title="Editează act de identitate"
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
              Serie buletin
            </label>
            <input
              type="text"
              name="seriaBuletin"
              value={formData.seriaBuletin}
              onChange={handleChange}
              maxLength={2}
              className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
              Număr buletin
            </label>
            <input
              type="text"
              name="numarBuletin"
              value={formData.numarBuletin}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
              Data emiterii
            </label>
            <input
              type="date"
              name="dataEmiteriiBuletin"
              value={formData.dataEmiteriiBuletin}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
              Data expirării
            </label>
            <input
              type="date"
              name="dataExpirareBuletin"
              value={formData.dataExpirareBuletin}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-dark dark:text-white">
              Emitent
            </label>
            <input
              type="text"
              name="emitentBuletin"
              value={formData.emitentBuletin}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-white px-4 py-2 outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
            Act de identitate (scanare/fotografie)
          </label>
          <div className="space-y-3">
            {preview && (
              <div className="relative rounded-lg border border-stroke p-4 dark:border-dark-3">
                <Image
                  src={preview}
                  alt="Act de identitate"
                  width={600}
                  height={400}
                  className="h-auto w-full rounded-lg object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreview(null);
                    setFormData((prev) => ({ ...prev, documentImage: undefined }));
                  }}
                  className="absolute right-2 top-2 rounded-lg bg-red-light px-3 py-1 text-sm text-white hover:bg-opacity-90"
                >
                  Șterge
                </button>
              </div>
            )}
            <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-stroke bg-gray-2 px-4 py-8 hover:border-primary dark:border-dark-3 dark:bg-dark-2">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="sr-only"
              />
              <span className="text-sm font-medium text-dark dark:text-white">
                {preview ? "Înlocuiește actul" : "Încarcă act de identitate"}
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

