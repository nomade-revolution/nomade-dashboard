import { HeaderSection } from "../../shared/interfaces/interfaces";

export const usersTableHeaderSections: HeaderSection[] = [
  { id: 1, name: "Nombre", property: "name", sortTag: "name" },
  { id: 2, name: "Email", property: "email", sortTag: "email" },
  { id: 3, name: "Teléfono", property: "phone", sortTag: "" },
  { id: 4, name: "Rol", property: "role", sortTag: "" },
  { id: 5, name: "Estado", property: "state", sortTag: "" },
  { id: 6, name: "Acciones", property: "actions", sortTag: "" },
];
