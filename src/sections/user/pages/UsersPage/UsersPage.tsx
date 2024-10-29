import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../shared/components/Loader/Loader";
import DashboardTable from "../../../shared/components/DashboardTable/DashboardTable";
import DashboardCardListMobile from "../../../shared/components/DashboardCardListMobile/DashboardCardListMobile";
import PaginationComponent from "../../../shared/components/Pagination/PaginationComponent";
import SearchBar from "../../../shared/components/SearchBar/SearchBar";
import { IoAddCircle } from "react-icons/io5";
import {
  FilterParams,
  SectionTypes,
} from "../../../shared/interfaces/interfaces";
import { usersTableHeaderSections } from "../../utils/userTableSections";
import { useUserContext } from "sections/user/UserContext/useUserContext";
import { UserTypes } from "modules/user/domain/User";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";

const UsersPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");
  const { page } = useParams();
  const { getUsers, users_nomade, pagination, loading, order } =
    useUserContext();

  const handleSearch = (searchText: string) => {
    getUsersData(searchText);
  };

  const getUsersData = useCallback(
    (text?: string) => {
      const filters: FilterParams = {
        filters: {
          types: ["Nomade"],
        },
      };
      if (order?.sortTag) {
        filters.order = [{ by: order.sortTag, dir: order.direction }];
      }
      if (text) {
        (filters as unknown as { filters: { search: string } }).filters.search =
          text;
      }
      getUsers(+page!, 12, filters, UserTypes.nomade);
    },
    [getUsers, order.direction, order.sortTag, page],
  );

  useEffect(() => {
    getUsersData();
  }, [getUsersData]);

  return (
    <>
      {loading ? (
        <Loader width="20px" height="20px" />
      ) : (
        <ReusablePageStyled className="dashboard">
          <div className="dashboard__search-user">
            <button className="dashboard__create">
              <IoAddCircle className="dashboard__create--icon" />
              Crear usuario
            </button>
            <SearchBar
              onReset={() => getUsersData()}
              pageName={SectionTypes.users}
              pageTypes={SectionTypes.users}
              searchText={searchText!}
              setSearchText={setSearchText}
              onSearchSubmit={() => {
                handleSearch(searchText!);
              }}
            />
          </div>
          <div className="dashboard__table">
            <DashboardTable
              bodySections={users_nomade}
              headerSections={usersTableHeaderSections}
              pageName={SectionTypes.users}
            />
          </div>
          <div className="dashboard__mobile">
            <h3>Usuarios</h3>
            <DashboardCardListMobile
              bodySections={users_nomade}
              headerSections={usersTableHeaderSections}
              pageName={SectionTypes.users}
            />
          </div>
          <PaginationComponent
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            pageName={SectionTypes.users}
            filterParams={""}
          />
        </ReusablePageStyled>
      )}
    </>
  );
};

export default UsersPage;
