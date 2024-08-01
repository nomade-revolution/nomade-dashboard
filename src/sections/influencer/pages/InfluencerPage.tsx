import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { mockUsers } from "mocks/userMocks";
import { UserTypes } from "modules/user/domain/User";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import { influencersTableHeaderSections } from "../utils/influencersSections";

const InfluencersPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string | null>(null);

  const { search } = useLocation();
  const { getUsers, users_influencer } = useUserContext();

  const searchParams = search.split("?").join("");

  const isLoading = false;

  useEffect(() => {
    const filters: FilterParams = {
      types: ["Influencer"],
    };

    getUsers(1, 12, filters, UserTypes.influencer);
  }, [getUsers]);

  return (
    <>
      {isLoading ? (
        <Loader width="50px" height="50px" />
      ) : !isLoading && mockUsers.length !== 0 ? (
        <ReusablePageStyled className="dashboard">
          <div className="dashboard__search">
            <SearchBar
              pageName={SectionTypes.users}
              pageTypes={SectionTypes.users}
              searchText={searchText!}
              setSearchText={setSearchText}
              onSearchSubmit={() => {}}
            />
          </div>
          <div className="dashboard__orders-table">
            <DashboardTable
              bodySections={users_influencer}
              headerSections={influencersTableHeaderSections}
              pageName={SectionTypes.users}
            />
          </div>
          <div className="dashboard__mobile">
            <h3>Influencers</h3>
            <DashboardCardListMobile
              bodySections={users_influencer}
              headerSections={influencersTableHeaderSections}
            />
          </div>
          <PaginationComponent
            current_page={1}
            last_page={1}
            per_page={12}
            pageName={SectionTypes.users}
            filterParams={searchParams}
          />
        </ReusablePageStyled>
      ) : mockUsers.length === 0 ? (
        <NoDataHandler pageName={SectionTypes.users} search={searchText!} />
      ) : (
        <></>
      )}
    </>
  );
};

export default InfluencersPage;
