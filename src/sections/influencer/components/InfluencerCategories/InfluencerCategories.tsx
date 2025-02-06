import { Category } from "modules/user/domain/User";
import InfluencerCategoriesStyled from "./InfluencerCategoriesStyled";

interface Props {
  categories: Category[];
}

const InfluencerCategories = ({ categories }: Props): React.ReactElement => {
  return (
    <InfluencerCategoriesStyled className="categories">
      <span className="categories__title">Categorías</span>
      <ul className="categories__list">
        {categories.map((category) => (
          <li key={category?.name}>{category?.name}</li>
        ))}
      </ul>
      {categories.length === 0 && <p>Sin categorías asignadas</p>}
    </InfluencerCategoriesStyled>
  );
};

export default InfluencerCategories;
