import styled from "styled-components";

const InfluencerCategoriesStyled = styled.section`
  .categories {
    &__title {
      color: ${(props) => props.theme.colors.mainColor};
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
`;

export default InfluencerCategoriesStyled;
