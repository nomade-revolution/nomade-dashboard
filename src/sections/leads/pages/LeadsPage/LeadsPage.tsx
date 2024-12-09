import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLeadsContext } from "sections/leads/LeadsContext/useLeadsContext";
import { leadsHeaderSection } from "sections/leads/utils/leadsSections";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import SearchBar from "sections/shared/components/SearchBar/SearchBar";
import {
  FilterParams,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";

const LeadsPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");

  const { getLeadsPaginated, loading, leads, pagination } = useLeadsContext();
  const { page } = useParams();

  const getLeadsData = (text?: string) => {
    const filters: FilterParams = {};
    if (searchText) {
      filters.search = text;
    }
    getLeadsPaginated(+page!, 10, filters);
  };

  const handleSearch = (text: string) => {
    getLeadsData(text);
  };

  useEffect(() => {
    getLeadsData();
  }, [getLeadsPaginated, page]);
  return (
    <>
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : (
        <ReusablePageStyled className="dashboard">
          <div
            className="dashboard__search"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <SearchBar
              pageName={SectionTypes.leads}
              pageTypes={SectionTypes.leads}
              searchText={searchText!}
              setSearchText={setSearchText}
              onSearchSubmit={() => handleSearch(searchText)}
              onReset={() => getLeadsData()}
            />
          </div>
          <div className="dashboard__table">
            <DashboardTable
              bodySections={leads}
              headerSections={leadsHeaderSection}
              pageName={SectionTypes.leads}
            />
          </div>
          <div className="dashboard__mobile">
            <h3>Leads</h3>
            <DashboardCardListMobile
              bodySections={leads}
              headerSections={leadsHeaderSection}
              pageName={SectionTypes.leads}
            />
          </div>
          <PaginationComponent
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            pageName={SectionTypes.leads}
            filterParams={""}
          />
        </ReusablePageStyled>
      )}
    </>
  );
};

export default LeadsPage;
