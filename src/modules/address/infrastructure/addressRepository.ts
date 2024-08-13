import { Http } from "@core/application";
import { HttpResponseInterface } from "@core/domain";
import { FullAddress } from "../domain/Address";
import { ADDRESS_BASE } from "../application/routes";

export class AddressRepository {
  private readonly http: Http = Http.getInstance();

  public async getAddressById(
    address_id: number,
  ): Promise<HttpResponseInterface<FullAddress>> {
    try {
      const resp = await this.http.get<FullAddress>(
        `${ADDRESS_BASE}/${address_id}`,
      );
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
