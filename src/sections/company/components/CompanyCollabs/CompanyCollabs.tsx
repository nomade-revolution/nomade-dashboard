import { useCallback, useEffect, useState } from "react";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import {
  FilterParams,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";
import CompanyCollabsStyled from "./CompanyCollabsStyled";
import { companyCollabsHeaderSections } from "sections/company/utils/companySections";

interface Props {
  company_id: number;
}

const CompanyCollabs = ({ company_id }: Props): React.ReactElement => {
  const [page] = useState<number>(1);
  const { getAllCollabs, collabs, pagination, loading, order } =
    useCollabsContext();

  const getAllCollabsWithFilters = useCallback(() => {
    const filters: FilterParams = { filters: { company_id } };

    if (order?.sortTag) {
      filters.order = [{ by: order.sortTag, dir: order.direction }];
    }

    getAllCollabs(page, 10, filters);
  }, [getAllCollabs, company_id, order.direction, order.sortTag, page]);

  useEffect(() => {
    getAllCollabsWithFilters();
  }, [getAllCollabs, order]);

  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ marginBottom: "10px" }}>Collabs</h2>
      {loading ? (
        <Loader height="40px" width="40px" />
      ) : (
        <CompanyCollabsStyled>
          <DashboardTable
            bodySections={collabs}
            headerSections={companyCollabsHeaderSections}
            pageName={SectionTypes.collabs}
          />
          <PaginationComponent
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            filterParams=""
            pageName=""
          />
        </CompanyCollabsStyled>
      )}
    </div>
  );
};

export default CompanyCollabs;
