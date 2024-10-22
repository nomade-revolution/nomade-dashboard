import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { useEffect } from "react";
import { usePlansContext } from "sections/plans/PlansContext/usePlansContext";
import { monthPlansTableSections } from "sections/plans/utils/plansTableSections";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import ReusableTabSelector from "sections/shared/components/ReusableTabSelector/ReusableTabSelector";

const PlansPage = (): React.ReactElement => {
  const tabs = ["Mensual", "Trimestral"];

  const { getPlans, plans, loading } = usePlansContext();

  useEffect(() => {
    getPlans();
  }, [getPlans]);

  const monthPlans = plans.filter((items) => items.billing === "Mensual");

  return (
    <ReusablePageStyled>
      <ReusableTabSelector
        tabs={tabs}
        content={[
          <>
            {loading ? (
              <Loader width="20px" height="20px" />
            ) : (
              <DashboardTable
                bodySections={monthPlans}
                headerSections={monthPlansTableSections}
                pageName=""
              />
            )}
          </>,
          <span>En proceso...</span>,
        ]}
      />
    </ReusablePageStyled>
  );
};

export default PlansPage;
