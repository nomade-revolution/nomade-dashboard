import NoDataHandler from "../../../shared/components/NoDataHandler/NoDataHandler";
import { customersHeaderSections } from "../../utils/customersSections";
import Loader from "../../../shared/components/Loader/Loader";
import { SectionTypes } from "../../../shared/interfaces/interfaces";
import DashboardTable from "../../../shared/components/DashboardTable/DashboardTable";
import { mockClients } from "../../../../mocks/clientsMocks";
import PaginationComponent from "../../../shared/components/Pagination/PaginationComponent";
import DashboardCardListMobile from "../../../shared/components/DashboardCardListMobile/DashboardCardListMobile";
import CustomersPageStyled from "./CustomersPageStyled";

const CustomersPage = (): React.ReactElement => {
  const isLoading = false;
  return (
    <>
      {isLoading ? (
        <Loader width="50px" height="50px" />
      ) : !isLoading && mockClients.length !== 0 ? (
        <CustomersPageStyled>
          <div className="dashboard__customers-table">
            <div className="dashboard__searchContainer"></div>
            <DashboardTable
              bodySections={mockClients}
              headerSections={customersHeaderSections}
              pageName={SectionTypes.customers}
            />
          </div>
          <div className="dashboard__mobile">
            <div className="dashboard__searchContainer">
              <h3 className="dashboard__title">Clientes</h3>
            </div>
            <DashboardCardListMobile
              bodySections={mockClients}
              headerSections={customersHeaderSections}
            />
          </div>
          <PaginationComponent
            current_page={1}
            last_page={1}
            per_page={12}
            pageName={SectionTypes.customers}
            filterParams=""
          />
        </CustomersPageStyled>
      ) : mockClients.length === 0 ? (
        <NoDataHandler pageName={SectionTypes.customers} search={""} />
      ) : (
        <></>
      )}
    </>
  );
};

export default CustomersPage;
