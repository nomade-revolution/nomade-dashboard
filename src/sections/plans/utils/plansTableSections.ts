import {
  HeaderSection,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";

export const monthPlansTableSections: HeaderSection[] = [
  {
    id: 2,
    name: "Cliente",
    property: "company",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 3,
    name: "Plan",
    property: "plan",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 4,
    name: "Objetivo",
    property: "objective",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 5,
    name: "Mínimo",
    property: "minimum",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 6,
    name: "Collabs",
    property: "colabs",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 7,
    name: "Progreso",
    property: "percentage",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 8,
    name: "Status",
    property: "status",
    sortTag: "company_status",
    pageName: SectionTypes.plans,
  },
];

export const trimestralPlansTableSections: HeaderSection[] = [
  {
    id: 2,
    name: "Cliente",
    property: "company",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 3,
    name: "Plan",
    property: "plan",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 4,
    name: "Objetivo",
    property: "objective",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 5,
    name: "Mínimo",
    property: "minimum",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 6,
    name: "Fecha inicio trimestre",
    property: "start_date",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 7,
    name: "Fecha fin trimestre",
    property: "end_date",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 8,
    name: "Tiempo restante",
    property: "remaining",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 9,
    name: "Collabs",
    property: "colabs",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 10,
    name: "Progreso",
    property: "percentage",
    sortTag: "",
    pageName: "offers",
  },
  {
    id: 11,
    name: "Status",
    property: "status",
    sortTag: "company_status",
    pageName: SectionTypes.plans,
  },
];
