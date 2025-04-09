import { Http } from "@core";
import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { ErrorMessage, Field, Formik } from "formik";
import { CONTACT_NOMADE } from "modules/contactNomade/routes";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "sections/auth/AuthContext/useAuthContext";
import SuccessFeedback from "sections/shared/components/Feedbacks/components/SuccessFeedback/SuccessFeedback";
import * as yup from "yup";

const ContactNomadePage = () => {
  const { user } = useAuthContext();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (values: { comments: string }) => {
    try {
      await Http.getInstance().post(CONTACT_NOMADE, {
        user_id: Number(user.id),
        content: values.comments,
        type: "contact",
      });

      setIsSuccess(true);
    } catch (error) {
      setIsSuccess(false);
    }
  };

  return (
    <Formik
      initialValues={{ comments: "" }}
      validationSchema={yup.object().shape({
        comments: yup
          .string()
          .required("Este campo es obligatorio")
          .max(1000, "Máximo 1000 caracteres"),
      })}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleSubmit, getFieldProps, isSubmitting }) => (
        <ReusableFormStyled
          onSubmit={handleSubmit}
          className="datasheet-form"
          $isMultiple={false}
          style={{ padding: 40 }}
        >
          <h3>Contacto</h3>
          <section className="lead-form__section">
            <div className="form-subsection">
              <label htmlFor="comments" className="form-subsection__label">
                Déjanos tu mensaje y te responderemos lo antes posible{" "}
              </label>
              <Field
                as="textarea"
                id="comments"
                className="lead-form__field-textarea"
                aria-label="Comentarios"
                maxlength="1000"
                {...getFieldProps("comments")}
              />
              {errors.comments && touched.comments && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="comments"
                />
              )}
            </div>
          </section>

          <section className="datasheet-form__footer" style={{ marginTop: 30 }}>
            <button
              type="submit"
              className="datasheet-form__submit"
              disabled={isSubmitting}
            >
              Enviar
            </button>
            {isSuccess && (
              <SuccessFeedback text="Tu mensaje se ha enviado correctamente" />
            )}
          </section>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
              gap: 5,
            }}
          >
            <span
              style={{
                fontSize: 16,
                color: "#000",
              }}
            >
              Si lo prefieres, puedes contactarnos vía:
            </span>
            <Link
              to="mailto:info@nomaderevolution.com"
              target="_blank"
              className="lead-form__link"
              style={{
                alignSelf: "center",
              }}
            >
              <span
                style={{
                  color: "#D50000",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                info@nomaderevolution.com
              </span>
            </Link>
          </div>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default ContactNomadePage;
