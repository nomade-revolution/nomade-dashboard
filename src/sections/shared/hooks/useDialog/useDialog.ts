import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import { useUserContext } from "sections/user/UserContext/useUserContext";
import useActions from "../useActions/useActions";
import { CollabActionTypes } from "modules/collabs/domain/Collabs";

const useDialog = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { deleteUserById } = useUserContext();
  const { deleteInfluencerById, modifyInfluencer } = useInfluencerContext();
  const { deleteCompanyById } = useCompanyContext();
  const { deleteOfferById } = useOffersContext();
  const { deleteCollabById } = useCollabsContext();
  const { acceptCollab, rejectCollab, cancelCollab } = useActions();

  const handleDeleteUsers = async (sectionId: number) => {
    const response = await deleteUserById(sectionId!);
    setIsSuccess(response!);
    setTimeout(() => navigate(0), 1500);
  };

  const handleDeleteInfluencer = async (sectionId: number) => {
    const response = await deleteInfluencerById(sectionId!);
    setIsSuccess(response!);
    setTimeout(() => navigate(-1), 1500);
  };

  const handleDeleteCompany = async (sectionId: number) => {
    const response = await deleteCompanyById(sectionId!);
    setIsSuccess(response!);
    setTimeout(() => navigate(-1), 1500);
  };

  const handleUpdateCompanyState = async (
    sectionId: number,
    newState: number,
  ) => {
    const response = await modifyInfluencer(sectionId!, {
      influencer_state_id: newState,
    });
    setIsSuccess(response!);
    setTimeout(() => navigate(-1), 1500);
  };

  const handleDeleteOffer = async (sectionId: number) => {
    const response = await deleteOfferById(sectionId!);
    setIsSuccess(response!);
    setTimeout(() => navigate(0), 1500);
  };

  const handleDeleteCollab = async (sectionId: number) => {
    const response = await deleteCollabById(sectionId!);
    setIsSuccess(response!);
    setTimeout(() => navigate(-1), 1500);
  };

  const getFunctionForDialog = (
    sectionId: number,
    pageName: string,
    accept_state_id: number,
    type?: string,
    rejected_colab_reason_id?: number,
  ) => {
    switch (pageName) {
      case SectionTypes.offers:
        return handleDeleteOffer(sectionId);
      case SectionTypes.collabs:
        return type === CollabActionTypes.accept
          ? acceptCollab(sectionId, accept_state_id)
          : type === CollabActionTypes.refuse
            ? rejectCollab(sectionId, rejected_colab_reason_id!)
            : type === CollabActionTypes.cancel
              ? cancelCollab(sectionId)
              : handleDeleteCollab(sectionId);
      case SectionTypes.customers:
        return handleDeleteCompany(sectionId);
      case SectionTypes.influencers:
        if (type === "modifyState") {
          return handleUpdateCompanyState(sectionId, accept_state_id);
        }
        return handleDeleteInfluencer(sectionId);
      case SectionTypes.users:
        return handleDeleteUsers(sectionId);
      default:
        return null;
    }
  };

  return {
    handleDeleteUsers,
    handleDeleteInfluencer,
    handleDeleteCompany,
    handleDeleteOffer,
    handleDeleteCollab,
    getFunctionForDialog,
    handleUpdateCompanyState,
    isSuccess,
  };
};

export default useDialog;
