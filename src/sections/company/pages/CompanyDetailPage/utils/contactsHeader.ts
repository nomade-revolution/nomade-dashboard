import {
  HeaderSection,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";

const contactsHeader: HeaderSection[] = [
  {
    id: 1,
    name: "Nombre",
    property: "name",
    sortTag: "",
    pageName: SectionTypes.users,
  },
  {
    id: 2,
    name: "Apellido",
    property: "surname",
    sortTag: "",
    pageName: SectionTypes.users,
  },
  {
    id: 3,
    name: "Email",
    property: "email",
    sortTag: "",
    pageName: "",
  },
  {
    id: 4,
    name: "Teléfono",
    property: "phone",
    sortTag: "",
    pageName: "",
  },
  {
    id: 5,
    name: "Tipo",
    property: "type",
    sortTag: "",
    pageName: "",
  },
];

export default contactsHeader;
