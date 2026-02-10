import { useCallback, useEffect, useState } from "react";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import { useLocation, useParams } from "react-router-dom";
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
import { LuFilter } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import ReusableModal from "sections/shared/components/ReusableModal/ReusableModal";
import CollabsForm from "sections/collabs/components/CollabsForm/CollabsForm";
import ExportFilesButton from "sections/shared/components/ExportButton/ExportButton";
import ActionButton from "sections/shared/components/ActionButton/ActionButton";
import theme from "assets/styles/theme";
import { FaFilter } from "react-icons/fa6";
import CompanySelector from "sections/shared/components/CompanySelector";

const CollabsPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");

  const [influencerSelect, setInfluencerSelect] = useState<number | null>(null);
  const [companySelect, setCompanySelect] = useState<number | null>(null);
  const [collabStateActionType, setCollabStateActionType] =
    useState<CollabActionTypes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { state } = useLocation();
  const {
    getAllCollabs,
    collabs,
    pagination,
    loading,
    order,
    exportCollabsExcel,
  } = useCollabsContext();

  const { user, selectedCompany } = useAuthContext();

  // Helper function to get collabs columns based on user type
  const getCollabsColumnsForUser = (userType: string) => {
    if (userType === "Company") {
      return collabsHeaderSections.filter(
        (item) =>
          !["Cliente", "Tipo", "Última modificación"].includes(item.name),
      );
    }
    if (userType !== "Nomade") {
      return collabsHeaderSections.filter((item) => item.name !== "Cliente");
    }
    return collabsHeaderSections;
  };
  const { page } = useParams();
  const [filterId, setFilterId] = useState<string>("");
  const { getInfluencersWithParams, influencers } = useInfluencerContext();
  const { getCompaniesWithParams, companies } = useCompanyContext();
  const handleSearch = (text: string) => {
    getCollabs(text);
  };
  const [totalFilters, setTotalFilters] = useState<FilterParams>({});

  const getCollabs = useCallback(
    (text?: string) => {
      const companyId = selectedCompany;

      const filters: FilterParams =
        user.type === "Company"
          ? { filters: { company_id: companyId } }
          : { filters: {} };

      if (order?.sortTag && order.direction) {
        filters.order = [{ by: order.sortTag, dir: order.direction }];
      }
      if (text) {
        filters.filters = { ...(filters.filters as object), search: text };
      }
      if (filterId !== "") {
        filters.filters = {
          ...(filters.filters as object),
          states: [+filterId],
        };
      }
      if (influencerSelect) {
        filters.filters = {
          ...(filters.filters as object),
          influencer_id: influencerSelect,
        };
      }
      if (companySelect || state?.company_id) {
        filters.filters = {
          ...(filters.filters as object),
          company_id: companySelect || state?.company_id,
        };
      }
      setTotalFilters(filters);
      setIsOpenFilters(false);
      getAllCollabs(+page!, 10, filters);
    },
    [
      state,
      getAllCollabs,
      filterId,
      order.direction,
      order.sortTag,
      page,
      user.type,
      influencerSelect,
      companySelect,
      selectedCompany,
    ],
  );
  const getInfluencersSearch = async (text: string) => {
    await getInfluencersWithParams({
      filters: {
        search: text,
      },
    });
  };
  const getCompanySearch = async (text: string) => {
    await getCompaniesWithParams({
      filters: {
        search: text,
      },
    });
  };

  const handleRemoveFilter = (key: string) => {
    setTotalFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters.filters && updatedFilters.filters[key as never]) {
        delete updatedFilters.filters[key as never];
      }
      return updatedFilters;
    });

    if (!(totalFilters.filters as FilterParams).states) {
      setFilterId("");
    }

    if (!(totalFilters.filters as FilterParams).influencer_id) {
      setInfluencerSelect(null);
    }

    if (!(totalFilters.filters as FilterParams).company_id) {
      setCompanySelect(null);
    }

    getAllCollabs(+page!, 20, totalFilters);
  };

  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);

  useEffect(() => {
    getCollabs();
  }, [page, order, getCollabs, filterId, state]);

  if (loading) {
    return <Loader width="20px" height="20px" />;
  }

  return (
    <ReusablePageStyled className="collabs-page">
      <div className="dashboard__filtersContainer">
        {user.type === "Nomade" ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <ActionButton
              onClick={() => setIsModalOpen(true)}
              color={theme.colors.darkBlue}
              text="Crear collab"
              icon={<IoAddCircle className="dashboard__create--icon" />}
            />

            <ActionButton
              icon={<FaFilter />}
              color={theme.colors.darkBlue}
              text="Filtros"
              onClick={() => setIsOpenFilters(!isOpenFilters)}
            />
            <ExportFilesButton
              action={() => exportCollabsExcel()}
              text="Exportar collabs"
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <CompanySelector />
          </div>
        )}
        <SearchBar
          pageName={SectionTypes.collabs}
          pageTypes={SectionTypes.collabs}
          searchText={searchText!}
          setSearchText={setSearchText}
          onReset={() => getCollabs()}
          onSearchSubmit={() => handleSearch(searchText)}
        />
      </div>
      {isOpenFilters && (
        <section className="dashboard__selectsContainer">
          {user.type === "Nomade" && (
            <TypeAhead
              options={companies?.map((company) => {
                return {
                  id: company.id,
                  name: company.company,
                  value: company.id,
                };
              })}
              label="Filtrar por cliente"
              setValue={setCompanySelect}
              value={companySelect}
              searchText={""}
              getFunctions={getCompanySearch}
            />
          )}

          <TypeAhead
            label="Filtrar por influencer"
            setValue={setInfluencerSelect}
            value={influencerSelect}
            options={influencers?.map((influencer) => {
              return {
                id: influencer.id,
                name: influencer.name,
                value: influencer.id,
              };
            })}
            searchText={""}
            getFunctions={getInfluencersSearch}
          />
          <div className="dashboard__select">
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
          </div>
        </section>
      )}

      <div className="dashboard__filters filters">
        {Object.entries(totalFilters.filters || {})
          .filter(
            ([key]) =>
              ["influencer_id", "company_id", "search", "states"].includes(
                key,
              ) && !(key === "company_id" && user.type === "Company"),
          )
          .map(([key, value]) => (
            <div key={key} className="filters__filter">
              <LuFilter />
              <span>
                {key === "states"
                  ? "Estado:"
                  : key === "influencer_id"
                    ? "Influencer"
                    : key === "company_id"
                      ? "Empresa"
                      : "Búsqueda:"}
              </span>
              <span>
                {key === "states"
                  ? collabsFiltersNomade.find((state) => +state.id === +value)
                      ?.name
                  : key === "influencer_id"
                    ? influencers.find((inf) => inf.id === value)?.name
                    : key === "company_id"
                      ? companies.find((comp) => comp.id === value)?.company
                      : value}
              </span>
              <button onClick={() => handleRemoveFilter(key)}>
                <IoMdClose size={20} color="#fff" />
              </button>
            </div>
          ))}
      </div>

      <div className="dashboard__table">
        <DashboardTable
          bodySections={collabs}
          headerSections={getCollabsColumnsForUser(user.type)}
          pageName={SectionTypes.collabs}
          type={collabStateActionType!}
          setCollabStateActionType={setCollabStateActionType}
        />
      </div>
      <div className="dashboard__mobile">
        <h3 className="dashboard__title">Collabs</h3>

        <DashboardCardListMobile
          bodySections={collabs}
          headerSections={getCollabsColumnsForUser(user.type)}
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
      <ReusableModal
        children={<CollabsForm />}
        openModal={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </ReusablePageStyled>
  );
};

export default CollabsPage;
