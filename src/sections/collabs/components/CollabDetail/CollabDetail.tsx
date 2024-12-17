import { Influencer } from "@influencer";
import { FullCollab } from "modules/collabs/domain/Collabs";
import { Link } from "react-router-dom";
import CollabsDetailStyled from "./CollabsDetailStyled";
import { FullOffer } from "modules/offers/domain/Offer";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";
import { collabDataTableData, collabDetailTableData } from "./collabTableData";

interface Props {
  collab: FullCollab;
  influencer: Influencer;
  offer: FullOffer;
}

export interface ExtendedCollab extends FullCollab {
  socialMedia: SocialMedia[];
}
const CollabDetail = ({
  collab,
  influencer,
  offer,
}: Props): React.ReactElement => {
  return (
    <CollabsDetailStyled className="collab-detail">
      <DashboardTable
        bodySections={[
          { ...collab, socialMedia: influencer.socialMedia ?? [] },
        ]}
        headerSections={collabDetailTableData}
        pageName="collabDetail"
      />
      {collab.type !== "Brand" && (
        <>
          <h3>Reserva</h3>
          <DashboardTable
            headerSections={collabDataTableData(collab.type)}
            bodySections={[collab]}
            pageName="collabs"
          />
        </>
      )}

      <h3>Observaciones influencer</h3>
      <section className="collab-detail__data">
        <div className="collab-detail__offer-section"></div>
        <span style={{ fontSize: "14px", width: "100%", textAlign: "left" }}>
          {collab.comment ? collab.comment : "Sin observaciones"}
        </span>
      </section>
      <Link
        to={`/oferta/${offer.id}`}
        className="collab-detail__link"
        style={{ maxWidth: "120px" }}
      >
        Ver orferta
      </Link>
    </CollabsDetailStyled>
  );
};

export default CollabDetail;
