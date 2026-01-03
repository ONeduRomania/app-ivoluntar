"use client";

import { useState } from "react";
import { Modal } from "./modal";

interface Education {
  id: string;
  tip: "studii" | "curs";
  institutie: string;
  specializare?: string;
  nivel?: string;
  locatie?: string;
  perioada?: string;
  dataInceput?: string;
  dataSfarsit?: string;
  descriere?: string;
  diploma?: string;
}

interface EditEducationProps {
  isOpen: boolean;
  onClose: () => void;
  educations: Education[];
  onSave: (educations: Education[]) => void;
}

export function EditEducation({
  isOpen,
  onClose,
  educations,
  onSave,
}: EditEducationProps) {
  const [formEducations, setFormEducations] = useState<Education[]>(educations);
  const [diplomaFiles, setDiplomaFiles] = useState<Record<string, string>>({});

  const addEducation = () => {
    setFormEducations((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        tip: "studii",
        institutie: "",
        specializare: "",
        nivel: "",
        locatie: "",
        perioada: "",
        dataInceput: "",
        dataSfarsit: "",
        descriere: "",
        diploma: "",
      },
    ]);
  };

  const removeEducation = (id: string) => {
    setFormEducations((prev) => prev.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setFormEducations((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    );
  };

  const handleDiplomaUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setDiplomaFiles((prev) => ({ ...prev, [id]: result }));
      updateEducation(id, "diploma", result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formEducations);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editează studiile"
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          {formEducations.map((edu, index) => (
            <div
              key={edu.id}
              className="rounded-lg border border-stroke p-4 dark:border-dark-3"
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-medium text-dark dark:text-white">
                  Studii {index + 1}
                </h4>
                {formEducations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="text-sm text-red-light hover:underline"
                  >
                    Șterge
                  </button>
                )}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    Tip *
                  </label>
                  <select
                    value={edu.tip}
                    onChange={(e) =>
                      updateEducation(
                        edu.id,
                        "tip",
                        e.target.value as "studii" | "curs",
                      )
                    }
                    className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                  >
                    <option value="studii">Studii</option>
                    <option value="curs">Curs</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    Instituție *
                  </label>
                  <input
                    type="text"
                    value={edu.institutie}
                    onChange={(e) =>
                      updateEducation(edu.id, "institutie", e.target.value)
                    }
                    className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                    required
                  />
                </div>

                {edu.tip === "studii" && (
                  <>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                        Specializare
                      </label>
                      <input
                        type="text"
                        value={edu.specializare || ""}
                        onChange={(e) =>
                          updateEducation(edu.id, "specializare", e.target.value)
                        }
                        className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                        Nivel
                      </label>
                      <select
                        value={edu.nivel || ""}
                        onChange={(e) =>
                          updateEducation(edu.id, "nivel", e.target.value)
                        }
                        className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                      >
                        <option value="">Selectează</option>
                        <option value="Liceu">Liceu</option>
                        <option value="Post-liceală">Post-liceală</option>
                        <option value="Licență">Licență</option>
                        <option value="Master">Master</option>
                        <option value="Doctorat">Doctorat</option>
                      </select>
                    </div>
                  </>
                )}

                {edu.tip === "curs" && (
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                      Denumire curs
                    </label>
                    <input
                      type="text"
                      value={edu.specializare || ""}
                      onChange={(e) =>
                        updateEducation(edu.id, "specializare", e.target.value)
                      }
                      placeholder="ex: Management de proiecte"
                      className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    Locație
                  </label>
                  <input
                    type="text"
                    value={edu.locatie || ""}
                    onChange={(e) =>
                      updateEducation(edu.id, "locatie", e.target.value)
                    }
                    placeholder="ex: București, România"
                    className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    Data de început *
                  </label>
                  <input
                    type="date"
                    value={edu.dataInceput || ""}
                    onChange={(e) =>
                      updateEducation(edu.id, "dataInceput", e.target.value)
                    }
                    className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    Data de sfârșit
                  </label>
                  <input
                    type="date"
                    value={edu.dataSfarsit || ""}
                    onChange={(e) =>
                      updateEducation(edu.id, "dataSfarsit", e.target.value)
                    }
                    className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                  />
                  <p className="mt-1 text-xs text-dark-4 dark:text-dark-6">
                    Lăsați gol pentru "prezent"
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    Diplomă
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleDiplomaUpload(edu.id, file);
                      }
                    }}
                    className="w-full rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
                  />
                  {diplomaFiles[edu.id] && (
                    <div className="mt-2">
                      <p className="mb-1 text-xs text-green dark:text-green-light">
                        ✓ Document încărcat
                      </p>
                      <a
                        href={diplomaFiles[edu.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Vezi document
                      </a>
                    </div>
                  )}
                  {edu.diploma && !diplomaFiles[edu.id] && (
                    <div className="mt-2">
                      <p className="mb-1 text-xs text-dark-4 dark:text-dark-6">
                        Document existent:
                      </p>
                      <a
                        href={edu.diploma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Vezi document
                      </a>
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-dark dark:text-white">
                    Descriere
                  </label>
                  <textarea
                    value={edu.descriere || ""}
                    onChange={(e) =>
                      updateEducation(edu.id, "descriere", e.target.value)
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
          onClick={addEducation}
          className="w-full rounded-lg border-2 border-dashed border-stroke px-4 py-2 text-sm font-medium text-dark hover:border-primary dark:border-dark-3 dark:text-white"
        >
          + Adaugă studii
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

