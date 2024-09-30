import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import StepIcon from "@mui/material/StepIcon";
import Typography from "@mui/material/Typography";
import { State } from "modules/collabs/domain/Collabs";
import { styled } from "@mui/material/styles";

interface Props {
  steps: State[];
}

// Estilo personalizado para cambiar el color de fondo del icono de paso
const CustomStepIcon = styled(StepIcon)(() => ({
  color: "#8C9B6E", // Cambia el color de fondo del número
  "&.Mui-completed": {
    color: "#8C9B6E", // Para el paso completado
  },
  "&.Mui-active": {
    color: "#8C9B6E", // Para el paso activo
  },
}));

export default function ReusableStepper({ steps }: Props) {
  const activeStep = steps?.length - 1;

  return (
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
  );
}
