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
import useDialog from "sections/shared/hooks/useDialog/useDialog";
import SuccessFeedback from "../Feedbacks/components/SuccessFeedback/SuccessFeedback";
import { useLeadsContext } from "sections/leads/LeadsContext/useLeadsContext";
import { useNavigate } from "react-router-dom";

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
  leadId: number;
}

export default function LeadDialog({
  open,
  handleClose,
  leadId,
}: DialogDeleteConfirmProps) {
  const { isSuccess } = useDialog();
  const { sendLinkForLead } = useLeadsContext();
  const navigate = useNavigate();
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
          <DialogContentText>{`¿Estás seguro/a de enviar este lead? Haciendo click en aceptar,
            enviarás el lead`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              await sendLinkForLead(leadId);
              handleClose();
              setTimeout(() => {
                navigate(0);
              }, 500);
            }}
            sx={{ color: "#000", fontWeight: 700 }}
            disabled={false}
          >
            {isSuccess ? <SuccessFeedback text="Cancelado" /> : "Enviado"}
          </Button>

          <Button onClick={handleClose} sx={{ color: "#000", fontWeight: 700 }}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
