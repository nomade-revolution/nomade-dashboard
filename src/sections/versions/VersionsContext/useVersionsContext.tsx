import { useContext } from "react";
import { VersionsContext } from "./VersionsContext";

export const useVersionsContext = () => useContext(VersionsContext);
