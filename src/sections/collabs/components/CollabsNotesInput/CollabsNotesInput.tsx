import { Box, TextField } from "@mui/material";
import React from "react";

interface Props {
  notes: string;
  setNotes: (value: string) => void;
}

const CollabsNotesInput = ({ notes, setNotes }: Props): React.ReactElement => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
        id="company-notes-textarea"
        label="Comentario"
        multiline
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        placeholder="Escribe un comentario para el cliente..."
        variant="outlined"
        fullWidth
      />
    </Box>
  );
};

export default CollabsNotesInput;
