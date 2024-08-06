import { Company } from "modules/user/domain/User";
import CompanyDetailDataStyled from "./CompanyDetailDataStyled";
import { Link } from "react-router-dom";
import CompanySocialMedia from "../CompanySocialMedia/CompanySocialMedia";

interface Props {
  company: Company;
}

const CompanyDetailData = ({ company }: Props): React.ReactElement => {
  return (
    <CompanyDetailDataStyled className="company-data">
      <div className="company-data__mainData">
        <div className="company-data__data">
          <div className="company-data__names">
            <span className="company-data__name">{company?.name}</span>
            <span>{company?.nif}</span>
          </div>
          <Link to={company.web} target="_blank">
            {company.web}
          </Link>
          <span>{company.phone}</span>
          {company.email && <span>{company.email}</span>}
          <span>{company?.description}</span>
          <span>{company?.type}</span>
        </div>
      </div>
      {company.socialMedia?.length > 0 && (
        <CompanySocialMedia socialMedia={company?.socialMedia} />
      )}
    </CompanyDetailDataStyled>
  );
};

export default CompanyDetailData;
