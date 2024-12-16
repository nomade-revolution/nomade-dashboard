import { Influencer } from "@influencer";
import { CollabTypes, FullCollab } from "modules/collabs/domain/Collabs";
import { Link } from "react-router-dom";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import CollabsDetailStyled from "./CollabsDetailStyled";
import { FaUsers } from "react-icons/fa";
import { getTypesClassNames } from "sections/shared/components/DashboardContentSections/utils/getClassNames/getClassNames";
import { FullOffer } from "modules/offers/domain/Offer";
import { useAddressContext } from "sections/address/AddressContext/useAddressContext";
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineLocationOn } from "react-icons/md";
import {
  HiMiniArrowLeftOnRectangle,
  HiMiniArrowRightOnRectangle,
} from "react-icons/hi2";
import theme from "assets/styles/theme";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import collabDetailTableData from "./collabTableData";
import { SocialMedia } from "@influencer/domain/InfluencerSocialMedia";

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
  const { address } = useAddressContext();

  return (
    <CollabsDetailStyled className="collab-detail">
      {/* <section className="collab-detail__participants"> */}
      {/* <div className="collab-detail__participant">
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
        </div> */}
      {/* </section> */}
      <DashboardTable
        bodySections={[
          { ...collab, socialMedia: influencer.socialMedia ?? [] },
        ]}
        headerSections={collabDetailTableData}
        pageName="collabDetail"
      />
      <section className="collab-detail__data">
        <div className="collab-detail__offer-section">
          <h3>Reserva</h3>
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
                  {collab.guests} pax.
                </span>
              </div>
            )}

            {(collab.day || collab.time) && (
              <div className="collab-detail__data-section">
                <BsCalendarEvent size={20} />
                <span className="collab-detail__offer-data">{collab.day}</span>
                <span className="collab-detail__offer-data">-</span>
                <span className="collab-detail__offer-data">
                  {collab.time}h
                </span>
              </div>
            )}
            {address.address && (
              <div className="collab-detail__data-section">
                <MdOutlineLocationOn size={20} color={theme.colors.mainColor} />
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
            {collab.type === CollabTypes.lodging && (
              <section className="collab-detail__dates">
                <h4>Fechas</h4>
                <div className="collab-detail__data-section">
                  <HiMiniArrowRightOnRectangle color={theme.colors.softGreen} />
                  <span>{collab.from_day}</span>
                </div>
                <div className="collab-detail__data-section">
                  <HiMiniArrowLeftOnRectangle color={theme.colors.red} />
                  <span>{collab.to_day}</span>
                </div>
              </section>
            )}
            <Link to={`/oferta/${offer.id}`} className="collab-detail__link">
              Ver orferta
            </Link>
          </div>
        </div>
      </section>

      <section className="collab-detail__data">
        <div className="collab-detail__offer-section">
          <h3>Comentario</h3>
        </div>
        <span className={""}>{collab.comment}</span>
      </section>
    </CollabsDetailStyled>
  );
};

export default CollabDetail;
