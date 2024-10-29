import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlansContext } from "sections/plans/PlansContext/usePlansContext";
import {
  monthPlansTableSections,
  trimestralPlansTableSections,
} from "sections/plans/utils/plansTableSections";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import ReusableTabSelector from "sections/shared/components/ReusableTabSelector/ReusableTabSelector";
import {
  FilterParams,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";

const PlansPage = (): React.ReactElement => {
  const tabs = ["Mensual", "Trimestral"];
  const [billing_id, setBillingId] = useState<number>(1);

  const { getPlans, plans, loading, pagination } = usePlansContext();
  const { page } = useParams();

  useEffect(() => {
    const filters: FilterParams = {
      filters: { billing_id },
    };
    getPlans(+page!, 12, filters);
  }, [billing_id, getPlans, page]);

  return (
    <ReusablePageStyled className="plans-page">
      <ReusableTabSelector
        tabs={tabs}
        content={[
          <>
            {loading ? (
              <Loader width="20px" height="20px" />
            ) : (
              <section className="plans-page__mensual">
                <DashboardTable
                  bodySections={plans}
                  headerSections={monthPlansTableSections}
                  pageName={SectionTypes.plans}
                />
                <PaginationComponent
                  current_page={pagination.current_page}
                  filterParams=""
                  last_page={pagination.last_page}
                  per_page={pagination.per_page}
                  pageName={SectionTypes.plans}
                />
              </section>
            )}
          </>,
          <>
            {loading ? (
              <Loader width="20px" height="20px" />
            ) : (
              <section className="plans-page__mensual">
                <DashboardTable
                  bodySections={plans}
                  headerSections={trimestralPlansTableSections}
                  pageName={SectionTypes.plans}
                />
                <PaginationComponent
                  current_page={pagination.current_page}
                  filterParams=""
                  last_page={pagination.last_page}
                  per_page={pagination.per_page}
                  pageName={SectionTypes.plans}
                />
              </section>
            )}
          </>,
        ]}
        onClick={setBillingId}
      />
    </ReusablePageStyled>
  );
};

export default PlansPage;
