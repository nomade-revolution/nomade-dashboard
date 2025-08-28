import { Fragment } from "react";
// import {collab} from "./mock";
import { Props, State } from "./interfaces";
import { ERROR_STATES } from "./constants";
import { FaCheck } from "react-icons/fa";

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

const getCircleStyle = (
  step: State,
  isNextStepEmptyId: number,
  currentStateId: number,
) => {
  // Si el estado es de error y es el último estado, se pone en rojo
  // Si el estado es futuro al último estado, se pone en gris
  // Si el estado es menor al último estado, se pone en verde
  const styles = collabsStateTimeLineStyles;

  const isError = ERROR_STATES.includes(step.id);

  if (isError || step.id === isNextStepEmptyId) {
    return { ...styles.circle, ...styles.circleError };
  }

  // FIX: Change completion logic from timestamp-based to state-based
  // Previous: const isCompleted = step.created_at; (❌ Any timestamp = completed)
  // Current: const isCompleted = step.id <= currentStateId; (✅ Only steps <= current state)
  const isCompleted = step.id <= currentStateId;

  if (isCompleted) {
    return { ...styles.circle, ...styles.circleCompleted };
  }

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
  if (step?.reason) {
    return (
      <span style={styles.errorText}>
        {" - "}
        {step.reason}{" "}
        {step.rejected_colab_reason_text ? (
          <>
            <br />
            <span style={styles.errorReasonText}>
              {`${step.rejected_colab_reason_text}`}
            </span>
          </>
        ) : (
          ""
        )}
      </span>
    );
  }

  // FIX: Only show timestamps for completed steps, not all steps with timestamps
  // Previous: if (step?.created_at) - showed timestamp for any step with created_at
  // Current: if (step?.created_at && step.id <= currentStateId) - only show for completed steps
  if (step?.created_at && step.id <= currentStateId) {
    if (isCompany && index === 0) return null;
    return <span style={styles.date}> - {step.created_at}</span>;
  }

  return null;
};

const CollabsStateTimelineV2 = ({ collab, isCompany }: Props) => {
  const styles = collabsStateTimeLineStyles;

  if (!collab || !collab.history) return null;

  const nextStep = collab?.history.find((step) => !step.created_at);

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
                          ...getCircleStyle(
                            step,
                            nextStep?.id || 0,
                            collab.state?.id || 0,
                          ),
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
                  <p style={styles.label}>{step?.name}</p>
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
    borderRadius: 15,
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
    backgroundColor: "#243c34",
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
  },
  errorReasonText: {
    color: "#7B3C47",
    // textAlign: "left",
    fontSize: "small",
    fontWeight: "normal",
  },
};

export default CollabsStateTimelineV2;
