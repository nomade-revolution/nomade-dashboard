import { HeaderSection } from "../../shared/interfaces/interfaces";

export const influencersTableHeaderSections: HeaderSection[] = [
  {
    id: 1,
    name: "Nombre",
    property: "name",
    sortTag: "name",
    pageName: "influencer",
  },
  {
    id: 2,
    name: "Email",
    property: "email",
    sortTag: "email",
    pageName: "influencer",
  },
  {
    id: 3,
    name: "Teléfono",
    property: "phone",
    sortTag: "",
    pageName: "influencer",
  },
  {
    id: 4,
    name: "País de origen",
    property: "from_country",
    sortTag: "",
    pageName: "influencer",
  },
  {
    id: 5,
    name: "País de residéncia",
    property: "living_country",
    sortTag: "",
    pageName: "influencer",
  },
  {
    id: 6,
    name: "Ciudad de residéncia",
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
];

export const influencerCollabsHeaderSections: HeaderSection[] = [
  {
    id: 1,
    name: "Cliente",
    property: "company",
    sortTag: "company_name",
    pageName: "influencer",
  },
  { id: 3, name: "Día", property: "day", sortTag: "", pageName: "influencer" },
  {
    id: 4,
    name: "Hora",
    property: "time",
    sortTag: "",
    pageName: "influencer",
  },
  {
    id: 5,
    name: "Tipo",
    property: "type",
    sortTag: "",
    pageName: "influencer",
  },
  {
    id: 5,
    name: "Estado",
    property: "history",
    sortTag: "",
    pageName: "influencer",
  },
  {
    id: 7,
    name: "Acciones",
    property: "actions",
    sortTag: "",
    pageName: "influencer",
  },
];
