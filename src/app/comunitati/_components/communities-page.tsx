"use client";

import { useState } from "react";
import { CommunitiesHeader } from "./communities-header";
import { CommunitiesList } from "./communities-list";
import { Community } from "./community-card";
import { CommunityDetailModal } from "./community-detail-modal";
import { CreateCommunityModal } from "./create-community-modal";
import { useRouter } from "next/navigation";
import { createSlug } from "@/lib/slug";

// Mock data - în producție vine din backend
const mockCommunities: Community[] = [
  {
    id: "1",
    name: "Comunitatea Voluntarilor din București",
    description:
      "O comunitate activă de voluntari din București care organizează evenimente locale, campanii de donații și activități educaționale pentru copii și adulți.",
    category: "Regională",
    membersCount: 245,
    location: "București, România",
    isMember: true, // Utilizatorul este membru
  },
  {
    id: "2",
    name: "Echipa de Comunicare",
    description:
      "Comunitate dedicată voluntarilor care lucrează în domeniul comunicării, marketingului și relațiilor publice. Organizăm sesiuni de training și workshop-uri periodice.",
    category: "Departament",
    membersCount: 32,
    isMember: true, // Utilizatorul este membru
  },
  {
    id: "3",
    name: "Voluntari pentru Educație",
    description:
      "Comunitate care se concentrează pe proiecte educaționale, sprijinirea elevilor și organizarea de activități de învățare pentru comunitățile defavorizate.",
    category: "Program",
    membersCount: 156,
    location: "Națională",
  },
  {
    id: "4",
    name: "Comunitatea de Fundraising",
    description:
      "Grup de voluntari specializați în organizarea de campanii de strângere de fonduri, evenimente de caritate și parteneriate cu sponsorii.",
    category: "Departament",
    membersCount: 48,
  },
  {
    id: "5",
    name: "Voluntari IT",
    description:
      "Comunitate pentru voluntarii cu background tehnic care contribuie la dezvoltarea platformelor digitale, suport tehnic și inovații tehnologice.",
    category: "Departament",
    membersCount: 28,
    isPrivate: true,
  },
  {
    id: "6",
    name: "Comunitatea de Mediu",
    description:
      "Grup dedicat protecției mediului, organizării de acțiuni de curățenie, campanii de reciclare și educație ecologică.",
    category: "Program",
    membersCount: 89,
    location: "Națională",
  },
];

export function CommunitiesPage() {
  const router = useRouter();
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null,
  );
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleJoin = () => {
    if (!selectedCommunity) return;

    // Marchează utilizatorul ca membru
    setCommunities((prev) =>
      prev.map((community) =>
        community.id === selectedCommunity.id
          ? {
              ...community,
              isMember: true,
              membersCount: community.membersCount + 1,
            }
          : community,
      ),
    );

    // Navighează către pagina de grup folosind slug
    const slug = selectedCommunity.slug || createSlug(selectedCommunity.name);
    router.push(`/comunitati/${slug}`);
    
    // Închide modalul
    setSelectedCommunity(null);
  };

  const handleCreate = (communityData: Omit<Community, "id" | "membersCount">) => {
    // Creează o nouă comunitate
    const newCommunity: Community = {
      ...communityData,
      id: Date.now().toString(),
      membersCount: 1, // Creatorul este primul membru
    };

    // Adaugă comunitatea în listă
    setCommunities((prev) => [newCommunity, ...prev]);
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <CommunitiesHeader onCreateClick={() => setShowCreateModal(true)} />
      <CommunitiesList
        communities={communities}
        onCommunityClick={(community) => {
          // Dacă utilizatorul este membru, deschide pagina de grup
          if (community.isMember) {
            const slug = community.slug || createSlug(community.name);
            router.push(`/comunitati/${slug}`);
          } else {
            // Altfel, deschide modalul de detalii
            setSelectedCommunity(community);
          }
        }}
      />
      {selectedCommunity && (
        <CommunityDetailModal
          community={selectedCommunity}
          isOpen={!!selectedCommunity}
          onClose={() => setSelectedCommunity(null)}
          onJoin={handleJoin}
        />
      )}
      {showCreateModal && (
        <CreateCommunityModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}

