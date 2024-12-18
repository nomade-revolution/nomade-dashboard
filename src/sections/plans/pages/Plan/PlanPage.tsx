import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { useCallback, useEffect } from "react";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
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
            {Object.keys(plan).length > 0 ? (
              <>
                <DashboardTable
                  bodySections={[plan]}
                  headerSections={planTableSections}
                  pageName={SectionTypes.plans}
                />
              </>
            ) : (
              <span>Sin plan asignado</span>
            )}
          </section>
        )}
      </>
    </ReusablePageStyled>
  );
};

export default PlanPage;
