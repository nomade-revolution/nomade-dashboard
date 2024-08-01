import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../../../shared/components/Loader/Loader";
import NoDataHandler from "../../../shared/components/NoDataHandler/NoDataHandler";
import DashboardTable from "../../../shared/components/DashboardTable/DashboardTable";

import DashboardCardListMobile from "../../../shared/components/DashboardCardListMobile/DashboardCardListMobile";
import PaginationComponent from "../../../shared/components/Pagination/PaginationComponent";
import SearchBar from "../../../shared/components/SearchBar/SearchBar";
import { IoAddCircle } from "react-icons/io5";
import UserPageStyled from "./UsersPageStyled";
import { mockUsers } from "../../../../mocks/userMocks";
import {
  FilterParams,
  SectionTypes,
} from "../../../shared/interfaces/interfaces";
import { usersTableHeaderSections } from "../../utils/userTableSections";
import { useUserContext } from "sections/user/UserContext/useUserContext";
import { UserTypes } from "modules/user/domain/User";

const UsersPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string | null>(null);

  const { search } = useLocation();
  const { page } = useParams();
  const { getUsers, users_nomade, pagination } = useUserContext();

  const searchParams = search.split("?").join("");

  const isLoading = false;

  useEffect(() => {
    const filters: FilterParams = {
      types: ["Nomade"],
    };

    getUsers(+page!, 12, filters, UserTypes.nomade);
  }, [getUsers, page]);

  return (
    <>
      {isLoading ? (
        <Loader width="50px" height="50px" />
      ) : !isLoading && mockUsers.length !== 0 ? (
        <UserPageStyled className="dashboard">
          <div className="dashboard__search">
            <button className="dashboard__create">
              <IoAddCircle className="dashboard__create--icon" />
              Crear usuario
            </button>
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
            />
          </div>
          <PaginationComponent
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            pageName={SectionTypes.users}
            filterParams={searchParams}
          />
        </UserPageStyled>
      ) : mockUsers.length === 0 ? (
        <NoDataHandler pageName={SectionTypes.users} search={searchText!} />
      ) : (
        <></>
      )}
    </>
  );
};

export default UsersPage;
