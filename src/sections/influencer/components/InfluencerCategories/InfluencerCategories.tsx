import { Category } from "modules/user/domain/User";
import InfluencerCategoriesStyled from "./InfluencerCategoriesStyled";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";

interface Props {
  categories: Category[];
}

const InfluencerCategories = ({ categories }: Props): React.ReactElement => {
  const { user } = useAuthContext();

  const parentCategory = categories.find(
    (category) => category.parent_id === null,
  );
  const childCategories = categories.filter(
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
      {user.type === "Nomade" && childCategories.length ? (
        <>
          <span className="categories__title">Subcategoría</span>
          <ul className="categories__list">
            {childCategories.map((cat) => {
              return <li key={cat.name}>{cat.name}</li>;
            })}
          </ul>
        </>
      ) : null}
      {categories.length === 0 && <p>Sin categorías asignadas</p>}
    </InfluencerCategoriesStyled>
  );
};

export default InfluencerCategories;
