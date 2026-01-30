import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface LinearBufferProps {
  progress: number;
  buffer?: number;
}

export default function LinearBuffer({
  progress,
  buffer = 100,
}: LinearBufferProps) {
  const value = Number(progress);
  const valueBuffer = Number(buffer);
  const safeValue = Number.isFinite(value) ? value : 0;
  const safeBuffer = Number.isFinite(valueBuffer) ? valueBuffer : 100;
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        variant="buffer"
        value={safeValue}
        valueBuffer={safeBuffer}
        sx={{ height: "20px" }}
        color={
          safeValue < 25
            ? "error"
            : safeValue < 50
              ? "warning"
              : safeValue < 75
                ? "info"
                : safeValue < 100
                  ? "primary"
                  : "success"
        }
      />
    </Box>
  );
}
