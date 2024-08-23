import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import Loader from "sections/shared/components/Loader/Loader";
import CollabsReservationsPageStyled from "./CollabsReservationsPageStyled";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import {
  HeaderSection,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";

const collabsHeaderSections: HeaderSection[] = [
  {
    id: 1,
    name: "Nombre del influencer",
    property: "influencer_name",
    sortTag: "",
    pageName: "collabReservations",
  },
  {
    id: 2,
    name: "Guests",
    property: "guests",
    sortTag: "",
    pageName: "collabReservations",
  },
  {
    id: 3,
    name: "Tipo",
    property: "type",
    sortTag: "",
    pageName: "collabReservations",
  },
  {
    id: 3,
    name: "Estado",
    property: "history",
    sortTag: "",
    pageName: "collabReservations",
  },
];
const CollabsReservationsPage = () => {
  const { getAllCollabs, collabs, loading, pagination } = useCollabsContext();
  const { id, page } = useParams();

  useEffect(() => {
    const filters = {
      filters: {
        offer_id: id,
      },
    };
    getAllCollabs(+page!, 12, filters);
  }, [id, getAllCollabs, page]);

  return (
    <>
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : (
        <CollabsReservationsPageStyled>
          <div className="header">
            <GoBackButton />
          </div>
          <div className="title">
            <h3>{collabs[0]?.company ?? "nombre"}</h3>
          </div>
          <DashboardTable
            bodySections={collabs}
            headerSections={collabsHeaderSections}
            pageName={SectionTypes.collabs}
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
      )}
    </>
  );
};
export default CollabsReservationsPage;
