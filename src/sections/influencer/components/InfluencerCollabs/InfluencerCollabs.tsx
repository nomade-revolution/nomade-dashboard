import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { useCallback, useEffect, useState } from "react";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { influencerCollabsHeaderSections } from "sections/influencer/utils/influencersSections";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import NoDataHandler from "sections/shared/components/NoDataHandler/NoDataHandler";
// import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import {
  FilterParams,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";

interface Props {
  influencer_id: number;
}

const InfluencerCollabs = ({ influencer_id }: Props): React.ReactElement => {
  const [page] = useState<number>(1);

  const { getAllCollabs, collabs, loading, order } = useCollabsContext();

  const getAllCollabsWithFilters = useCallback(() => {
    const filters: FilterParams = { filters: { influencer_id } };

    if (order?.sortTag) {
      filters.order = [{ by: order.sortTag, dir: order.direction }];
    }

    getAllCollabs(page, 25, filters);
  }, [getAllCollabs, influencer_id, order.direction, order.sortTag, page]);

  useEffect(() => {
    getAllCollabsWithFilters();
  }, [getAllCollabsWithFilters, order]);

  return (
    <ReusablePageStyled style={{ width: "100%" }}>
      <h3>Collabs</h3>
      {loading ? (
        <Loader height="40px" width="40px" />
      ) : (
        <section
          style={{
            gap: 20,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <DashboardTable
            bodySections={collabs}
            headerSections={influencerCollabsHeaderSections}
            pageName={SectionTypes.collabs}
          />

          {collabs.length === 0 && (
            <NoDataHandler pageName={SectionTypes.collabs} search={""} />
          )}
        </section>
      )}
    </ReusablePageStyled>
  );
};

export default InfluencerCollabs;
