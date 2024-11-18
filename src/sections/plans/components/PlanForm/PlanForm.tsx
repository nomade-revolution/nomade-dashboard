import { useState } from "react";
import PlanFormStyled from "./PlanFormStyled";
import { usePlansContext } from "sections/plans/PlansContext/usePlansContext";
import Loader from "sections/shared/components/Loader/Loader";

interface Props {
  company_id: number;
}

const PlanForm = ({ company_id }: Props): React.ReactElement => {
  const [months, setMonths] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const { updateCompanyPlanPeriod, isSuccess, error, loading } =
    usePlansContext();

  const handleMonthsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonths(+event.target.value);
  };

  const handleCalendarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const selectedMonth = event.target.value;
    if (selectedMonth) {
      const formattedDate = `${selectedMonth}-01`;
      setDate(formattedDate);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateCompanyPlanPeriod(company_id, {
      date: date,
      extension: months,
    });
  };

  return (
    <PlanFormStyled className="update-plan" onSubmit={handleSubmit}>
      <h4 className="update-plan__title">Extensión de plan retroactiva </h4>
      <section className="update-plan__months">
        <label htmlFor="months" className="update-plan__label">
          Número de meses
        </label>
        <input
          type="number"
          id="months"
          name="months"
          placeholder="0"
          onChange={handleMonthsChange}
          className="update-plan__field"
          required
        />
      </section>
      <section className="update-plan__calendar">
        <label className="update-plan__label">Fecha</label>
        <input
          type="month"
          className="update-plan__date-picker"
          onChange={handleCalendarChange}
          required
        />
      </section>
      <button
        className={isSuccess ? "btn-success" : error ? "btn-error" : "btn"}
        type="submit"
      >
        {loading ? (
          <Loader height="20px" width="20px" />
        ) : isSuccess ? (
          "Plan actualizado"
        ) : error ? (
          "Ha ocurrido un error"
        ) : (
          "Actualizar plan"
        )}
      </button>
    </PlanFormStyled>
  );
};

export default PlanForm;
