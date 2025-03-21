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
  {
    id: 3,
    name: "Rol",
    property: "roles",
    sortTag: "",
    pageName: "user",
  },
  {
    id: 4,
    name: "Acciones",
    property: "actions",
    sortTag: "",
    pageName: "user",
  },
];

export const usersAppTableHeaderSections: HeaderSection[] = [
  {
    id: 1,
    name: "Nombre",
    property: "name_compa",
    sortTag: "name",
    pageName: "usersApp",
  },
  {
    id: 2,
    name: "Email",
    property: "email",
    sortTag: "email",
    pageName: "usersApp",
  },
  {
    id: 3,
    name: "Cliente",
    property: "company",
    sortTag: "",
    pageName: "usersApp",
  },
];
