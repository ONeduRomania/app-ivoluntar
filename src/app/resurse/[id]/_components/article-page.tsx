"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { createSlug } from "@/lib/slug";
import { Article } from "../../_components/article-card";
import { ArticleContent } from "./article-content";
import { ArticleHeader } from "./article-header";

// Mock data - în producție vine din backend
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Ghid complet pentru organizarea evenimentelor",
    excerpt:
      "Învață pașii esențiali pentru planificarea și organizarea unui eveniment de succes, de la bugetare până la evaluare.",
    category: "organizare",
    author: "Echipa iVoluntar",
    date: "2024-01-15",
    content: `# Ghid complet pentru organizarea evenimentelor

Organizarea unui eveniment de succes necesită planificare atentă și atenție la detalii. În acest ghid, vei învăța pașii esențiali pentru a crea o experiență memorabilă pentru participanții tăi.

## 1. Planificarea inițială

Primul pas în organizarea unui eveniment este definirea obiectivelor. Ce vrei să obții? Cine este publicul țintă? Ce buget ai la dispoziție?

### Stabilirea obiectivelor

- Definește clar scopul evenimentului
- Identifică publicul țintă
- Stabilește măsurile de succes

### Bugetarea

Crearea unui buget detaliat este esențială. Include toate categoriile de cheltuieli:
- Locație
- Catering
- Materiale promoționale
- Echipamente
- Personal

## 2. Alegerea locației

Locația joacă un rol crucial în succesul evenimentului. Consideră:
- Capacitatea
- Accesibilitatea
- Echipamentele disponibile
- Costurile

## 3. Promovarea evenimentului

Promovarea eficientă este cheia pentru a atrage participanți. Folosește:
- Social media
- Email marketing
- Parteneriate
- Materiale promoționale

## 4. Ziua evenimentului

În ziua evenimentului, asigură-te că:
- Totul este pregătit din timp
- Ai o echipă dedicată
- Ai un plan de urgență
- Documentezi evenimentul

## 5. Evaluarea după eveniment

După eveniment, evaluează:
- Feedback-ul participanților
- Realizarea obiectivelor
- Cheltuielile reale vs. bugetul planificat
- Lecții învățate pentru viitor`,
    documents: [
      { name: "Checklist eveniment.pdf", url: "#" },
      { name: "Template buget.xlsx", url: "#" },
    ],
  },
  {
    id: "2",
    title: "Cum să gestionezi documentele contabile",
    excerpt:
      "Ghid practic pentru gestionarea corectă a documentelor contabile în organizațiile non-profit.",
    category: "contabilitate",
    author: "Echipa iVoluntar",
    date: "2024-01-12",
    content: `# Cum să gestionezi documentele contabile

Gestionarea corectă a documentelor contabile este esențială pentru orice organizație non-profit. Acest ghid te va ajuta să înțelegi și să implementezi cele mai bune practici.

## Tipuri de documente contabile

### Facturi și chitanțe

Toate facturile și chitanțele trebuie:
- Numerotate consecutiv
- Păstrate în ordine cronologică
- Verificate pentru corectitudine

### Extrase bancare

Extrasele bancare trebuie reconciliate lunar cu registrele contabile.

### Documente de cheltuieli

Fiecare cheltuială trebuie să aibă:
- Factură sau chitanță
- Justificare pentru cheltuială
- Aprobare de la persoana responsabilă`,
    documents: [
      { name: "Ghid documente contabile.pdf", url: "#" },
    ],
  },
  {
    id: "3",
    title: "Proceduri de secretariat pentru ONG-uri",
    excerpt:
      "Toate informațiile necesare despre procedurile de secretariat, întocmirea actelor și gestionarea arhivei.",
    category: "secretariat",
    author: "Echipa iVoluntar",
    date: "2024-01-10",
    content: `# Proceduri de secretariat pentru ONG-uri

Secretariatul unei organizații non-profit are responsabilități importante în menținerea documentelor și a comunicării oficiale.

## Responsabilități principale

- Întocmirea și păstrarea actelor
- Gestionarea arhivei
- Comunicarea oficială
- Organizarea ședințelor`,
  },
  {
    id: "4",
    title: "Ghid pentru radierea unei asociații",
    excerpt:
      "Pașii legali necesari pentru radierea corectă a unei asociații, documentele necesare și procedurile de urmat.",
    category: "radiere",
    author: "Echipa iVoluntar",
    date: "2024-01-08",
    content: `# Ghid pentru radierea unei asociații

Radierea unei asociații este un proces legal care necesită atenție la detalii și respectarea tuturor procedurilor.

## Pașii necesari

1. Hotărâre de adunare generală
2. Depunerea documentelor la ONRC
3. Publicarea în Monitorul Oficial
4. Finalizarea procedurilor`,
  },
  {
    id: "5",
    title: "Managementul proiectelor în organizații non-profit",
    excerpt:
      "Tehnici și instrumente pentru managementul eficient al proiectelor în contextul organizațiilor non-profit.",
    category: "organizare",
    author: "Echipa iVoluntar",
    date: "2024-01-05",
    content: `# Managementul proiectelor în organizații non-profit

Managementul eficient al proiectelor este crucial pentru succesul organizațiilor non-profit.`,
  },
  {
    id: "6",
    title: "Rapoarte financiare pentru ONG-uri",
    excerpt:
      "Cum să întocmești și să prezinti rapoarte financiare conforme pentru organizațiile non-profit.",
    category: "contabilitate",
    author: "Echipa iVoluntar",
    date: "2024-01-03",
    content: `# Rapoarte financiare pentru ONG-uri

Rapoartele financiare sunt esențiale pentru transparență și conformitate.`,
  },
  {
    id: "7",
    title: "Gestionarea arhivei documentelor",
    excerpt:
      "Sisteme și proceduri pentru organizarea și gestionarea eficientă a arhivei documentelor.",
    category: "secretariat",
    author: "Echipa iVoluntar",
    date: "2024-01-01",
    content: `# Gestionarea arhivei documentelor

O arhivă bine organizată este esențială pentru eficiența organizației.`,
  },
  {
    id: "8",
    title: "Proceduri legale pentru asociații",
    excerpt:
      "Ghid despre procedurile legale importante pentru asociații, de la înființare la modificări statutare.",
    category: "organizare",
    author: "Echipa iVoluntar",
    date: "2023-12-28",
    content: `# Proceduri legale pentru asociații

Cunoașterea procedurilor legale este esențială pentru funcționarea corectă a asociației.`,
  },
];

export function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.id as string;

  // Găsește articolul după slug sau id
  const article = mockArticles.find((a) => 
    a.slug === slug || a.id === slug || createSlug(a.title) === slug
  );

  useEffect(() => {
    if (!article) {
      router.push("/resurse");
    }
  }, [article, router]);

  if (!article) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <ArticleHeader article={article} />
      <ArticleContent article={article} />
    </div>
  );
}

