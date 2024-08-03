import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import { useOffersContext } from "sections/offers/OffersContext/useOffersContext";
import { useUserContext } from "sections/user/UserContext/useUserContext";

const useDialogDelete = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { deleteUserById } = useUserContext();
  const { deleteInfluencerById } = useInfluencerContext();
  const { deleteCompanyById } = useCompanyContext();
  const { deleteOfferById } = useOffersContext();

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

  const handleDeleteStaticPage = async () => {
    // const response = await deleteSingleStaticPage(sectionId);
    // setIsSuccess(response!);
    // setTimeout(() => navigate(0), 1500);
  };

  const handleDeleteBanner = async () => {
    // const response = await deleteSingleBanner(sectionId);
    // setIsSuccess(response!);
    // setTimeout(() => navigate(0), 1500);
  };

  const handleDeleteCollection = async () => {
    // const response = await deleteCollectionById(sectionId);
    // setIsSuccess(response!);
    // setTimeout(() => navigate(0), 1500);
  };

  return {
    handleDeleteUsers,
    handleDeleteInfluencer,
    handleDeleteCompany,
    handleDeleteOffer,
    handleDeleteStaticPage,
    handleDeleteBanner,
    handleDeleteCollection,
    isSuccess,
  };
};

export default useDialogDelete;
