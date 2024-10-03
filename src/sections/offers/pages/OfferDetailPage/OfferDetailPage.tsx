import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import Loader from "sections/shared/components/Loader/Loader";
import OfferDetailPageStyled from "./OfferDetailPageStyled";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import { getTypesClassNames } from "sections/shared/components/DashboardContentSections/utils/getClassNames/getClassNames";
import { MdOutlineLocationOn } from "react-icons/md";
import NoDataHandler from "sections/shared/components/NoDataHandler/NoDataHandler";

const OfferDetailsPage = () => {
  const { id } = useParams();

  const { offer, loading, getOffer } = useOffersContext();
  useEffect(() => {
    getOffer(+id!);
  }, [id, getOffer]);

  return (
    <>
      {loading ? (
        <Loader width="20px" height="20px" />
      ) : !offer ? (
        <NoDataHandler pageName={"oferta"} search={""} />
      ) : (
        <OfferDetailPageStyled>
          <section className="offer-detail__data">
            <h3 className="offer-detail__title">{offer.company}</h3>

            <span className={getTypesClassNames(offer, "offer-detail")}>
              {offer.type}
            </span>

            <div className="offer-detail__offer-data">
              <div className="images-container">
                {offer.images?.length > 0 &&
                  offer.images.map((image) => (
                    <ImageCustom
                      key={image.alt}
                      alt="Imágen de la oferta"
                      className="offer-detail__offer-img"
                      height={200}
                      width={250}
                      image={image.url}
                    />
                  ))}
              </div>
              <section className="offer-detail__section">
                <div className="offer-detail__data-section">
                  <span className="offer-detail__data-title">Descripción</span>
                  <span className="offer-detail__text">
                    {offer.description}
                  </span>
                </div>
                <div className="offer-detail__data-section">
                  <span className="offer-detail__data-title">Condiciones</span>
                  <span className="offer-detail__text">{offer.conditions}</span>
                </div>
              </section>
              <section className="offer-detail__section">
                {offer.addresses && (
                  <div className="offer-detail__data-section">
                    <span className="offer-detail__data-title">Locales</span>

                    {/* <ul className="adress-list">
                    {offer?.calendar?.map((adress) => (
                      <li key={adress.address}>{adress.address}</li>
                    ))}
                  </ul> */}
                    <ul className="adress-list">
                      {offer?.addresses?.map((adress) => (
                        <li
                          key={adress.address}
                          className="offer-detail__address"
                        >
                          <MdOutlineLocationOn color="#8C9B6E" size={15} />
                          {adress.address}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="offer-detail__data-section">
                  <span className="offer-detail__data-title">A cambio</span>
                  <span className="offer-detail__text">
                    {offer.in_exchange}
                  </span>
                </div>
              </section>
            </div>
          </section>
        </OfferDetailPageStyled>
      )}
    </>
  );
};

export default OfferDetailsPage;
