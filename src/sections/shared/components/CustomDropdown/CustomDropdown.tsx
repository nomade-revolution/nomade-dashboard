import { Menu, MenuItem } from "@mui/material";
import { DropdownOption } from "sections/shared/interfaces/interfaces";
import CustomDropdownStyled from "./CustomDropDownStyled";
import * as collabStates from "sections/collabs/utils/collabsStates";

interface Props {
  options: DropdownOption[];
  anchorEl: null | HTMLElement;
  setAnchorEl: (value: null | HTMLElement) => void;
  onClickFC: (value: number) => void;
  vertical?: number | "center" | "bottom" | "top";
  horizontal?: number | "center" | "left" | "right";
}

const CustomDropdown = ({
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
    <CustomDropdownStyled>
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
              fontWeight: 700,
              color:
                option.id === collabStates.COLAB_ACCEPTED_STATE
                  ? "green"
                  : option.id === collabStates.COLAB_CANCELLED_STATE
                    ? "red"
                    : option.id === collabStates.COLAB_REJECTED_STATE
                      ? "darkred"
                      : option.id === collabStates.COLAB_SENT_STATE
                        ? "blue"
                        : "",
            }}
            key={option.id}
          >
            {option.isVisible && (
              <>
                {option.name}
                <option.icon />
              </>
            )}
          </MenuItem>
        ))}
      </Menu>
    </CustomDropdownStyled>
  );
};

export default CustomDropdown;
