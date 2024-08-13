import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

import Typography from "@mui/material/Typography";
import { State } from "modules/collabs/domain/Collabs";

interface Props {
  steps: State[];
}

export default function ReusableStepper({ steps }: Props) {
  const activeStep = steps?.length - 1;

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps?.map((step) => (
          <Step key={step.id}>
            <StepLabel>{step.name}</StepLabel>
            <StepContent>
              <Typography sx={{ fontWeight: 700, fontSize: "small" }}>
                {step.type}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
