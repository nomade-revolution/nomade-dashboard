import { Category } from "modules/user/domain/User";
import InfluencerCategoriesStyled from "./InfluencerCategoriesStyled";

interface Props {
  categories: Category[];
}

const InfluencerCategories = ({ categories }: Props): React.ReactElement => {
  const parentCategory = categories.find(
    (category) => category.parent_id === null,
  );
  const childCategory = categories.find(
    (category) => category.parent_id !== null,
  );

  return (
    <InfluencerCategoriesStyled className="categories">
      <span className="categories__title">Categoría</span>
      <ul className="categories__list">
        {parentCategory ? (
          <li key={parentCategory.name}>{parentCategory.name}</li>
        ) : null}
      </ul>
      <span className="categories__title">Subcategoría</span>
      <ul className="categories__list">
        {childCategory ? (
          <li key={childCategory.name}>{childCategory.name}</li>
        ) : null}
      </ul>
      {categories.length === 0 && <p>Sin categorías asignadas</p>}
    </InfluencerCategoriesStyled>
  );
};

export default InfluencerCategories;
