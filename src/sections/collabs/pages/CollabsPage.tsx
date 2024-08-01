import { useEffect } from "react";
import { mockClients } from "mocks/clientsMocks";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import NoDataHandler from "sections/shared/components/NoDataHandler/NoDataHandler";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import CollabsPageStyled from "./CollabsStyled";
import { useCollabsContext } from "../CollabsContext/useCollabsContext";
import { collabsHeaderSections } from "../utils/collabsSections";
import { useParams } from "react-router-dom";

const CollabsPage = (): React.ReactElement => {
  const isLoading = false;

  const { getAllCollabs, collabs, pagination } = useCollabsContext();
  const { page } = useParams();

  useEffect(() => {
    getAllCollabs(+page!, 12);
  }, [getAllCollabs, page]);

  return (
    <>
      {isLoading ? (
        <Loader width="50px" height="50px" />
      ) : !isLoading && mockClients.length !== 0 ? (
        <CollabsPageStyled>
          <div className="dashboard__table">
            <div className="dashboard__searchContainer"></div>
            <DashboardTable
              bodySections={collabs}
              headerSections={collabsHeaderSections}
              pageName={SectionTypes.collabs}
            />
          </div>
          <div className="dashboard__mobile">
            <div className="dashboard__searchContainer">
              <h3 className="dashboard__title">Collabs</h3>
            </div>
            <DashboardCardListMobile
              bodySections={collabs}
              headerSections={collabsHeaderSections}
            />
          </div>
          <PaginationComponent
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            pageName={SectionTypes.collabs}
            filterParams=""
          />
        </CollabsPageStyled>
      ) : mockClients.length === 0 ? (
        <NoDataHandler pageName={SectionTypes.collabs} search={""} />
      ) : (
        <></>
      )}
    </>
  );
};

export default CollabsPage;
