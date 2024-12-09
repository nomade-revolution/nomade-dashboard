/* eslint-disable @typescript-eslint/no-explicit-any */
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
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
import { companyTableHeaderSections } from "../../utils/companySections";
import { IoAddCircle } from "react-icons/io5";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import CompanyForm from "sections/company/components/CompanyForm/CompanyForm";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import ExportFilesButton from "sections/shared/components/ExportButton/ExportButton";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import theme from "assets/styles/theme";

const CompaniesPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { page } = useParams();
  const {
    postCompanyCms,
    getCompaniesPaginated,
    companies,
    pagination,
    loading,
    orderCompanies,
    exportCompaniesExcel,
  } = useCompanyContext();

  const handleSearch = (searchText: string) => {
    gteCompaniesData(searchText);
  };
  const gteCompaniesData = useCallback(
    (text?: string) => {
      const filters: FilterParams = {};

      if (orderCompanies?.sortTag) {
        filters.order = [
          { by: orderCompanies.sortTag, dir: orderCompanies.direction },
        ];
      }

      if (text) {
        (filters as any).filters = {};
        (filters as any).filters.search = text;
      }

      getCompaniesPaginated(+page!, 10, filters);
    },
    [
      getCompaniesPaginated,
      orderCompanies.direction,
      orderCompanies.sortTag,
      page,
    ],
  );

  useEffect(() => {
    gteCompaniesData();
  }, [page, gteCompaniesData]);
  return (
    <>
      {loading ? (
        <Loader width="20px" height="20px" />
      ) : (
        <ReusablePageStyled className="dashboard">
          <div className="dashboard__searchContainer">
            <section className="dashboard__btns-section">
              <ActionButton
                color={theme.colors.darkBlue}
                icon={<IoAddCircle className="dashboard__create--icon" />}
                onClick={() => setIsModalOpen(true)}
                text="Crear cliente"
              />
              <ExportFilesButton
                action={() => exportCompaniesExcel()}
                text="Exportar clientes"
              />
            </section>
            <SearchBar
              pageName={SectionTypes.customers}
              pageTypes={SectionTypes.customers}
              searchText={searchText!}
              setSearchText={setSearchText}
              onSearchSubmit={() => handleSearch(searchText)}
              onReset={() => gteCompaniesData()}
            />
          </div>
          <div className="dashboard__table">
            <DashboardTable
              bodySections={companies}
              headerSections={companyTableHeaderSections}
              pageName={SectionTypes.customers}
            />
          </div>
          <div className="dashboard__mobile">
            <h3>Clientes</h3>
            <DashboardCardListMobile
              bodySections={companies}
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
