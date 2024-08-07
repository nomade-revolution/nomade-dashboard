import { useContext } from "react";
import { LeadsContext } from "./LeadsContext";

export const useLeadsContext = () => useContext(LeadsContext);
