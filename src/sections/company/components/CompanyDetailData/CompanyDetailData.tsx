import { Company, UserTypes } from "modules/user/domain/User";
import CompanyDetailDataStyled from "./CompanyDetailDataStyled";
import { Link } from "react-router-dom";
import CompanySocialMedia from "../CompanySocialMedia/CompanySocialMedia";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot, FaRegCommentDots } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import theme from "assets/styles/theme";
import { useState } from "react";
import { Dialog } from "@mui/material";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import AddCommentForm from "sections/shared/components/AddCommentForm/AddCommentForm";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";

interface Props {
  company: Company;
}

const CompanyDetailData = ({ company }: Props): React.ReactElement => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const user = useAuthContext();
  return (
    <CompanyDetailDataStyled>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <AddCommentForm company={company} setModalOpen={setIsDialogOpen} />
      </Dialog>

      <div className="company-data__data">
        <div className="header">
          <ImageCustom
            image={company.image}
            alt={company.name}
            className="avatar"
            height={80}
            width={80}
          />
          <div className="data">
            <span className="company-data__name">{company.company}</span>
            <span className="company-data__company">
              {company?.company_name}
            </span>
            <span>NIF - {company?.nif}</span>
            <span>{company.type}</span>
          </div>
          <CompanySocialMedia socialMedia={company?.socialMedia} />
        </div>

        <section
          className="company-data__section-icon"
          style={{ marginTop: "20px" }}
        >
          <Link to={company.web} target="_blank" className="">
            <TbWorld color="#4287f5" /> {company.web}
          </Link>
        </section>
        <section className="company-data__section-icon">
          <FaPhoneAlt size={15} />
          <span>{company.phone}</span>
        </section>
        <section className="company-data__section-icon">
          <FaLocationDot color="#a13b4b" />
          <span>{company.address?.address}</span>
        </section>

        <section className="company-data__section-data">
          <h4 className="company-data__title">Descripción</h4>
          <span>{company?.description}</span>
        </section>

        {user.user.type === UserTypes.nomade && (
          <>
            <section>
              <h4 className="company-data__title">Comentario</h4>
              <span>{company?.company_comments ?? "Sin comentarios"}</span>
            </section>
            <div style={{ marginTop: "10px" }}>
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
    </CompanyDetailDataStyled>
  );
};

export default CompanyDetailData;
