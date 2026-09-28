import { VersionFlag } from "modules/versions/domain/VersionRepository";

export const LATEST_VERSION_REQUIRED_WARNING =
  "Es la última versión registrada. Asegúrate de que hay una versión más nueva publicada en la tienda, o los usuarios no tendrán a qué actualizar.";

export const getVersionFlagConfirmText = (
  version: string,
  flag: VersionFlag,
  enabling: boolean,
): string => {
  if (flag === "maintenance") {
    if (enabling) {
      return `Vas a activar el modo mantenimiento en la versión ${version}. Los usuarios con esa versión verán la pantalla de mantenimiento y no podrán usar la app.`;
    }
    return `Vas a desactivar el modo mantenimiento en la versión ${version}. Los usuarios con esa versión podrán volver a usar la app.`;
  }

  const platform = flag === "ios_required" ? "iOS" : "Android";

  if (enabling) {
    return `Vas a marcar como obligatoria la actualización en ${platform} para la versión ${version}. Los usuarios de ${platform} con esa versión no podrán usar la app hasta actualizar.`;
  }

  return `Vas a quitar la actualización obligatoria en ${platform} para la versión ${version}.`;
};

export const isActivatingRequiredOnLatest = (
  versions: { id: number }[],
  versionId: number,
  flag: VersionFlag,
  nextValue: boolean,
): boolean => {
  if (!nextValue) {
    return false;
  }
  if (flag !== "ios_required" && flag !== "android_required") {
    return false;
  }

  const latestId = versions.reduce(
    (maxId, version) => (version.id > maxId ? version.id : maxId),
    0,
  );

  return versionId === latestId;
};
