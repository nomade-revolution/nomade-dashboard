import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DashboardStyled from "./DashboardTableStyled";
import { HeaderSection } from "../../interfaces/interfaces";
import { Offer } from "../../../../modules/offers/domain/Offer";

import { Company, Influencer, User } from "modules/user/domain/User";
import DashboardTableCellContent from "../DashboardTableCellContent/DashboardTableCellContent";
import { Collab } from "modules/collabs/domain/Collabs";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface DashboardTableProps<Type> {
  bodySections: Type[];
  headerSections: HeaderSection[];
  // type: SectionTypes;
  pageName: string;
}

const DashboardTable = <Type,>({
  bodySections,
  headerSections,
  // type,
  pageName,
}: DashboardTableProps<Type>): React.ReactElement => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0px 0px 20px 0.2em rgba(0, 0, 0, 0.1)",
        width: "fit-content",
      }}
    >
      <DashboardStyled
        className="table"
        aria-label="dashboard table"
        style={{ borderCollapse: "collapse" }}
      >
        <TableHead>
          <TableRow
            className="table__header"
            sx={{ textTransform: "uppercase" }}
          >
            {headerSections.map((section) => {
              return (
                <StyledTableCell
                  align="center"
                  key={section.id}
                  className={
                    section.property === "contact"
                      ? "contact__section"
                      : section.property === "client"
                        ? "client__section"
                        : "header__section"
                  }
                >
                  <button
                    onClick={() => {}}
                    disabled={!section.sortTag}
                    className="table__sort-button"
                  >
                    {section.name}
                  </button>
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody sx={{ borderCollapse: "collapse" }}>
          {bodySections?.map((section: Type, index) => (
            <StyledTableRow key={index}>
              {headerSections?.map((headerSection) => (
                <StyledTableCell align="center" key={headerSection.id}>
                  <DashboardTableCellContent
                    headerSection={headerSection}
                    section={
                      section as Offer | User | Influencer | Company | Collab
                    }
                    pageName={pageName}
                  />
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </DashboardStyled>
    </TableContainer>
  );
};

export default DashboardTable;
