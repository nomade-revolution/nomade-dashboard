import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GoAlert } from "react-icons/go";
import { VersionFlag } from "modules/versions/domain/VersionRepository";
import {
  getVersionFlagConfirmText,
  LATEST_VERSION_REQUIRED_WARNING,
} from "../utils/versionFlagCopy";

interface VersionFlagConfirmDialogProps {
  open: boolean;
  versionLabel: string;
  flag: VersionFlag | null;
  nextValue: boolean;
  showLatestWarning: boolean;
  confirming: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const VersionFlagConfirmDialog = ({
  open,
  versionLabel,
  flag,
  nextValue,
  showLatestWarning,
  confirming,
  onCancel,
  onConfirm,
}: VersionFlagConfirmDialogProps): React.ReactElement => {
  const message = flag
    ? getVersionFlagConfirmText(versionLabel, flag, nextValue)
    : "";

  return (
    <Dialog
      open={open}
      onClose={confirming ? undefined : onCancel}
      aria-labelledby="version-flag-dialog-title"
    >
      <DialogTitle
        id="version-flag-dialog-title"
        sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        <GoAlert />
        Confirmar cambio
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        {showLatestWarning && (
          <DialogContentText
            sx={{ mt: 2, fontWeight: 700, color: "#e57c00" }}
            role="note"
          >
            {LATEST_VERSION_REQUIRED_WARNING}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          disabled={confirming}
          sx={{ color: "#000", fontWeight: 700 }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          disabled={confirming || !flag}
          sx={{ color: "#000", fontWeight: 700 }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VersionFlagConfirmDialog;
