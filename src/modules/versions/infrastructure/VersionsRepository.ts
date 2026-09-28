import { Http } from "@core/application";
import {
  HttpResponseInterface,
  HttpSuccessResponseInterface,
} from "@core/domain";
import { VERSIONS } from "../application/routes";
import { Version } from "../domain";
import {
  VersionFlagChanges,
  VersionRepository,
  VersionsApiResponse,
} from "../domain/VersionRepository";

const emptyPagination: VersionsApiResponse["pagination"] = {
  current_page: 1,
  last_page: 1,
  per_page: 100,
};

const isSuccess = <T>(
  response: HttpResponseInterface<T>,
): response is HttpSuccessResponseInterface<T> => {
  return (
    (response as HttpSuccessResponseInterface<T>).data !== undefined &&
    (response as { success?: boolean }).success === true
  );
};

/**
 * Index responses are paginated. Other dashboard repositories read
 * `{ <plural>, pagination }`. This endpoint's feature test reads items from
 * `data.data` (Laravel paginator). Both shapes are normalized here.
 */
export const normalizeVersionsPayload = (
  payload: unknown,
): VersionsApiResponse => {
  if (Array.isArray(payload)) {
    return {
      versions: payload as Version[],
      pagination: emptyPagination,
    };
  }

  if (!payload || typeof payload !== "object") {
    return { versions: [], pagination: emptyPagination };
  }

  const record = payload as Record<string, unknown>;
  const versions = Array.isArray(record.versions)
    ? (record.versions as Version[])
    : Array.isArray(record.data)
      ? (record.data as Version[])
      : [];

  const paginationSource =
    record.pagination && typeof record.pagination === "object"
      ? (record.pagination as Record<string, unknown>)
      : record;

  return {
    versions,
    pagination: {
      current_page: Number(paginationSource.current_page ?? 1),
      last_page: Number(paginationSource.last_page ?? 1),
      per_page: Number(paginationSource.per_page ?? 100),
    },
  };
};

export class VersionsRepository implements VersionRepository {
  private readonly http: Http = Http.getInstance();

  public async getVersions(): Promise<
    HttpResponseInterface<VersionsApiResponse>
  > {
    try {
      const resp = await this.http.get<unknown>(VERSIONS, { per_page: 100 });
      if (isSuccess(resp)) {
        return {
          success: true,
          message: resp.message,
          data: normalizeVersionsPayload(resp.data),
        };
      }
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateVersion(
    id: number,
    changes: VersionFlagChanges,
  ): Promise<HttpResponseInterface<Version>> {
    try {
      const resp = await this.http.put<Version>(`${VERSIONS}/${id}`, changes);
      return resp;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
