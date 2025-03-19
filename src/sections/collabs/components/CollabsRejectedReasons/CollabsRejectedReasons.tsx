import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { RejectedCollab } from "modules/collabs/domain/Collabs";
import { InputLabel, TextField } from "@mui/material";

interface Props {
  rejectedReasons: RejectedCollab[];
  reason: number;
  setReason: (value: number) => void;
  reasonText: string;
  setReasonText: (value: string) => void;
}

const CollabsRejectedReasons = ({
  rejectedReasons,
  reason,
  setReason,
  reasonText,
  setReasonText,
}: Props): React.ReactElement => {
  const handleChange = (event: SelectChangeEvent) => {
    setReason(event.target.value as unknown as number);
  };

  const selectedReason = rejectedReasons.find((r) => r.id === reason);
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl
        fullWidth
        style={{ flexDirection: selectedReason ? "row" : "column", gap: 8 }}
      >
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

        {selectedReason?.need_reason_text ? (
          <TextField
            id="outlined-multiline-static"
            label="Razón"
            multiline
            value={reasonText}
            onChange={(e) => setReasonText(e.target.value)}
            rows={4}
            placeholder={selectedReason?.reason_text_placeholder}
            variant="outlined"
          />
        ) : null}
      </FormControl>
    </Box>
  );
};

export default CollabsRejectedReasons;
