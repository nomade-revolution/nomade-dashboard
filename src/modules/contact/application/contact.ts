import { HttpResponseInterface } from "@core/domain/HttpResponseInterface";
import { ContactType } from "../domain/Contact";
import { ContactRepository } from "../domain/ContactRepository";

export const getContactTypes = (
  contactRepo: ContactRepository<ContactType[]>,
): Promise<HttpResponseInterface<ContactType[]>> => {
  return contactRepo.getContactTypes();
};
