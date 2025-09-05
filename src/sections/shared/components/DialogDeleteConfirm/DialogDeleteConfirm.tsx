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
import getDialogText from "./utils/getDialogText/getDialogText";
import SuccessFeedback from "../Feedbacks/components/SuccessFeedback/SuccessFeedback";
import { CollabActionTypes } from "modules/collabs/domain/Collabs";
import CollabsRejectedReasons from "sections/collabs/components/CollabsRejectedReasons/CollabsRejectedReasons";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";
import { useState } from "react";
import { TextField, Box } from "@mui/material";

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
  accept_state_id?: number;
  type?: string;
  successText?: string;
  onAccept?: (
    sectionId: number,
    reason?: number,
    reasonText?: string,
    notes?: string,
  ) => void;
}

export default function DialogDeleteConfirm({
  open,
  handleClose,
  sectionId,
  pageName,
  type,
  accept_state_id,
  successText,
  onAccept,
}: DialogDeleteConfirmProps) {
  const [reason, setReason] = useState<number | undefined>(undefined);
  const [reasonText, setReasonText] = useState<string>("");
  const [companyNotes, setCompanyNotes] = useState<string>("");
  const { getFunctionForDialog, isSuccess } = useDialog();
  const { collabRejectedReasons } = useCollabsContext();

  const handleOnAccept = () => {
    if (onAccept) {
      onAccept(sectionId, reason, reasonText, companyNotes);
      setReason(undefined);
      setReasonText("");
      setCompanyNotes("");
      return;
    }
    getFunctionForDialog(
      sectionId,
      pageName,
      accept_state_id!,
      type,
      reason!,
      reasonText,
    );
  };

  const handleOnClose = () => {
    handleClose();
    setReason(undefined);
    setReasonText("");
    setCompanyNotes("");
  };

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
          <DialogContentText>{getDialogText(pageName, type)}</DialogContentText>
          {type === "modifyStateWithNotes" && (
            <Box sx={{ mt: 2 }}>
              <TextField
                id="company-notes-textarea"
                label="Comentario"
                multiline
                rows={4}
                value={companyNotes}
                onChange={(e) => setCompanyNotes(e.target.value)}
                placeholder="Escribe un comentario para el cliente (opcional)"
                variant="outlined"
                fullWidth
                helperText={`${companyNotes.length}/1000 caracteres`}
                error={companyNotes.length > 1000}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {type === CollabActionTypes.refuse && (
            <CollabsRejectedReasons
              rejectedReasons={collabRejectedReasons}
              reason={reason || 0}
              setReason={setReason}
              reasonText={reasonText}
              setReasonText={setReasonText}
            />
          )}
          <Button
            onClick={handleOnAccept}
            sx={{ color: "#000", fontWeight: 700 }}
            disabled={
              type === "modifyStateWithNotes" && companyNotes.length > 1000
            }
          >
            {isSuccess ? (
              <SuccessFeedback text={successText || "Borrado"} />
            ) : (
              "Aceptar"
            )}
          </Button>

          <Button
            onClick={handleOnClose}
            sx={{ color: "#000", fontWeight: 700 }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
