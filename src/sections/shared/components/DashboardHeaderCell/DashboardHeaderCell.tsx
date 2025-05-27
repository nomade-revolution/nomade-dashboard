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
import { usePlansContext } from "sections/plans/PlansContext/usePlansContext";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { useLeadsContext } from "sections/leads/LeadsContext/useLeadsContext";

interface Props {
  section: HeaderSection;
}

const DashBoardHeaderCell = ({ section }: Props) => {
  const { setOrder, order } = useUserContext();
  const { order: orderCollabs, setOrder: setOrderCollabs } =
    useCollabsContext();
  const { setOrderPlans, orderPlans } = usePlansContext();
  const { order: orderLeads, setOrder: setOrderLeads } = useLeadsContext();
  const { orderCompanies, setOrderCompanies } = useCompanyContext();
  const { order: orderOffers, setOrder: setOrderOffers } = useOffersContext();

  const getOrder = (section: HeaderSection) => {
    if (section.pageName === SectionTypes.leads) {
      if (orderLeads.sortTag === section.sortTag) {
        return orderLeads.direction;
      } else {
        return null;
      }
    }
    if (section.pageName === "collabs") {
      if (orderCollabs.sortTag === section.sortTag) {
        return orderCollabs.direction;
      } else {
        return null;
      }
    }
    if (section.pageName === "offers") {
      if (orderOffers.sortTag === section.sortTag) {
        return orderOffers.direction;
      } else {
        return null;
      }
    }
    if (section.pageName === SectionTypes.plans) {
      if (orderPlans.sortTag === section.sortTag) {
        return orderPlans.direction;
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
      [SectionTypes.leads]: (sortTag, direction) =>
        setOrderLeads(direction ? { sortTag, direction } : ({} as OrderItem)),

      [SectionTypes.plans]: (sortTag, direction) =>
        setOrderPlans(direction ? { sortTag, direction } : ({} as OrderItem)),

      offers: (sortTag, direction) =>
        setOrderOffers(direction ? { sortTag, direction } : ({} as OrderItem)),

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
            : section.property === "objective" ||
                section.property === "minimum" ||
                section.property === "colabs"
              ? "header__section--small"
              : section.property === "company_comments"
                ? "header__section--large"
                : "header__section"
      }
    >
      <button
        onClick={handlePressSort}
        disabled={!section.sortTag}
        className={"table__sort-button"}
      >
        {section.name}
        {isSort === null && section.sortTag !== "" ? (
          <BsFilterLeft color={theme.colors.mineralGreen} size={15} />
        ) : isSort === "ASC" ? (
          <BiSolidUpArrow color={theme.colors.mineralGreen} size={10} />
        ) : isSort === "DESC" ? (
          <BiSolidDownArrow color={theme.colors.mineralGreen} size={10} />
        ) : null}
      </button>
    </StyledTableCell>
  );
};

export default DashBoardHeaderCell;
