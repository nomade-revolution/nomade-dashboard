import { Http } from "@core";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { DOCUMENTATION } from "modules/documentation/application/routes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "sections/shared/components/Loader/Loader";
import { appPaths } from "sections/shared/utils/appPaths/appPaths";
import styled from "styled-components";

const DocHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 16px;
`;

const DocLink = styled(Link)`
  color: ${(p) => p.theme?.colors?.mainColor ?? "#B78D00"};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const DocLinksRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

interface DocumentationData {
  content: string;
  // otras propiedades si existen
}

const DocumentationPage = () => {
  const [loading, setLoading] = useState(false);
  const [documentation, setDocumentation] = useState("");

  const fetchDocumentation = async () => {
    try {
      const res =
        await Http.getInstance().get<DocumentationData>(DOCUMENTATION);

      // Verificar que res tiene la propiedad data
      if (res && "data" in res) {
        setDocumentation(res.data.content);
      }

      //setDocumentation("<h1>Documentación</h1>");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentation();
  }, []);

  return (
    <ReusablePageStyled className="plans-page">
      <DocHeader>
        <DocLinksRow>
          <DocLink to={appPaths.documentationEmails}>Ver emails</DocLink>
          <DocLink to={appPaths.documentationNotifications}>
            Ver notificaciones
          </DocLink>
        </DocLinksRow>
      </DocHeader>
      {loading ? (
        <Loader width="20px" height="20px" />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: documentation || "" }} />
      )}
    </ReusablePageStyled>
  );
};

export default DocumentationPage;
