import { CircularProgress } from "@mui/material";
import LoaderStyled from "./LoaderStyled";

interface LoaderProps {
  width: string;
  height: string;
}

const Loader = ({ height, width }: LoaderProps): React.ReactElement => {
  return (
    <LoaderStyled>
      <CircularProgress
        color="inherit"
        style={{ width: width, height: height }}
      />
    </LoaderStyled>
  );
};

export default Loader;
