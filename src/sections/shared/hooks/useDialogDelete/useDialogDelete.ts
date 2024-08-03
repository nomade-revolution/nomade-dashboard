import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import { useUserContext } from "sections/user/UserContext/useUserContext";

const useDialogDelete = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { deleteUserById } = useUserContext();
  const { deleteInfluencerById } = useInfluencerContext();
  const { deleteCompanyById } = useCompanyContext();
  const { deleteOfferById } = useOffersContext();
  const { deleteCollabById } = useCollabsContext();

  const handleDeleteUsers = async (sectionId: number) => {
    const response = await deleteUserById(sectionId!);
    setIsSuccess(response!);
    setTimeout(() => navigate(0), 1500);
  };

  const handleDeleteInfluencer = async (sectionId: number) => {
    const response = await deleteInfluencerById(sectionId!);
    setIsSuccess(response!);
    setTimeout(() => navigate(0), 1500);
  };

  const handleDeleteCompany = async (sectionId: number) => {
    const response = await deleteCompanyById(sectionId!);
    setIsSuccess(response!);
    setTimeout(() => navigate(0), 1500);
  };

  const handleDeleteOffer = async (sectionId: number) => {
    const response = await deleteOfferById(sectionId!);
    setIsSuccess(response!);
    setTimeout(() => navigate(0), 1500);
  };

  const handleDeleteCollab = async (sectionId: number) => {
    const response = await deleteCollabById(sectionId!);
    setIsSuccess(response!);
    setTimeout(() => navigate(0), 1500);
  };

  const getFunctionToDelete = (sectionId: number, pageName: string) => {
    return pageName === SectionTypes.offers
      ? handleDeleteOffer(sectionId)
      : pageName === SectionTypes.collabs
        ? handleDeleteCollab(sectionId)
        : pageName === SectionTypes.customers
          ? handleDeleteCompany(sectionId)
          : pageName === SectionTypes.influencers
            ? handleDeleteInfluencer(sectionId)
            : pageName === SectionTypes.users
              ? handleDeleteUsers(sectionId)
              : null;
  };

  return {
    handleDeleteUsers,
    handleDeleteInfluencer,
    handleDeleteCompany,
    handleDeleteOffer,
    handleDeleteCollab,
    getFunctionToDelete,
    isSuccess,
  };
};

export default useDialogDelete;
