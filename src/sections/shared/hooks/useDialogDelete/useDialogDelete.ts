import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "sections/user/UserContext/useUserContext";

const useDialogDelete = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { deleteUserById } = useUserContext();

  const handleDeleteUsers = async (sectionId: number) => {
    const response = await deleteUserById(sectionId!);
    setIsSuccess(response!);
    setTimeout(() => navigate(0), 1500);
  };

  const handleProductToDeleteCollection = () => {
    // const product = findProductInCollectionToDelete(sectionId);
    // const newProducts = deleteProductFromCollection(product!);
    // const finalProductsToAdd = getCurrentProductsToAdd(newProducts);
    // handleUpdateCollectionProducts(finalProductsToAdd);
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
    handleProductToDeleteCollection,
    handleDeleteStaticPage,
    handleDeleteBanner,
    handleDeleteCollection,
    isSuccess,
  };
};

export default useDialogDelete;
