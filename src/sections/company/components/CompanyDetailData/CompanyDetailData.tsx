import { Company, UserTypes } from "modules/user/domain/User";
import CompanyDetailDataStyled from "./CompanyDetailDataStyled";
import { Link } from "react-router-dom";
import CompanySocialMedia from "../CompanySocialMedia/CompanySocialMedia";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot, FaRegCommentDots } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import CircularWithValueLabel from "sections/shared/components/CircularProgressWithLabel/CircularProgressWithLabel";
import { formatDateWithSlash } from "sections/shared/utils/formatDate/formatDate";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import theme from "assets/styles/theme";
import { useState } from "react";
import { Dialog } from "@mui/material";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import AddCommentForm from "sections/shared/components/AddCommentForm/AddCommentForm";

interface Props {
  company: Company;
}

const CompanyDetailData = ({ company }: Props): React.ReactElement => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const user = useAuthContext();
  return (
    <CompanyDetailDataStyled className="company-data">
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <AddCommentForm company={company} />
      </Dialog>
      <div className="company-data__mainData">
        <div className="company-data__data">
          <section className="company-data__data-core">
            <div className="company-data__names">
              <span className="company-data__name">
                {company?.company_name}
              </span>
              <span className="company-data__company">{company.company}</span>
              <div>
                <span>NIF - </span>
                <span>{company?.nif}</span>
              </div>
            </div>
            <span>{company.type}</span>
          </section>
          <Link
            to={company.web}
            target="_blank"
            className="company-data__section-icon"
          >
            <TbWorld color="#4287f5" /> {company.web}
          </Link>
          <section className="company-data__section-icon">
            <FaPhoneAlt size={15} />
            <span>{company.phone}</span>
          </section>
          <section className="company-data__section-icon">
            <FaLocationDot color="#a13b4b" />
            <span>{company.address?.address}</span>
          </section>
          <h4 className="company-data__title">Personas de contacto</h4>
          <ul className="company-data__contacts">
            {company?.contacts?.map((contact) => (
              <li className="company-data__contact contact" key={contact.name}>
                <span className="contact__name">{contact.name}</span>
                <span>{contact.phone}</span>
                <span>{contact.email}</span>
                <span className="contact__type">{contact.type}</span>
              </li>
            ))}
          </ul>
          <section>
            <h4 className="company-data__title">Descripción</h4>
            <span>{company?.description}</span>
          </section>
          {user.user.type === UserTypes.nomade && (
            <>
              <section>
                <h4 className="company-data__title">Comentarios</h4>
                <span>{company?.company_comments ?? "Sin comentarios"}</span>
              </section>
              <div>
                <ActionButton
                  text="Añadir Comentario"
                  color={theme.colors.softGreen}
                  icon={<FaRegCommentDots />}
                  onClick={() => setIsDialogOpen(true)}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <section className="company-detal__plan plan">
        <h4 className="company-data__title">Plan</h4>
        <div className="plan__data">
          <div className="plan__section">
            <h5>Tipo</h5>
            <span
              className={
                company.plan?.billing === "Mensual"
                  ? "plan__mensual"
                  : "plan__trimestral"
              }
            >
              {company.plan?.billing}
            </span>
            <span
              className={`plan${
                company.plan?.plan_name === "Básico"
                  ? "--basic"
                  : company.plan?.plan_name === "Estandar"
                    ? "--standard"
                    : company.plan?.plan_name === "Premium"
                      ? "--premium"
                      : company.plan?.plan_name === "Pendiente"
                        ? "--pending"
                        : ""
              }`}
            >
              {company.plan?.plan_name}
            </span>
          </div>
          <div className="plan__section">
            <h5>Fecha de inicio</h5>
            <span className="plan__date">
              {formatDateWithSlash(company.plan && company.plan.start_date!)}
            </span>
          </div>
          <div className="plan__section">
            <CircularWithValueLabel progress={company.percentage} />
          </div>
        </div>
      </section>
      {company.socialMedia?.length > 0 && (
        <CompanySocialMedia socialMedia={company?.socialMedia} />
      )}
    </CompanyDetailDataStyled>
  );
};

export default CompanyDetailData;
