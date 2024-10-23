import {
  CircularProgressProps,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  progress: number;
}

const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number },
): React.ReactElement => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={100}
        sx={{
          color: (theme) => theme.palette.grey[300],
          position: "absolute",
          left: 0,
        }}
        size={150}
        style={{ opacity: 0.5 }}
      />

      <CircularProgress
        variant="determinate"
        {...props}
        color="success"
        size={150}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary", fontSize: 20 }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default function CircularWithValueLabel({ progress }: Props) {
  return <CircularProgressWithLabel value={progress} />;
}
