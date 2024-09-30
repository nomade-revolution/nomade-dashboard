import { useEffect, useState } from "react";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import {
  FilterParams,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";
import { useParams } from "react-router-dom";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import SearchBar from "sections/shared/components/SearchBar/SearchBar";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { collabsHeaderSections } from "sections/collabs/utils/collabsSections";

const CollabsPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");
  const [collabStateActionType, setCollabStateActionType] =
    useState<string>("");

  const { getAllCollabs, collabs, pagination, loading, order } =
    useCollabsContext();
  const { page } = useParams();
  const handleSearch = (text: string) => {
    getCollabs(text);
  };

  const getCollabs = (text?: string) => {
    const filters: FilterParams = {};

    if (order?.sortTag) {
      filters.order = [{ by: order.sortTag, dir: order.direction }];
    }
    if (text) {
      filters.search = text;
    }

    getAllCollabs(+page!, 12, filters);
  };

  useEffect(() => {
    getCollabs();
  }, [getAllCollabs, page, order]);

  return (
    <>
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : (
        <ReusablePageStyled>
          <div className="dashboard__table">
            <div className="dashboard__searchContainer">
              <SearchBar
                pageName={SectionTypes.collabs}
                pageTypes={SectionTypes.collabs}
                searchText={searchText!}
                setSearchText={setSearchText}
                onReset={() => getCollabs()}
                onSearchSubmit={() => handleSearch(searchText)}
              />
            </div>
            <DashboardTable
              bodySections={collabs}
              headerSections={collabsHeaderSections}
              pageName={SectionTypes.collabs}
              type={collabStateActionType}
              setCollabStateActionType={setCollabStateActionType}
            />
          </div>
          <div className="dashboard__mobile">
            <div className="dashboard__searchContainer">
              <h3 className="dashboard__title">Collabs</h3>
            </div>
            <DashboardCardListMobile
              bodySections={collabs}
              headerSections={collabsHeaderSections}
              pageName={SectionTypes.collabs}
            />
          </div>
          <PaginationComponent
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            pageName={SectionTypes.collabs}
            filterParams=""
          />
        </ReusablePageStyled>
      )}
    </>
  );
};

export default CollabsPage;
