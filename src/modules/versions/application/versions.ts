import { HttpResponseInterface } from "@core";
import { Version } from "../domain";
import {
  VersionFlagChanges,
  VersionRepository,
  VersionsApiResponse,
} from "../domain/VersionRepository";

export const versionsGetAll = (
  versionRepo: VersionRepository,
): Promise<HttpResponseInterface<VersionsApiResponse>> => {
  return versionRepo.getVersions();
};

export const versionUpdate = (
  versionRepo: VersionRepository,
  id: number,
  changes: VersionFlagChanges,
): Promise<HttpResponseInterface<Version>> => {
  return versionRepo.updateVersion(id, changes);
};
