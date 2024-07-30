import NoDataHandler from "../../../shared/components/NoDataHandler/NoDataHandler";
import Loader from "../../../shared/components/Loader/Loader";
import { SectionTypes } from "../../../shared/interfaces/interfaces";
import DashboardTable from "../../../shared/components/DashboardTable/DashboardTable";
import { mockClients } from "../../../../mocks/clientsMocks";
import PaginationComponent from "../../../shared/components/Pagination/PaginationComponent";
import DashboardCardListMobile from "../../../shared/components/DashboardCardListMobile/DashboardCardListMobile";
import { offersHeaderSections } from "../../utils/offersSections";
import OffersPageStyled from "./OffersPageStyled";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { useEffect } from "react";

const OffersPage = (): React.ReactElement => {
  const isLoading = false;

  const { getAllOffers, offers } = useOffersContext();

  useEffect(() => {
    getAllOffers(1, 12);
  }, [getAllOffers]);

  return (
    <>
      {isLoading ? (
        <Loader width="50px" height="50px" />
      ) : !isLoading && mockClients.length !== 0 ? (
        <OffersPageStyled>
          <div className="dashboard__table">
            <div className="dashboard__searchContainer"></div>
            <DashboardTable
              bodySections={offers}
              headerSections={offersHeaderSections}
              pageName={SectionTypes.offers}
            />
          </div>
          <div className="dashboard__mobile">
            <div className="dashboard__searchContainer">
              <h3 className="dashboard__title">Ofertas</h3>
            </div>
            <DashboardCardListMobile
              bodySections={offers}
              headerSections={offersHeaderSections}
            />
          </div>
          <PaginationComponent
            current_page={1}
            last_page={1}
            per_page={12}
            pageName={SectionTypes.offers}
            filterParams=""
          />
        </OffersPageStyled>
      ) : mockClients.length === 0 ? (
        <NoDataHandler pageName={SectionTypes.offers} search={""} />
      ) : (
        <></>
      )}
    </>
  );
};

export default OffersPage;
