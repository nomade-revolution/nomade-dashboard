// import { Http } from "@core";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
// import { DOCUMENTATION } from "modules/documentation/application/routes";
import { useEffect, useState } from "react";
import Loader from "sections/shared/components/Loader/Loader";

const DocumentationPage = () => {
  const [loading, setLoading] = useState(false);
  const [documentation, setDocumentation] = useState("");

  const fetchDocumentation = async () => {
    try {
      // const res = await Http.getInstance().get(DOCUMENTATION);
      // console.log("res", res?.data);
      // setDocumentation(res.data);
      setDocumentation("<h1>Documentación</h1>");
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
