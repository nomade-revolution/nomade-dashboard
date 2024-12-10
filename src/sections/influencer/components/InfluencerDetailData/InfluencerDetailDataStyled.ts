import styled from "styled-components";

const InfluecerDetailDataStyled = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  letter-spacing: 0.6px;
  border-radius: 10px;

  @media (min-width: 1000px) {
    box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.colors.lightGrey};
    padding: 20px;
    align-items: unset;
  }

  .avatar {
    border-radius: 50%;
    height: 80px;
    width: 80px;
    margin-right: 20px;
  }
  .influencer-data {
    &__mainData {
      display: flex;
      flex-direction: column;
      gap: 30px;

      @media (min-width: 1000px) {
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
      }
    }
    &__data {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &__names {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: bold;
    }

    &__country {
      font-weight: bold;
    }
  }
`;

export default InfluecerDetailDataStyled;
