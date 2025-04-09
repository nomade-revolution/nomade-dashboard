import Loader from "sections/shared/components/Loader/Loader";
import { useCategoriesContext } from "../CategoriesContext/useCategoriesContext";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import { useEffect, useState } from "react";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import categoriesSections from "../utils/categoriesSections";
import DialogDeleteConfirm from "sections/shared/components/DialogDeleteConfirm/DialogDeleteConfirm";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import theme from "assets/styles/theme";
import { FaPlusCircle } from "react-icons/fa";
import { Http } from "@core";
import { CATEGORIES } from "modules/categories/application/routes";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import CreateCategoryForm from "../components/CreateCategoryForm";

const CategoriesPage = () => {
  const {
    categories,
    getAllCategories,
    loading,
    categoryToDelete,
    setCategoryToDelete,
  } = useCategoriesContext();
  const [categoriesStateActionType, setCategoriesStateActionType] =
    useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  const handlePostCategory = async (data: {
    name: string;
    parentCategories: number[];
  }) => {
    try {
      await Http.getInstance().post(CATEGORIES, {
        name: data.name,
        parents: data.parentCategories,
      });
      setCategoryToDelete(null);
      setIsModalOpen(false);
      getAllCategories();
    } catch (error) {
      //
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await Http.getInstance().delete(CATEGORIES + `/${categoryToDelete?.id}`);
      setCategoryToDelete(null);
      getAllCategories();
    } catch (error) {
      //
    }
  };

  if (loading) {
    return <Loader width="20px" height="20px" />;
  }

  return (
    <ReusablePageStyled>
      <div style={{ alignSelf: "flex-end" }}>
        <ActionButton
          color={theme.colors.darkBlue}
          icon={<FaPlusCircle />}
          onClick={() => setIsModalOpen(true)}
          text="Añadir categoría"
        />
      </div>
      <div
        className="dashboard__table"
        style={{ justifyContent: "center", alignItems: "flex-start" }}
      >
        <DashboardTable
          bodySections={categories}
          headerSections={categoriesSections}
          pageName={SectionTypes.categories}
          type={categoriesStateActionType}
          setCollabStateActionType={setCategoriesStateActionType}
        />
      </div>
      <div className="dashboard__mobile">
        <div className="dashboard__searchContainer">
          <h3 className="dashboard__title">Collabs</h3>
        </div>
        <DashboardCardListMobile
          bodySections={categories}
          headerSections={categoriesSections}
          pageName={SectionTypes.categories}
        />
      </div>
      <ReusableModal
        children={
          <CreateCategoryForm
            allCategories={categories}
            setIsModalOpen={setIsModalOpen}
            onSubmit={handlePostCategory}
          />
        }
        type="social"
        openModal={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <DialogDeleteConfirm
        handleClose={() => setCategoryToDelete(null)}
        open={categoryToDelete !== null}
        sectionId={0}
        pageName={SectionTypes.categories}
        onAccept={handleDeleteCategory}
      />
    </ReusablePageStyled>
  );
};

export default CategoriesPage;
