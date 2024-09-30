import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import Loader from "sections/shared/components/Loader/Loader";
import CollabsReservationsPageStyled from "./CollabsReservationsPageStyled";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import { collabsHeaderSections } from "sections/collabs/utils/collabsSections";
import NoDataHandler from "sections/shared/components/NoDataHandler/NoDataHandler";

const CollabsReservationsPage = (): React.ReactElement => {
  const [collabStateActionType, setCollabStateActionType] =
    useState<string>("");

  const { getAllCollabs, collabs, loading, pagination } = useCollabsContext();
  const { id, page } = useParams();

  useEffect(() => {
    const filters = {
      filters: {
        company_id: id,
      },
    };
    getAllCollabs(+page!, 12, filters);
  }, [id, getAllCollabs, page]);

  return (
    <>
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : (
        <>
          {collabs.length > 0 ? (
            <CollabsReservationsPageStyled>
              <div className="header">
                <GoBackButton />
              </div>
              <div className="title">
                <span className="title--text">Company </span>
                <span>-</span>
                <h3>{collabs[0]?.company}</h3>
              </div>
              <DashboardTable
                bodySections={collabs}
                headerSections={collabsHeaderSections}
                pageName={SectionTypes.collabs}
                type={collabStateActionType}
                setCollabStateActionType={setCollabStateActionType}
              />
              <div className="list-mobile">
                <DashboardCardListMobile
                  bodySections={collabs}
                  headerSections={collabsHeaderSections}
                  pageName={SectionTypes.collabs}
                />
              </div>
              <PaginationComponent
                current_page={pagination.current_page}
                filterParams={""}
                id={+id!}
                per_page={pagination.per_page}
                last_page={pagination.last_page}
                pageName={SectionTypes.collabsReservations}
              />
            </CollabsReservationsPageStyled>
          ) : (
            <NoDataHandler pageName="" search="" />
          )}
        </>
      )}
    </>
  );
};
export default CollabsReservationsPage;
