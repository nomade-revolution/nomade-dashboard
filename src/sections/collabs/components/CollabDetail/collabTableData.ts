import { User } from "modules/user/domain/User";
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

export const collabDataTableData = (
  collabType: string,
  userType: User["type"],
): HeaderSection[] => {
  const typeField = {
    id: 1,
    name: "Tipo",
    property: "type",
    sortTag: "",
    pageName: "",
  };

  const initialFields = [];

  if (userType === "Nomade") {
    initialFields.push(typeField);
  }

  if (collabType === "Lodging") {
    return [
      ...initialFields,
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
    ...initialFields,
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
