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
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress
        variant="buffer"
        value={progress}
        valueBuffer={buffer}
        sx={{ height: "20px", color: "red" }}
        color="success"
      />
    </Box>
  );
}
