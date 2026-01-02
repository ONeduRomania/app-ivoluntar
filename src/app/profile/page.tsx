"use client";

import Image from "next/image";
import { useState } from "react";
import { EditAvailability } from "./_components/edit-availability";
import { EditEducation } from "./_components/edit-education";
import { EditExperience } from "./_components/edit-experience";
import { EditIdDocument } from "./_components/edit-id-document";
import { EditPersonalData } from "./_components/edit-personal-data";
import { EditSkills } from "./_components/edit-skills";
import { InfoRow, InfoSection } from "./_components/info-section";
import { Modal } from "./_components/modal";
import { ProfileHeader } from "./_components/profile-header";

export default function Page() {
  const [data, setData] = useState({
    profilePhoto: "/images/user/user-03.png",
    name: "John Smith",
    organization: "Asociația ONedu",
    status: "activ",
    // Date personale
    numePrenume: "John Smith",
    dataNasterii: "1990-03-15",
    domiciliu: "Str. Exemplu, Nr. 123, București",
    resedinta: "Str. Exemplu, Nr. 123, București",
    telefon: "+40 712 345 678",
    email: "john.smith@example.com",
    cnp: "1900315123456",
    seriaBuletin: "AB",
    numarBuletin: "123456",
    dataEmiteriiBuletin: "2020-01-10",
    dataExpirareBuletin: "2030-01-10",
    emitentBuletin: "SPCLEP Sector 1",
    experienteVoluntariat: [
      {
        id: "1",
        organizatie: "Asociația ONedu",
        pozitie: "Voluntar",
        locatie: "București, România",
        perioada: "2021 - prezent",
        descriere: "Voluntariat în departamentul de comunicare",
      },
    ],
    experienteProfesionale: [
      {
        id: "1",
        organizatie: "Compania XYZ SRL",
        pozitie: "Specialist Marketing",
        locatie: "București, România",
        perioada: "2019 - 2021",
        descriere: "Dezvoltare strategii de marketing",
      },
      {
        id: "2",
        organizatie: "Agenția ABC",
        pozitie: "Asistent Comunicare",
        locatie: "București, România",
        perioada: "2017 - 2019",
        descriere: "Suport pentru activități de comunicare",
      },
    ],
    studii: [
      {
        id: "1",
        tip: "studii",
        institutie: "Universitatea din București",
        specializare: "Comunicare și Relații Publice",
        nivel: "Licență",
        locatie: "București, România",
        perioada: "2016 - 2020",
        descriere: "",
      },
      {
        id: "2",
        tip: "curs",
        institutie: "Cursuri Online",
        specializare: "Management de proiecte",
        locatie: "Online",
        perioada: "2022",
        descriere: "Certificat în management de proiecte",
      },
    ],
    aptitudini: "Comunicare, Organizare, Leadership",
    departament: "Comunicare",
    superiorDirect: "Maria Popescu",
    vechime: "3 ani, 5 luni",
    documentImage: undefined as string | undefined,
    // Disponibilitate
    disponibilitate: {
      zile: "Luni - Vineri",
      intervale: "09:00 - 18:00",
      onsite: true,
      online: true,
      deplasari: true,
    },
  });

  const [modals, setModals] = useState({
    documente: false,
    avertismente: false,
    competente: false,
    disponibilitate: false,
    recompense: false,
    editPersonalData: false,
    editIdDocument: false,
    editExperienceVoluntariat: false,
    editExperienceProfesionala: false,
    editEducation: false,
    editSkills: false,
    viewAllExperiencesVoluntariat: false,
    viewAllExperiencesProfesionale: false,
    viewAllStudii: false,
  });

  const toggleModal = (modal: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const handlePhotoChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setData((prev) => ({ ...prev, profilePhoto: url }));
  };

  const documente = [
    { nume: "Fișa voluntarului", status: "Încărcat", data: "15.01.2024" },
    { nume: "Fișa SSM", status: "Încărcat", data: "15.01.2024" },
    { nume: "Acord parental", status: "Necesar", data: "-" },
    { nume: "Adeverință voluntariat", status: "Încărcat", data: "20.02.2024" },
    { nume: "Certificat voluntar", status: "Încărcat", data: "25.02.2024" },
  ];

  const avertismente = [
    {
      data: "10.03.2024",
      motiv: "Întârziere la activități",
      tip: "Avertisment",
    },
  ];

  const competente = [
    { nume: "Management de proiecte", organizatie: "Asociația ONedu" },
    { nume: "Comunicare eficientă", organizatie: "Asociația ONedu" },
  ];

  const recompense = [
    { data: "15.12.2023", titlu: "Voluntarul lunii", descriere: "Recunoaștere pentru activitate exemplară" },
    { data: "01.06.2023", titlu: "Certificat de excelență", descriere: "Pentru implicare deosebită în proiecte" },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-6">
      <h1 className="text-2xl font-bold text-dark dark:text-white">
        Profilul meu
      </h1>

      <ProfileHeader
        profilePhoto={data.profilePhoto}
        name={data.name}
        organization={data.organization}
        status={data.status}
        vechime={data.vechime}
        onPhotoChange={handlePhotoChange}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Date personale */}
        <InfoSection
          title="Date personale"
          actionButton={{
            label: "Editează",
            onClick: () => toggleModal("editPersonalData"),
          }}
        >
          <InfoRow label="Nume prenume" value={data.numePrenume} />
          <InfoRow
            label="Data nașterii"
            value={new Date(data.dataNasterii).toLocaleDateString("ro-RO")}
          />
          <InfoRow label="Domiciliu" value={data.domiciliu} />
          <InfoRow label="Reședință" value={data.resedinta} />
          <InfoRow label="Telefon" value={data.telefon} />
          <InfoRow label="Email" value={data.email} />
          <InfoRow label="CNP" value={data.cnp} />
        </InfoSection>

        {/* Act de identitate */}
        <InfoSection
          title="Act de identitate"
          actionButton={{
            label: "Verifică/Editează",
            onClick: () => toggleModal("editIdDocument"),
          }}
        >
          <InfoRow
            label="Serie și număr"
            value={`${data.seriaBuletin} ${data.numarBuletin}`}
          />
          <InfoRow
            label="Data emiterii"
            value={new Date(data.dataEmiteriiBuletin).toLocaleDateString("ro-RO")}
          />
          <InfoRow
            label="Data expirării"
            value={new Date(data.dataExpirareBuletin).toLocaleDateString("ro-RO")}
          />
          <InfoRow label="Emitent" value={data.emitentBuletin} />
          {data.documentImage && (
            <div className="mt-3">
              <p className="mb-2 text-xs font-medium text-dark dark:text-white">
                Act încărcat
              </p>
              <button
                onClick={() => toggleModal("editIdDocument")}
                className="text-xs text-primary hover:underline"
              >
                Vezi actul
              </button>
            </div>
          )}
        </InfoSection>

        {/* Informații profesionale */}
        <InfoSection title="Informații profesionale">
          <InfoRow
            label="Aptitudini"
            value={
              <div className="flex items-center gap-2">
                <span>{data.aptitudini}</span>
                <button
                  onClick={() => toggleModal("editSkills")}
                  className="text-xs text-primary hover:underline"
                >
                  Editează
                </button>
              </div>
            }
          />
          <InfoRow label="Departament" value={data.departament} />
          <InfoRow label="Superior direct" value={data.superiorDirect} />
        </InfoSection>

        {/* Istoric voluntariat */}
        <InfoSection
          title="Istoric voluntariat"
          actionButton={{
            label: "Editează",
            onClick: () => toggleModal("editExperienceVoluntariat"),
          }}
        >
          <div className="space-y-3">
            {data.experienteVoluntariat.slice(0, 2).map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-stroke p-3 dark:border-dark-3"
              >
                <p className="font-medium text-dark dark:text-white">
                  {exp.organizatie}
                </p>
                {exp.pozitie && (
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    {exp.pozitie}
                  </p>
                )}
                {exp.locatie && (
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    📍 {exp.locatie}
                  </p>
                )}
                {exp.perioada && (
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    {exp.perioada}
                  </p>
                )}
              </div>
            ))}
            {data.experienteVoluntariat.length > 2 && (
              <button
                onClick={() => toggleModal("viewAllExperiencesVoluntariat")}
                className="w-full rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-primary hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-3"
              >
                Vezi tot ({data.experienteVoluntariat.length})
              </button>
            )}
          </div>
        </InfoSection>

        {/* Istoric profesional (companii) */}
        <InfoSection
          title="Istoric profesional"
          actionButton={{
            label: "Editează",
            onClick: () => toggleModal("editExperienceProfesionala"),
          }}
        >
          <div className="space-y-3">
            {data.experienteProfesionale.slice(0, 2).map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-stroke p-3 dark:border-dark-3"
              >
                <p className="font-medium text-dark dark:text-white">
                  {exp.organizatie}
                </p>
                {exp.pozitie && (
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    {exp.pozitie}
                  </p>
                )}
                {exp.locatie && (
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    📍 {exp.locatie}
                  </p>
                )}
                {exp.perioada && (
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    {exp.perioada}
                  </p>
                )}
              </div>
            ))}
            {data.experienteProfesionale.length > 2 && (
              <button
                onClick={() => toggleModal("viewAllExperiencesProfesionale")}
                className="w-full rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-primary hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-3"
              >
                Vezi tot ({data.experienteProfesionale.length})
              </button>
            )}
          </div>
        </InfoSection>

        {/* Studii */}
        <InfoSection
          title="Studii și cursuri"
          actionButton={{
            label: "Editează",
            onClick: () => toggleModal("editEducation"),
          }}
        >
          <div className="space-y-3">
            {data.studii.slice(0, 2).map((studiu) => (
              <div
                key={studiu.id}
                className="rounded-lg border border-stroke p-3 dark:border-dark-3"
              >
                <div className="mb-1 flex items-center gap-2">
                  <p className="font-medium text-dark dark:text-white">
                    {studiu.institutie}
                  </p>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    {studiu.tip === "curs" ? "Curs" : "Studii"}
                  </span>
                </div>
                {studiu.specializare && (
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    {studiu.specializare}
                  </p>
                )}
                {studiu.nivel && (
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    {studiu.nivel}
                  </p>
                )}
                {studiu.locatie && (
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    📍 {studiu.locatie}
                  </p>
                )}
                {studiu.perioada && (
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    {studiu.perioada}
                  </p>
                )}
              </div>
            ))}
            {data.studii.length > 2 && (
              <button
                onClick={() => toggleModal("viewAllStudii")}
                className="w-full rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-primary hover:bg-gray-2 dark:border-dark-3 dark:hover:bg-dark-3"
              >
                Vezi tot ({data.studii.length})
              </button>
            )}
          </div>
        </InfoSection>

        {/* Status și disponibilitate */}
        <InfoSection
          title="Disponibilitate"
          actionButton={{
            label: "Editează",
            onClick: () => toggleModal("disponibilitate"),
          }}
        >
          <InfoRow
            label="Zile"
            value={data.disponibilitate.zile}
          />
          <InfoRow
            label="Intervale"
            value={data.disponibilitate.intervale}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {data.disponibilitate.onsite && (
              <span className="rounded-full bg-green-light-7 px-3 py-1 text-xs font-medium text-green dark:bg-green/20">
                Onsite
              </span>
            )}
            {data.disponibilitate.online && (
              <span className="rounded-full bg-blue-light-5 px-3 py-1 text-xs font-medium text-blue dark:bg-blue/20">
                Online
              </span>
            )}
            {data.disponibilitate.deplasari && (
              <span className="rounded-full bg-purple-light-5 px-3 py-1 text-xs font-medium text-purple dark:bg-purple/20">
                Deplasări
              </span>
            )}
          </div>
        </InfoSection>

        {/* Documente */}
        <InfoSection
          title="Documente asociate"
          actionButton={{
            label: "Vezi toate",
            onClick: () => toggleModal("documente"),
          }}
        >
          <div className="space-y-2">
            {documente.slice(0, 3).map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-stroke p-3 dark:border-dark-3"
              >
                <span className="text-sm text-dark dark:text-white">
                  {doc.nume}
                </span>
                <span
                  className={`text-xs font-medium ${
                    doc.status === "Încărcat"
                      ? "text-green"
                      : "text-orange-light"
                  }`}
                >
                  {doc.status}
                </span>
              </div>
            ))}
          </div>
        </InfoSection>

        {/* Avertismente și sancțiuni */}
        <InfoSection
          title="Avertismente și sancțiuni"
          actionButton={{
            label: "Vezi detalii",
            onClick: () => toggleModal("avertismente"),
          }}
        >
          <div className="text-center py-4">
            <p className="text-sm text-dark-4 dark:text-dark-6">
              {avertismente.length > 0
                ? `${avertismente.length} avertisment(e)`
                : "Nu există avertismente"}
            </p>
          </div>
        </InfoSection>

        {/* Competențe */}
        <InfoSection
          title="Competențe dobândite"
          actionButton={{
            label: "Vezi toate",
            onClick: () => toggleModal("competente"),
          }}
        >
          <div className="space-y-2">
            {competente.map((comp, index) => (
              <div
                key={index}
                className="rounded-lg border border-stroke p-3 dark:border-dark-3"
              >
                <p className="text-sm font-medium text-dark dark:text-white">
                  {comp.nume}
                </p>
                <p className="text-xs text-dark-4 dark:text-dark-6">
                  {comp.organizatie}
                </p>
              </div>
            ))}
          </div>
        </InfoSection>

        {/* Recompense */}
        <InfoSection
          title="Recompense"
          actionButton={{
            label: "Vezi toate",
            onClick: () => toggleModal("recompense"),
          }}
        >
          <div className="space-y-2">
            {recompense.slice(0, 2).map((rec, index) => (
              <div
                key={index}
                className="rounded-lg border border-stroke p-3 dark:border-dark-3"
              >
                <p className="text-sm font-medium text-dark dark:text-white">
                  {rec.titlu}
                </p>
                <p className="text-xs text-dark-4 dark:text-dark-6">
                  {rec.data}
                </p>
              </div>
            ))}
          </div>
        </InfoSection>
      </div>

      {/* Modal Documente */}
      <Modal
        isOpen={modals.documente}
        onClose={() => toggleModal("documente")}
        title="Documente asociate"
        size="lg"
      >
        <div className="space-y-3">
          {documente.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-stroke p-4 dark:border-dark-3"
            >
              <div>
                <p className="font-medium text-dark dark:text-white">
                  {doc.nume}
                </p>
                <p className="text-xs text-dark-4 dark:text-dark-6">
                  Data: {doc.data}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-medium ${
                    doc.status === "Încărcat"
                      ? "text-green"
                      : "text-orange-light"
                  }`}
                >
                  {doc.status}
                </span>
                {doc.status === "Încărcat" && (
                  <button className="text-xs text-primary hover:underline">
                    Descarcă
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Modal Avertismente */}
      <Modal
        isOpen={modals.avertismente}
        onClose={() => toggleModal("avertismente")}
        title="Avertismente și sancțiuni"
        size="lg"
      >
        <div className="space-y-3">
          {avertismente.length > 0 ? (
            avertismente.map((adv, index) => (
              <div
                key={index}
                className="rounded-lg border border-stroke p-4 dark:border-dark-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-dark dark:text-white">
                    {adv.tip}
                  </span>
                  <span className="text-xs text-dark-4 dark:text-dark-6">
                    {adv.data}
                  </span>
                </div>
                <p className="text-sm text-dark-4 dark:text-dark-6">
                  {adv.motiv}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-dark-4 dark:text-dark-6">
              Nu există avertismente sau sancțiuni
            </p>
          )}
        </div>
      </Modal>

      {/* Modal Competențe */}
      <Modal
        isOpen={modals.competente}
        onClose={() => toggleModal("competente")}
        title="Competențe dobândite"
        size="lg"
      >
        <div className="space-y-3">
          {competente.map((comp, index) => (
            <div
              key={index}
              className="rounded-lg border border-stroke p-4 dark:border-dark-3"
            >
              <p className="mb-1 font-medium text-dark dark:text-white">
                {comp.nume}
              </p>
              <p className="text-xs text-dark-4 dark:text-dark-6">
                Organizație: {comp.organizatie}
              </p>
            </div>
          ))}
        </div>
      </Modal>

      {/* Modal Editare Date Personale */}
      <EditPersonalData
        isOpen={modals.editPersonalData}
        onClose={() => toggleModal("editPersonalData")}
        data={{
          numePrenume: data.numePrenume,
          dataNasterii: data.dataNasterii,
          domiciliu: data.domiciliu,
          resedinta: data.resedinta,
          telefon: data.telefon,
          email: data.email,
          cnp: data.cnp,
        }}
        onSave={(newData) => {
          setData((prev) => ({
            ...prev,
            ...newData,
            name: newData.numePrenume,
          }));
        }}
      />

      {/* Modal Editare Act Identitate */}
      <EditIdDocument
        isOpen={modals.editIdDocument}
        onClose={() => toggleModal("editIdDocument")}
        data={{
          seriaBuletin: data.seriaBuletin,
          numarBuletin: data.numarBuletin,
          dataEmiteriiBuletin: data.dataEmiteriiBuletin,
          dataExpirareBuletin: data.dataExpirareBuletin,
          emitentBuletin: data.emitentBuletin,
          documentImage: data.documentImage,
        }}
        onSave={(newData) => {
          setData((prev) => ({
            ...prev,
            ...newData,
          }));
        }}
      />

      {/* Modal Editare Experiență Voluntariat */}
      <EditExperience
        isOpen={modals.editExperienceVoluntariat}
        onClose={() => toggleModal("editExperienceVoluntariat")}
        experiences={data.experienteVoluntariat}
        onSave={(experiences) => {
          setData((prev) => ({
            ...prev,
            experienteVoluntariat: experiences.map((exp) => ({
              id: exp.id,
              organizatie: exp.organizatie,
              pozitie: exp.pozitie || "",
              locatie: exp.locatie || "",
              perioada: exp.perioada || "",
              descriere: exp.descriere || "",
            })),
          }));
        }}
      />

      {/* Modal Editare Experiență Profesională */}
      <EditExperience
        isOpen={modals.editExperienceProfesionala}
        onClose={() => toggleModal("editExperienceProfesionala")}
        experiences={data.experienteProfesionale}
        onSave={(experiences) => {
          setData((prev) => ({
            ...prev,
            experienteProfesionale: experiences.map((exp) => ({
              id: exp.id,
              organizatie: exp.organizatie,
              pozitie: exp.pozitie || "",
              locatie: exp.locatie || "",
              perioada: exp.perioada || "",
              descriere: exp.descriere || "",
            })),
          }));
        }}
      />

      {/* Modal Editare Aptitudini */}
      <EditSkills
        isOpen={modals.editSkills}
        onClose={() => toggleModal("editSkills")}
        skills={data.aptitudini}
        onSave={(skills) => {
          setData((prev) => ({
            ...prev,
            aptitudini: skills,
          }));
        }}
      />

      {/* Modal Editare Disponibilitate */}
      <EditAvailability
        isOpen={modals.disponibilitate}
        onClose={() => toggleModal("disponibilitate")}
        data={data.disponibilitate}
        onSave={(newData) => {
          setData((prev) => ({
            ...prev,
            disponibilitate: newData,
          }));
        }}
      />

      {/* Modal Editare Studii */}
      <EditEducation
        isOpen={modals.editEducation}
        onClose={() => toggleModal("editEducation")}
        educations={data.studii.map((edu) => ({
          id: edu.id,
          tip: edu.tip as "studii" | "curs",
          institutie: edu.institutie,
          specializare: edu.specializare,
          nivel: edu.nivel,
          locatie: edu.locatie,
          perioada: edu.perioada,
          descriere: edu.descriere,
        }))}
        onSave={(educations) => {
          setData((prev) => ({
            ...prev,
            studii: educations.map((edu) => ({
              id: edu.id,
              tip: edu.tip,
              institutie: edu.institutie,
              specializare: edu.specializare || "",
              nivel: edu.nivel || "",
              locatie: edu.locatie || "",
              perioada: edu.perioada || "",
              descriere: edu.descriere || "",
            })),
          }));
        }}
      />

      {/* Modal Vezi toate experiențele voluntariat */}
      <Modal
        isOpen={modals.viewAllExperiencesVoluntariat}
        onClose={() => toggleModal("viewAllExperiencesVoluntariat")}
        title="Istoric voluntariat"
        size="lg"
      >
        <div className="space-y-4">
          {data.experienteVoluntariat.map((exp) => (
            <div
              key={exp.id}
              className="rounded-lg border border-stroke p-4 dark:border-dark-3"
            >
              <div className="mb-2">
                <p className="font-medium text-dark dark:text-white">
                  {exp.organizatie}
                </p>
                {exp.pozitie && (
                  <p className="text-sm text-dark-4 dark:text-dark-6">
                    {exp.pozitie}
                  </p>
                )}
              </div>
              <div className="space-y-1 text-xs text-dark-4 dark:text-dark-6">
                {exp.locatie && <p>📍 {exp.locatie}</p>}
                {exp.perioada && <p>📅 {exp.perioada}</p>}
                {exp.descriere && (
                  <p className="mt-2 text-sm">{exp.descriere}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Modal Vezi toate experiențele profesionale */}
      <Modal
        isOpen={modals.viewAllExperiencesProfesionale}
        onClose={() => toggleModal("viewAllExperiencesProfesionale")}
        title="Istoric profesional"
        size="lg"
      >
        <div className="space-y-4">
          {data.experienteProfesionale.map((exp) => (
            <div
              key={exp.id}
              className="rounded-lg border border-stroke p-4 dark:border-dark-3"
            >
              <div className="mb-2">
                <p className="font-medium text-dark dark:text-white">
                  {exp.organizatie}
                </p>
                {exp.pozitie && (
                  <p className="text-sm text-dark-4 dark:text-dark-6">
                    {exp.pozitie}
                  </p>
                )}
              </div>
              <div className="space-y-1 text-xs text-dark-4 dark:text-dark-6">
                {exp.locatie && <p>📍 {exp.locatie}</p>}
                {exp.perioada && <p>📅 {exp.perioada}</p>}
                {exp.descriere && (
                  <p className="mt-2 text-sm">{exp.descriere}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Modal Vezi toate studiile */}
      <Modal
        isOpen={modals.viewAllStudii}
        onClose={() => toggleModal("viewAllStudii")}
        title="Studii și cursuri"
        size="lg"
      >
        <div className="space-y-4">
          {data.studii.map((studiu) => (
            <div
              key={studiu.id}
              className="rounded-lg border border-stroke p-4 dark:border-dark-3"
            >
              <div className="mb-2 flex items-center gap-2">
                <p className="font-medium text-dark dark:text-white">
                  {studiu.institutie}
                </p>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {studiu.tip === "curs" ? "Curs" : "Studii"}
                </span>
              </div>
              <div className="space-y-1 text-xs text-dark-4 dark:text-dark-6">
                {studiu.specializare && <p>{studiu.specializare}</p>}
                {studiu.nivel && <p>{studiu.nivel}</p>}
                {studiu.locatie && <p>📍 {studiu.locatie}</p>}
                {studiu.perioada && <p>📅 {studiu.perioada}</p>}
                {studiu.descriere && (
                  <p className="mt-2 text-sm">{studiu.descriere}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Modal Recompense */}
      <Modal
        isOpen={modals.recompense}
        onClose={() => toggleModal("recompense")}
        title="Recompense"
        size="lg"
      >
        <div className="space-y-3">
          {recompense.map((rec, index) => (
            <div
              key={index}
              className="rounded-lg border border-stroke p-4 dark:border-dark-3"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="font-medium text-dark dark:text-white">
                  {rec.titlu}
                </p>
                <span className="text-xs text-dark-4 dark:text-dark-6">
                  {rec.data}
                </span>
              </div>
              <p className="text-sm text-dark-4 dark:text-dark-6">
                {rec.descriere}
              </p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
