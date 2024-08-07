import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { RejectedCollab } from "modules/collabs/domain/Collabs";
import { InputLabel } from "@mui/material";

interface Props {
  rejectedReasons: RejectedCollab[];
  reason: number;
  setReason: (value: number) => void;
}

const CollabsRejectedReasons = ({
  rejectedReasons,
  reason,
  setReason,
}: Props): React.ReactElement => {
  const handleChange = (event: SelectChangeEvent) => {
    setReason(event.target.value as unknown as number);
  };

  return (
    <Box sx={{ minWidth: 120, width: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Motivo de rechazo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={reason.toString()}
          label="Motivo de rechazo"
          onChange={handleChange}
        >
          {rejectedReasons.map((reason) => (
            <MenuItem value={reason.id}>{reason.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CollabsRejectedReasons;
