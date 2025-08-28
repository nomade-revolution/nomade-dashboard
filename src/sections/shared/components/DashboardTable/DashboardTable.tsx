import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DashboardStyled from "./DashboardTableStyled";
import { HeaderSection, SectionTypes } from "../../interfaces/interfaces";
import { Offer } from "../../../../modules/offers/domain/Offer";
import { Company, User } from "modules/user/domain/User";
import DashboardTableCellContent from "../DashboardTableCellContent/DashboardTableCellContent";
import { Collab, CollabActionTypes } from "modules/collabs/domain/Collabs";
import { Influencer } from "@influencer";
import DashBoardHeaderCell from "../DashboardHeaderCell/DashboardHeaderCell";
import { useState } from "react";
import { Plan } from "modules/plans/domain/Plan";
import { ExtendedCollab } from "sections/collabs/components/CollabDetail/CollabDetail";
import { Calendar } from "modules/offers/domain/OfferCalendar";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: "#B78D00",
    fontWeight: "700",
    paddingTop: "25px",
    paddingBottom: "25px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingTop: "20px",
    paddingBottom: "20px",
  },
}));

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "$isRead",
})<{ $isRead?: boolean }>(({ theme, $isRead }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  // Muted styling for read leads
  ...($isRead && {
    opacity: 0.7,
    backgroundColor: theme.palette.action.disabledBackground || "#f5f5f5",
  }),
}));

interface DashboardTableProps<Type extends object> {
  bodySections: Type[];
  headerSections: HeaderSection[];
  pageName: string;
  type?: string;
  setCollabStateActionType?: (value: CollabActionTypes) => void;
}

const DashboardTable = <Type extends object>({
  bodySections,
  headerSections,
  pageName,
  type,
  setCollabStateActionType,
}: DashboardTableProps<Type>): React.ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0px 0px 20px 0.2em rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <DashboardStyled
          className="table"
          aria-label="dashboard table"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: "100%",
          }}
        >
          <TableHead>
            <TableRow
              className="table__header"
              sx={{ textTransform: "uppercase" }}
            >
              {headerSections.map((section) => (
                <DashBoardHeaderCell section={section} key={section.id} />
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ borderCollapse: "collapse" }}>
            {bodySections?.map((section: Type, index) => {
              // Check if this is a lead and if it's read
              const isRead =
                pageName === SectionTypes.leads &&
                "is_read" in section &&
                Boolean(
                  (section as Record<string, unknown>).is_read ??
                    (section as Record<string, unknown>).read_at,
                );

              return (
                <StyledTableRow key={index} $isRead={isRead}>
                  {headerSections?.map((headerSection) => (
                    <StyledTableCell
                      align="left"
                      key={headerSection.id}
                      style={{ minWidth: "100%" }}
                    >
                      <DashboardTableCellContent
                        headerSection={headerSection}
                        section={
                          section as
                            | Offer
                            | User
                            | Influencer
                            | Company
                            | Collab
                            | Plan
                            | ExtendedCollab
                            | Calendar
                        }
                        pageName={pageName}
                        type={type}
                        setCollabStateActionType={setCollabStateActionType}
                        anchorEl={anchorEl}
                        setAnchorEl={setAnchorEl}
                      />
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </DashboardStyled>
      </TableContainer>
    </>
  );
};

export default DashboardTable;
