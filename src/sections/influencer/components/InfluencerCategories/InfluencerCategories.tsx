import { Category } from "modules/user/domain/User";
import InfluencerCategoriesStyled from "./InfluencerCategoriesStyled";

interface Props {
  categories: Category[];
}

const InfluencerCategories = ({ categories }: Props): React.ReactElement => {
  return (
    <InfluencerCategoriesStyled className="categories">
      <h3 className="categories__title">Categorías</h3>
      <ul className="categories__list">
        {categories.map((category) => (
          <li>{category?.name}</li>
        ))}
      </ul>
    </InfluencerCategoriesStyled>
  );
};

export default InfluencerCategories;
