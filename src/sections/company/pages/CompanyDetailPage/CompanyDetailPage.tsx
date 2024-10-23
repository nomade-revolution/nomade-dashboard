import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import Loader from "sections/shared/components/Loader/Loader";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import CompanyDetailPageStyled from "./CompanyDetailPageStyled";
import CompanyDetailData from "sections/company/components/CompanyDetailData/CompanyDetailData";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import CompanyCollabs from "sections/company/components/CompanyCollabs/CompanyCollabs";
import DeleteButton from "sections/shared/components/DeleteButton/DeleteButton";
import useActions from "sections/shared/hooks/useActions/useActions";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import DialogDeleteConfirm from "sections/shared/components/DialogDeleteConfirm/DialogDeleteConfirm";

const InfluencerDetailPage = (): React.ReactElement => {
  const { getCompany, company, loading } = useCompanyContext();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { handleIsDialogOpen } = useActions();

  const { id } = useParams();

  const handleDeleteButton = () => {
    handleIsDialogOpen(setIsDialogOpen);
  };

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
          <section className="company-detail__header">
            <div className="company-detail__title">
              <h2>Cliente</h2>
            </div>
            <DeleteButton onClick={handleDeleteButton} />
          </section>

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
          <DialogDeleteConfirm
            handleClose={() => setIsDialogOpen(false)}
            open={isDialogOpen}
            sectionId={company.id!}
            pageName={SectionTypes.customers}
          />
        </CompanyDetailPageStyled>
      )}
    </>
  );
};

export default InfluencerDetailPage;
