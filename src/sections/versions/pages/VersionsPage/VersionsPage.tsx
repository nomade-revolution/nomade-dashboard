import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { Version } from "modules/versions/domain";
import { VersionFlag } from "modules/versions/domain/VersionRepository";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import ErrorFeedback from "sections/shared/components/Feedbacks/components/ErrorFeedback/ErrorFeedback";
import SuccessFeedback from "sections/shared/components/Feedbacks/components/SuccessFeedback/SuccessFeedback";
import Loader from "sections/shared/components/Loader/Loader";
import NoDataHandler from "sections/shared/components/NoDataHandler/NoDataHandler";
import VersionFlagConfirmDialog from "../../components/VersionFlagConfirmDialog";
import VersionsList from "../../components/VersionsList";
import { useVersionsContext } from "../../VersionsContext/useVersionsContext";
import { isActivatingRequiredOnLatest } from "../../utils/versionFlagCopy";

const PageHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;

  h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    max-width: 720px;
    line-height: 1.4;
  }
`;

interface PendingFlagChange {
  version: Version;
  flag: VersionFlag;
  value: boolean;
}

const VersionsPage = (): React.ReactElement => {
  const { user } = useAuthContext();
  const {
    versions,
    loading,
    error,
    updatingId,
    getAllVersions,
    updateVersionFlag,
  } = useVersionsContext();
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, setPending] = useState<PendingFlagChange | null>(null);

  useEffect(() => {
    getAllVersions();
  }, [getAllVersions]);

  if (user?.type === "Company") {
    return <Navigate to="/collabs/page/1" replace />;
  }

  const handleToggle = (
    version: Version,
    flag: VersionFlag,
    value: boolean,
  ) => {
    setSuccess(null);
    setPending({ version, flag, value });
  };

  const handleConfirm = async () => {
    if (!pending || updatingId !== null) {
      return;
    }

    const saved = await updateVersionFlag(
      pending.version,
      pending.flag,
      pending.value,
    );
    if (saved) {
      setSuccess("Cambio guardado");
    }
    setPending(null);
  };

  if (loading) {
    return <Loader width="20px" height="20px" />;
  }

  const showLatestWarning = pending
    ? isActivatingRequiredOnLatest(
        versions,
        pending.version.id,
        pending.flag,
        pending.value,
      )
    : false;

  return (
    <ReusablePageStyled>
      <PageHeader>
        <h1>Versiones de la app</h1>
        <p>
          Los cambios se aplican en cuanto se guardan a todos los usuarios que
          tengan esa versión instalada. Las versiones que no aparecen en la
          lista nunca se bloquean.
        </p>
      </PageHeader>
      {success && <SuccessFeedback text={success} />}
      {error && <ErrorFeedback text={error} />}
      {versions.length === 0 ? (
        <NoDataHandler pageName="versions" search="" />
      ) : (
        <VersionsList
          versions={versions}
          updatingId={updatingId}
          onToggle={handleToggle}
        />
      )}
      <VersionFlagConfirmDialog
        open={pending !== null}
        versionLabel={pending?.version.version ?? ""}
        flag={pending?.flag ?? null}
        nextValue={pending?.value ?? false}
        showLatestWarning={showLatestWarning}
        confirming={updatingId !== null}
        onCancel={() => {
          if (updatingId === null) {
            setPending(null);
          }
        }}
        onConfirm={handleConfirm}
      />
    </ReusablePageStyled>
  );
};

export default VersionsPage;
