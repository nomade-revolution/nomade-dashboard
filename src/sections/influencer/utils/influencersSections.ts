import { HeaderSection } from "../../shared/interfaces/interfaces";

export const influencersTableHeaderSections: HeaderSection[] = [
  { id: 1, name: "Nombre", property: "name", sortTag: "name" },
  { id: 2, name: "Email", property: "email", sortTag: "email" },
  { id: 3, name: "Teléfono", property: "phone", sortTag: "email" },
  { id: 4, name: "País de origen", property: "from_country", sortTag: "email" },
  {
    id: 5,
    name: "País de residéncia",
    property: "living_country",
    sortTag: "email",
  },
  { id: 6, name: "Tipo", property: "type", sortTag: "" },
  { id: 7, name: "Acciones", property: "actions", sortTag: "" },
];

export const influencerCollabsHeaderSections: HeaderSection[] = [
  { id: 1, name: "Empresa", property: "company", sortTag: "" },
  { id: 3, name: "Día", property: "day", sortTag: "" },
  { id: 4, name: "Hora", property: "time", sortTag: "" },
  { id: 5, name: "Tipo", property: "type", sortTag: "" },
];
