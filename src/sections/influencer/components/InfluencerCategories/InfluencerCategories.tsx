import { Category } from "modules/user/domain/User";
import InfluencerCategoriesStyled from "./InfluencerCategoriesStyled";

interface Props {
  categories: Category[];
}

const InfluencerCategories = ({ categories }: Props): React.ReactElement => {
  return (
    <InfluencerCategoriesStyled className="categories">
      <h4 className="categories__title">Categorías</h4>
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
