import environments from "@environments";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "sections/shared/components/Loader/Loader";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";

const TermsConditionsOfflinePage = () => {
  const [loading, setLoading] = useState(true);
  const [conditions, setConditions] = useState("");
  const { getSessionToken } = useAuthContext();

  useEffect(() => {
    const isAuthenticated = !!getSessionToken();
    // If user is not logged in, use index [1], otherwise use [0]
    const index = isAuthenticated ? 0 : 1;

    try {
      axios
        .get(`${environments.API_PUBLIC_URL}/conditions`)
        .then((response) => {
          if (response.data.data.length > index) {
            setConditions(response.data.data[index].content);
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  }, [getSessionToken]);

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
