import { createSlug } from "./slug";

// Tipuri pentru datele mock
export interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  membersCount: number;
  location?: string;
  isMember?: boolean;
  isPrivate?: boolean;
  slug?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  slug?: string;
}

// Mock data pentru comunități
export const mockCommunities: Community[] = [
  {
    id: "1",
    name: "Comunitatea Voluntarilor din București",
    description:
      "O comunitate activă de voluntari din București care organizează evenimente locale, campanii de donații și activități educaționale pentru copii și adulți.",
    category: "Regională",
    membersCount: 245,
    location: "București, România",
    isMember: true,
    slug: "comunitatea-voluntarilor-din-bucuresti",
  },
  {
    id: "2",
    name: "Echipa de Comunicare",
    description:
      "Comunitate dedicată voluntarilor care lucrează în domeniul comunicării, marketingului și relațiilor publice. Organizăm sesiuni de training și workshop-uri periodice.",
    category: "Departament",
    membersCount: 32,
    isMember: true,
    slug: "echipa-de-comunicare",
  },
  {
    id: "3",
    name: "Voluntari pentru Educație",
    description:
      "Comunitate care se concentrează pe proiecte educaționale, sprijinirea elevilor și organizarea de activități de învățare pentru comunitățile defavorizate.",
    category: "Program",
    membersCount: 156,
    location: "Națională",
    slug: "voluntari-pentru-educatie",
  },
  {
    id: "4",
    name: "Comunitatea de Fundraising",
    description:
      "Grup de voluntari specializați în organizarea de campanii de strângere de fonduri, evenimente de caritate și parteneriate cu sponsorii.",
    category: "Departament",
    membersCount: 48,
    slug: "comunitatea-de-fundraising",
  },
  {
    id: "5",
    name: "Voluntari IT",
    description:
      "Comunitate pentru voluntarii cu background tehnic care contribuie la dezvoltarea platformelor digitale, suport tehnic și inovații tehnologice.",
    category: "Departament",
    membersCount: 28,
    isPrivate: true,
    slug: "voluntari-it",
  },
  {
    id: "6",
    name: "Comunitatea de Mediu",
    description:
      "Grup dedicat protecției mediului, organizării de acțiuni de curățenie, campanii de reciclare și educație ecologică.",
    category: "Program",
    membersCount: 89,
    location: "Națională",
    slug: "comunitatea-de-mediu",
  },
];

// Mock data pentru articole
export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Ghid complet pentru organizarea evenimentelor",
    excerpt:
      "Învață pașii esențiali pentru planificarea și organizarea unui eveniment de succes, de la bugetare până la evaluare.",
    category: "organizare",
    author: "Echipa iVoluntar",
    date: "2024-01-15",
    slug: "ghid-complet-pentru-organizarea-evenimentelor",
  },
  {
    id: "2",
    title: "Cum să gestionezi documentele contabile",
    excerpt:
      "Ghid practic pentru gestionarea corectă a documentelor contabile în organizațiile non-profit.",
    category: "contabilitate",
    author: "Echipa iVoluntar",
    date: "2024-01-12",
    slug: "cum-sa-gestionezi-documentele-contabile",
  },
  {
    id: "3",
    title: "Proceduri de secretariat pentru ONG-uri",
    excerpt:
      "Toate informațiile necesare despre procedurile de secretariat, întocmirea actelor și gestionarea arhivei.",
    category: "secretariat",
    author: "Echipa iVoluntar",
    date: "2024-01-10",
    slug: "proceduri-de-secretariat-pentru-ong-uri",
  },
  {
    id: "4",
    title: "Ghid pentru radierea unei asociații",
    excerpt:
      "Pașii legali necesari pentru radierea corectă a unei asociații, documentele necesare și procedurile de urmat.",
    category: "radiere",
    author: "Echipa iVoluntar",
    date: "2024-01-08",
    slug: "ghid-pentru-radierea-unei-asociatii",
  },
  {
    id: "5",
    title: "Managementul proiectelor în organizații non-profit",
    excerpt:
      "Tehnici și instrumente pentru managementul eficient al proiectelor în contextul organizațiilor non-profit.",
    category: "organizare",
    author: "Echipa iVoluntar",
    date: "2024-01-05",
    slug: "managementul-proiectelor-in-organizatii-non-profit",
  },
  {
    id: "6",
    title: "Rapoarte financiare pentru ONG-uri",
    excerpt:
      "Cum să întocmești și să prezinti rapoarte financiare conforme pentru organizațiile non-profit.",
    category: "contabilitate",
    author: "Echipa iVoluntar",
    date: "2024-01-03",
    slug: "rapoarte-financiare-pentru-ong-uri",
  },
  {
    id: "7",
    title: "Gestionarea arhivei documentelor",
    excerpt:
      "Sisteme și proceduri pentru organizarea și gestionarea eficientă a arhivei documentelor.",
    category: "secretariat",
    author: "Echipa iVoluntar",
    date: "2024-01-01",
    slug: "gestionarea-arhivei-documentelor",
  },
  {
    id: "8",
    title: "Proceduri legale pentru asociații",
    excerpt:
      "Ghid despre procedurile legale importante pentru asociații, de la înființare la modificări statutare.",
    category: "organizare",
    author: "Echipa iVoluntar",
    date: "2023-12-28",
    slug: "proceduri-legale-pentru-asociatii",
  },
];

// Funcții helper pentru a găsi comunități și articole după slug
export function getCommunityBySlug(slug: string): Community | undefined {
  return mockCommunities.find(
    (c) => c.slug === slug || c.id === slug || createSlug(c.name) === slug
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return mockArticles.find(
    (a) => a.slug === slug || a.id === slug || createSlug(a.title) === slug
  );
}

