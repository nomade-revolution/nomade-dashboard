import { HeaderSection } from "../../shared/interfaces/interfaces";

export const usersTableHeaderSections: HeaderSection[] = [
  { id: 1, name: "Nombre", property: "name", sortTag: "name" },
  { id: 2, name: "Email", property: "email", sortTag: "email" },
  { id: 3, name: "Tipo", property: "type", sortTag: "" },
  { id: 4, name: "Acciones", property: "actions", sortTag: "" },
];
