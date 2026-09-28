import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Version } from "modules/versions/domain";
import { VersionFlag } from "modules/versions/domain/VersionRepository";
import { StyledTableCell } from "sections/shared/components/DashboardTable/DashboardTable";
import DashboardCardListMobileStyled from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobileStyles";
import DashboardCardMobileStyled from "sections/shared/components/DashboardCardMobile/DashboardCardMobileStyles";

const columns = [
  "Versión",
  "Mantenimiento",
  "Act. obligatoria iOS",
  "Act. obligatoria Android",
  "Última modificación",
];

interface VersionsListProps {
  versions: Version[];
  updatingId: number | null;
  onToggle: (version: Version, flag: VersionFlag, value: boolean) => void;
}

const flagLabel: Record<VersionFlag, string> = {
  maintenance: "Mantenimiento",
  ios_required: "Act. obligatoria iOS",
  android_required: "Act. obligatoria Android",
};

const VersionFlagSwitch = ({
  version,
  flag,
  disabled,
  onToggle,
}: {
  version: Version;
  flag: VersionFlag;
  disabled: boolean;
  onToggle: VersionsListProps["onToggle"];
}) => {
  return (
    <Switch
      checked={version[flag]}
      disabled={disabled}
      onChange={(_, value) => onToggle(version, flag, value)}
      inputProps={{
        "aria-label": `${flagLabel[flag]} ${version.version}`,
      }}
    />
  );
};

const VersionsList = ({
  versions,
  updatingId,
  onToggle,
}: VersionsListProps): React.ReactElement => {
  return (
    <>
      <div className="dashboard__table">
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0px 0px 20px 0.2em rgba(0, 0, 0, 0.1)",
            width: "100%",
            overflowX: "auto",
          }}
        >
          <Table aria-label="Versiones de la app">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell key={column}>{column}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {versions.map((version) => {
                const rowDisabled = updatingId === version.id;
                return (
                  <TableRow key={version.id}>
                    <StyledTableCell>{version.version}</StyledTableCell>
                    <StyledTableCell>
                      <VersionFlagSwitch
                        version={version}
                        flag="maintenance"
                        disabled={rowDisabled}
                        onToggle={onToggle}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <VersionFlagSwitch
                        version={version}
                        flag="ios_required"
                        disabled={rowDisabled}
                        onToggle={onToggle}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <VersionFlagSwitch
                        version={version}
                        flag="android_required"
                        disabled={rowDisabled}
                        onToggle={onToggle}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      {version.updated_at || "—"}
                    </StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="dashboard__mobile">
        <DashboardCardListMobileStyled>
          {versions.map((version) => {
            const rowDisabled = updatingId === version.id;
            return (
              <li key={version.id} className="dashboard-list__item">
                <DashboardCardMobileStyled>
                  <div className="dashboard-card__section">
                    <span className="dashboard-card__section-title">
                      Versión
                    </span>
                    <span>{version.version}</span>
                  </div>
                  <div className="dashboard-card__section">
                    <span className="dashboard-card__section-title">
                      Mantenimiento
                    </span>
                    <VersionFlagSwitch
                      version={version}
                      flag="maintenance"
                      disabled={rowDisabled}
                      onToggle={onToggle}
                    />
                  </div>
                  <div className="dashboard-card__section">
                    <span className="dashboard-card__section-title">
                      Act. obligatoria iOS
                    </span>
                    <VersionFlagSwitch
                      version={version}
                      flag="ios_required"
                      disabled={rowDisabled}
                      onToggle={onToggle}
                    />
                  </div>
                  <div className="dashboard-card__section">
                    <span className="dashboard-card__section-title">
                      Act. obligatoria Android
                    </span>
                    <VersionFlagSwitch
                      version={version}
                      flag="android_required"
                      disabled={rowDisabled}
                      onToggle={onToggle}
                    />
                  </div>
                  <div className="dashboard-card__section">
                    <span className="dashboard-card__section-title">
                      Última modificación
                    </span>
                    <span>{version.updated_at || "—"}</span>
                  </div>
                </DashboardCardMobileStyled>
              </li>
            );
          })}
        </DashboardCardListMobileStyled>
      </div>
    </>
  );
};

export default VersionsList;
