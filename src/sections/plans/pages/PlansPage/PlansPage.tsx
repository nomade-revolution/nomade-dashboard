import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { usePlansContext } from "sections/plans/PlansContext/usePlansContext";
import {
  monthPlansTableSections,
  trimestralPlansTableSections,
} from "sections/plans/utils/plansTableSections";
import CustomCalendar, {
  Value,
} from "sections/shared/components/CustomCalendar/CustomCalendar";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import ReusableTabSelector from "sections/shared/components/ReusableTabSelector/ReusableTabSelector";

import {
  FilterParams,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";
import formatCalendarDate from "sections/shared/utils/formatCalendarDate/formatCalendarDate";
import { formatDateWithSlash } from "sections/shared/utils/formatDate/formatDate";

const PlansPage = (): React.ReactElement => {
  const tabs = ["Mensual", "Trimestral"];
  const [billing_id, setBillingId] = useState<number>(1);
  const [isCalendarShown, setIsCalendarShown] = useState<boolean>(false);
  const [value, onChange] = useState<Value>(null);

  const { getPlans, plans, loading, pagination } = usePlansContext();
  const { page } = useParams();

  const handleSearch = (searchText: string) => {
    getPlans(+page!, 12, {
      filters: { date: searchText, billing_id: billing_id },
    });
  };

  const handleCalendarChange = (selectedDate: Value) => {
    onChange(selectedDate);
    setIsCalendarShown(false);

    if (selectedDate) {
      handleSearch(formatCalendarDate(selectedDate.toString()));
    }
  };

  useEffect(() => {
    const filters: FilterParams = {
      filters: { billing_id },
    };

    getPlans(+page!, 12, filters);
  }, [billing_id, getPlans, page, value]);

  return (
    <ReusablePageStyled className="plans-page">
      <div className="plans-page__show-calendar">
        <button
          onClick={() => setIsCalendarShown(!isCalendarShown)}
          className="plans-page__filter-btn"
        >
          Filtrar por fechas
        </button>
        {value && (
          <div className="plans-page__filter-active">
            <span>
              {" "}
              {formatDateWithSlash(formatCalendarDate(value.toString()))}
            </span>
            <button
              onClick={() => onChange(null)}
              className="plans-page__filter-close"
            >
              <IoClose />
            </button>
          </div>
        )}
        {isCalendarShown && (
          <div className="plans-page__calendar">
            <CustomCalendar onChange={handleCalendarChange} value={value} />
          </div>
        )}
      </div>
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
