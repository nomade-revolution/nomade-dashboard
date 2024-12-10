import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";
import { usePlansContext } from "sections/plans/PlansContext/usePlansContext";
import {
  monthPlansTableSections,
  trimestralPlansTableSections,
} from "sections/plans/utils/plansTableSections";

import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import ExportFilesButton from "sections/shared/components/ExportButton/ExportButton";
import Loader from "sections/shared/components/Loader/Loader";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import ReusableTabSelector from "sections/shared/components/ReusableTabSelector/ReusableTabSelector";
import SearchBar from "sections/shared/components/SearchBar/SearchBar";

import {
  FilterParams,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";
import formatCalendarDate from "sections/shared/utils/formatCalendarDate/formatCalendarDate";

const PlansPage = (): React.ReactElement => {
  const tabs = ["Mensual", "Trimestral"];
  const [textToSearch, setTextToSearch] = useState<string>("");

  const [billing_id, setBillingId] = useState<number>(1);
  const [date, setDate] = useState<string>("");
  const { getPlans, plans, loading, pagination, orderPlans } =
    usePlansContext();
  const { exportCompanyBillingExcel } = useCompanyContext();
  const { page } = useParams();

  const handleSearch = (searchText: string) => {
    getPlans(+page!, 10, {
      filters: { date: searchText, billing_id: billing_id },
    });
  };

  const handleSearchByText = async (text: string) => {
    await getPlansData(text);
  };
  const handleCalendarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMonth = event.target.value;

    if (selectedMonth) {
      const formattedDate = `${selectedMonth}-01`;

      setDate(selectedMonth);

      handleSearch(formattedDate);
    }
  };
  const getPlansData = useCallback(
    (text?: string) => {
      const filters: FilterParams = {
        filters: { billing_id },
      };

      if (orderPlans?.sortTag) {
        filters.order = [{ by: orderPlans.sortTag, dir: orderPlans.direction }];
      }
      if (text) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (filters as any).filters.search = text;
      }
      getPlans(+page!, 10, filters);
    },
    [billing_id, getPlans, orderPlans.direction, orderPlans.sortTag, page],
  );

  useEffect(() => {
    getPlansData();
  }, [page, getPlansData]);

  const maxMonth = formatCalendarDate(new Date().toString());

  return (
    <ReusablePageStyled className="plans-page">
      <ReusableTabSelector
        tabs={tabs}
        onClick={(id) => {
          setBillingId(id);
          setDate("");
          setTextToSearch("");
        }}
        content={[
          <>
            {loading ? (
              <Loader width="20px" height="20px" />
            ) : (
              <section className="plans-page__mensual">
                <div className="plans-page__filter-btnSection">
                  <div className="plans-page__show-calendar">
                    <ExportFilesButton
                      action={() => exportCompanyBillingExcel()}
                      text="Exportar Planes"
                    />
                    <input
                      type="month"
                      value={date}
                      className="plans-page__date-picker"
                      max={maxMonth}
                      onChange={handleCalendarChange}
                    />

                    {date && (
                      <div className="plans-page__filter-active">
                        <span> {date}</span>
                        <button
                          onClick={() => setDate("")}
                          className="plans-page__filter-close"
                        >
                          <IoClose color="#fff" />
                        </button>
                      </div>
                    )}
                  </div>
                  <SearchBar
                    pageName={SectionTypes.customers}
                    pageTypes={SectionTypes.customers}
                    searchText={textToSearch!}
                    setSearchText={setTextToSearch}
                    onSearchSubmit={() => handleSearchByText(textToSearch)}
                    onReset={() => getPlansData()}
                  />
                </div>
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
                <div className="plans-page__show-calendar">
                  <div className="plans-page__filter-btnSection">
                    <ExportFilesButton
                      action={() => exportCompanyBillingExcel()}
                      text="Exportar Planes"
                    />

                    <input
                      type="month"
                      className="plans-page__date-picker"
                      max={maxMonth}
                      value={date}
                      onChange={handleCalendarChange}
                    />

                    {date && (
                      <div className="plans-page__filter-active">
                        <span> {date}</span>
                        <button
                          onClick={() => setDate("")}
                          className="plans-page__filter-close"
                        >
                          <IoClose color="#fff" />
                        </button>
                      </div>
                    )}
                  </div>
                  <SearchBar
                    pageName={SectionTypes.customers}
                    pageTypes={SectionTypes.customers}
                    searchText={textToSearch}
                    setSearchText={setTextToSearch}
                    onSearchSubmit={() => handleSearchByText(textToSearch)}
                    onReset={() => getPlansData()}
                  />
                </div>
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
      />
    </ReusablePageStyled>
  );
};

export default PlansPage;
