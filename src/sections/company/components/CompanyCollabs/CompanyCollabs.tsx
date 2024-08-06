import { useEffect, useState } from "react";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import NoDataHandler from "sections/shared/components/NoDataHandler/NoDataHandler";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import CompanyCollabsStyled from "./CompanyCollabsStyled";
import { companyCollabsHeaderSections } from "sections/company/utils/companySections";

interface Props {
  company_id: number;
}

const CompanyCollabs = ({ company_id }: Props): React.ReactElement => {
  const [page, setPage] = useState<number>(1);
  const { getAllCollabs, collabs, pagination, loading } = useCollabsContext();

  useEffect(() => {
    setPage(pagination.current_page + 1);
    getAllCollabs(page, 12, undefined, company_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllCollabs, company_id]);

  return (
    <>
      <h2>Collabs</h2>
      {loading ? (
        <Loader height="40px" width="40px" />
      ) : !loading && collabs.length !== 0 ? (
        <CompanyCollabsStyled>
          <DashboardTable
            bodySections={collabs}
            headerSections={companyCollabsHeaderSections}
            pageName=""
          />
          <PaginationComponent
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            filterParams=""
            pageName=""
          />
        </CompanyCollabsStyled>
      ) : collabs.length === 0 ? (
        <NoDataHandler pageName={SectionTypes.collabs} search={""} />
      ) : (
        <></>
      )}
    </>
  );
};

export default CompanyCollabs;
