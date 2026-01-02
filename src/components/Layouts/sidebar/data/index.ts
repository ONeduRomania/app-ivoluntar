import * as Icons from "../icons";

export const NAV_DATA = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Pontajul meu",
        url: "/pontaj",
        icon: Icons.TimeTrackingIcon,
        items: [],
      },
      {
        title: "Agenda telefonică",
        url: "/agenda-telefonica",
        icon: Icons.PhoneBookIcon,
        items: [],
      },
      {
        title: "Organigramă",
        url: "/organigrama",
        icon: Icons.OrganizationChartIcon,
        items: [],
      },
      {
        title: "Comunități",
        url: "/comunitati",
        icon: Icons.CommunitiesIcon,
        items: [],
      },
      {
        title: "Resurse",
        icon: Icons.ResourcesIcon,
        items: [
          {
            title: "Organizare",
            url: "/resurse/organizare",
          },
          {
            title: "Contabilitate",
            url: "/resurse/contabilitate",
          },
          {
            title: "Secretariat",
            url: "/resurse/secretariat",
          },
          {
            title: "WikiVoluntariat",
            url: "https://wiki.ivoluntar.org",
            external: true,
          },
          {
            title: "Radiere",
            url: "/resurse/radiere",
          },
        ],
      },
    ],
  },
];
