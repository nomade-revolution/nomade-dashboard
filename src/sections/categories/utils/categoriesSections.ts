import { HeaderSection } from "sections/shared/interfaces/interfaces";

const categoriesSections: HeaderSection[] = [
  {
    id: 1,
    name: "Categoría",
    property: "name",
    sortTag: "",
    pageName: "categories",
  },
  {
    id: 1,
    name: "Subcategorías",
    property: "children",
    sortTag: "",
    pageName: "categories",
  },
];

export default categoriesSections;
