import { useCallback, useEffect, useState } from "react";
import DashboardCardListMobile from "sections/shared/components/DashboardCardListMobile/DashboardCardListMobile";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import PaginationComponent from "sections/shared/components/Pagination/PaginationComponent";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import {
  setOrDeleteSearchParam,
  toCleanQueryString,
} from "sections/shared/utils/queryParams/queryParams";

const CollabsPage = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");

  const [influencerSelect, setInfluencerSelect] = useState<number | null>(null);
  const [companySelect, setCompanySelect] = useState<number | null>(null);
  const [collabStateActionType, setCollabStateActionType] =
    useState<CollabActionTypes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
  const searchParam = searchParams.get("search") ?? "";
  const stateParam = searchParams.get("states") ?? "";
  const influencerParam = searchParams.get("influencer") ?? "";
  const companyParam = searchParams.get("client") ?? "";

  const navigateToPageWithParams = (
    pageNumber: number,
    updates: Record<string, string | number | null | undefined>,
  ) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      setOrDeleteSearchParam(params, key, value);
    });
    const queryString = toCleanQueryString(params);
    navigate(
      `/collabs/page/${pageNumber}${
        queryString.length > 0 ? `?${queryString}` : ""
      }`,
    );
  };

  const handleSearch = (text: string) => {
    navigateToPageWithParams(1, { search: text || null });
  };
  const [totalFilters, setTotalFilters] = useState<FilterParams>({});

  const getCollabs = useCallback(() => {
    const companyId = selectedCompany;

    const filters: FilterParams =
      user.type === "Company"
        ? { filters: { company_id: companyId } }
        : { filters: {} };

    if (order?.sortTag && order.direction) {
      filters.order = [{ by: order.sortTag, dir: order.direction }];
    }
    if (searchParam) {
      filters.filters = { ...(filters.filters as object), search: searchParam };
    }
    if (stateParam !== "") {
      filters.filters = {
        ...(filters.filters as object),
        states: [+stateParam],
      };
    }
    if (influencerParam) {
      filters.filters = {
        ...(filters.filters as object),
        influencer_id: +influencerParam,
      };
    }
    if (companyParam || (user.type === "Company" && companyId)) {
      filters.filters = {
        ...(filters.filters as object),
        company_id:
          user.type === "Company" && companyId ? companyId : +companyParam,
      };
    }
    setTotalFilters(filters);
    setIsOpenFilters(false);
    getAllCollabs(+page!, 10, filters);
  }, [
    getAllCollabs,
    order.direction,
    order.sortTag,
    page,
    user.type,
    selectedCompany,
    searchParam,
    stateParam,
    influencerParam,
    companyParam,
  ]);
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
    if (key === "search") {
      setSearchText("");
      navigateToPageWithParams(1, { search: null });
      return;
    }
    if (key === "states") {
      setFilterId("");
      navigateToPageWithParams(1, { states: null });
      return;
    }
    if (key === "influencer_id") {
      setInfluencerSelect(null);
      navigateToPageWithParams(1, { influencer: null });
      return;
    }
    if (key === "company_id") {
      setCompanySelect(null);
      navigateToPageWithParams(1, { client: null });
    }
  };

  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(false);

  useEffect(() => {
    if (state?.company_id && !searchParams.get("client")) {
      navigateToPageWithParams(1, { client: state.company_id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.company_id]);

  useEffect(() => {
    setSearchText(searchParam);
    setFilterId(stateParam);
    setInfluencerSelect(influencerParam ? +influencerParam : null);
    setCompanySelect(companyParam ? +companyParam : null);
  }, [searchParam, stateParam, influencerParam, companyParam]);

  const queryKey = searchParams.toString();

  useEffect(() => {
    getCollabs();
  }, [page, order, getCollabs, queryKey]);

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
          onReset={() => {
            setSearchText("");
            navigateToPageWithParams(1, { search: null });
          }}
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
              setValue={(value) => {
                setCompanySelect(value);
                navigateToPageWithParams(1, { client: value });
              }}
              value={companySelect}
              searchText={""}
              getFunctions={getCompanySearch}
            />
          )}

          <TypeAhead
            label="Filtrar por influencer"
            setValue={(value) => {
              setInfluencerSelect(value);
              navigateToPageWithParams(1, { influencer: value });
            }}
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
              setValue={(value) => {
                setFilterId(value);
                navigateToPageWithParams(1, { states: value || null });
              }}
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
        filterParams={toCleanQueryString(searchParams)}
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
