import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { Company } from "modules/user/domain/User";
import { useCallback, useEffect } from "react";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import contactsHeader from "sections/company/pages/CompanyDetailPage/utils/contactsHeader";
import { usePlansContext } from "sections/plans/PlansContext/usePlansContext";
import {
  planTableSections,
  userTableSections,
} from "sections/plans/utils/plansTableSections";
import CompanySelector from "sections/shared/components/CompanySelector";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import { SectionTypes } from "sections/shared/interfaces/interfaces";

const PlanPage = (): React.ReactElement => {
  const { getPlan, plan, loading } = usePlansContext();

  const { user, selectedCompany } = useAuthContext();

  const getPlansData = useCallback(() => {
    if (selectedCompany) {
      getPlan(selectedCompany);
    }
  }, [getPlan, selectedCompany]);

  useEffect(() => {
    getPlansData();
  }, [getPlansData, selectedCompany]);

  const companyData =
    user?.companies?.find((company) => company.id === selectedCompany) ||
    ({} as Company);

  // Filter out "Fecha de inicio de pago" and "Tiempo restante" columns for company users
  const getFilteredPlanTableSections = () => {
    if (user?.type === "Company") {
      return planTableSections.filter(
        (section) => section.id !== 9 && section.id !== 10,
      );
    }
    return planTableSections;
  };

  return (
    <ReusablePageStyled className="plans-page">
      <>
        <CompanySelector />

        <section className="plans-page__mensual">
          <DashboardTable
            bodySections={[companyData]}
            headerSections={userTableSections}
            pageName={SectionTypes.plans}
          />
        </section>

        {loading ? (
          <Loader width="20px" height="20px" />
        ) : (
          <section className="plans-page__mensual">
            <h3>Plan</h3>
            <DashboardTable
              bodySections={[plan]}
              headerSections={getFilteredPlanTableSections()}
              pageName={SectionTypes.plans}
            />
          </section>
        )}

        <section className="plans-page__mensual">
          <h3>Contactos</h3>
          <DashboardTable
            bodySections={companyData.contacts}
            headerSections={contactsHeader}
            pageName={SectionTypes.users}
          />
        </section>
      </>
    </ReusablePageStyled>
  );
};

export default PlanPage;
