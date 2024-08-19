import { HeaderSection } from "../../shared/interfaces/interfaces";

export const usersTableHeaderSections: HeaderSection[] = [
  {
    id: 1,
    name: "Nombre",
    property: "name",
    sortTag: "name",
    pageName: "user",
  },
  {
    id: 2,
    name: "Email",
    property: "email",
    sortTag: "email",
    pageName: "user",
  },
  { id: 3, name: "Tipo", property: "type", sortTag: "", pageName: "user" },
  {
    id: 4,
    name: "Acciones",
    property: "actions",
    sortTag: "",
    pageName: "user",
  },
];
