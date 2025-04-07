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
import { useEffect, useState } from "react";

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
  onAccept?: (sectionId: number, reason?: number, reasonText?: string) => void;
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
  const { getFunctionForDialog, isSuccess } = useDialog();
  const { collabRejectedReasons, getAllRejectedCollabReasons } =
    useCollabsContext();

  useEffect(() => {
    type === CollabActionTypes.refuse && getAllRejectedCollabReasons();
  }, [getAllRejectedCollabReasons, type]);

  const handleOnAccept = () => {
    if (onAccept) {
      onAccept(sectionId, reason, reasonText);
      setReason(undefined);
      setReasonText("");
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
            disabled={false}
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
