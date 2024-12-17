import { HeaderSection } from "sections/shared/interfaces/interfaces";

export const collabDetailTableData: HeaderSection[] = [
  {
    id: 1,
    name: "Cliente",
    property: "company",
    sortTag: "",
    pageName: "",
  },
  {
    id: 2,
    name: "Influencer",
    property: "influencer_name",
    sortTag: "",
    pageName: "",
  },
  {
    id: 3,
    name: "Fecha",
    property: "day",
    sortTag: "",
    pageName: "collabDetail",
  },
  {
    id: 4,
    name: "RRSS",
    property: "social_media_mainRRSS",
    sortTag: "",
    pageName: "",
  },
];

export const collabDataTableData = (collabType: string): HeaderSection[] => {
  if (collabType === "Lodging") {
    return [
      {
        id: 1,
        name: "Tipo",
        property: "type",
        sortTag: "",
        pageName: "",
      },
      {
        id: 5,
        name: "Dirección",
        property: "address",
        sortTag: "",
        pageName: "",
      },
      {
        id: 2,
        name: "Desde",
        property: "from_day",
        sortTag: "",
        pageName: "",
      },
      {
        id: 3,
        name: "Hasta",
        property: "to_day",
        sortTag: "",
        pageName: "",
      },
      {
        id: 4,
        name: "PAX",
        property: "guests",
        sortTag: "",
        pageName: "",
      },
    ];
  }
  return [
    {
      id: 1,
      name: "Tipo",
      property: "type",
      sortTag: "",
      pageName: "",
    },
    {
      id: 5,
      name: "Dirección",
      property: "address",
      sortTag: "",
      pageName: "",
    },
    {
      id: 2,
      name: "Día",
      property: "day",
      sortTag: "",
      pageName: "",
    },
    {
      id: 3,
      name: "Hora",
      property: "time",
      sortTag: "",
      pageName: "",
    },
    {
      id: 4,
      name: "PAX",
      property: "guests",
      sortTag: "",
      pageName: "",
    },
  ];
};
