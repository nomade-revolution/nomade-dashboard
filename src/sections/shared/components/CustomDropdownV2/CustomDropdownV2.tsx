import { Menu, MenuItem } from "@mui/material";
import CustomDropdownV2Styled from "./CustomDropDownV2Styled";
import { CollabTypes } from "modules/collabs/domain/Collabs";

interface Props {
  options: {
    id: number;
    name: string;
    collabType?: CollabTypes;
  }[];
  anchorEl: null | HTMLElement;
  setAnchorEl: (value: null | HTMLElement) => void;
  onClickFC: (value: number) => void;
  vertical?: number | "center" | "bottom" | "top";
  horizontal?: number | "center" | "left" | "right";
}

const CustomDropdownV2 = ({
  options,
  onClickFC,
  anchorEl,
  setAnchorEl,
  vertical,
  horizontal,
}: Props): React.ReactElement => {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CustomDropdownV2Styled>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ borderRadius: 30 }}
        anchorOrigin={{
          vertical: vertical ? vertical : "bottom",
          horizontal: horizontal ? horizontal : "center",
        }}
      >
        {options.map((option) => (
          <MenuItem
            onClick={() => onClickFC(option.id)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "space-between",
            }}
            key={option.id}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </CustomDropdownV2Styled>
  );
};

export default CustomDropdownV2;
