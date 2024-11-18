import { Box, Modal } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

interface ReusableModalProps {
  openModal: boolean;
  setIsModalOpen: (value: boolean) => void;
  children: React.ReactNode;
  type?: string;
}

const ReusableModal = ({
  openModal,
  setIsModalOpen,
  children,
  type,
}: ReusableModalProps): React.ReactElement => {
  const handleClose = () => setIsModalOpen(false);
  const matches = useMediaQuery("(max-width:1000px)");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: type === "offer" && !matches ? "70%" : matches ? "90%" : "40%",
    height: type === "plan" ? "fit-content" : "80%",
    bgcolor: "background.paper",
    boxShadow: 24,
    padding: "20px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    overflowY: "scroll",
  };

  return (
    <div className="modal">
      <Modal
        open={openModal}
        onClose={handleClose}
        className="modal__container"
      >
        <Box className="modal__content" sx={style}>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default ReusableModal;
