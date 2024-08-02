import { HeaderSection } from "../../shared/interfaces/interfaces";

export const companyTableHeaderSections: HeaderSection[] = [
  {
    id: 1,
    name: "Imágen",
    property: "image",
    sortTag: "email",
  },
  { id: 2, name: "Empresa", property: "company_name", sortTag: "name" },
  { id: 3, name: "Web", property: "web", sortTag: "email" },
  { id: 4, name: "Teléfono", property: "phone", sortTag: "email" },
  { id: 5, name: "Porcentaje", property: "percentatge", sortTag: "email" },
  { id: 6, name: "NIF", property: "nif", sortTag: "" },
  { id: 7, name: "Tipo", property: "type", sortTag: "" },
  { id: 8, name: "Acciones", property: "actions", sortTag: "" },
];
