import { CgClose } from "react-icons/cg";

export interface ChipProps {
  name: string;
  onClick: () => void;
  backgroundColor?: string;
}

const Chip = ({ name, onClick, backgroundColor = "#7F7F91" }: ChipProps) => {
  return (
    <div
      style={{
        borderRadius: 20,
        backgroundColor: backgroundColor,
        flexDirection: "row",
        display: "flex",
        gap: 5,
        padding: "0px 8px",
        alignItems: "center",
        width: "fit-content",
      }}
    >
      <span style={{ color: "#F6F6F8" }} key={name}>
        {name}
      </span>
      <CgClose
        onClick={onClick}
        color="#F6F6F8"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default Chip;
