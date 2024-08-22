import { useEffect, useState } from "react";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { influencerCollabsHeaderSections } from "sections/influencer/utils/influencersSections";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import NoDataHandler from "sections/shared/components/NoDataHandler/NoDataHandler";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import { SectionTypes } from "sections/shared/interfaces/interfaces";

interface Props {
  influencer_id: number;
}

const InfluencerCollabs = ({ influencer_id }: Props): React.ReactElement => {
  const [page, setPage] = useState<number>(1);
  const { getAllCollabs, collabs, pagination, loading } = useCollabsContext();

  useEffect(() => {
    setPage(pagination.current_page + 1);
    getAllCollabs(page, 12, { filters: { influencer_id } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllCollabs, influencer_id]);

  return (
    <>
      <h3>Collabs</h3>
      {loading ? (
        <Loader height="40px" width="40px" />
      ) : !loading && collabs.length !== 0 ? (
        <section style={{ gap: 20, display: "flex", flexDirection: "column" }}>
          <DashboardTable
            bodySections={collabs}
            headerSections={influencerCollabsHeaderSections}
            pageName=""
          />
          <PaginationComponent
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            filterParams=""
            pageName=""
          />
        </section>
      ) : collabs.length === 0 ? (
        <NoDataHandler pageName={SectionTypes.collabs} search={""} />
      ) : (
        <></>
      )}
    </>
  );
};

export default InfluencerCollabs;
