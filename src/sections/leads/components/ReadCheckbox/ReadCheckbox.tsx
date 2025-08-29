import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Lead } from "modules/leads/domain/Leads";
import { useLeadsContext } from "sections/leads/LeadsContext/useLeadsContext";
import { FaCheck } from "react-icons/fa";

// Custom checkbox with better visibility
const CustomCheckbox = styled("div")<{ checked: boolean }>(({ checked }) => ({
  width: "20px",
  height: "20px",
  border: checked ? "2px solid #CCF663" : "2px solid #ccc",
  borderRadius: "4px",
  backgroundColor: checked ? "#CCF663" : "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: checked ? "#CCF663" + "CC" : "#f5f5f5",
  },
}));

interface ReadCheckboxProps {
  row: Lead;
}

const ReadCheckbox = ({ row }: ReadCheckboxProps): React.ReactElement => {
  const [isChecked, setIsChecked] = useState<boolean>(
    row.is_read ?? Boolean(row.read_at),
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { markLeadRead } = useLeadsContext();

  const handleToggle = async () => {
    const newValue = !isChecked;

    // Optimistically update the UI
    setIsChecked(newValue);
    setIsUpdating(true);

    try {
      await markLeadRead(row.id);

      // Success - no need to rollback since the API call succeeded
    } catch (error) {
      // Rollback on failure
      setIsChecked(!newValue);

      // Show error toast (you can implement this based on your toast system)
      // For now, just silently handle the error. You can integrate with your toast system later
    } finally {
      setIsUpdating(false);
    }
  };

  const accessibilityLabel = `Marcar como leído: ${
    (row.company_name && row.company_name.trim()) ||
    (row.email && row.email.trim()) ||
    row.id
  }`;

  return (
    <CustomCheckbox
      checked={isChecked}
      onClick={handleToggle}
      role="checkbox"
      aria-checked={isChecked}
      aria-label={accessibilityLabel}
      style={{ opacity: isUpdating ? 0.6 : 1 }}
    >
      {isChecked && (
        <FaCheck size={12} color="#335d53" style={{ fontWeight: "bold" }} />
      )}
    </CustomCheckbox>
  );
};

export default ReadCheckbox;
