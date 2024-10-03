import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import CollabDetail from "sections/collabs/components/CollabDetail/CollabDetail";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import CollabsDetailPageStyled from "./CollabsDetailPageStyled";
import Loader from "sections/shared/components/Loader/Loader";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { useAddressContext } from "sections/address/AddressContext/useAddressContext";
import ReusableStepper from "sections/shared/components/ReusableStepper/ReusableStepper";
import { CollabActionTypes } from "modules/collabs/domain/Collabs";

const CollabDetailPage = (): React.ReactElement => {
  const { getCollabById, collab, loading } = useCollabsContext();
  const { getInfluencer, influencer } = useInfluencerContext();
  const { getOffer, offer } = useOffersContext();
  const { getAddress } = useAddressContext();
  const { id } = useParams();

  const [collabStateActionType, setCollabStateActionType] =
    useState<CollabActionTypes | null>(null);

  useEffect(() => {
    getCollabById(+id!);
  }, [getCollabById, id]);

  useEffect(() => {
    getInfluencer(collab.influencer_id);
  }, [collab.influencer_id, getInfluencer]);

  useEffect(() => {
    getOffer(collab.offer_id);
  }, [collab.offer_id, getOffer]);

  useEffect(() => {
    getAddress(collab.addresses_id);
  }, [collab.addresses_id, getAddress]);

  return (
    <>
      {loading ? (
        <Loader height="20px" width="20px" />
      ) : (
        <CollabsDetailPageStyled className="detail-collab">
          <GoBackButton />
          <h2>Collab</h2>
          <div className="detail-collab__data">
            <CollabDetail
              collab={collab}
              influencer={influencer}
              offer={offer}
            />
            <section className="detail-collab__stepper">
              <h3>Estados</h3>
              <ReusableStepper
                steps={collab.history}
                setCollabStateActionType={setCollabStateActionType}
                collab={collab}
                collabStateActionType={collabStateActionType!}
              />
            </section>
          </div>
        </CollabsDetailPageStyled>
      )}
    </>
  );
};

export default CollabDetailPage;
