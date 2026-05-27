import ReusablePageStyled from "assets/styles/ReusablePageStyled";
import { Company } from "modules/user/domain/User";
import { Contact } from "modules/contact/domain/Contact";
import { useCallback, useEffect, useMemo } from "react";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import contactsHeader from "sections/company/pages/CompanyDetailPage/utils/contactsHeader";
import { usePlansContext } from "sections/plans/PlansContext/usePlansContext";
import {
  planTableSections,
  userTableSections,
} from "sections/plans/utils/plansTableSections";
import CompanySelector from "sections/shared/components/CompanySelector";
import DashboardTable from "sections/shared/components/DashboardTable/DashboardTable";
import Loader from "sections/shared/components/Loader/Loader";
import SimpleCardMobile from "sections/shared/components/SimpleCardMobile/SimpleCardMobile";
import { SectionTypes } from "sections/shared/interfaces/interfaces";

const PlanPage = (): React.ReactElement => {
  const { getPlan, plan, loading } = usePlansContext();

  const { user, selectedCompany } = useAuthContext();

  const getPlansData = useCallback(() => {
    if (selectedCompany) {
      getPlan(selectedCompany);
    }
  }, [getPlan, selectedCompany]);

  useEffect(() => {
    getPlansData();
  }, [getPlansData, selectedCompany]);

  const companyData =
    user?.companies?.find((company) => company.id === selectedCompany) ||
    ({} as Company);

  // Filter out "Fecha de inicio de pago" and "Tiempo restante" columns for company users
  const getFilteredPlanTableSections = () => {
    if (user?.type === "Company") {
      return planTableSections.filter(
        (section) => section.id !== 9 && section.id !== 10,
      );
    }
    return planTableSections;
  };

  // Deduplicate contacts by first_name/last_name/email/phone for display (temporary frontend patch)
  const uniqueContacts = useMemo(() => {
    const contacts = companyData?.contacts ?? [];
    const result: Contact[] = [];
    const seen = new Set<string>();
    contacts.forEach(
      (contact: {
        first_name?: string;
        last_name?: string;
        name?: string;
        surname?: string;
        email?: string;
        phone?: string;
        type?: string;
        type_id?: number;
      }) => {
        const firstName = contact.first_name ?? contact.name ?? "";
        const lastName = contact.last_name ?? contact.surname ?? "";
        const key = [
          firstName,
          lastName,
          contact.email ?? "",
          contact.phone ?? "",
        ].join("|");
        if (!seen.has(key)) {
          seen.add(key);
          const normalizedContact: Contact = {
            name: contact.name ?? contact.first_name ?? "",
            surname: contact.surname ?? contact.last_name ?? "",
            email: contact.email ?? "",
            phone: contact.phone ?? "",
            type: contact.type ?? "",
            type_id: contact.type_id ?? 0,
          };
          result.push(normalizedContact);
        }
      },
    );
    return result;
  }, [companyData?.contacts]);

  return (
    <ReusablePageStyled className="plans-page">
      <CompanySelector />

      {/* Mobile: title + cards */}
      <div className="plans-page__mobile">
        <h1 className="plans-page__title-mobile">Cuenta</h1>
        <section className="plans-page__mensual">
          <SimpleCardMobile
            bodySection={companyData}
            headerSections={userTableSections}
            pageName={SectionTypes.plans}
          />
        </section>
        {loading ? (
          <Loader width="20px" height="20px" />
        ) : (
          <section className="plans-page__mensual">
            <h3>Plan</h3>
            <SimpleCardMobile
              bodySection={plan}
              headerSections={getFilteredPlanTableSections()}
              pageName={SectionTypes.plans}
            />
          </section>
        )}
        <section className="plans-page__mensual">
          <h3>Contactos</h3>
          {uniqueContacts.length === 0 ? (
            <p className="plans-page__empty">No hay contactos</p>
          ) : (
            uniqueContacts.map((contact, index) => (
              <SimpleCardMobile
                key={(contact as { id?: number })?.id ?? index}
                bodySection={contact}
                headerSections={contactsHeader}
                pageName={SectionTypes.users}
              />
            ))
          )}
        </section>
      </div>

      {/* Desktop: tables */}
      <div className="plans-page__desktop">
        <section className="plans-page__mensual">
          <DashboardTable
            bodySections={[companyData]}
            headerSections={userTableSections}
            pageName={SectionTypes.plans}
          />
        </section>
        {loading ? (
          <Loader width="20px" height="20px" />
        ) : (
          <section className="plans-page__mensual">
            <h3>Plan</h3>
            <DashboardTable
              bodySections={[plan]}
              headerSections={getFilteredPlanTableSections()}
              pageName={SectionTypes.plans}
            />
          </section>
        )}
        <section className="plans-page__mensual">
          <h3>Contactos</h3>
          <DashboardTable
            bodySections={uniqueContacts}
            headerSections={contactsHeader}
            pageName={SectionTypes.users}
          />
        </section>
      </div>
    </ReusablePageStyled>
  );
};

export default PlanPage;
