"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface OrganizationData {
  // Date de bază
  functie: string;
  departament: string;
  superiorDirect: string;
  vechime: string;
  dataInceput: string;
  
  // Ore și pontaj
  oreLunaAceasta: number;
  orePlanificate: number;
  totalOre: number;
  oreAprobate: number;
  oreInAsteptare: number;
  timesheetEntries: Array<{
    id: string;
    date: string;
    hours: number;
    minutes: number;
    activity: string;
    description?: string;
    status: "approved" | "pending" | "rejected";
  }>;
  
  // Profil
  experienteVoluntariat?: Array<{
    id: string;
    organizatie: string;
    pozitie: string;
    departament?: string;
    locatie: string;
    perioada: string;
    descriere: string;
  }>;
  disponibilitate: {
    zile: string;
    intervale: string;
    onsite: boolean;
    online: boolean;
    deplasari: boolean;
  };
  documente: Array<{
    nume: string;
    status: string;
    data: string;
  }>;
  avertismente: Array<{
    data: string;
    motiv: string;
    tip: string;
  }>;
  competente: Array<{
    nume: string;
    organizatie: string;
  }>;
  recompense: Array<{
    data: string;
    titlu: string;
    descriere: string;
  }>;
  organigrama?: {
    superior?: { name: string; position: string };
    colleagues?: Array<{ name: string; position: string }>;
    subordinates?: Array<{ name: string; position: string }>;
  };
  
  // Dashboard
  activitatiRecente: Array<{
    id: string;
    activity: string;
    hours: number;
    minutes: number;
    date: string;
    status: "approved" | "pending" | "rejected";
  }>;
  documenteDeSemnat: Array<{
    id: string;
    title: string;
    type: string;
    deadline?: string;
    priority: "high" | "medium" | "low";
  }>;
  zileDeNastere: Array<{
    id: string;
    name: string;
    date: string;
    daysUntil: number;
  }>;
  
  // Agenda telefonică - contacte specifice organizației
  contacte?: Array<{
    id: string;
    firstName: string;
    lastName: string;
    organization: string;
    function?: string;
    department?: string;
    category?: string; // Categorie dinamică definită de manager
    emails?: string[];
    mobilePhone?: string;
    workPhone?: string;
    landlinePhone?: string;
    address?: string;
    isPublic: boolean;
  }>;
  // Categorii disponibile pentru agenda telefonică (definite de manager)
  contactCategories?: string[];
  
  // Noutăți - postări specifice organizației
  noutati?: Array<{
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    content?: string;
    image?: string;
  }>;
  
  // Evaluări - întocmite împreună de superiorul direct și managerul HR
  evaluari?: Array<{
    id: string;
    data: string;
    superiorDirect: string;
    managerHR: string;
    categorie: string;
    notaGenerala?: number;
    comentariiGenerale?: string;
    criterii?: Array<{
      nume: string;
      nota: number;
      comentarii?: string;
    }>;
    puncteForte?: string[];
    puncteDeImbunatatire?: string[];
    recomandari?: string[];
    status: "finalizata" | "in_progres" | "draft";
  }>;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  data: OrganizationData;
}

interface OrganizationContextType {
  currentOrganization: Organization;
  organizations: Organization[];
  setCurrentOrganization: (organization: Organization) => void;
  getCurrentOrganizationData: () => OrganizationData;
  getAllVolunteerHistory: () => Array<{
    id: string;
    organizatie: string;
    pozitie: string;
    departament?: string;
    locatie: string;
    perioada: string;
    descriere: string;
  }>;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined,
);

// Mock data - în producție vine din backend
const mockOrganizations: Organization[] = [
  {
    id: "1",
    name: "Asociația ONedu",
    data: {
      functie: "Specialist Comunicare",
      departament: "Comunicare",
      superiorDirect: "Maria Popescu",
      vechime: "3 ani, 5 luni",
      dataInceput: "2021-01-15",
      oreLunaAceasta: 24,
      orePlanificate: 30,
      totalOre: 156,
      oreAprobate: 150,
      oreInAsteptare: 6,
      timesheetEntries: [
        {
          id: "1",
          date: "2026-01-02",
          hours: 4,
          minutes: 0,
          activity: "Sesiune de mentorat cu elevi",
          description: "Mentorat individual cu 3 elevi",
          status: "approved",
        },
        {
          id: "2",
          date: "2026-01-02",
          hours: 3,
          minutes: 30,
          activity: "Distribuire pachete alimentare",
          status: "pending",
        },
        {
          id: "3",
          date: "2026-01-01",
          hours: 5,
          minutes: 0,
          activity: "Pregătire materiale didactice",
          status: "approved",
        },
      ],
      experienteVoluntariat: [
        {
          id: "1",
          organizatie: "Asociația ONedu",
          pozitie: "Voluntar",
          departament: "Comunicare",
          locatie: "București, România",
          perioada: "2021 - prezent",
          descriere: "Voluntariat în departamentul de comunicare",
        },
      ],
      disponibilitate: {
        zile: "Luni - Vineri",
        intervale: "09:00 - 18:00",
        onsite: true,
        online: true,
        deplasari: true,
      },
      documente: [
        { nume: "Fișa voluntarului", status: "Încărcat", data: "15.01.2024" },
        { nume: "Fișa SSM", status: "Încărcat", data: "15.01.2024" },
        { nume: "Acord parental", status: "Necesar", data: "-" },
        { nume: "Adeverință voluntariat", status: "Încărcat", data: "20.02.2024" },
        { nume: "Certificat voluntar", status: "Încărcat", data: "25.02.2024" },
      ],
      avertismente: [
        {
          data: "10.03.2024",
          motiv: "Întârziere la activități",
          tip: "Avertisment",
        },
      ],
      competente: [
        { nume: "Management de proiecte", organizatie: "Asociația ONedu" },
        { nume: "Comunicare eficientă", organizatie: "Asociația ONedu" },
      ],
      recompense: [
        {
          data: "15.12.2023",
          titlu: "Voluntarul lunii",
          descriere: "Recunoaștere pentru activitate exemplară",
        },
        {
          data: "01.06.2023",
          titlu: "Certificat de excelență",
          descriere: "Pentru implicare deosebită în proiecte",
        },
      ],
      organigrama: {
        superior: { name: "Maria Popescu", position: "Director Comunicare" },
        colleagues: [
          { name: "Ion Popescu", position: "Specialist Comunicare" },
          { name: "Elena Georgescu", position: "Specialist Marketing" },
        ],
        subordinates: [],
      },
      activitatiRecente: [
        {
          id: "1",
          activity: "Activități administrative",
          hours: 2,
          minutes: 30,
          date: "2024-01-15",
          status: "approved",
        },
        {
          id: "2",
          activity: "Suport pentru evenimente",
          hours: 4,
          minutes: 0,
          date: "2024-01-14",
          status: "pending",
        },
        {
          id: "3",
          activity: "Comunicare și marketing",
          hours: 1,
          minutes: 45,
          date: "2024-01-13",
          status: "rejected",
        },
      ],
      documenteDeSemnat: [
        {
          id: "1",
          title: "Contract de voluntariat",
          type: "Contract",
          deadline: "2024-01-20",
          priority: "high",
        },
        {
          id: "2",
          title: "Acord de confidențialitate",
          type: "Acord",
          deadline: "2024-01-25",
          priority: "medium",
        },
        {
          id: "3",
          title: "Declarație pe propria răspundere",
          type: "Declarație",
          priority: "low",
        },
      ],
      zileDeNastere: [
        { id: "1", name: "Maria Popescu", date: "1990-01-20", daysUntil: 5 },
        { id: "2", name: "Ion Georgescu", date: "1985-01-22", daysUntil: 7 },
        { id: "3", name: "Ana Ionescu", date: "1992-01-25", daysUntil: 10 },
      ],
      contacte: [
        {
          id: "1",
          firstName: "Maria",
          lastName: "Popescu",
          organization: "Asociația ONedu",
          function: "Director Comunicare",
          department: "Comunicare",
          category: "Comunicare",
          emails: ["maria.popescu@onedu.ro"],
          mobilePhone: "+40 712 345 678",
          workPhone: "+40 21 123 4567",
          isPublic: true,
        },
        {
          id: "2",
          firstName: "Ion",
          lastName: "Popescu",
          organization: "Asociația ONedu",
          function: "Specialist Comunicare",
          department: "Comunicare",
          category: "Comunicare",
          emails: ["ion.popescu@onedu.ro"],
          mobilePhone: "+40 723 456 789",
          isPublic: true,
        },
      ],
      noutati: [
        {
          id: "1",
          title: "Workshop de comunicare",
          excerpt: "Workshop dedicat voluntarilor din departamentul de comunicare",
          category: "organizare",
          author: "Asociația ONedu",
          date: "2024-01-10",
        },
      ],
      evaluari: [
        {
          id: "1",
          data: "2024-01-15",
          superiorDirect: "Maria Popescu",
          managerHR: "Ana Ionescu",
          categorie: "Evaluare anuală",
          notaGenerala: 9,
          comentariiGenerale: "Performanță excelentă în comunicare și implicare în proiecte. Voluntarul demonstrează dedicare și profesionalism în toate activitățile desfășurate. Continuă cu aceeași energie și pasiune!",
          criterii: [
            {
              nume: "Comunicare eficientă",
              nota: 9.5,
              comentarii: "Comunicare clară și profesională cu toate părțile implicate în proiecte.",
            },
            {
              nume: "Implicare în proiecte",
              nota: 9,
              comentarii: "Implicare activă și constructivă în toate activitățile.",
            },
            {
              nume: "Colaborare în echipă",
              nota: 8.5,
              comentarii: "Colaborează bine cu colegii și contribuie la succesul echipei.",
            },
            {
              nume: "Inițiativă și proactivitate",
              nota: 9,
              comentarii: "Demonstrează inițiativă și propune soluții creative.",
            },
          ],
          puncteForte: [
            "Comunicare excelentă și clară",
            "Implicare deosebită în proiecte",
            "Atitudine pozitivă și profesională",
            "Respectă termenele și responsabilitățile",
          ],
          puncteDeImbunatatire: [
            "Dezvoltarea abilităților de leadership",
            "Prezentări publice mai frecvente",
          ],
          recomandari: [
            "Participare la cursuri de dezvoltare leadership",
            "Mentorat pentru voluntari noi",
            "Prezentări în cadrul evenimentelor organizației",
          ],
          status: "finalizata",
        },
        {
          id: "2",
          data: "2023-12-20",
          superiorDirect: "Maria Popescu",
          managerHR: "Ana Ionescu",
          categorie: "Evaluare de performanță",
          notaGenerala: 8.5,
          comentariiGenerale: "Rezultate bune în proiectele de comunicare. Voluntarul a demonstrat competențe solide și implicare constantă. Recomandăm continuarea dezvoltării abilităților de leadership.",
          criterii: [
            {
              nume: "Performanță în proiecte",
              nota: 8.5,
              comentarii: "Rezultate consistente în toate proiectele desfășurate.",
            },
            {
              nume: "Calitatea muncii",
              nota: 9,
              comentarii: "Lucru de calitate, atent la detalii.",
            },
            {
              nume: "Dezvoltare profesională",
              nota: 8,
              comentarii: "Demonstrează interes pentru dezvoltare continuă.",
            },
          ],
          puncteForte: [
            "Calitate consistentă a muncii",
            "Respectă termenele",
            "Colaborare eficientă",
          ],
          puncteDeImbunatatire: [
            "Dezvoltarea abilităților de leadership",
            "Prezentări publice",
          ],
          recomandari: [
            "Cursuri de leadership",
            "Oportunități de prezentare publică",
          ],
          status: "finalizata",
        },
        {
          id: "3",
          data: "2024-01-20",
          superiorDirect: "Maria Popescu",
          managerHR: "Ana Ionescu",
          categorie: "Evaluare competențe",
          status: "in_progres",
        },
        {
          id: "4",
          data: "2023-11-10",
          superiorDirect: "Maria Popescu",
          managerHR: "Ana Ionescu",
          categorie: "Evaluare comportament",
          notaGenerala: 8.5,
          comentariiGenerale: "Atitudine pozitivă și colaborare excelentă cu echipa. Voluntarul demonstrează respect și toleranță față de toți membrii organizației.",
          criterii: [
            {
              nume: "Atitudine profesională",
              nota: 9,
              comentarii: "Atitudine exemplară în toate situațiile.",
            },
            {
              nume: "Colaborare",
              nota: 8.5,
              comentarii: "Colaborează eficient cu toți membrii echipei.",
            },
            {
              nume: "Respect și toleranță",
              nota: 8,
              comentarii: "Demonstrează respect pentru toți.",
            },
          ],
          puncteForte: [
            "Atitudine profesională",
            "Colaborare excelentă",
            "Respect față de toți",
          ],
          status: "finalizata",
        },
        {
          id: "5",
          data: "2023-09-05",
          superiorDirect: "Maria Popescu",
          managerHR: "Ana Ionescu",
          categorie: "Evaluare inițială",
          notaGenerala: 8,
          comentariiGenerale: "Prima evaluare după integrarea în organizație. Voluntarul a demonstrat adaptare rapidă și interes pentru activitățile organizației.",
          criterii: [
            {
              nume: "Adaptare",
              nota: 8.5,
              comentarii: "S-a adaptat rapid la mediul de lucru.",
            },
            {
              nume: "Implicare",
              nota: 8,
              comentarii: "Implicare activă în activități.",
            },
            {
              nume: "Învățare",
              nota: 7.5,
              comentarii: "Demonstrează interes pentru învățare.",
            },
          ],
          puncteForte: [
            "Adaptare rapidă",
            "Implicare activă",
            "Interes pentru învățare",
          ],
          puncteDeImbunatatire: [
            "Cunoaștere mai profundă a proceselor",
            "Integrare mai bună cu echipa",
          ],
          status: "finalizata",
        },
      ],
    },
  },
  {
    id: "2",
    name: "Fundatia Voluntarilor",
    data: {
      functie: "Coordonator Proiecte",
      departament: "Proiecte",
      superiorDirect: "Ion Georgescu",
      vechime: "1 an, 8 luni",
      dataInceput: "2022-05-10",
      oreLunaAceasta: 18,
      orePlanificate: 25,
      totalOre: 89,
      oreAprobate: 85,
      oreInAsteptare: 4,
      timesheetEntries: [
        {
          id: "4",
          date: "2026-01-03",
          hours: 6,
          minutes: 0,
          activity: "Coordonare proiect social",
          status: "approved",
        },
        {
          id: "5",
          date: "2026-01-04",
          hours: 4,
          minutes: 0,
          activity: "Planificare activități",
          status: "pending",
        },
      ],
      experienteVoluntariat: [
        {
          id: "2",
          organizatie: "Fundatia Voluntarilor",
          pozitie: "Coordonator Proiecte",
          departament: "Proiecte",
          locatie: "București, România",
          perioada: "2022 - prezent",
          descriere: "Coordonare proiecte sociale",
        },
      ],
      disponibilitate: {
        zile: "Marți - Sâmbătă",
        intervale: "10:00 - 16:00",
        onsite: true,
        online: false,
        deplasari: true,
      },
      documente: [
        { nume: "Contract voluntariat", status: "Încărcat", data: "10.05.2022" },
        { nume: "Fișa SSM", status: "Încărcat", data: "10.05.2022" },
        { nume: "Declarație", status: "Necesar", data: "-" },
      ],
      avertismente: [],
      competente: [
        { nume: "Coordonare proiecte", organizatie: "Fundatia Voluntarilor" },
        { nume: "Management echipe", organizatie: "Fundatia Voluntarilor" },
      ],
      recompense: [
        {
          data: "20.11.2023",
          titlu: "Proiectul anului",
          descriere: "Recunoaștere pentru proiectul de succes",
        },
      ],
      organigrama: {
        superior: { name: "Ion Georgescu", position: "Director Proiecte" },
        colleagues: [
          { name: "Elena Popescu", position: "Coordonator Proiecte" },
        ],
        subordinates: [
          { name: "Mihai Ionescu", position: "Asistent Proiecte" },
        ],
      },
      activitatiRecente: [
        {
          id: "4",
          activity: "Coordonare proiect",
          hours: 6,
          minutes: 0,
          date: "2024-01-12",
          status: "approved",
        },
        {
          id: "5",
          activity: "Planificare activități",
          hours: 4,
          minutes: 0,
          date: "2024-01-11",
          status: "pending",
        },
      ],
      documenteDeSemnat: [
        {
          id: "4",
          title: "Acord de parteneriat",
          type: "Acord",
          deadline: "2024-01-18",
          priority: "high",
        },
      ],
      zileDeNastere: [
        { id: "4", name: "Ion Georgescu", date: "1980-02-15", daysUntil: 25 },
        { id: "5", name: "Elena Popescu", date: "1988-02-20", daysUntil: 30 },
      ],
      contactCategories: ["Toate", "Proiecte", "Management", "Voluntari"],
      contacte: [
        {
          id: "3",
          firstName: "Ion",
          lastName: "Georgescu",
          organization: "Fundatia Voluntarilor",
          function: "Director Proiecte",
          department: "Proiecte",
          category: "Proiecte",
          emails: ["ion.georgescu@voluntarilor.ro"],
          mobilePhone: "+40 734 567 890",
          isPublic: true,
        },
      ],
      noutati: [
        {
          id: "2",
          title: "Lansare proiect nou",
          excerpt: "Anunțăm lansarea unui nou proiect social",
          category: "organizare",
          author: "Fundatia Voluntarilor",
          date: "2024-01-08",
        },
      ],
      evaluari: [
        {
          id: "6",
          data: "2024-01-12",
          superiorDirect: "Ion Georgescu",
          managerHR: "Elena Popescu",
          categorie: "Evaluare anuală",
          notaGenerala: 7.5,
          comentariiGenerale: "Bună implicare în proiecte. Voluntarul demonstrează dedicare și interes pentru activitățile organizației. Recomandăm îmbunătățirea comunicării cu beneficiarii pentru o interacțiune mai eficientă.",
          criterii: [
            {
              nume: "Implicare în proiecte",
              nota: 8,
              comentarii: "Implicare activă și constructivă.",
            },
            {
              nume: "Comunicare cu beneficiarii",
              nota: 7,
              comentarii: "Comunicare bună, dar poate fi îmbunătățită.",
            },
            {
              nume: "Colaborare în echipă",
              nota: 8,
              comentarii: "Colaborează bine cu echipa.",
            },
          ],
          puncteForte: [
            "Implicare consistentă",
            "Colaborare bună cu echipa",
            "Respectă termenele",
          ],
          puncteDeImbunatatire: [
            "Comunicare cu beneficiarii",
            "Prezentări publice",
          ],
          recomandari: [
            "Cursuri de comunicare interpersonală",
            "Workshop-uri de prezentare publică",
          ],
          status: "finalizata",
        },
        {
          id: "7",
          data: "2024-01-05",
          superiorDirect: "Ion Georgescu",
          managerHR: "Elena Popescu",
          categorie: "Evaluare comportament",
          notaGenerala: 8,
          comentariiGenerale: "Colaborare excelentă și atitudine profesională. Voluntarul demonstrează respect față de colegi și beneficiari, contribuind la un mediu de lucru pozitiv.",
          criterii: [
            {
              nume: "Atitudine profesională",
              nota: 8.5,
              comentarii: "Atitudine exemplară în toate situațiile.",
            },
            {
              nume: "Colaborare",
              nota: 8,
              comentarii: "Colaborează eficient cu toți membrii echipei.",
            },
            {
              nume: "Respect și toleranță",
              nota: 8,
              comentarii: "Demonstrează respect pentru toți.",
            },
          ],
          puncteForte: [
            "Atitudine profesională",
            "Colaborare excelentă",
            "Respect față de toți",
          ],
          status: "finalizata",
        },
        {
          id: "8",
          data: "2023-10-15",
          superiorDirect: "Ion Georgescu",
          managerHR: "Elena Popescu",
          categorie: "Evaluare de performanță",
          notaGenerala: 7.5,
          comentariiGenerale: "Performanță bună în proiecte. Recomandăm îmbunătățirea comunicării și a organizării timpului.",
          criterii: [
            {
              nume: "Rezultate în proiecte",
              nota: 8,
              comentarii: "Rezultate bune în majoritatea proiectelor.",
            },
            {
              nume: "Organizare timp",
              nota: 7,
              comentarii: "Poate îmbunătăți organizarea timpului.",
            },
            {
              nume: "Comunicare",
              nota: 7.5,
              comentarii: "Comunicare bună, dar poate fi mai clară.",
            },
          ],
          puncteForte: [
            "Rezultate bune",
            "Implicare consistentă",
          ],
          puncteDeImbunatatire: [
            "Organizare timp",
            "Comunicare mai clară",
          ],
          status: "finalizata",
        },
        {
          id: "9",
          data: "2023-08-20",
          superiorDirect: "Ion Georgescu",
          managerHR: "Elena Popescu",
          categorie: "Evaluare competențe",
          notaGenerala: 8,
          comentariiGenerale: "Competențe tehnice bune și abilități de lucru în echipă. Recomandăm continuarea dezvoltării competențelor.",
          criterii: [
            {
              nume: "Competențe tehnice",
              nota: 8.5,
              comentarii: "Competențe solide.",
            },
            {
              nume: "Lucru în echipă",
              nota: 8,
              comentarii: "Colaborează bine cu echipa.",
            },
          ],
          puncteForte: [
            "Competențe tehnice bune",
            "Colaborare eficientă",
          ],
          status: "finalizata",
        },
      ],
    },
  },
  {
    id: "3",
    name: "Asociația pentru Dezvoltare",
    data: {
      functie: "Voluntar Activ",
      departament: "Evenimente",
      superiorDirect: "Ana Ionescu",
      vechime: "6 luni",
      dataInceput: "2023-07-01",
      oreLunaAceasta: 12,
      orePlanificate: 20,
      totalOre: 45,
      oreAprobate: 40,
      oreInAsteptare: 5,
      timesheetEntries: [
        {
          id: "6",
          date: "2026-01-05",
          hours: 3,
          minutes: 0,
          activity: "Organizare eveniment",
          status: "approved",
        },
        {
          id: "7",
          date: "2026-01-06",
          hours: 2,
          minutes: 30,
          activity: "Suport logistic",
          status: "pending",
        },
      ],
      experienteVoluntariat: [
        {
          id: "3",
          organizatie: "Asociația pentru Dezvoltare",
          pozitie: "Voluntar Activ",
          departament: "Evenimente",
          locatie: "București, România",
          perioada: "2023 - prezent",
          descriere: "Organizare evenimente și campanii",
        },
      ],
      disponibilitate: {
        zile: "Sâmbătă - Duminică",
        intervale: "14:00 - 20:00",
        onsite: true,
        online: false,
        deplasari: false,
      },
      documente: [
        { nume: "Fișa voluntarului", status: "Încărcat", data: "01.07.2023" },
        { nume: "Acord parental", status: "Necesar", data: "-" },
      ],
      avertismente: [],
      competente: [
        { nume: "Organizare evenimente", organizatie: "Asociația pentru Dezvoltare" },
      ],
      recompense: [],
      organigrama: {
        superior: { name: "Ana Ionescu", position: "Coordonator Evenimente" },
        colleagues: [
          { name: "Dan Popescu", position: "Voluntar Activ" },
          { name: "Cristina Georgescu", position: "Voluntar Activ" },
        ],
        subordinates: [],
      },
      activitatiRecente: [
        {
          id: "6",
          activity: "Organizare eveniment",
          hours: 3,
          minutes: 0,
          date: "2024-01-10",
          status: "approved",
        },
        {
          id: "7",
          activity: "Suport logistic",
          hours: 2,
          minutes: 30,
          date: "2024-01-09",
          status: "pending",
        },
      ],
      documenteDeSemnat: [
        {
          id: "5",
          title: "Declarație voluntariat",
          type: "Declarație",
          priority: "medium",
        },
      ],
      zileDeNastere: [
        { id: "6", name: "Ana Ionescu", date: "1995-03-10", daysUntil: 50 },
      ],
      contactCategories: ["Toate", "Evenimente", "Management", "Voluntari"],
      contacte: [
        {
          id: "4",
          firstName: "Ana",
          lastName: "Ionescu",
          organization: "Asociația pentru Dezvoltare",
          function: "Coordonator Evenimente",
          department: "Evenimente",
          category: "Evenimente",
          emails: ["ana.ionescu@dezvoltare.ro"],
          mobilePhone: "+40 745 678 901",
          isPublic: true,
        },
      ],
      noutati: [
        {
          id: "3",
          title: "Eveniment de caritate",
          excerpt: "Anunțăm un nou eveniment de caritate",
          category: "organizare",
          author: "Asociația pentru Dezvoltare",
          date: "2024-01-05",
        },
      ],
      evaluari: [
        {
          id: "10",
          data: "2024-01-18",
          superiorDirect: "Petru Radu",
          managerHR: "Mihaela Stan",
          categorie: "Evaluare anuală",
          notaGenerala: 9,
          comentariiGenerale: "Rezultate remarcabile în proiectele de dezvoltare comunitară. Voluntarul demonstrează dedicare deosebită și contribuie semnificativ la succesul organizației. Continuă cu aceeași pasiune și implicare!",
          criterii: [
            {
              nume: "Rezultate în proiecte",
              nota: 9.5,
              comentarii: "Rezultate excepționale în toate proiectele.",
            },
            {
              nume: "Dezvoltare comunitară",
              nota: 9,
              comentarii: "Contribuție semnificativă la dezvoltarea comunității.",
            },
            {
              nume: "Dedicare și implicare",
              nota: 9,
              comentarii: "Dedicare exemplară și implicare constantă.",
            },
          ],
          puncteForte: [
            "Rezultate remarcabile",
            "Dedicare deosebită",
            "Contribuție semnificativă",
            "Inițiativă și proactivitate",
          ],
          recomandari: [
            "Mentorat pentru voluntari noi",
            "Lider de proiect pentru inițiative noi",
          ],
          status: "finalizata",
        },
        {
          id: "8",
          data: "2024-01-08",
          superiorDirect: "Petru Radu",
          managerHR: "Mihaela Stan",
          categorie: "Evaluare competențe",
          notaGenerala: 8.5,
          comentariiGenerale: "Competențe tehnice excelente și abilități de lucru în echipă foarte bune. Voluntarul demonstrează o înțelegere profundă a nevoilor comunității și propune soluții eficiente.",
          criterii: [
            {
              nume: "Competențe tehnice",
              nota: 9,
              comentarii: "Competențe tehnice solide și actualizate.",
            },
            {
              nume: "Lucru în echipă",
              nota: 8.5,
              comentarii: "Colaborează excelent cu toți membrii echipei.",
            },
            {
              nume: "Rezolvare probleme",
              nota: 8.5,
              comentarii: "Abilitate bună de a identifica și rezolva probleme.",
            },
          ],
          puncteForte: [
            "Competențe tehnice excelente",
            "Abilități de lucru în echipă",
            "Rezolvare eficientă a problemelor",
          ],
          status: "finalizata",
        },
        {
          id: "11",
          data: "2023-12-10",
          superiorDirect: "Petru Radu",
          managerHR: "Mihaela Stan",
          categorie: "Evaluare comportament",
          notaGenerala: 8.5,
          comentariiGenerale: "Atitudine exemplară și colaborare excelentă. Voluntarul contribuie la un mediu de lucru pozitiv și respectuos.",
          criterii: [
            {
              nume: "Atitudine",
              nota: 9,
              comentarii: "Atitudine foarte pozitivă.",
            },
            {
              nume: "Colaborare",
              nota: 8.5,
              comentarii: "Colaborează excelent cu toți.",
            },
            {
              nume: "Respect",
              nota: 8,
              comentarii: "Demonstrează respect pentru toți.",
            },
          ],
          puncteForte: [
            "Atitudine exemplară",
            "Colaborare excelentă",
            "Mediu de lucru pozitiv",
          ],
          status: "finalizata",
        },
        {
          id: "12",
          data: "2023-09-15",
          superiorDirect: "Petru Radu",
          managerHR: "Mihaela Stan",
          categorie: "Evaluare inițială",
          notaGenerala: 7.5,
          comentariiGenerale: "Prima evaluare după integrare. Voluntarul a demonstrat interes și adaptare rapidă la activitățile organizației.",
          criterii: [
            {
              nume: "Adaptare",
              nota: 8,
              comentarii: "S-a adaptat bine la mediul de lucru.",
            },
            {
              nume: "Implicare",
              nota: 7.5,
              comentarii: "Implicare activă în activități.",
            },
            {
              nume: "Învățare",
              nota: 7,
              comentarii: "Demonstrează interes pentru învățare.",
            },
          ],
          puncteForte: [
            "Adaptare rapidă",
            "Implicare activă",
          ],
          puncteDeImbunatatire: [
            "Cunoaștere procese",
            "Integrare cu echipa",
          ],
          status: "finalizata",
        },
      ],
    },
  },
];

const STORAGE_KEY = "currentOrganization";

// Funcție helper pentru a obține organizația din localStorage
function getStoredOrganization(): Organization | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const org = JSON.parse(stored);
      // Verifică dacă organizația există în lista de organizații
      // Folosește datele complete din mockOrganizations pentru a avea toate datele actualizate
      const foundOrg = mockOrganizations.find((o) => o.id === org.id);
      if (foundOrg) {
        return foundOrg;
      }
    }
  } catch (error) {
    console.error("Error reading organization from localStorage:", error);
  }
  return null;
}

export function OrganizationProvider({ children }: { children: ReactNode }) {
  // Folosim prima organizație ca valoare inițială pentru a evita probleme de hidratare
  const [currentOrganization, setCurrentOrganizationState] =
    useState<Organization>(mockOrganizations[0]);
  
  // Încărcăm din localStorage doar pe client, după mount
  useEffect(() => {
    const stored = getStoredOrganization();
    if (stored) {
      setCurrentOrganizationState(stored);
    }
  }, []);

  // Funcție wrapper care salvează și în localStorage
  const setCurrentOrganization = (organization: Organization) => {
    setCurrentOrganizationState(organization);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(organization));
      } catch (error) {
        console.error("Error saving organization to localStorage:", error);
      }
    }
  };

  // Încarcă din localStorage la mount și sincronizează cu schimbările din alte tab-uri
  useEffect(() => {
    // Încarcă organizația din localStorage la mount
    const stored = getStoredOrganization();
    if (stored) {
      setCurrentOrganizationState(stored);
    }
    
    // Ascultă schimbările din localStorage (din alte tab-uri)
    const handleStorageChange = () => {
      const stored = getStoredOrganization();
      if (stored && stored.id !== currentOrganization.id) {
        setCurrentOrganizationState(stored);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [currentOrganization.id]);

  const getCurrentOrganizationData = () => {
    return currentOrganization.data;
  };

  // Obține istoricul complet de voluntariat din toate organizațiile
  const getAllVolunteerHistory = () => {
    const allExperiences: Array<{
      id: string;
      organizatie: string;
      pozitie: string;
      departament?: string;
      locatie: string;
      perioada: string;
      descriere: string;
    }> = [];

    mockOrganizations.forEach((org) => {
      if (org.data.experienteVoluntariat) {
        allExperiences.push(...org.data.experienteVoluntariat);
      }
    });

    // Sortează după perioadă (cele mai recente primele)
    return allExperiences.sort((a, b) => {
      // Extrage anul din perioadă pentru sortare
      const yearA = parseInt(a.perioada.split(" ")[0]) || 0;
      const yearB = parseInt(b.perioada.split(" ")[0]) || 0;
      return yearB - yearA;
    });
  };

  return (
    <OrganizationContext.Provider
      value={{
        currentOrganization,
        organizations: mockOrganizations,
        setCurrentOrganization,
        getCurrentOrganizationData,
        getAllVolunteerHistory,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error(
      "useOrganization must be used within an OrganizationProvider",
    );
  }
  return context;
}

