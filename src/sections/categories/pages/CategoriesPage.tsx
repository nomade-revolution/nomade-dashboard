import Loader from "sections/shared/components/Loader/Loader";
import { useCategoriesContext } from "../CategoriesContext/useCategoriesContext";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import { useEffect, useState } from "react";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import categoriesSections from "../utils/categoriesSections";

const CategoriesPage = () => {
  const { categories, getAllCategories, loading } = useCategoriesContext();
  const [categoriesStateActionType, setCategoriesStateActionType] =
    useState<string>("");

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : (
        <ReusablePageStyled>
          <div className="dashboard__table">
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
        </ReusablePageStyled>
      )}
    </>
  );
};

export default CategoriesPage;
