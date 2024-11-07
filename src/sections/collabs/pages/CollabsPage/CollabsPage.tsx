import { useCallback, useEffect, useState } from "react";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import { useParams } from "react-router-dom";
import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import SearchBar from "sections/shared/components/SearchBar/SearchBar";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { collabsHeaderSections } from "sections/collabs/utils/collabsSections";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { CollabActionTypes } from "modules/collabs/domain/Collabs";
import ReusableSelect from "sections/shared/components/ReusableSelect/ReusableSelect";
import { FilterParams } from "../../../shared/interfaces/interfaces";
import {
  collabsFiltersCompany,
  collabsFiltersNomade,
} from "sections/collabs/utils/collabsStates";
import TypeAhead from "sections/shared/components/TypeAhead/TypeAhead";
import { useInfluencerContext } from "sections/influencer/InfluencerContext/useInfluencerContext";
import { useCompanyContext } from "sections/company/CompanyContext/useCompanyContext";

const CollabsPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");

  const [influencerSelect, setInfluencerSelect] = useState<number | null>(null);
  const [companySelect, setCompanySelect] = useState<number | null>(null);
  const [collabStateActionType, setCollabStateActionType] =
    useState<CollabActionTypes | null>(null);

  const { getAllCollabs, collabs, pagination, loading, order } =
    useCollabsContext();
  const { user } = useAuthContext();
  const { page } = useParams();
  const [filterId, setFilterId] = useState<string>("");
  const { getInfluencersWithParams, influencers } = useInfluencerContext();
  const { getCompaniesWithParams, companies } = useCompanyContext();
  const handleSearch = (text: string) => {
    getCollabs(text);
  };

  const getCollabs = useCallback(
    (text?: string) => {
      const filters: FilterParams =
        user.type === "Company"
          ? { filters: { company_id: user.id } }
          : { filters: {} };

      if (order?.sortTag) {
        filters.order = [{ by: order.sortTag, dir: order.direction }];
      }
      if (text) {
        filters.filters = { search: text };
      }
      if (filterId !== "") {
        filters.filters = { states: [filterId] };
      }
      if (influencerSelect) {
        filters.filters = { influencer_id: influencerSelect };
      }
      if (companySelect) {
        filters.filters = { company_id: companySelect };
      }

      getAllCollabs(+page!, 12, filters);
    },
    [
      getAllCollabs,
      filterId,
      order.direction,
      order.sortTag,
      page,
      user.id,
      user.type,
      influencerSelect,
      companySelect,
    ],
  );
  const getInfluencersSearch = async (text: string) => {
    await getInfluencersWithParams({
      page: 1,
      per_page: 10,
      filters: {
        search: text,
      },
    });
  };
  const getCompanySearch = async (text: string) => {
    await getCompaniesWithParams({
      page: 1,
      per_page: 10,
      filters: {
        search: text,
      },
    });
  };

  useEffect(() => {
    getCollabs();
  }, [page, order, getCollabs, filterId]);

  return (
    <>
      {loading ? (
        <Loader width="20px" height="20px" />
      ) : (
        <ReusablePageStyled>
          <div className="dashboard__filtersContainer">
            <TypeAhead
              options={companies.map((company) => {
                return {
                  id: company.id,
                  name: company.company + " / " + company.company_name,
                  value: company.id,
                };
              })}
              label="Filtrar por empresa"
              setValue={setCompanySelect}
              value={companySelect}
              searchText={""}
              getFunctions={getCompanySearch}
            />

            <TypeAhead
              label="Filtrar por influencer"
              setValue={setInfluencerSelect}
              value={influencerSelect}
              options={influencers.map((influencer) => {
                return {
                  id: influencer.id,
                  name: influencer.name + " / " + influencer.user_name,
                  value: influencer.id,
                };
              })}
              searchText={""}
              getFunctions={getInfluencersSearch}
            />

            <ReusableSelect
              label="Filtrar por estado"
              options={
                user.type === "Company"
                  ? collabsFiltersCompany
                  : collabsFiltersNomade
              }
              setValue={setFilterId}
              value={filterId}
            />

            <SearchBar
              pageName={SectionTypes.collabs}
              pageTypes={SectionTypes.collabs}
              searchText={searchText!}
              setSearchText={setSearchText}
              onReset={() => getCollabs()}
              onSearchSubmit={() => handleSearch(searchText)}
            />
          </div>
          <div className="dashboard__table">
            <DashboardTable
              bodySections={collabs}
              headerSections={collabsHeaderSections}
              pageName={SectionTypes.collabs}
              type={collabStateActionType!}
              setCollabStateActionType={setCollabStateActionType}
            />
          </div>
          <div className="dashboard__mobile">
            <h3 className="dashboard__title">Collabs</h3>

            <DashboardCardListMobile
              bodySections={collabs}
              headerSections={collabsHeaderSections}
              pageName={SectionTypes.collabs}
              type={collabStateActionType!}
              setCollabStateActionType={setCollabStateActionType}
            />
          </div>
          <PaginationComponent
            current_page={pagination.current_page}
            last_page={pagination.last_page}
            per_page={pagination.per_page}
            pageName={SectionTypes.collabs}
            filterParams=""
          />
        </ReusablePageStyled>
      )}
    </>
  );
};

export default CollabsPage;
