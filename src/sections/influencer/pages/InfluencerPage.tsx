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
import { influencersTableHeaderSections } from "../utils/influencersSections";

const InfluencersPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string | null>(null);

  const { search } = useLocation();
  const { getUsers, users_influencer, pagination, loading } = useUserContext();
  const { page } = useParams();

  const searchParams = search.split("?").join("");

  useEffect(() => {
    const filters: FilterParams = {
      types: ["Influencer"],
    };

    getUsers(+page!, 10, filters, UserTypes.influencer);
  }, [getUsers, page]);

  return (
    <>
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : !loading && mockUsers.length !== 0 ? (
        <ReusablePageStyled className="dashboard">
          <div className="dashboard__search">
            <SearchBar
              pageName={SectionTypes.influencers}
              pageTypes={SectionTypes.influencers}
              searchText={searchText!}
              setSearchText={setSearchText}
              onSearchSubmit={() => {}}
            />
          </div>
          <div className="dashboard__orders-table">
            <DashboardTable
              bodySections={users_influencer}
              headerSections={influencersTableHeaderSections}
              pageName={SectionTypes.influencers}
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
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            pageName={SectionTypes.influencers}
            filterParams={searchParams}
          />
        </ReusablePageStyled>
      ) : mockUsers.length === 0 ? (
        <NoDataHandler
          pageName={SectionTypes.influencers}
          search={searchText!}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default InfluencersPage;
