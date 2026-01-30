import styled from "styled-components";

const DetailCardMobileStyled = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${(props) => props.theme.colors.light};
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0.2em rgba(0, 0, 0, 0.1);
  gap: 12px;

  .detail-card-mobile {
    &__title {
      font-size: ${(props) => props.theme.fontsSize.__MD};
      font-weight: 700;
      margin: 0;
      padding-bottom: 8px;
      border-bottom: 1px solid ${(props) => props.theme.borders.lightGrey};
    }

    &__row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    &__label {
      font-size: ${(props) => props.theme.fontsSize.__SM};
      color: ${(props) => props.theme.fontsColors.lightGrey ?? "#ABABB4"};
      font-weight: 500;
    }

    &__value {
      font-size: ${(props) => props.theme.fontsSize.__MD};
      color: ${(props) => props.theme.fontsColors.dark ?? "#000"};
      font-weight: 400;
      line-height: 1.4;
    }
  }
`;

export default DetailCardMobileStyled;
