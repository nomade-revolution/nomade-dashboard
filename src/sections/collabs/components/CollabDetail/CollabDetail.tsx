import { Influencer } from "@influencer";
import { FullCollab } from "modules/collabs/domain/Collabs";
import { Link } from "react-router-dom";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import CollabsDetailStyled from "./CollabsDetailStyled";
import { FaEye } from "react-icons/fa";
import { CgArrowsExchange } from "react-icons/cg";
import { getTypesClassNames } from "sections/shared/components/DashboardContentSections/utils/getClassNames/getClassNames";
import { FullOffer } from "modules/offers/domain/Offer";
import { useAddressContext } from "sections/address/AddressContext/useAddressContext";

interface Props {
  collab: FullCollab;
  influencer: Influencer;
  offer: FullOffer;
}

const CollabDetail = ({
  collab,
  influencer,
  offer,
}: Props): React.ReactElement => {
  const { address } = useAddressContext();
  return (
    <CollabsDetailStyled className="collab-detail">
      <section className="collab-detail__participants">
        <div className="collab-detail__participant">
          <h3>Empresa</h3>
          <span>{collab?.company}</span>
        </div>
        <CgArrowsExchange className="collab-detail__icon" />
        <div className="collab-detail__participant">
          <h3>Influencer</h3>
          <ImageCustom
            alt={`${influencer.name} avatar`}
            className="collab-detail__avatar"
            height={120}
            width={120}
            image={influencer.avatar}
          />
          <span className="collab-detail__name">{influencer?.name}</span>
          <span>@ {influencer.user_name}</span>
          <Link
            to={`/influencer/${influencer.id}`}
            className="collab-detail__link"
          >
            <FaEye />
            Perfil
          </Link>
        </div>
      </section>
      <section className="collab-detail__data">
        <h3>Oferta</h3>
        <div className="collab-detail__collab-data">
          <ImageCustom
            alt="Imágen de la oferta"
            className="collab-detail__offer-img"
            height={200}
            width={250}
            image={offer.images?.length > 0 ? offer?.images[0]?.url : ""}
          />
          <div className="collab-detail__offer">
            <div className="collab-detail__data-section">
              <span className="collab-detail__data-title">Tipo:</span>
              <span className={getTypesClassNames(collab, "collab-detail")}>
                {collab.type}
              </span>
            </div>
            <div className="collab-detail__data-section">
              <span className="collab-detail__data-title">
                No. Participantes:
              </span>
              <span>{collab.guests}</span>
            </div>
            <div className="collab-detail__data-section">
              <span className="collab-detail__data-title">¿Cuándo?:</span>
              <span>{collab.day}</span>
              <span>a las</span>
              <span>{collab.time}</span>
            </div>
            <div className="collab-detail__data-section">
              <span className="collab-detail__data-title">¿Dónde?</span>
              <article className="collab-detail__address">
                <span>{address.address},</span>
                <span>{address.city}</span>
              </article>
            </div>
            <Link to={`/oferta/${offer.id}`} className="collab-detail__link">
              <FaEye />
              Ver orferta
            </Link>
          </div>
        </div>
      </section>
    </CollabsDetailStyled>
  );
};

export default CollabDetail;
