import { HeaderSection } from "../../shared/interfaces/interfaces";

export const influencersTableHeaderSections: HeaderSection[] = [
  {
    id: 1,
    name: "Nombre",
    property: "name",
    sortTag: "name",
    pageName: "influencer",
  },
  // {
  //   id: 2,
  //   name: "Email",
  //   property: "email",
  //   sortTag: "email",
  //   pageName: "influencer",
  // },
  // {
  //   id: 3,
  //   name: "Teléfono",
  //   property: "phone",
  //   sortTag: "",
  //   pageName: "influencer",
  // },
  {
    id: 4,
    name: "País de origen",
    property: "from_country",
    sortTag: "",
    pageName: "influencer",
  },
  // {
  //   id: 5,
  //   name: "País de residencia",
  //   property: "living_country",
  //   sortTag: "",
  //   pageName: "influencer",
  // },
  {
    id: 6,
    name: "Ciudad de residencia",
    property: "living_city",
    sortTag: "",
    pageName: "influencer",
  },
  {
    id: 7,
    name: "RRSS principal",
    property: "social_media_mainRRSS",
    sortTag: "",
    pageName: "influencer",
  },
  {
    id: 8,
    name: "Followers",
    property: "social_media_followers",
    sortTag: "",
    pageName: "influencer",
  },
  {
    id: 9,
    name: "Categoría",
    property: "categories",
    sortTag: "",
    pageName: "influencer",
  },
  {
    id: 10,
    name: "Estado",
    property: "state",
    sortTag: "state",
    pageName: "influencer",
  },
  {
    id: 11,
    name: "Fecha de creación",
    property: "created_at",
    sortTag: "created_at",
    pageName: "influencer",
  },
];

export const influencerCollabsHeaderSections: HeaderSection[] = [
  {
    id: 1,
    name: "Cliente",
    property: "company",
    sortTag: "company",
    pageName: "collabs",
  },
  {
    id: 3,
    name: "Día",
    property: "day",
    sortTag: "day",
    pageName: "collabs",
  },
  {
    id: 4,
    name: "Hora",
    property: "time",
    sortTag: "",
    pageName: "collabs",
  },
  {
    id: 5,
    name: "Tipo",
    property: "type",
    sortTag: "type",
    pageName: "collabs",
  },
  {
    id: 6,
    name: "Estado",
    property: "history",
    sortTag: "status",
    pageName: "collabs",
  },
  {
    id: 8,
    name: "Ultima modificación",
    property: "history_update",
    sortTag: "",
    pageName: "collabs",
  },
  {
    id: 7,
    name: "Acciones",
    property: "actions",
    sortTag: "",
    pageName: "collabs",
  },
];

export const influencerSocialMediaListHeaderSections: HeaderSection[] = [
  {
    id: 1,
    name: "Red",
    property: "name",
    sortTag: "",
    pageName: "socialMedia",
  },
  {
    id: 2,
    name: "Usuario",
    property: "account_name",
    sortTag: "",
    pageName: "socialMedia",
  },
  {
    id: 3,
    name: "Followers",
    property: "followers",
    sortTag: "",
    pageName: "socialMedia",
  },
  {
    id: 4,
    name: "Visualizaciones",
    property: "stories_view",
    sortTag: "",
    pageName: "socialMedia",
  },
  {
    id: 5,
    name: "Video",
    property: "video",
    sortTag: "",
    pageName: "socialMedia",
  },
  {
    id: 6,
    name: "Estadísticas",
    property: "actions",
    sortTag: "",
    pageName: "socialMedia",
  },
];

export const influencerSocialMediaListCompanyHeaderSections: HeaderSection[] = [
  {
    id: 1,
    name: "Red",
    property: "name",
    sortTag: "",
    pageName: "socialMedia",
  },
  {
    id: 2,
    name: "Usuario",
    property: "account_name",
    sortTag: "",
    pageName: "socialMedia",
  },
  {
    id: 3,
    name: "Followers",
    property: "followers",
    sortTag: "",
    pageName: "socialMedia",
  },
  {
    id: 4,
    name: "Visualizaciones",
    property: "stories_view",
    sortTag: "",
    pageName: "socialMedia",
  },
];

export const parseFollowers = (number: number): string => {
  return `${number}K`;
};

export const toK = (number: number): string => {
  return `${(number / 1000).toFixed(1)}k`;
};
