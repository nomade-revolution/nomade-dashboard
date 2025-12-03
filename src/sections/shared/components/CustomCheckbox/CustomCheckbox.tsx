import { Checkbox } from "@mui/material";
import { styled } from "styled-components";

const CustomCheckbox = styled(Checkbox)(() => ({
  "&.MuiCheckbox-root": {
    border: "2px solid #335d53",
    borderRadius: 4,
    width: 20,
    height: 20,
  },
  "&.Mui-checked": {
    color: "#335d53",
    "& .MuiSvgIcon-root": {
      display: "none",
    },
    "&:before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "#335d53",
    },
  },
}));

export default CustomCheckbox;
