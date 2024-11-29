import Loader from "../../../shared/components/Loader/Loader";
import {
  FilterParams,
  SectionTypes,
} from "../../../shared/interfaces/interfaces";
import DashboardTable from "../../../shared/components/DashboardTable/DashboardTable";
import PaginationComponent from "../../../shared/components/Pagination/PaginationComponent";
import DashboardCardListMobile from "../../../shared/components/DashboardCardListMobile/DashboardCardListMobile";
import { offersHeaderSections } from "../../utils/offersSections";
import OffersPageStyled from "./OffersPageStyled";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "sections/shared/components/SearchBar/SearchBar";
import OffersButton from "sections/offers/components/OffersButton/OffersButton";
import OffersForm from "sections/offers/components/OffersForm/OffersForm";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";

const OffersPage = (): React.ReactElement => {
  const { getAllOffers, offers, pagination, loading, order, createNewOffer } =
    useOffersContext();
  const { page } = useParams();
  const [searchText, setSearchText] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleIsModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleSearch = (text: string) => {
    if (text === "") {
      getOffers();
      return;
    }
    getOffers(text);
  };
  const getOffers = useCallback(
    (search?: string) => {
      const filters: FilterParams = { filters: {} };

      if (order.sortTag) {
        filters.order = [{ by: order.sortTag, dir: order.direction }];
      }
      if (search) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (filters as any).filters.search = search;
      }

      getAllOffers(+page!, 12, filters);
    },
    [getAllOffers, page, order],
  );

  useEffect(() => {
    getOffers();
  }, [getOffers, page]);

  return (
    <>
      {loading ? (
        <Loader width="20px" height="20px" />
      ) : (
        <OffersPageStyled>
          <div className="dashboard__searchContainer">
            <OffersButton
              onClick={handleIsModalOpen}
              text="Crear oferta"
              type="create"
            />
            <SearchBar
              onReset={() => {
                getOffers();
              }}
              pageName={SectionTypes.offers}
              pageTypes={SectionTypes.offers}
              searchText={searchText!}
              setSearchText={setSearchText}
              onSearchSubmit={() => {
                handleSearch(searchText);
              }}
            />
          </div>
          <DashboardTable
            bodySections={offers}
            headerSections={offersHeaderSections}
            pageName={SectionTypes.offers}
          />
          <div className="dashboard__mobile">
            <div className="dashboard__searchContainer">
              <h3 className="dashboard__title">Ofertas</h3>
            </div>
            <DashboardCardListMobile
              bodySections={offers}
              headerSections={offersHeaderSections}
              pageName={SectionTypes.offers}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <PaginationComponent
              current_page={pagination.current_page}
              last_page={pagination.last_page}
              per_page={pagination.per_page}
              pageName={SectionTypes.offers}
              filterParams=""
            />
          </div>
          <ReusableModal
            children={<OffersForm onSubmit={createNewOffer} />}
            openModal={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            type="offer"
          />
        </OffersPageStyled>
      )}
    </>
  );
};

export default OffersPage;
