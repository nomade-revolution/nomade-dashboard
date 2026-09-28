import React, { createContext, useCallback, useState } from "react";
import { isHttpSuccessResponse } from "../../shared/utils/typeGuards/typeGuardsFunctions";
import { Version } from "modules/versions/domain";
import {
  VersionFlag,
  VersionRepository,
} from "modules/versions/domain/VersionRepository";
import {
  versionUpdate,
  versionsGetAll,
} from "modules/versions/application/versions";

interface ContextState {
  versions: Version[];
  loading: boolean;
  error: string | null;
  updatingId: number | null;
  getAllVersions: () => void;
  updateVersionFlag: (
    version: Version,
    flag: VersionFlag,
    value: boolean,
  ) => Promise<boolean>;
}

const readErrorMessage = (
  response: { message?: string },
  fallback: string,
): string => {
  if (response.message) {
    return response.message;
  }
  return fallback;
};

export const VersionsContext = createContext<ContextState>({} as ContextState);

export const VersionsContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: VersionRepository }>) => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const getAllVersions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await versionsGetAll(repository);
      if (isHttpSuccessResponse(response)) {
        setVersions(response.data.versions);
      } else {
        setError(
          readErrorMessage(response, "No se han podido cargar las versiones"),
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se han podido cargar las versiones",
      );
    } finally {
      setLoading(false);
    }
  }, [repository]);

  const updateVersionFlag = useCallback(
    async (version: Version, flag: VersionFlag, value: boolean) => {
      setUpdatingId(version.id);
      setError(null);

      try {
        const response = await versionUpdate(repository, version.id, {
          [flag]: value,
        });
        if (isHttpSuccessResponse(response)) {
          setVersions((current) =>
            current.map((item) =>
              item.id === response.data.id ? response.data : item,
            ),
          );
          return true;
        }

        setError(
          readErrorMessage(response, "No se ha podido actualizar la versión"),
        );
        return false;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "No se ha podido actualizar la versión",
        );
        return false;
      } finally {
        setUpdatingId(null);
      }
    },
    [repository],
  );

  return (
    <VersionsContext.Provider
      value={{
        versions,
        loading,
        error,
        updatingId,
        getAllVersions,
        updateVersionFlag,
      }}
    >
      {children}
    </VersionsContext.Provider>
  );
};
