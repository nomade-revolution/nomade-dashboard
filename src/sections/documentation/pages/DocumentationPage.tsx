import { Http } from "@core";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { DOCUMENTATION } from "modules/documentation/application/routes";
import { useEffect, useState } from "react";
import Loader from "sections/shared/components/Loader/Loader";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReusablePageStyled className="plans-page">
      <>
        {loading ? (
          <Loader width="20px" height="20px" />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: documentation || "" }} />
        )}
      </>
    </ReusablePageStyled>
  );
};

export default DocumentationPage;
