import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loader from "../../../shared/components/Loader/Loader";
import DashboardTable from "../../../shared/components/DashboardTable/DashboardTable";
import DashboardCardListMobile from "../../../shared/components/DashboardCardListMobile/DashboardCardListMobile";
import PaginationComponent from "../../../shared/components/Pagination/PaginationComponent";
import SearchBar from "../../../shared/components/SearchBar/SearchBar";
import {
  FilterParams,
  SectionTypes,
} from "../../../shared/interfaces/interfaces";
import { usersAppTableHeaderSections } from "../../utils/userTableSections";
import { useUserContext } from "sections/user/UserContext/useUserContext";
import { UserTypes } from "modules/user/domain/User";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { IoAddCircle } from "react-icons/io5";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import CreateUserForm from "./components/CreateUserForm/CreateUserForm";
import {
  setOrDeleteSearchParam,
  toCleanQueryString,
} from "sections/shared/utils/queryParams/queryParams";

const UsersAppPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { page } = useParams();
  const { getUsers, users_influencerCompany, pagination, loading, order } =
    useUserContext();
  const searchParam = searchParams.get("search") ?? "";

  const navigateToPageWithParams = (
    pageNumber: number,
    updates: Record<string, string | number | null | undefined>,
  ) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      setOrDeleteSearchParam(params, key, value);
    });
    const queryString = toCleanQueryString(params);
    navigate(
      `/users-app/page/${pageNumber}${
        queryString.length > 0 ? `?${queryString}` : ""
      }`,
    );
  };

  const handleSearch = (text: string) => {
    navigateToPageWithParams(1, { search: text || null });
  };

  const getUsersData = useCallback(() => {
    const filters: FilterParams = {
      filters: {
        types: ["users_app", "Company"],
      },
    };
    if (order?.sortTag) {
      filters.order = [{ by: order.sortTag, dir: order.direction }];
    }
    if (searchParam) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (filters as any).filters.search = searchParam;
    }
    getUsers(+page!, 10, filters, UserTypes.infleuncerCompany);
  }, [getUsers, order.direction, order.sortTag, page, searchParam]);

  const handleCreateUser = () => {
    setIsCreateModalOpen(true);
  };

  const handleUserCreated = (success: boolean) => {
    if (success) {
      getUsersData();
    }
  };

  useEffect(() => {
    setSearchText(searchParam);
  }, [searchParam]);

  const queryKey = searchParams.toString();

  useEffect(() => {
    getUsersData();
  }, [getUsersData, page, queryKey]);

  if (loading) return <Loader width="20px" height="20px" />;

  return (
    <ReusablePageStyled className="dashboard">
      <div className="dashboard__search-user">
        <button className="dashboard__create" onClick={handleCreateUser}>
          <IoAddCircle className="dashboard__create--icon" />
          Crear usuario
        </button>
        <SearchBar
          onReset={() => {
            setSearchText("");
            navigateToPageWithParams(1, { search: null });
          }}
          pageName={SectionTypes.usersApp}
          pageTypes={SectionTypes.usersApp}
          searchText={searchText!}
          setSearchText={setSearchText}
          onSearchSubmit={() => {
            handleSearch(searchText!);
          }}
        />
      </div>
      <div className="dashboard__table">
        <DashboardTable
          bodySections={users_influencerCompany}
          headerSections={usersAppTableHeaderSections}
          pageName={SectionTypes.usersApp}
        />
      </div>
      <div className="dashboard__mobile">
        <h3>Usuarios (Empresa)</h3>
        <DashboardCardListMobile
          bodySections={users_influencerCompany}
          headerSections={usersAppTableHeaderSections}
          pageName={SectionTypes.usersApp}
        />
      </div>
      <PaginationComponent
        current_page={pagination.current_page}
        last_page={pagination.last_page}
        per_page={pagination.per_page}
        pageName={SectionTypes.usersApp}
        filterParams={toCleanQueryString(searchParams)}
      />
      <ReusableModal
        children={
          <CreateUserForm
            onSubmit={handleUserCreated}
            setIsOpen={setIsCreateModalOpen}
            isFromUsersApp={true}
          />
        }
        openModal={isCreateModalOpen}
        setIsModalOpen={setIsCreateModalOpen}
        type="client"
      />
    </ReusablePageStyled>
  );
};

export default UsersAppPage;
