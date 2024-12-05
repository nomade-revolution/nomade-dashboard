import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import theme from "assets/styles/theme";
import { UserTypes } from "modules/user/domain/User";
import { useCallback, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { influencersTableHeaderSections } from "sections/influencer/utils/influencersSections";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import SearchBar from "sections/shared/components/SearchBar/SearchBar";
import {
  FilterParams,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";
import { useUserContext } from "sections/user/UserContext/useUserContext";

const InfluencersPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  const { getUsers, users_influencer, pagination, loading, order } =
    useUserContext();
  const { page } = useParams();

  const handleSearch = (text: string) => {
    getUsersData(text);
  };
  const getUsersData = useCallback(
    (text?: string) => {
      const filters: FilterParams = {
        filters: {
          types: ["Influencer"],
        },
      };
      if (order?.sortTag) {
        filters.order = [{ by: order.sortTag, dir: order.direction }];
      }

      if (text) {
        filters.filters = { search: text };
      }
      getUsers(+page!, 10, filters, UserTypes.influencer);
    },
    [getUsers, order.direction, order.sortTag, page],
  );
  const handleCreateUser = () => {
    navigate(appPaths.createInfluencer);
  };
  useEffect(() => {
    getUsersData();
  }, [page, order, getUsersData]);
  return (
    <>
      {loading ? (
        <Loader width="20px" height="20px" />
      ) : (
        <ReusablePageStyled className="dashboard">
          <div className="dashboard__search">
            <ActionButton
              color={theme.colors.darkBlue}
              icon={<FaUser />}
              onClick={() => handleCreateUser()}
              text="Crear usuario"
            />
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
