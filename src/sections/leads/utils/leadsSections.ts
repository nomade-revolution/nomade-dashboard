import {
  HeaderSection,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";

export const leadsHeaderSection: HeaderSection[] = [
  {
    id: 1,
    name: "Empresa",
    property: "company_name",
    sortTag: "",
    pageName: SectionTypes.leads,
  },
  {
    id: 3,
    name: "Contacto",
    property: "contact_name",
    sortTag: "",
    pageName: SectionTypes.leads,
  },
  {
    id: 4,
    name: "Teléfono",
    property: "phone",
    sortTag: "",
    pageName: SectionTypes.leads,
  },
  {
    id: 5,
    name: "Email",
    property: "email",
    sortTag: "",
    pageName: SectionTypes.leads,
  },
  {
    id: 6,
    name: "Mensaje",
    property: "message",
    sortTag: "",
    pageName: SectionTypes.leads,
  },
  {
    id: 8,
    name: "Fecha de creacion",
    property: "created_at",
    sortTag: "created_at",
    pageName: SectionTypes.leads,
  },
  {
    id: 17,
    name: "Fecha de envío",
    property: "sent_at",
    sortTag: "link_sent_at",
    pageName: SectionTypes.leads,
  },
  {
    id: 18,
    name: "Estado",
    property: "link_sent",
    sortTag: "state",
    pageName: SectionTypes.leads,
  },
  {
    id: 9,
    name: "Acciones",
    property: "actions",
    sortTag: "",
    pageName: SectionTypes.leads,
  },
];
