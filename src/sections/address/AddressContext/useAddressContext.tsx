import { useContext } from "react";
import { AddressContext } from "./AddressContext";

export const useAddressContext = () => useContext(AddressContext);
