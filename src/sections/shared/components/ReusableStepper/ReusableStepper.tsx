import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import StepIcon from "@mui/material/StepIcon";
import Typography from "@mui/material/Typography";
import {
  CollabActionTypes,
  CollabType,
  FullCollab,
  State,
} from "modules/collabs/domain/Collabs";
import { styled } from "@mui/material/styles";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { MdOutlineHistory } from "react-icons/md";
import ReusableStepperStyled from "./ReusableStepperStyled";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { useState } from "react";
import * as collabStates from "../../../collabs/utils/collabsStates";
import useActions from "sections/shared/hooks/useActions/useActions";
import DialogDeleteConfirm from "../DialogDeleteConfirm/DialogDeleteConfirm";
import { SectionTypes } from "sections/shared/interfaces/interfaces";

interface Props {
  steps: State[];
  setCollabStateActionType: (value: CollabActionTypes) => void;
  collab: FullCollab;
  collabStateActionType: CollabActionTypes;
}

const CustomStepIcon = styled(StepIcon)(() => ({
  color: "#8C9B6E",
  "&.Mui-completed": {
    color: "#8C9B6E",
  },
  "&.Mui-active": {
    color: "#8C9B6E",
  },
}));

export default function ReusableStepper({
  steps,
  setCollabStateActionType,
  collab,
  collabStateActionType,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const activeStep = steps?.length - 1;
  const { user } = useAuthContext();
  const { handleCollabStateUpdate } = useActions();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const lastStep = steps && steps.length > 0 ? steps[steps.length - 1] : null;
  const state_id = lastStep ? lastStep.id : null;
  const state_type = lastStep ? lastStep.type : null;

  return (
    <ReusableStepperStyled className="stepper">
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps?.map((step) => (
            <Step key={step.id}>
              <StepLabel StepIconComponent={CustomStepIcon}>
                {step.name}
              </StepLabel>
              <StepContent>
                <Typography sx={{ fontWeight: 700, fontSize: "small" }}>
                  {step.type}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
      {user.type === "Company" &&
        state_id !== collabStates.COLAB_CANCELLED_STATE &&
        state_id !== collabStates.COLAB_REJECTED_STATE &&
        state_id !== collabStates.COLAB_SENT_STATE && (
          <div className="stepper__btn-container">
            <button
              className="stepper__state-btn"
              onClick={handleClick}
              type="button"
            >
              Acciones <MdOutlineHistory size={20} />
            </button>
          </div>
        )}
      <CustomDropdown
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        onClickFC={(selectedStateId) => {
          handleCollabStateUpdate(
            selectedStateId,
            setIsDialogOpen,
            setCollabStateActionType,
            collab,
          );
        }}
        options={collabStates
          .getCollabStates(state_id!, state_type!)
          .filter((state) => state.type === CollabType.company)}
      />
      <DialogDeleteConfirm
        handleClose={() => setIsDialogOpen(false)}
        open={isDialogOpen}
        pageName={SectionTypes.collabs}
        sectionId={collab?.id}
        type={collabStateActionType}
        accept_state_id={
          collab?.history &&
          collab?.history[collab.history?.length - 1].id ===
            collabStates.COLAB_PENDING_NOMADE_STATE
            ? collabStates.COLAB_PENDING_COMPANY_STATE
            : collabStates.COLAB_ACCEPTED_STATE
        }
      />
    </ReusableStepperStyled>
  );
}
