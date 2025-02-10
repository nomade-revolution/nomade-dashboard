import { Fragment } from "react";
// import {collab} from "./mock";
import { Props, State } from "./interfaces";
import { ERROR_STATES } from "./constants";
import { FaCheck } from "react-icons/fa";

const getCircleStyle = (step: State, isNextStepEmptyId: number) => {
  // Si el estado es de error y es el último estado, se pone en rojo
  // Si el estado es futuro al último estado, se pone en gris
  // Si el estado es menor al último estado, se pone en verde
  const styles = collabsStateTimeLineStyles;

  const isError = ERROR_STATES.includes(step.id);

  if (isError || step.id === isNextStepEmptyId) {
    return { ...styles.circle, ...styles.circleError };
  }

  const isCompleted = step.created_at;

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
) => {
  const styles = collabsStateTimeLineStyles;

  // TODO esto creo que por ahora lo ocultamos en web
  //   if (isNextStep) {
  //     return <p style={styles.errorText}>Pendiente</p>;
  //   }
  if (step?.reason) {
    return <span style={styles.errorText}> - {step.reason}</span>;
  }

  if (step?.created_at) {
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
          const renderCheck =
            step.created_at && !ERROR_STATES.includes(step.id);

          return (
            <Fragment key={index}>
              <div key={index} style={styles.stepContainer}>
                <div style={styles.leftSection}>
                  <div style={styles.circleAndLineContainer}>
                    <div style={{ ...getCircleStyle(step, nextStep?.id || 0) }}>
                      <>
                        {renderCheck && (
                          <FaCheck size={10} color="white" />
                          // color={lightTheme.colors.background}
                        )}
                      </>
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
                  <>
                    <p style={styles.label}>{step?.name}</p>
                    <p style={styles.subLabel}>
                      {step?.type}
                      {getLeftContent(
                        step,
                        // (nextStep?.id || 0) === step.id,
                        index,
                        isCompany,
                      )}
                      {step.limit_date ? (
                        <p style={styles.errorText}>
                          Fecha límite: {step.limit_date}
                        </p>
                      ) : null}
                    </p>
                  </>
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
    marginTop: -8,
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
    marginRight: -1.5,
  },
  circlePending: {
    width: 10,
    height: 10,
    backgroundColor: "#C8C7CC",
    marginTop: 0,
  },
  circleError: {
    width: 10,
    height: 10,
    marginRight: -1.5,
    backgroundColor: "#7B3C47",
  },
  circleCompleted: {
    backgroundColor: "#9AAC79",
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
};

export default CollabsStateTimelineV2;
