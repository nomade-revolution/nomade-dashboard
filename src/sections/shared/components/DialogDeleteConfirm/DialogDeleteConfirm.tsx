import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { GoAlert } from "react-icons/go";
import useDialogDelete from "sections/shared/hooks/useDialogDelete/useDialogDelete";
import getDialogText from "./utils/getDialogText/getDialogText";
import SuccessFeedback from "../Feedbacks/components/SuccessFeedback/SuccessFeedback";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DialogDeleteConfirmProps {
  open: boolean;
  handleClose: () => void;
  sectionId: number;
  pageName: string;
}

export default function DialogDeleteConfirm({
  open,
  handleClose,
  sectionId,
  pageName,
}: DialogDeleteConfirmProps) {
  const { getFunctionToDelete, isSuccess } = useDialogDelete();

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        sx={{}}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <GoAlert />
          Alerta
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{getDialogText(pageName)}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => getFunctionToDelete(sectionId, pageName)}
            sx={{ color: "#000", fontWeight: 700 }}
          >
            {isSuccess ? <SuccessFeedback text="Borrado" /> : "Aceptar"}
          </Button>

          <Button onClick={handleClose} sx={{ color: "#000", fontWeight: 700 }}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
