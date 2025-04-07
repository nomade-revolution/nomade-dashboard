import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import ReusableSelect from "../ReusableSelect/ReusableSelect";
import { Company, UserTypes } from "modules/user/domain/User";

const CompanySelector = () => {
  const { user, selectedCompany, setSelectedCompany } = useAuthContext();

  if (
    !user ||
    user.type !== UserTypes.company ||
    !user.companies ||
    user?.companies?.length < 2
  )
    return null;

  const companyData =
    user?.companies?.find((company) => company.id === selectedCompany) ||
    ({} as Company);

  const options = user.companies.map((company) => ({
    name: company.company,
    id: company.id,
    value: company.id,
  }));

  return (
    <div style={{ alignSelf: "flex-end" }}>
      <ReusableSelect
        options={options}
        value={companyData.id + ""}
        // @ts-expect-error TODO fix this
        setValue={setSelectedCompany}
        label="Selecciona una empresa"
        placeholder="Selecciona una empresa"
        hideNone
      />
    </div>
  );
};

export default CompanySelector;
