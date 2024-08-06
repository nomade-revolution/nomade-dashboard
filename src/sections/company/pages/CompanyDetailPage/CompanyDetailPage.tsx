import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import Loader from "sections/shared/components/Loader/Loader";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import CompanyDetailPageStyled from "./CompanyDetailPageStyled";
import CompanyDetailData from "sections/company/components/CompanyDetailData/CompanyDetailData";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import CompanyCollabs from "sections/company/components/CompanyCollabs/CompanyCollabs";

const InfluencerDetailPage = (): React.ReactElement => {
  const { getCompany, company, loading } = useCompanyContext();
  const { id } = useParams();

  useEffect(() => {
    getCompany(+id!);
  }, [getCompany, id]);

  return (
    <>
      {loading ? (
        <Loader height="40px" width="40px" />
      ) : (
        <CompanyDetailPageStyled className="company-detail">
          <GoBackButton />
          <section className="company-detail__info">
            <ImageCustom
              image={company.image}
              alt={company.name}
              className="company-detail__avatar"
              height={150}
              width={150}
            />
            <CompanyDetailData company={company} />
          </section>
          <CompanyCollabs company_id={+id!} />
        </CompanyDetailPageStyled>
      )}
    </>
  );
};

export default InfluencerDetailPage;
