"use client";

import { OrganizationChartHeader } from "./organization-chart-header";
import { OrganizationChart } from "./organization-chart";

export interface OrgNode {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  department?: string;
  email?: string;
  phone?: string;
  children?: OrgNode[];
}

// TODO: Înlocuiește cu date reale din backend
const mockOrgData: OrgNode = {
  id: "1",
  firstName: "Ion",
  lastName: "Popescu",
  position: "Director General",
  department: "Management",
  email: "director@ivoluntar.org",
  phone: "+40 711 111 111",
  children: [
    {
      id: "2",
      firstName: "Elena",
      lastName: "Marinescu",
      position: "Manager HR",
      department: "Resurse Umane",
      email: "hr@ivoluntar.org",
      phone: "+40 722 222 222",
      children: [
        {
          id: "5",
          firstName: "Maria",
          lastName: "Ionescu",
          position: "Specialist HR",
          department: "Resurse Umane",
          email: "maria.ionescu@ivoluntar.org",
        },
        {
          id: "6",
          firstName: "Alexandru",
          lastName: "Dumitrescu",
          position: "Recruiter",
          department: "Resurse Umane",
          email: "recruiter@ivoluntar.org",
        },
      ],
    },
    {
      id: "3",
      firstName: "Cristian",
      lastName: "Radu",
      position: "Manager Proiecte",
      department: "Proiecte",
      email: "proiecte@ivoluntar.org",
      phone: "+40 767 890 123",
      children: [
        {
          id: "7",
          firstName: "Andreea",
          lastName: "Stoica",
          position: "Coordonator Proiecte",
          department: "Proiecte",
          email: "andreea.stoica@ivoluntar.org",
        },
        {
          id: "8",
          firstName: "Bogdan",
          lastName: "Constantinescu",
          position: "Specialist Proiecte",
          department: "Proiecte",
          email: "bogdan.constantinescu@ivoluntar.org",
        },
      ],
    },
    {
      id: "4",
      firstName: "Mihai",
      lastName: "Constantinescu",
      position: "Contabil",
      department: "Contabilitate",
      email: "contabilitate@ivoluntar.org",
      phone: "+40 21 333 3333",
      children: [
        {
          id: "9",
          firstName: "Laura",
          lastName: "Nicolae",
          position: "Asistent Contabil",
          department: "Contabilitate",
          email: "laura.nicolae@ivoluntar.org",
        },
      ],
    },
  ],
};

export function OrganizationChartPage() {
  return (
    <div className="space-y-6">
      <OrganizationChartHeader />
      <OrganizationChart data={mockOrgData} />
    </div>
  );
}

