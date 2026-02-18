import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { useLeadsContext } from "sections/leads/LeadsContext/useLeadsContext";
import { leadsHeaderSection } from "sections/leads/utils/leadsSections";
import CreateLeadForm from "sections/leads/components/CreateLeadForm/CreateLeadForm";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import SearchBar from "sections/shared/components/SearchBar/SearchBar";
import theme from "assets/styles/theme";
import {
  FilterParams,
  SectionTypes,
} from "sections/shared/interfaces/interfaces";

const LeadsPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");
  const [isCreateLeadModalOpen, setIsCreateLeadModalOpen] = useState(false);

  const { getLeadsPaginated, loading, leads, pagination, order } =
    useLeadsContext();
  const { page } = useParams();

  const getLeadsData = useCallback(
    (text?: string) => {
      const filters: FilterParams = {};
      if (text) {
        filters.search = text;
      }
      if (order?.sortTag) {
        filters.order = [{ by: order.sortTag, dir: order.direction }];
      }
      getLeadsPaginated(+page!, 10, filters);
    },
    [getLeadsPaginated, page, order.direction, order.sortTag],
  );

  const handleSearch = (text: string) => {
    getLeadsData(text);
  };

  useEffect(() => {
    getLeadsData();
  }, [page, order, getLeadsData]);

  return (
    <>
      {loading ? (
        <Loader width="40px" height="40px" />
      ) : (
        <ReusablePageStyled className="dashboard">
          <div className="dashboard__searchContainer">
            <section className="dashboard__btns-section">
              <ActionButton
                color={theme.colors.darkBlue}
                icon={<IoAddCircle className="dashboard__create--icon" />}
                onClick={() => setIsCreateLeadModalOpen(true)}
                text="Añadir lead"
              />
            </section>
            <SearchBar
              pageName={SectionTypes.leads}
              pageTypes={SectionTypes.leads}
              searchText={searchText!}
              setSearchText={setSearchText}
              onSearchSubmit={() => handleSearch(searchText)}
              onReset={() => getLeadsData()}
            />
          </div>
          <div className="dashboard__table">
            <DashboardTable
              bodySections={leads}
              headerSections={leadsHeaderSection}
              pageName={SectionTypes.leads}
            />
          </div>
          <div className="dashboard__mobile">
            <h3>Leads</h3>
            <DashboardCardListMobile
              bodySections={leads}
              headerSections={leadsHeaderSection}
              pageName={SectionTypes.leads}
            />
          </div>
          <PaginationComponent
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            pageName={SectionTypes.leads}
            filterParams={""}
          />
          <ReusableModal
            openModal={isCreateLeadModalOpen}
            setIsModalOpen={setIsCreateLeadModalOpen}
            children={
              <CreateLeadForm
                onSuccess={() => {
                  setIsCreateLeadModalOpen(false);
                  getLeadsData();
                }}
              />
            }
          />
        </ReusablePageStyled>
      )}
    </>
  );
};

export default LeadsPage;
