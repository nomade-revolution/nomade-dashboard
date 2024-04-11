import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { OptionsStructure } from "../../interfaces/interfaces";

interface ReusableSelectProps {
  value: string;
  setValue: (value: string) => void;
  options: OptionsStructure[];
  label: string;
}

export default function ReusableSelect({
  setValue,
  value,
  options,
  label,
}: ReusableSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120, width: "300px" }} size="small">
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        id="select-label"
        aria-label="Seleccionar opciones"
        value={value}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem value={option.value} key={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
