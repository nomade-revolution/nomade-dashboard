import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { StepIconProps } from "@mui/material/StepIcon";
import Typography from "@mui/material/Typography";
import {
  CollabActionTypes,
  FullCollab,
  State,
} from "modules/collabs/domain/Collabs";
import { styled } from "@mui/material/styles";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import { MdOutlineHistory } from "react-icons/md";
import ReusableStepperStyled from "./ReusableStepperStyled";
import CustomDropdownV2 from "../CustomDropdownV2/CustomDropdownV2";
import { useState } from "react";
import * as collabStates from "../../../collabs/utils/collabsStates";
import DialogDeleteConfirm from "../DialogDeleteConfirm/DialogDeleteConfirm";
import { SectionTypes } from "sections/shared/interfaces/interfaces";
import { FaCheck } from "react-icons/fa6";
import ActionButton from "../ActionButton/ActionButton";
import { FaCheckCircle } from "react-icons/fa";
import theme from "assets/styles/theme";
import { useCollabsContext } from "sections/collabs/CollabsContext/useCollabsContext";

interface Props {
  steps: State[];
  setCollabStateActionType: (value: CollabActionTypes) => void;
  collab: FullCollab;
  collabStateActionType: CollabActionTypes;
}
const CustomStepIconRoot = styled("div")<{
  ownerState: { active?: boolean; completed?: boolean };
}>(({ theme, ownerState }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: ownerState.active || ownerState.completed ? "#8C9B6E" : "#ccc",
  "& .CustomStepIcon-completedIcon": {
    backgroundColor: theme ? "#8C9B6E" : "#8C9B6E",
    height: 20,
    width: 20,
    borderRadius: "50%",
    marginLeft: 2,
  },
  "& .CustomStepIcon-circle": {
    marginLeft: 7,
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <CustomStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? (
        <div
          className="CustomStepIcon-completedIcon"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaCheck color="white" size={10} />
        </div>
      ) : (
        <div className="CustomStepIcon-circle" />
      )}
    </CustomStepIconRoot>
  );
}

// const CustomStepIcon = styled(StepIcon)(() => ({
//   "&.Mui-completed": {
//     color: "#8C9B6E",
//   },
//   "&.Mui-active": {
//     color: "#8C9B6E",
//   },
// }));

export default function ReusableStepper({
  steps,
  setCollabStateActionType,
  collab,
  collabStateActionType,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedStateToModify, setSelectedStateToModify] = useState<
    number | null
  >(null);

  const { user } = useAuthContext();
  const { updateCollabState } = useCollabsContext();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleMarkAsPublicated = async () => {
    await updateCollabState(collab.id!, collabStates.COLAB_PUBLISHED_STATE);
  };

  const handleActionSelected = (state_id: number) => {
    setIsDialogOpen(true);
    setAnchorEl(null);
    setSelectedStateToModify(state_id);
    if (collabStates.COLAB_REJECTED_STATE === state_id) {
      setCollabStateActionType(CollabActionTypes.refuse);
    } else {
      setCollabStateActionType(CollabActionTypes.modifyState);
    }
    // TODO añadir el mismo modo que "rechazar" para "incidencia"
  };

  const handleOnAccept = async (id: number, reason?: number) => {
    if (!selectedStateToModify) return;
    await updateCollabState(id, selectedStateToModify, reason);
    setIsDialogOpen(false);
  };

  const allStatesOptions = collabStates.allCollabStatesOptions.filter(
    (state) => {
      if (!state.type) {
        return true;
      }
      return state.type === collab.type;
    },
  );

  return (
    <ReusableStepperStyled className="stepper">
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={collab.state?.id} orientation="vertical">
          {steps?.map((step) => (
            <Step key={step.id} active={collab.state.id === step.id}>
              <StepLabel StepIconComponent={CustomStepIcon}>
                {step.name}
              </StepLabel>
              <StepContent>
                <Typography sx={{ fontWeight: 700, fontSize: "small" }}>
                  {step.type} {step.created_at && "-"} {step.created_at}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
      {user.type !== "Company" && (
        /*collab.state?.id !== collabStates.COLAB_CANCELLED_STATE &&
        collab.state?.id !== collabStates.COLAB_REJECTED_STATE &&
        collab.state?.id !== collabStates.COLAB_SENT_STATE &&*/ <div
          className="stepper__btn-container"
          style={{ marginTop: "20px", display: "flex", gap: "20px" }}
        >
          <button
            className="stepper__state-btn"
            onClick={handleClick}
            type="button"
          >
            Acciones <MdOutlineHistory size={20} />
          </button>
          <ActionButton
            icon={<FaCheckCircle size={20} />}
            onClick={handleMarkAsPublicated}
            text="Marcar como publicado"
            color={theme.colors.softGreen}
          />
        </div>
      )}

      <CustomDropdownV2
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        onClickFC={(selectedStateId) => {
          handleActionSelected(selectedStateId);
        }}
        options={allStatesOptions}
      />

      <DialogDeleteConfirm
        handleClose={() => setIsDialogOpen(false)}
        open={isDialogOpen}
        onAccept={handleOnAccept}
        pageName={SectionTypes.collabs}
        sectionId={collab?.id}
        type={collabStateActionType}
        accept_state_id={
          collab.state?.id === collabStates.COLAB_PENDING_NOMADE_STATE
            ? collabStates.COLAB_PENDING_COMPANY_STATE
            : collabStates.COLAB_ACCEPTED_STATE
        }
      />
    </ReusableStepperStyled>
  );
}
