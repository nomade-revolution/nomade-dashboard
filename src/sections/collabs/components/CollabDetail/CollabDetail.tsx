import { Influencer } from "@influencer";
import { FullCollab } from "modules/collabs/domain/Collabs";
import { Link } from "react-router-dom";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import CollabsDetailStyled from "./CollabsDetailStyled";
import { FaUsers } from "react-icons/fa";
import { CgArrowsExchange } from "react-icons/cg";
import { getTypesClassNames } from "sections/shared/components/DashboardContentSections/utils/getClassNames/getClassNames";
import { FullOffer } from "modules/offers/domain/Offer";
import { useAddressContext } from "sections/address/AddressContext/useAddressContext";
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";

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
          <div className="collab-detail__company">
            <h3>Empresa</h3>
            <span>{collab?.company}</span>
          </div>
          <div className="collab-detail__conditions">
            <h3>Condiciones</h3>
            <span>{collab?.conditions}</span>
          </div>
        </div>
        <CgArrowsExchange className="collab-detail__icon" />
        <div className="collab-detail__participant">
          <h3>Influencer</h3>

          <ImageCustom
            alt={`${influencer?.name} avatar`}
            className="collab-detail__avatar"
            height={120}
            width={120}
            image={influencer?.avatar}
          />
          <span className="collab-detail__name">{influencer?.name}</span>
          <span className="collab-detail__social">
            @{influencer?.user_name}
          </span>
          <Link
            to={`/influencer/${influencer?.id}`}
            className="collab-detail__link"
          >
            Ver perfil
          </Link>
        </div>
      </section>
      <section className="collab-detail__data">
        <div className="collab-detail__offer-section">
          <h3>Oferta</h3>
          <span className={getTypesClassNames(collab, "collab-detail")}>
            {collab.type}
          </span>
        </div>
        <div className="collab-detail__collab-data">
          <ImageCustom
            alt="Imágen de la oferta"
            className="collab-detail__offer-img"
            height={200}
            width={250}
            image={offer.images?.length > 0 ? offer?.images[0]?.url : ""}
          />
          <div className="collab-detail__offer">
            {collab.guests && (
              <div className="collab-detail__data-section">
                <FaUsers size={20} />
                <span className="collab-detail__offer-data">
                  {collab.guests}
                </span>
              </div>
            )}

            <div className="collab-detail__data-section">
              <BsCalendarEvent size={20} />
              <span className="collab-detail__offer-data">{collab.day}</span>
              <span className="collab-detail__offer-data">-</span>
              <span className="collab-detail__offer-data">{collab.time}h</span>
            </div>
            {address.address && (
              <div className="collab-detail__data-section">
                <MdOutlineLocationOn size={30} />
                <article className="collab-detail__address">
                  <span className="collab-detail__offer-data">
                    {address.address}
                  </span>
                  <span className="collab-detail__offer-data">
                    {address.city}
                  </span>
                </article>
              </div>
            )}
            <Link to={`/oferta/${offer.id}`} className="collab-detail__link">
              Ver orferta
            </Link>
          </div>
        </div>
      </section>
    </CollabsDetailStyled>
  );
};

export default CollabDetail;
