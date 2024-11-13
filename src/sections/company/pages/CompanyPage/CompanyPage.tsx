import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { UserTypes } from "modules/user/domain/User";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { companyTableHeaderSections } from "../../utils/companySections";
import { IoAddCircle } from "react-icons/io5";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import CompanyForm from "sections/company/components/CompanyForm/CompanyForm";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";

const CompaniesPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { getUsers, users_company, pagination, loading, order } =
    useUserContext();
  const { page } = useParams();
  const { postCompanyCms } = useCompanyContext();

  const handleSearch = (searchText: string) => {
    getUsersData(searchText);
  };
  const getUsersData = useCallback(
    (text?: string) => {
      const filters: FilterParams = {
        filters: {
          types: ["Company"],
        },
      };
      if (order?.sortTag) {
        filters.order = [{ by: order.sortTag, dir: order.direction }];
      }
      if (text) {
        filters.search = text;
      }
      getUsers(+page!, 12, filters, UserTypes.company);
    },
    [getUsers, order.direction, order.sortTag, page],
  );

  useEffect(() => {
    getUsersData();
  }, [page, order, getUsersData]);

  return (
    <>
      {loading ? (
        <Loader width="20px" height="20px" />
      ) : (
        <ReusablePageStyled className="dashboard">
          <div className="dashboard__searchContainer">
            <button
              className="dashboard__create"
              onClick={() => setIsModalOpen(true)}
            >
              <IoAddCircle className="dashboard__create--icon" />
              Crear cliente
            </button>
            <SearchBar
              pageName={SectionTypes.customers}
              pageTypes={SectionTypes.customers}
              searchText={searchText!}
              setSearchText={setSearchText}
              onSearchSubmit={() => handleSearch(searchText)}
              onReset={() => getUsersData()}
            />
          </div>
          <div className="dashboard__table">
            <DashboardTable
              bodySections={users_company}
              headerSections={companyTableHeaderSections}
              pageName={SectionTypes.customers}
            />
          </div>
          <div className="dashboard__mobile">
            <h3>Clientes</h3>
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
            filterParams={""}
          />
          <ReusableModal
            children={<CompanyForm onSubmit={postCompanyCms} />}
            openModal={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            type="client"
          />
        </ReusablePageStyled>
      )}
    </>
  );
};

export default CompaniesPage;
