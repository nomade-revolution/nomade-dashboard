import environments from "@environments";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "sections/shared/components/Loader/Loader";

const TermsConditionsOfflinePage = () => {
  const [loading, setLoading] = useState(true);
  const [conditions, setConditions] = useState("");
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get("type");
  const type =
    typeParam === "influencer" || typeParam === "company"
      ? typeParam
      : "company";

  useEffect(() => {
    axios
      .get(`${environments.API_PUBLIC_URL}/conditions/${type}`)
      .then((response) => {
        const content =
          response.data?.data?.content ?? response.data?.content ?? "";
        setConditions(content);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [type]);

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
