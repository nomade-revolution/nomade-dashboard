import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { mockUsers } from "mocks/userMocks";
import { UserTypes } from "modules/user/domain/User";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import NoDataHandler from "sections/shared/components/NoDataHandler/NoDataHandler";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import SearchBar from "sections/shared/components/SearchBar/SearchBar";
import {
  FilterParams,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";

import { useUserContext } from "sections/user/UserContext/useUserContext";
import { companyTableHeaderSections } from "../../utils/companySections";

const CompaniesPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string | null>(null);

  const { search } = useLocation();
  const { getUsers, users_company, pagination, loading } = useUserContext();
  const { page } = useParams();

  const searchParams = search.split("?").join("");

  useEffect(() => {
    const filters: FilterParams = {
      types: ["Company"],
    };

    getUsers(+page!, 12, filters, UserTypes.company);
  }, [getUsers, page]);

  return (
    <>
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : !loading && mockUsers.length !== 0 ? (
        <ReusablePageStyled className="dashboard">
          <div className="dashboard__search">
            <SearchBar
              pageName={SectionTypes.customers}
              pageTypes={SectionTypes.customers}
              searchText={searchText!}
              setSearchText={setSearchText}
              onSearchSubmit={() => {}}
            />
          </div>
          <div className="dashboard__orders-table">
            <DashboardTable
              bodySections={users_company}
              headerSections={companyTableHeaderSections}
              pageName={SectionTypes.customers}
            />
          </div>
          <div className="dashboard__mobile">
            <h3>Influencers</h3>
            <DashboardCardListMobile
              bodySections={users_company}
              headerSections={companyTableHeaderSections}
              pageName={SectionTypes.customers}
            />
          </div>
          <PaginationComponent
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            pageName={SectionTypes.customers}
            filterParams={searchParams}
          />
        </ReusablePageStyled>
      ) : mockUsers.length === 0 ? (
        <NoDataHandler pageName={SectionTypes.customers} search={searchText!} />
      ) : (
        <></>
      )}
    </>
  );
};

export default CompaniesPage;
