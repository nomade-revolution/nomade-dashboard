import styled from "styled-components";

const DashboardContentSectionsStyled = styled.div`
  .dashboard_content_name_social_media {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .dashboard_content_link {
    color: ${(props) => props.theme.colors.mainColor};
    text-decoration: underline;
  }
  .dashboard_content_bold {
    font-weight: bold;
  }
`;

export default DashboardContentSectionsStyled;
