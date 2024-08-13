import { useEffect, useState } from "react";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import NoDataHandler from "sections/shared/components/NoDataHandler/NoDataHandler";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import { useCollabsContext } from "../CollabsContext/useCollabsContext";
import { collabsHeaderSections } from "../utils/collabsSections";
import { useParams } from "react-router-dom";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import SearchBar from "sections/shared/components/SearchBar/SearchBar";

const CollabsPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");
  const [collabStateActionType, setCollabStateActionType] =
    useState<string>("");

  const { getAllCollabs, collabs, pagination, loading } = useCollabsContext();
  const { page } = useParams();

  useEffect(() => {
    getAllCollabs(+page!, 12);
  }, [getAllCollabs, page]);

  return (
    <>
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : !loading && collabs.length !== 0 ? (
        <ReusablePageStyled>
          <div className="dashboard__table">
            <div className="dashboard__searchContainer">
              <SearchBar
                pageName={SectionTypes.collabs}
                pageTypes={SectionTypes.collabs}
                searchText={searchText!}
                setSearchText={setSearchText}
                onSearchSubmit={() => {}}
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
      ) : collabs.length === 0 ? (
        <NoDataHandler pageName={SectionTypes.collabs} search={""} />
      ) : (
        <></>
      )}
    </>
  );
};

export default CollabsPage;
