import environments from "@environments";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "sections/shared/components/Loader/Loader";

const TermsConditionsOfflinePage = () => {
  const [loading, setLoading] = useState(true);
  const [conditions, setConditions] = useState("");

  useEffect(() => {
    try {
      axios
        .get(`${environments.API_PUBLIC_URL}/conditions`)
        .then((response) => {
          if (response.data.data.length !== 0) {
            setConditions(response.data.data[0].content);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (error) {
      //
    }
  }, []);

  return (
    <ReusablePageStyled className="plans-page">
      <>
        {loading ? (
          <Loader width="20px" height="20px" />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: conditions }} />
        )}
      </>
    </ReusablePageStyled>
  );
};

export default TermsConditionsOfflinePage;
