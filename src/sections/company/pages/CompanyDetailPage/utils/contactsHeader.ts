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
    name: "Email",
    property: "email",
    sortTag: "",
    pageName: "",
  },
  {
    id: 3,
    name: "Teléfono",
    property: "phone",
    sortTag: "",
    pageName: "",
  },
  {
    id: 4,
    name: "Tipo",
    property: "type",
    sortTag: "",
    pageName: "",
  },
];

export default contactsHeader;
