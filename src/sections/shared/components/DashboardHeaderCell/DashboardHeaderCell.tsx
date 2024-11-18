import {
  HeaderSection,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";
import { StyledTableCell } from "../DashboardTable/DashboardTable";
import { useState } from "react";
import { useUserContext } from "sections/user/UserContext/useUserContext";
import { OrderItem } from "sections/user/UserContext/UserContext";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { BsFilterLeft } from "react-icons/bs";
import theme from "assets/styles/theme";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";

interface Props {
  section: HeaderSection;
}

const DashBoardHeaderCell = ({ section }: Props) => {
  const { setOrder, order } = useUserContext();
  const { order: orderCollabs, setOrder: setOrderCollabs } =
    useCollabsContext();
  const { orderCompanies, setOrderCompanies } = useCompanyContext();

  const getOrder = (section: HeaderSection) => {
    if (section.pageName === "collabs") {
      if (orderCollabs.sortTag === section.sortTag) {
        return orderCollabs.direction;
      } else {
        return null;
      }
    }

    if (section.pageName === SectionTypes.customers) {
      if (orderCompanies.sortTag === section.sortTag) {
        return orderCompanies.direction;
      } else {
        return null;
      }
    }

    if (section.pageName === "user" || section.pageName === "influencer") {
      if (order?.sortTag === section?.sortTag) {
        return order.direction;
      } else {
        return null;
      }
    }
    return null;
  };
  const [isSort, setIsSort] = useState<"ASC" | "DESC" | null>(
    getOrder(section),
  );

  const handlePressSort = () => {
    const sortActions: Record<
      string,
      (sortTag: string, direction: "ASC" | "DESC" | null) => void
    > = {
      collabs: (sortTag, direction) =>
        setOrderCollabs(direction ? { sortTag, direction } : ({} as OrderItem)),
      [SectionTypes.customers]: (sortTag, direction) =>
        setOrderCompanies(
          direction ? { sortTag, direction } : ({} as OrderItem),
        ),
      user: (sortTag, direction) =>
        setOrder(direction ? { sortTag, direction } : ({} as OrderItem)),
      influencer: (sortTag, direction) =>
        setOrder(direction ? { sortTag, direction } : ({} as OrderItem)),
    };

    const nextSort = isSort === null ? "ASC" : isSort === "ASC" ? "DESC" : null;
    setIsSort(nextSort);

    const action = sortActions[section.pageName];
    if (action && section.sortTag) {
      action(section.sortTag, nextSort);
    }
  };

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
        onClick={handlePressSort}
        disabled={!section.sortTag}
        className="table__sort-button"
      >
        {section.name}
        {isSort === null && section.sortTag !== "" ? (
          <BsFilterLeft color={theme.colors.mainColor} size={15} />
        ) : isSort === "ASC" ? (
          <BiSolidUpArrow color={theme.colors.mainColor} size={10} />
        ) : isSort === "DESC" ? (
          <BiSolidDownArrow color={theme.colors.mainColor} size={10} />
        ) : null}
      </button>
    </StyledTableCell>
  );
};

export default DashBoardHeaderCell;
