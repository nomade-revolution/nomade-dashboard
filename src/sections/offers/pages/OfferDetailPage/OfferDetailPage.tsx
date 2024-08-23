import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import Loader from "sections/shared/components/Loader/Loader";
import OfferDetailPageStyled from "./OfferDetailPageStyled";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";

const OfferDetailsPage = () => {
  const { id } = useParams();

  const { offer, loading, getOffer } = useOffersContext();
  useEffect(() => {
    getOffer(+id!);
  }, [id, getOffer]);
  return (
    <>
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : (
        <OfferDetailPageStyled>
          <section className="collab-detail__data">
            <h3>{offer.company}</h3>
            <div className="collab-detail__collab-data">
              <div className="images-container">
                {offer.images?.length > 0 &&
                  offer.images.map((image) => (
                    <ImageCustom
                      key={image.alt}
                      alt="Imágen de la oferta"
                      className="collab-detail__offer-img"
                      height={200}
                      width={250}
                      image={image.url}
                    />
                  ))}
              </div>
              <div className="collab-detail__data-section">
                <span className="collab-detail__data-title">Descripción</span>
                <article className="collab-detail__address">
                  {offer.description}
                </article>
              </div>
              <div className="collab-detail__data-section">
                <span className="collab-detail__data-title">Condiciones</span>
                <article className="collab-detail__address">
                  {offer.conditions}
                </article>
              </div>
              <div className="collab-detail__data-section">
                <span className="collab-detail__data-title">A cambio</span>
                <article className="collab-detail__address">
                  {offer.in_exchange}
                </article>
                <div className="collab-detail__data-section">
                  <span className="collab-detail__data-title">
                    Tipo de oferta
                  </span>
                  <article className="collab-detail__address">
                    {offer.type}
                  </article>
                </div>
              </div>
              <div className="collab-detail__data-section">
                <span className="collab-detail__data-title">¿Dónde?</span>
                <article className="collab-detail__address">
                  <ul className="adress-list">
                    {offer?.calendar?.map((adress) => (
                      <li key={adress.address}>{adress.address}</li>
                    ))}
                  </ul>
                  <ul className="adress-list">
                    {offer?.addresses?.map((adress) => (
                      <li key={adress.address}>{adress.address}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </section>
        </OfferDetailPageStyled>
      )}
    </>
  );
};

export default OfferDetailsPage;
