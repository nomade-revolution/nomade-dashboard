import { HttpResponseInterface } from "@core";
import { PaginationStucture } from "sections/shared/interfaces/interfaces";
import { Version } from "./Version";

export type VersionFlag = "maintenance" | "ios_required" | "android_required";

export type VersionFlagChanges = Partial<
  Pick<Version, "maintenance" | "ios_required" | "android_required">
>;

export interface VersionsApiResponse {
  versions: Version[];
  pagination: PaginationStucture;
}

export interface VersionRepository {
  getVersions(): Promise<HttpResponseInterface<VersionsApiResponse>>;
  updateVersion(
    id: number,
    changes: Partial<
      Pick<Version, "maintenance" | "ios_required" | "android_required">
    >,
  ): Promise<HttpResponseInterface<Version>>;
}
