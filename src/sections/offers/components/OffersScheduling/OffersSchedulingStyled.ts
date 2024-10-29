import styled from "styled-components";

const OfferSchedulingStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .scheduling {
    &--restaurant {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__section {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
`;

export default OfferSchedulingStyled;
