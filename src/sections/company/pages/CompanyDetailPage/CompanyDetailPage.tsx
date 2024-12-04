import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageCustom from "sections/shared/components/ImageCustom/ImageCustom";
import Loader from "sections/shared/components/Loader/Loader";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import CompanyDetailPageStyled from "./CompanyDetailPageStyled";
import CompanyDetailData from "sections/company/components/CompanyDetailData/CompanyDetailData";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import CompanyCollabs from "sections/company/components/CompanyCollabs/CompanyCollabs";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import useActions from "sections/shared/hooks/useActions/useActions";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import DialogDeleteConfirm from "sections/shared/components/DialogDeleteConfirm/DialogDeleteConfirm";
import theme from "assets/styles/theme";
import { FaRegTrashCan } from "react-icons/fa6";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import CompanyForm from "sections/company/components/CompanyForm/CompanyForm";
import { FaEdit } from "react-icons/fa";
import PlanForm from "sections/plans/components/PlanForm/PlanForm";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import { companyPlanTableSections } from "sections/plans/utils/plansTableSections";
import { usePlansContext } from "sections/plans/PlansContext/usePlansContext";

const InfluencerDetailPage = (): React.ReactElement => {
  const { getCompany, company, loading, editCompanyCms } = useCompanyContext();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState<boolean>(false);
  const { getPlan, plan } = usePlansContext();
  const { handleIsDialogOpen } = useActions();

  const { id } = useParams();

  const handleDeleteButton = () => {
    handleIsDialogOpen(setIsDialogOpen);
  };

  useEffect(() => {
    getCompany(+id!);
    getPlan(+id!);
  }, [getCompany, id, getPlan]);
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
            <div className="company-detail__actions">
              {company.plan?.plan_name !== "Pendiente" && (
                <button
                  className="company-detail__plan-modify"
                  onClick={() => setIsPlanModalOpen(true)}
                >
                  <FaEdit className="dashboard__create--icon" />
                  Modificar plan
                </button>
              )}
              <button
                className="company-detail__create"
                onClick={() => setIsModalOpen(true)}
              >
                <FaEdit className="dashboard__create--icon" />
                Editar cliente
              </button>
              <ActionButton
                onClick={handleDeleteButton}
                text="Borrar"
                icon={<FaRegTrashCan />}
                color={theme.colors.red}
              />
            </div>
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

          <h2 style={{ marginBottom: "-35px" }}>Plan</h2>
          <DashboardTable
            bodySections={[plan]}
            headerSections={companyPlanTableSections}
            pageName={""}
          />
          <CompanyCollabs company_id={+id!} />
          <DialogDeleteConfirm
            handleClose={() => setIsDialogOpen(false)}
            open={isDialogOpen}
            sectionId={company.id!}
            pageName={SectionTypes.customers}
          />
          <ReusableModal
            children={
              <CompanyForm
                onSubmit={editCompanyCms}
                client={company}
                type="edit"
              />
            }
            openModal={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            type="client"
          />
          <ReusableModal
            children={<PlanForm company_id={company.id} />}
            openModal={isPlanModalOpen}
            setIsModalOpen={setIsPlanModalOpen}
            type="plan"
          />
        </CompanyDetailPageStyled>
      )}
    </>
  );
};

export default InfluencerDetailPage;
