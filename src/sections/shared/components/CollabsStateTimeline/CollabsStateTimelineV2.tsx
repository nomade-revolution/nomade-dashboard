import { Fragment } from "react";
import theme from "assets/styles/theme";
// import {collab} from "./mock";
import { Props, State } from "./interfaces";
import { ERROR_STATES } from "./constants";
import { FaCheck } from "react-icons/fa";
import { COLAB_PENDING_COMPANY_STATE } from "sections/collabs/utils/collabsStates";

/**
 * INVESTIGATION REPORT: "Estados" Timeline Shows All Steps as Completed
 *
 * ROOT CAUSE: The completion logic incorrectly assumes that any step with a
 * `created_at` timestamp is completed. However, the backend now sends timestamps
 * for ALL steps (including future ones), causing every step to appear completed.
 *
 * PREVIOUS LOGIC (working): Used `activeStep={collab.state.id}` to only mark
 * steps <= current state as completed.
 *
 * CURRENT LOGIC (broken): `const isCompleted = step.created_at` marks any
 * step with a timestamp as completed.
 *
 * DATA FLOW:
 * - API: GET /colabs/{id} → returns collab with history array
 * - Repository: CollabsRepository.getCollab()
 * - Component: CollabsStateTimelineV2 receives collab.history
 * - Rendering: Each step checks `step.created_at` for completion
 *
 * FIX OPTIONS:
 * 1. Change completion rule from "timestamp exists" to "step.id <= collab.state.id"
 * 2. Use explicit BE status enum to mark only steps ≤ current status as completed
 * 3. If BE returns timestamps for all steps, rely on collab.state.id instead
 *
 * CHANGE HISTORY:
 * - 3f00899 (Feb 10, 2025): New timeline component added, replacing old stepper
 * - 859d458 (Dec 12, 2024): Previous stepper used activeStep={collab.state.id}
 *
 * ACCEPTANCE CRITERIA:
 * - Only steps up to current collab.state.id should appear completed
 * - Future steps should appear as pending (gray circles)
 * - Current step should be highlighted appropriately
 */

const getCircleStyle = (step: State, currentStateId: number) => {
  // Si el estado es de error y es el último estado, se pone en rojo
  // Si el estado es futuro al último estado, se pone en gris
  // Si el estado es menor al último estado, se pone en verde
  const styles = collabsStateTimeLineStyles;

  const isError = ERROR_STATES.includes(step.id);

  // Completed states should always render with completed style, even if they are also "nextStepEmpty"
  const isCompleted = step.id <= currentStateId;
  if (isCompleted) {
    return { ...styles.circle, ...styles.circleCompleted };
  }

  // Non-completed error states use error style
  if (isError) {
    return { ...styles.circle, ...styles.circleError };
  }

  // For the next empty step or any other future step, use pending style
  return { ...styles.circle, ...styles.circlePending };
};

const getLeftContent = (
  step: State,
  //   isNextStep: boolean,
  index: number,
  isCompany: boolean,
  currentStateId: number,
) => {
  const styles = collabsStateTimeLineStyles;

  // TODO esto creo que por ahora lo ocultamos en web
  //   if (isNextStep) {
  //     return <p style={styles.errorText}>Pendiente</p>;
  //     }

  const contentParts = [];

  // Add timestamp first if user has permission and step is completed
  if (step?.created_at && step.id <= currentStateId) {
    if (!(isCompany && index === 0)) {
      contentParts.push(
        <span key="timestamp" style={styles.date}>
          {" "}
          - {step.created_at}
        </span>,
      );
    }
  }

  // Add reason on new line if it exists
  if (step?.reason) {
    contentParts.push(
      <>
        <br />
        <span key="reason" style={{ ...styles.errorText, marginTop: 5 }}>
          {step.rejected_colab_reason_text ? (
            <>
              {step.reason}
              <br />
              <span style={styles.errorReasonText}>
                {`${step.rejected_colab_reason_text}`}
              </span>
            </>
          ) : (
            step.reason
          )}
        </span>
      </>,
    );
  }

  // Return combined content or null if nothing to show
  return contentParts.length > 0 ? <>{contentParts}</> : null;
};

const CollabsStateTimelineV2 = ({ collab, isCompany }: Props) => {
  const styles = collabsStateTimeLineStyles;

  if (!collab || !collab.history) return null;

  // Determine the next step if needed in future (currently unused after logic fix)
  // const nextStep = collab?.history.find((step) => !step.created_at);

  return (
    <div>
      {/* <p style={styles.collabsStatesTitle}>Estado de la collab</p> */}

      <div style={styles.container}>
        {collab.history.map((step, index) => {
          // FIX: Change completion logic from timestamp-based to state-based
          // Previous: const renderCheck = step.created_at && !ERROR_STATES.includes(step.id);
          // Current: const renderCheck = step.id <= collab.state?.id && !ERROR_STATES.includes(step.id);
          const renderCheck =
            step.id <= (collab.state?.id || 0) &&
            !ERROR_STATES.includes(step.id);

          return (
            <Fragment key={index}>
              <div key={index} style={styles.stepContainer}>
                <div style={styles.leftSection}>
                  <div style={styles.circleAndLineContainer}>
                    <div
                      style={{
                        height: 20,
                        width: 20,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          ...getCircleStyle(step, collab.state?.id || 0),
                        }}
                      >
                        <>
                          {renderCheck && (
                            <FaCheck size={10} color="white" />
                            // color={lightTheme.colors.background}
                          )}
                        </>
                      </div>
                    </div>
                    {
                      // Si no es el último estado, se pone una línea
                      index !== collab.history.length - 1 && (
                        <div style={styles.line} />
                      )
                    }
                  </div>
                </div>
                <div style={styles.rightSection}>
                  <p style={styles.label}>
                    {step?.id === COLAB_PENDING_COMPANY_STATE && renderCheck
                      ? "Solicitud revisada"
                      : step?.name}
                  </p>
                  <p style={styles.subLabel}>
                    {step?.type}
                    {getLeftContent(
                      step,
                      // (nextStep?.id || 0) === step.id,
                      index,
                      isCompany,
                      collab.state?.id || 0,
                    )}
                    {step.limit_date ? (
                      <p style={styles.errorText}>
                        Fecha límite: {step.limit_date}
                      </p>
                    ) : null}
                  </p>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

const collabsStateTimeLineStyles: { [key: string]: React.CSSProperties } = {
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 20,
  },
  stepContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  leftSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightSection: {
    flex: 1,
    marginTop: -10,
  },
  dateContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 10,
    marginLeft: 15,
    marginTop: 5,
  },
  date: {
    color: "#333333",
    textAlign: "right",
    fontSize: "small",
    marginTop: 5,
  },
  //   nextStepLimitDate: {
  //     color: "#7B3C47",
  //     textAlign: "left",
  //     fontWeight: "bold",
  //     fontSize: 12,
  //   },
  circleAndLineContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 20,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "#C8C7CC",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  circlePending: {
    width: 10,
    height: 10,
    backgroundColor: "#C8C7CC",
  },
  circleError: {
    width: 10,
    height: 10,
    backgroundColor: "#CCF663",
  },
  circleCompleted: {
    backgroundColor: theme.colors.outerSpace,
    width: 20,
    height: 20,
  },
  label: {
    marginLeft: 10,
    color: "#333333",
    fontSize: "0.875rem",
  },
  subLabel: {
    marginLeft: 10,
    color: "#333333",
    fontWeight: "bold",
    fontSize: "small",
  },
  line: {
    width: 1,
    height: 30,
    borderColor: "#bdbdbd",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderRadius: 1,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  collabsStatesTitle: {
    textAlign: "center",
    marginTop: 20,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  errorText: {
    color: "#7B3C47",
    // textAlign: "left",
    fontSize: "small",
    fontWeight: "bold",
    paddingTop: 10,
  },
  errorReasonText: {
    color: "#7B3C47",
    // textAlign: "left",
    fontSize: "small",
    fontWeight: "normal",
  },
};

export default CollabsStateTimelineV2;
