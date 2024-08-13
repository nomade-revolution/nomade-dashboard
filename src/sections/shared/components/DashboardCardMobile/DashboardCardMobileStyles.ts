import styled from "styled-components";

const DashboardCardMobileStyled = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${(props) => props.theme.colors.light};
  padding: 15px;
  border-radius: ${(props) => props.theme.borderRadius.inputs};
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  width: 100%;

  .dashboard-card {
    &__section {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__section-title {
      font-weight: 700;
    }

    &__section-name,
    &__section-nameBold {
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &__section-nameBold {
      background: ${(props) => props.theme.colors.black};
      color: ${(props) => props.theme.colors.light};
      padding: 5px 10px;
      border-radius: ${(props) => props.theme.borderRadius.badges};
      font-weight: 700;
    }

    &__sent,
    &__new,
    &__cancelled,
    &__inProcess {
      padding: 2px 10px;
      color: ${(props) => props.theme.fontsColors.light};
      font-weight: 700;
      border-radius: ${(props) => props.theme.borderRadius.submitButton};
      font-size: ${(props) => props.theme.fontsSize.__SM};
    }

    &__sent {
      background: ${(props) => props.theme.colors.softGreen};
    }

    &__new {
      background: ${(props) => props.theme.colors.red};
    }

    &__cancelled {
      background: ${(props) => props.theme.colors.black};
    }

    &__inProcess {
      background: ${(props) => props.theme.colors.orange};
    }

    &__orders,
    &__details {
      font-weight: 700;
      padding: 3px 15px;
      border-radius: ${(props) => props.theme.borderRadius.submitButton};
    }

    &__orders {
      background: ${(props) => props.theme.colors.mainColor};
      color: ${(props) => props.theme.fontsColors.light};
    }

    &__details {
      color: ${(props) => props.theme.fontsColors.light};
      background: ${(props) => props.theme.colors.black};
    }
  }

  .details__link {
    font-weight: 700;
  }

  .details__link:hover {
    text-decoration: underline;
  }

  .orders {
    background: ${(props) => props.theme.colors.mainColor};
    color: ${(props) => props.theme.fontsColors.light};
    font-weight: 700;
    padding: 3px 15px;
    border-radius: ${(props) => props.theme.borderRadius.submitButton};
  }
`;

export default DashboardCardMobileStyled;
