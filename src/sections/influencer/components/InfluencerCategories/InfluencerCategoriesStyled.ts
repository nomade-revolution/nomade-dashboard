import styled from "styled-components";

const InfluencerCategoriesStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  .categories {
    &__title {
      color: ${(props) => props.theme.colors.mainColor};
      font-weight: bold;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
`;

export default InfluencerCategoriesStyled;
