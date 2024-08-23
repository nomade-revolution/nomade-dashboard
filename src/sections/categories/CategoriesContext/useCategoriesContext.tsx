import { useContext } from "react";
import { CategoriesContext } from "./CategoriesContext";

export const useCategoriesContext = () => useContext(CategoriesContext);
