import styled from "styled-components";

const CollabsReservationsPageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 20px;

  .header {
    display: flex;
    width: 70%;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  .title {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .list-mobile {
    display: flex;

    @media (min-width: 768px) {
      display: none;
    }
  }
`;

export default CollabsReservationsPageStyled;
