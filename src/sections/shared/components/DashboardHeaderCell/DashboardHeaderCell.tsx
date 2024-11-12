import { HeaderSection } from "sections/shared/interfaces/interfaces";
import { StyledTableCell } from "../DashboardTable/DashboardTable";
import { useState } from "react";
import { useUserContext } from "sections/user/UserContext/useUserContext";
import { OrderItem } from "sections/user/UserContext/UserContext";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { BsFilterLeft } from "react-icons/bs";
import theme from "assets/styles/theme";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

interface Props {
  section: HeaderSection;
}

const DashBoardHeaderCell = ({ section }: Props) => {
  const { setOrder, order } = useUserContext();
  const { order: orderCollabs, setOrder: setOrderCollabs } =
    useCollabsContext();

  const getOrder = (section: HeaderSection) => {
    if (section.pageName === "collabs") {
      if (orderCollabs.sortTag === section.sortTag) {
        return orderCollabs.direction;
      } else {
        return null;
      }
    }

    if (
      section.pageName === "user" ||
      section.pageName === "influencer" ||
      section.pageName === "company"
    ) {
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
    if (section.pageName === "collabs") {
      if (isSort === null) {
        setIsSort("ASC");
        setOrderCollabs({ sortTag: section.sortTag!, direction: "ASC" });
      } else if (isSort === "ASC") {
        setIsSort("DESC");
        setOrderCollabs({ sortTag: section.sortTag!, direction: "DESC" });
      } else {
        setIsSort(null);
        setOrderCollabs({} as OrderItem);
      }
    } else if (
      section.pageName === "user" ||
      section.pageName === "influencer" ||
      section.pageName === "company"
    ) {
      if (isSort === null) {
        setIsSort("ASC");
        setOrder({ sortTag: section.sortTag!, direction: "ASC" });
      } else if (isSort === "ASC") {
        setIsSort("DESC");
        setOrder({ sortTag: section.sortTag!, direction: "DESC" });
      } else {
        setIsSort(null);
        setOrder({} as OrderItem);
      }
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
