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
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "sections/shared/components/SearchBar/SearchBar";

const OffersPage = (): React.ReactElement => {
  const { getAllOffers, offers, pagination, loading } = useOffersContext();
  const { page } = useParams();
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = (text: string) => {
    if (text === "") {
      getOffers();
      return;
    }
    getOffers(text);
  };
  const getOffers = (search?: string) => {
    const filters = { filters: {} as FilterParams };

    if (search) {
      filters.filters.search = search;
    }

    getAllOffers(+page!, 12, filters as FilterParams);
  };

  useEffect(() => {
    getOffers();
  }, [getAllOffers, page]);

  return (
    <>
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : (
        <OffersPageStyled>
          <div className="dashboard__searchContainer">
            <SearchBar
              onReset={() => {
                getOffers();
              }}
              pageName={SectionTypes.users}
              pageTypes={SectionTypes.users}
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
        </OffersPageStyled>
      )}
    </>
  );
};

export default OffersPage;
