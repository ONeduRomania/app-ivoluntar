"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useOrganization } from "@/contexts/organization-context";
import { EditAvailability } from "./_components/edit-availability";
import { EditEducation } from "./_components/edit-education";
import { EditExperience } from "./_components/edit-experience";
import { EditIdDocument } from "./_components/edit-id-document";
import { EditPersonalData } from "./_components/edit-personal-data";
import { EditSkills } from "./_components/edit-skills";
import { InfoRow, InfoSection } from "./_components/info-section";
import { Modal } from "./_components/modal";
import { ProfileHeader } from "./_components/profile-header";
import { MyPositionModal } from "./_components/my-position-modal";

// Funcție pentru calcularea vechimii reale
const calculateVechime = (dataInceput: string): string => {
  const startDate = new Date(dataInceput);
  const now = new Date();
  
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (years === 0) {
    return `${months} ${months === 1 ? "lună" : "luni"}`;
  } else if (months === 0) {
    return `${years} ${years === 1 ? "an" : "ani"}`;
  } else {
    return `${years} ${years === 1 ? "an" : "ani"}, ${months} ${months === 1 ? "lună" : "luni"}`;
  }
};

// Funcție pentru formatarea perioadei cu lună și an
const formatPerioada = (perioada: string): string => {
  // Dacă perioada conține "prezent", formatăm doar începutul
  if (perioada.includes("prezent")) {
    const parts = perioada.split(" - ");
    if (parts.length === 2 && parts[0]) {
      const year = parts[0].trim();
      // Presupunem că începutul este în ianuarie dacă nu este specificat
      return `ianuarie ${year} - prezent`;
    }
    return perioada;
  }
  
  // Dacă perioada are format "YYYY - YYYY"
  const parts = perioada.split(" - ");
  if (parts.length === 2) {
    const startYear = parts[0].trim();
    const endYear = parts[1].trim();
    // Presupunem început în ianuarie și sfârșit în decembrie dacă nu sunt specificate
    return `ianuarie ${startYear} - decembrie ${endYear}`;
  }
  
  return perioada;
};

// Funcție pentru formatarea datei cu zi, lună și an (opțional)
const formatDataCompleta = (data: string): string => {
  if (!data) return "";
  
  // Dacă este "prezent"
  if (data.toLowerCase() === "prezent") {
    return "prezent";
  }
  
  // Dacă are format "YYYY-MM-DD" sau "YYYY-MM"
  const datePattern = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/;
  const match = data.match(datePattern);
  
  if (match) {
    const year = match[1];
    const month = match[2] ? parseInt(match[2]) : null;
    const day = match[3] ? parseInt(match[3]) : null;
    
    const monthNames = [
      "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
      "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"
    ];
    
    if (month && day) {
      return `${day} ${monthNames[month - 1]} ${year}`;
    } else if (month) {
      return `${monthNames[month - 1]} ${year}`;
    } else {
      return year;
    }
  }
  
  return data;
};

// Funcție pentru formatarea perioadei pentru studii și cursuri (cu dată de început și sfârșit)
const formatPerioadaStudii = (dataInceput?: string, dataSfarsit?: string): string => {
  if (!dataInceput) return "";
  
  const start = formatDataCompleta(dataInceput);
  const end = dataSfarsit ? formatDataCompleta(dataSfarsit) : "prezent";
  
  return `${start} - ${end}`;
};

// Funcție pentru formatarea perioadei pentru experiențe profesionale
const formatPerioadaProfesionala = (dataInceput?: string, dataSfarsit?: string): string => {
  if (!dataInceput) return "";
  
  const start = formatDataCompleta(dataInceput);
  const end = dataSfarsit ? formatDataCompleta(dataSfarsit) : "prezent";
  
  return `${start} - ${end}`;
};

export default function Page() {
  const { currentOrganization, getCurrentOrganizationData, getAllVolunteerHistory, organizations } = useOrganization();
  const initialOrgData = getCurrentOrganizationData();
  const allVolunteerHistory = getAllVolunteerHistory();
  
  // Obține toate competențele din toate organizațiile
  const allCompetente = organizations.flatMap(org => 
    (org.data.competente || []).map(comp => ({
      ...comp,
      organizatieId: org.id,
    }))
  );
  
  // Calculează vechimea reală
  const calculatedVechime = calculateVechime(initialOrgData.dataInceput);
  
  const [data, setData] = useState({
    profilePhoto: "/images/user/user-03.png",
    name: "John Smith",
    organization: currentOrganization.name,
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
    experienteVoluntariat: allVolunteerHistory,
    experienteProfesionale: [
      {
        id: "1",
        organizatie: "Compania XYZ SRL",
        pozitie: "Specialist Marketing",
        locatie: "București, România",
        perioada: "2019 - 2021",
        dataInceput: "2019-03-01",
        dataSfarsit: "2021-12-31",
        descriere: "Dezvoltare strategii de marketing",
      },
      {
        id: "2",
        organizatie: "Agenția ABC",
        pozitie: "Asistent Comunicare",
        locatie: "București, România",
        perioada: "2017 - 2019",
        dataInceput: "2017-06-01",
        dataSfarsit: "2019-02-28",
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
        dataInceput: "2016-09-01",
        dataSfarsit: "2020-06-30",
        descriere: "",
        diploma: "",
      },
      {
        id: "2",
        tip: "curs",
        institutie: "Cursuri Online",
        specializare: "Management de proiecte",
        locatie: "Online",
        perioada: "2022",
        dataInceput: "2022-01-15",
        dataSfarsit: "2022-03-15",
        descriere: "Certificat în management de proiecte",
        diploma: "",
      },
    ],
    aptitudini: "Comunicare, Organizare, Leadership",
    functie: initialOrgData.functie,
    departament: initialOrgData.departament,
    superiorDirect: initialOrgData.superiorDirect,
    vechime: calculatedVechime,
    documentImage: undefined as string | undefined,
    // Disponibilitate
    disponibilitate: initialOrgData.disponibilitate,
  });

  const [modals, setModals] = useState({
    documente: false,
    avertismente: false,
    competente: false,
    disponibilitate: false,
    recompense: false,
    editPersonalData: false,
    editIdDocument: false,
    editExperienceProfesionala: false,
    editEducation: false,
    editSkills: false,
    viewAllExperiencesVoluntariat: false,
    viewAllExperiencesProfesionale: false,
    viewAllStudii: false,
    myPosition: false,
  });

  const toggleModal = (modal: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const handlePhotoChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setData((prev) => ({ ...prev, profilePhoto: url }));
  };

  // Actualizează datele organizației când se schimbă în context
  useEffect(() => {
    const orgData = getCurrentOrganizationData();
    const allHistory = getAllVolunteerHistory();
    setData((prev) => ({
      ...prev,
      organization: currentOrganization.name,
      functie: orgData.functie,
      departament: orgData.departament,
      superiorDirect: orgData.superiorDirect,
      vechime: calculateVechime(orgData.dataInceput),
      experienteVoluntariat: allHistory,
      disponibilitate: orgData.disponibilitate,
    }));
  }, [currentOrganization, getCurrentOrganizationData, getAllVolunteerHistory]);

  // Obține datele din context pentru a le folosi în componentă
  const orgData = getCurrentOrganizationData();
  const documente = orgData.documente || [];
  const avertismente = orgData.avertismente || [];
  const competente = orgData.competente || [];
  const recompense = orgData.recompense || [];

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
        onViewOrgChart={() => toggleModal("myPosition")}
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
            value={(() => {
              const date = new Date(data.dataNasterii);
              return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
            })()}
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
            value={(() => {
              const date = new Date(data.dataEmiteriiBuletin);
              return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
            })()}
          />
          <InfoRow
            label="Data expirării"
            value={(() => {
              const date = new Date(data.dataExpirareBuletin);
              return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
            })()}
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
          <InfoRow label="Funcție" value={data.functie} />
          <InfoRow label="Departament" value={data.departament} />
          <InfoRow label="Superior direct" value={data.superiorDirect} />
          <InfoRow
            label="Data aderării"
            value={(() => {
              const orgData = getCurrentOrganizationData();
              const date = new Date(orgData.dataInceput);
              const monthNames = [
                "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
                "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"
              ];
              return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
            })()}
          />
        </InfoSection>

        {/* Istoric voluntariat */}
        <InfoSection title="Istoric voluntariat">
          <div className="space-y-3">
            {data.experienteVoluntariat.slice(0, 2).map((exp) => {
              // Găsește competențele pentru această organizație
              const expCompetente = allCompetente.filter(comp => 
                comp.organizatie === exp.organizatie
              );
              
              return (
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
                      {(exp as any).departament && ` - ${(exp as any).departament}`}
                    </p>
                  )}
                  {((exp as any).dataInceput || (exp as any).dataSfarsit) && (
                    <p className="text-xs text-dark-4 dark:text-dark-6">
                      {formatPerioadaProfesionala((exp as any).dataInceput, (exp as any).dataSfarsit)}
                    </p>
                  )}
                  {expCompetente.length > 0 && (
                    <div className="mt-3">
                      <p className="mb-2 text-xs font-medium text-dark-4 dark:text-dark-6">
                        Competențe dobândite:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {expCompetente.map((comp, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20"
                          >
                            {comp.nume}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
              </div>
            ))}
            {data.experienteProfesionale.length > 0 && (
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
            {[...data.studii]
              .sort((a, b) => {
                // Sortează după data de sfârșit (sau început dacă nu există sfârșit), descrescător
                const dateA = (a as any).dataSfarsit || (a as any).dataInceput || "";
                const dateB = (b as any).dataSfarsit || (b as any).dataInceput || "";
                if (!dateA && !dateB) return 0;
                if (!dateA) return 1;
                if (!dateB) return -1;
                return new Date(dateB).getTime() - new Date(dateA).getTime();
              })
              .slice(0, 2)
              .map((studiu) => (
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
              </div>
            ))}
            {data.studii.length > 0 && (
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


      {/* Modal Editare Experiență Profesională */}
      <EditExperience
        isOpen={modals.editExperienceProfesionala}
        onClose={() => toggleModal("editExperienceProfesionala")}
        experiences={data.experienteProfesionale.map((exp) => ({
          id: exp.id,
          organizatie: exp.organizatie,
          pozitie: exp.pozitie,
          locatie: exp.locatie,
          perioada: exp.perioada,
          dataInceput: (exp as any).dataInceput,
          dataSfarsit: (exp as any).dataSfarsit,
          descriere: exp.descriere,
        }))}
        onSave={(experiences) => {
          setData((prev) => ({
            ...prev,
            experienteProfesionale: experiences.map((exp) => ({
              id: exp.id,
              organizatie: exp.organizatie,
              pozitie: exp.pozitie || "",
              locatie: exp.locatie || "",
              perioada: exp.perioada || "",
              dataInceput: exp.dataInceput || "",
              dataSfarsit: exp.dataSfarsit || "",
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
          dataInceput: (edu as any).dataInceput,
          dataSfarsit: (edu as any).dataSfarsit,
          descriere: edu.descriere,
          diploma: (edu as any).diploma,
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
              dataInceput: edu.dataInceput || "",
              dataSfarsit: edu.dataSfarsit || "",
              descriere: edu.descriere || "",
              diploma: edu.diploma || "",
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
          {data.experienteVoluntariat.map((exp) => {
            // Găsește competențele pentru această organizație
            const expCompetente = allCompetente.filter(comp => 
              comp.organizatie === exp.organizatie
            );
            
            return (
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
                      {(exp as any).departament && ` - ${(exp as any).departament}`}
                    </p>
                  )}
                </div>
                {exp.perioada && (
                  <p className="text-xs text-dark-4 dark:text-dark-6">
                    {formatPerioada(exp.perioada)}
                  </p>
                )}
                {expCompetente.length > 0 && (
                  <div className="mt-3">
                    <p className="mb-2 text-xs font-medium text-dark-4 dark:text-dark-6">
                      Competențe dobândite:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {expCompetente.map((comp, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20"
                        >
                          {comp.nume}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
                {(exp.pozitie || exp.locatie) && (
                  <p className="text-sm text-dark-4 dark:text-dark-6">
                    {exp.pozitie}
                    {exp.pozitie && exp.locatie && " | "}
                    {exp.locatie}
                  </p>
                )}
              </div>
              <div className="space-y-1 text-xs text-dark-4 dark:text-dark-6">
                {exp.locatie && <p>Locație: {exp.locatie}</p>}
                {((exp as any).dataInceput || (exp as any).dataSfarsit) && (
                  <p>Perioadă: {formatPerioadaProfesionala((exp as any).dataInceput, (exp as any).dataSfarsit)}</p>
                )}
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
          {[...data.studii]
            .sort((a, b) => {
              // Sortează după data de sfârșit (sau început dacă nu există sfârșit), descrescător
              const dateA = (a as any).dataSfarsit || (a as any).dataInceput || "";
              const dateB = (b as any).dataSfarsit || (b as any).dataInceput || "";
              if (!dateA && !dateB) return 0;
              if (!dateA) return 1;
              if (!dateB) return -1;
              return new Date(dateB).getTime() - new Date(dateA).getTime();
            })
            .map((studiu) => (
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
                {studiu.specializare && <p>Specializare: {studiu.specializare}</p>}
                {studiu.nivel && <p>Nivel: {studiu.nivel}</p>}
                {studiu.locatie && <p>Locație: {studiu.locatie}</p>}
                {((studiu as any).dataInceput || (studiu as any).dataSfarsit) && (
                  <p>Perioadă: {formatPerioadaStudii((studiu as any).dataInceput, (studiu as any).dataSfarsit)}</p>
                )}
                {studiu.descriere && (
                  <p className="mt-2 text-sm">Descriere: {studiu.descriere}</p>
                )}
                {(studiu as any).diploma && (
                  <div className="mt-2">
                    <p className="mb-1 text-xs font-medium text-dark-4 dark:text-dark-6">
                      Diplomă:
                    </p>
                    <div className="flex items-center gap-2">
                      <a
                        href={(studiu as any).diploma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Vezi diplomă
                      </a>
                    </div>
                  </div>
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

      {/* Modal Poziția mea */}
      <MyPositionModal
        isOpen={modals.myPosition}
        onClose={() => toggleModal("myPosition")}
        currentUser={{
          firstName: data.name.split(" ")[0] || "John",
          lastName: data.name.split(" ").slice(1).join(" ") || "Smith",
          position: data.functie,
          department: data.departament,
        }}
      />
    </div>
  );
}
