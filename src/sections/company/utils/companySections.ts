import { HeaderSection } from "../../shared/interfaces/interfaces";

export const companyTableHeaderSections: HeaderSection[] = [
  {
    id: 1,
    name: "Imágen",
    property: "image",
    sortTag: "",
    pageName: "company",
  },
  {
    id: 2,
    name: "Cliente",
    property: "company_name",
    sortTag: "company_name",
    pageName: "company",
  },
  { id: 3, name: "Web", property: "web", sortTag: "web", pageName: "company" },
  {
    id: 4,
    name: "Teléfono",
    property: "phone",
    sortTag: "",
    pageName: "company",
  },
  {
    id: 5,
    name: "Porcentaje",
    property: "percentage",
    sortTag: "",
    pageName: "company",
  },
  { id: 6, name: "NIF", property: "nif", sortTag: "", pageName: "company" },
  { id: 7, name: "Tipo", property: "type", sortTag: "", pageName: "company" },
  {
    id: 8,
    name: "Acciones",
    property: "actions",
    sortTag: "",
    pageName: "company",
  },
];

export const companyCollabsHeaderSections: HeaderSection[] = [
  {
    id: 1,
    name: "Influencer",
    property: "influencer_name",
    sortTag: "name",
    pageName: "company",
  },
  { id: 3, name: "Día", property: "day", sortTag: "", pageName: "company" },
  { id: 4, name: "Hora", property: "time", sortTag: "", pageName: "company" },
  { id: 5, name: "Tipo", property: "type", sortTag: "", pageName: "company" },
  {
    id: 6,
    name: "Estado",
    property: "history",
    sortTag: "",
    pageName: "influencer",
  },
  {
    id: 6,
    name: "Publicada",
    property: "published",
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
