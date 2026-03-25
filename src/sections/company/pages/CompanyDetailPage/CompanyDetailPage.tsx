import { useEffect, useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loader from "sections/shared/components/Loader/Loader";
import GoBackButton from "sections/shared/components/GoBackButton/GoBackButton";
import CompanyDetailPageStyled from "./CompanyDetailPageStyled";
import CompanyDetailData from "sections/company/components/CompanyDetailData/CompanyDetailData";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
// import CompanyCollabs from "sections/company/components/CompanyCollabs/CompanyCollabs";
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
import { isHttpSuccessResponse } from "sections/shared/utils/typeGuards/typeGuardsFunctions";
import contactsHeader from "./utils/contactsHeader";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { Contact } from "modules/contact/domain/Contact";

const InfluencerDetailPage = (): React.ReactElement | null => {
  const { user } = useAuthContext();
  const { getCompany, company, loading, editCompanyCms } = useCompanyContext();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState<boolean>(false);
  const { getPlan, plan, updateCompanyPlanPeriod } = usePlansContext();
  const { handleIsDialogOpen } = useActions();
  const { id } = useParams();

  const handleDeleteButton = () => {
    handleIsDialogOpen(setIsDialogOpen);
  };

  useEffect(() => {
    getCompany(+id!);
    getPlan(+id!);
  }, [getCompany, id, getPlan]);

  // Deduplicate contacts by first_name/last_name/email/phone for display (temporary frontend patch)
  const uniqueContacts = useMemo(() => {
    const contacts = company.contacts ?? [];
    const result: typeof contacts = [];
    const seen = new Set<string>();
    contacts.forEach(
      (contact: {
        first_name?: string;
        last_name?: string;
        name?: string;
        surname?: string;
        email?: string;
        phone?: string;
        type?: string;
        type_id?: number;
      }) => {
        const firstName = contact.first_name ?? contact.name ?? "";
        const lastName = contact.last_name ?? contact.surname ?? "";
        const key = [
          firstName,
          lastName,
          contact.email ?? "",
          contact.phone ?? "",
        ].join("|");
        if (!seen.has(key)) {
          seen.add(key);
          const normalizedContact: Contact = {
            name: contact.name ?? contact.first_name ?? "",
            surname: contact.surname ?? contact.last_name ?? "",
            email: contact.email ?? "",
            phone: contact.phone ?? "",
            type: contact.type ?? "",
            type_id: contact.type_id ?? 0,
          };
          result.push(normalizedContact);
        }
      },
    );
    return result;
  }, [company.contacts]);

  if (!user) return null;

  if (user.type === "Company") {
    return <Navigate to="/plan" replace />;
  }

  const handleEditCompany = async (
    companyFormData: FormData,
    companyId?: number,
    planPayload?: {
      plan_id: number;
      date: string;
      extension: number;
      comments: string | null;
    },
  ) => {
    const res = await editCompanyCms(companyFormData, companyId);
    if (companyId && isHttpSuccessResponse(res)) {
      if (planPayload && planPayload.date) {
        await updateCompanyPlanPeriod(companyId, planPayload);
      }
      getCompany(+companyId);
      getPlan(+companyId);
    }
    return res;
  };

  // Helper function to get plan table headers based on billing periodicity
  const getPlanTableHeaders = (planBilling: string) => {
    const baseHeaders = companyPlanTableSections;

    if (planBilling === "Mensual") {
      return baseHeaders.map((header) => {
        if (header.name === "Fecha inicio trimestre") {
          return { ...header, name: "Fecha inicio mes" };
        }
        if (header.name === "Fecha fin trimestre") {
          return { ...header, name: "Fecha fin mes" };
        }
        return header;
      });
    }

    if (planBilling === "Trimestral") {
      return baseHeaders; // Keep "trimestre" labels
    }

    // Fallback for "Pendiente" or unknown values
    return baseHeaders.map((header) => {
      if (header.name === "Fecha inicio trimestre") {
        return { ...header, name: "Fecha inicio" };
      }
      if (header.name === "Fecha fin trimestre") {
        return { ...header, name: "Fecha fin" };
      }
      return header;
    });
  };

  return (
    <>
      {loading ? (
        <Loader height="40px" width="40px" />
      ) : (
        <CompanyDetailPageStyled className="company-detail">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <GoBackButton />
          </div>
          <section className="company-detail__header">
            <div className="company-detail__title">
              <h2>Cliente</h2>
            </div>
            <div className="company-detail__actions">
              {/* <ActionButton
                onClick={handleNavigateOffers}
                text="Ver Ofertas"
                icon={<FaEye />}
                color={theme.colors.darkBlue}
              />
              <ActionButton
                onClick={handleNavigate}
                text="Ver Collabs"
                icon={<FaEye />}
                color={theme.colors.darkBlue}
              /> */}
              {company.plan?.plan_name !== "Pendiente" && (
                <ActionButton
                  onClick={() => setIsPlanModalOpen(true)}
                  text="Extender Plan"
                  icon={<FaEdit />}
                  color={theme.colors.darkBlue}
                />
              )}
              <ActionButton
                onClick={() => setIsModalOpen(true)}
                text="Editar Cliente"
                icon={<FaEdit />}
                color={theme.colors.darkBlue}
              />

              <ActionButton
                onClick={handleDeleteButton}
                text="Borrar"
                icon={<FaRegTrashCan />}
                color={theme.colors.red}
              />
            </div>
          </section>

          <section style={{ width: "100%" }}>
            <CompanyDetailData company={company} />
          </section>
          <h2
            style={{
              marginBottom: "20px",
              alignSelf: "flex-start",
              marginTop: "20px",
            }}
          >
            Contactos
          </h2>
          <DashboardTable
            bodySections={uniqueContacts}
            headerSections={contactsHeader}
            pageName={SectionTypes.users}
          />
          <h2 style={{ marginBottom: "5px", alignSelf: "flex-start" }}>Plan</h2>
          <DashboardTable
            bodySections={[plan]}
            headerSections={getPlanTableHeaders(company.plan?.billing || "")}
            pageName={""}
          />
          {/* <h2 style={{ marginBottom: "5px", alignSelf: "flex-start" }}>Histórico Plan</h2> */}
          {/* <DashboardTable
            bodySections={[company.plan]}
            headerSections={companyPlanTableSections}
            pageName={""}
          /> */}
          {/* <CompanyCollabs company_id={+id!} /> */}
          <DialogDeleteConfirm
            handleClose={() => setIsDialogOpen(false)}
            open={isDialogOpen}
            sectionId={company.id!}
            pageName={SectionTypes.customers}
          />
          <ReusableModal
            children={
              <CompanyForm
                onSubmit={handleEditCompany}
                client={company}
                type="edit"
                setIsOpen={setIsModalOpen}
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
