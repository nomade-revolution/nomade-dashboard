import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { ContactType } from "../domain/Contact";
import { CONTACT_TYPES_BASE } from "../application/routes";

export class ContactRepository {
  private readonly http: Http = Http.getInstance();

  public async getContactTypes(): Promise<
    HttpResponseInterface<ContactType[]>
  > {
    try {
      const resp = await this.http.get<ContactType[]>(CONTACT_TYPES_BASE);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
