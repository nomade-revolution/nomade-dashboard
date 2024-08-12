import { useContext } from "react";
import { CityContext } from "./CityContext";

export const useCitiesContext = () => useContext(CityContext);
