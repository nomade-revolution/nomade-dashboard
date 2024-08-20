import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { UserTypes } from "modules/user/domain/User";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { influencersTableHeaderSections } from "sections/influencer/utils/influencersSections";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import SearchBar from "sections/shared/components/SearchBar/SearchBar";
import {
  FilterParams,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";
import { useUserContext } from "sections/user/UserContext/useUserContext";

const InfluencersPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");

  const { getUsers, users_influencer, pagination, loading, order } =
    useUserContext();
  const { page } = useParams();

  const handleSearch = (text: string) => {
    getUsersData(text);
  };
  const getUsersData = (text?: string) => {
    const filters: FilterParams = {
      filters: {
        types: ["Influencer"],
      },
    };
    if (order?.sortTag) {
      filters.order = [{ by: order.sortTag, dir: order.direction }];
    }

    if (text) {
      filters.search = text;
    }
    getUsers(+page!, 10, filters, UserTypes.influencer);
  };

  useEffect(() => {}, [getUsers, page, order]);

  return (
    <>
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : (
        <ReusablePageStyled className="dashboard">
          <div className="dashboard__search">
            <SearchBar
              pageName={SectionTypes.influencers}
              pageTypes={SectionTypes.influencers}
              searchText={searchText!}
              setSearchText={setSearchText}
              onSearchSubmit={() => handleSearch(searchText)}
              onReset={() => getUsersData()}
            />
          </div>
          <div className="dashboard__table">
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
              pageName={SectionTypes.influencers}
            />
          </div>
          <PaginationComponent
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            pageName={SectionTypes.influencers}
            filterParams={""}
          />
        </ReusablePageStyled>
      )}
    </>
  );
};

export default InfluencersPage;
