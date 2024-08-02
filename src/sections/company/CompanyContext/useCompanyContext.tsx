import { useContext } from "react";
import { CompanyContext } from "./CompanyContext";

export const useCompanyContext = () => useContext(CompanyContext);
