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
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import { SectionTypes } from "sections/shared/interfaces/interfaces";

const PlanPage = (): React.ReactElement => {
  const { getPlan, plan, loading } = usePlansContext();

  const { user } = useAuthContext();
  const getPlansData = useCallback(() => {
    getPlan(user.id);
  }, [getPlan, user.id]);

  useEffect(() => {
    getPlansData();
  }, [getPlansData]);
  return (
    <ReusablePageStyled className="plans-page">
      <>
        <section className="plans-page__mensual">
          <DashboardTable
            bodySections={[user]}
            headerSections={userTableSections}
            pageName={""}
          />
        </section>
        {loading ? (
          <Loader width="20px" height="20px" />
        ) : (
          <section className="plans-page__mensual">
            <h3>Plan</h3>
            <DashboardTable
              bodySections={[plan]}
              headerSections={planTableSections}
              pageName={SectionTypes.plans}
            />
          </section>
        )}

        <section className="plans-page__mensual">
          <h3>Contactos</h3>
          <DashboardTable
            bodySections={(user as Company)?.contacts}
            headerSections={contactsHeader}
            pageName={SectionTypes.plans}
          />
        </section>
      </>
    </ReusablePageStyled>
  );
};

export default PlanPage;
