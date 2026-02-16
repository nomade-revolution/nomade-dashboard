import { Formik, Field, ErrorMessage, FormikProps } from "formik";
import ReusableSelect from "../ReusableSelect/ReusableSelect";
import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { useEffect, useRef, useState } from "react";

import { Contact, ContactType } from "modules/contact/domain/Contact";
import { contactSchema } from "./validations/validations";

interface Props {
  setContacts: (value: Contact[]) => void;
  contacts: Contact[];
  setIsModalOpen: (value: boolean) => void;
  contact_types: ContactType[];
}

const initialState: Contact = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  type: "",
  type_id: 0,
};

const ContactForm = ({
  contacts,
  setContacts,
  setIsModalOpen,
  contact_types,
}: Props): React.ReactElement => {
  const [contactForms, setContactForms] = useState<Contact[]>(
    contacts.length > 0 ? contacts : [{ ...initialState }],
  );

  const [types_id, setTypesId] = useState<string[]>(() =>
    contacts.map((contact) => {
      const matchingType = contact_types.find(
        (type) => type.name === contact.type,
      );
      return matchingType ? matchingType.id.toString() : "0";
    }),
  );

  const formRefs = useRef<FormikProps<Contact>[]>([]);

  const handleAddContactForm = () => {
    setContactForms([...contactForms, { ...initialState }]);
    setTypesId([...types_id, "0"]);
  };

  const handleRemoveContactForm = (indexToRemove: number) => {
    setContactForms((prev) => prev.filter((_, i) => i !== indexToRemove));
    setTypesId((prev) => prev.filter((_, i) => i !== indexToRemove));
    formRefs.current.splice(indexToRemove, 1);
  };

  const handleSaveContacts = async () => {
    let isValid = true;

    // Filtramos formularios válidos (no nulos)
    const activeRefs = formRefs.current.filter(
      (ref): ref is FormikProps<Contact> => ref !== null,
    );

    // Validamos todos los formularios
    for (const formik of activeRefs) {
      const errors = await formik.validateForm();

      formik.setTouched(
        {
          name: true,
          surname: true,
          email: true,
          phone: true,
          type_id: true,
        },
        true,
      );

      if (Object.keys(errors).length > 0) {
        isValid = false;
      }
    }

    if (!isValid) return;

    // Extraemos los valores solo de los formularios válidos
    const updatedContacts = activeRefs.map((formik, index) => ({
      ...formik.values,
      type_id: +types_id[index],
    }));

    setContacts(updatedContacts);
    setIsModalOpen(false);
  };

  const handleSelectChange = (index: number, value: string) => {
    setTypesId((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  useEffect(() => {
    if (contacts.length > 0) {
      setContactForms(contacts);

      setTypesId(
        contacts.map((contact) => {
          if (contact.type_id) {
            return contact.type_id.toString();
          }

          const matchingType = contact_types.find(
            (type) => type.name === contact.type,
          );
          return matchingType ? matchingType.id.toString() : "0";
        }),
      );
    }
  }, [contacts, contact_types]);

  const filteredContactTypes = contact_types.filter(
    (type) => type.name.toLowerCase() !== "usuario app",
  );

  return (
    <ReusableFormStyled
      className="contact-form-modal"
      $isMultiple={contacts.length > 0}
    >
      <h3>Gestión de Contactos</h3>
      {contactForms.map((contact, index) => (
        <Formik
          key={index}
          innerRef={(ref) => (formRefs.current[index] = ref!)}
          initialValues={contact}
          validationSchema={contactSchema}
          onSubmit={() => {}}
        >
          {({ getFieldProps, errors, touched }) => (
            <div className="datasheet-form__contact">
              <div className="form-subsection">
                <label
                  htmlFor={`name-${index}`}
                  className="form-subsection__label"
                >
                  Nombre
                </label>
                <Field
                  type="text"
                  id={`name-${index}`}
                  className="form-subsection__field-large"
                  {...getFieldProps("name")}
                />
                {errors.name && touched.name && (
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="form-subsection__error-message"
                  />
                )}
              </div>
              <div className="form-subsection">
                <label
                  htmlFor={`surname-${index}`}
                  className="form-subsection__label"
                >
                  Apellidos
                </label>
                <Field
                  type="text"
                  id={`surname-${index}`}
                  className="form-subsection__field-large"
                  {...getFieldProps("surname")}
                />
                {errors.surname && touched.surname && (
                  <ErrorMessage
                    name="surname"
                    component="span"
                    className="form-subsection__error-message"
                  />
                )}
              </div>
              <div className="form-subsection">
                <label
                  htmlFor={`email-${index}`}
                  className="form-subsection__label"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id={`email-${index}`}
                  className="form-subsection__field-large"
                  {...getFieldProps("email")}
                />
                {errors.email && touched.email && (
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="form-subsection__error-message"
                  />
                )}
              </div>
              <div className="form-subsection">
                <label
                  htmlFor={`phone-${index}`}
                  className="form-subsection__label"
                >
                  Teléfono
                </label>
                <Field
                  type="phone"
                  id={`phone-${index}`}
                  className="form-subsection__field-large"
                  {...getFieldProps("phone")}
                />
                {errors.phone && touched.phone && (
                  <ErrorMessage
                    name="phone"
                    component="span"
                    className="form-subsection__error-message"
                  />
                )}
              </div>
              <div className="form-subsection">
                <label
                  htmlFor={`type_id-${index}`}
                  className="form-subsection__label"
                >
                  Tipo de Contacto
                </label>
                <ReusableSelect
                  label="Tipos"
                  options={filteredContactTypes.map((type) => ({
                    id: type.id,
                    name: type.name,
                    value: type.id,
                  }))}
                  value={types_id[index]}
                  setValue={(value) => {
                    handleSelectChange(index, value);
                    formRefs.current[index].setFieldValue("type_id", value);
                  }}
                />
                {errors.type_id && touched.type_id && (
                  <ErrorMessage
                    name="type_id"
                    component="span"
                    className="form-subsection__error-message"
                  />
                )}
              </div>
              {contactForms.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveContactForm(index)}
                  className="datasheet-form__remove-contact"
                  style={{
                    marginTop: "1rem",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Eliminar contacto
                </button>
              )}
            </div>
          )}
        </Formik>
      ))}
      <section className="datasheet-form__btns">
        <button
          type="button"
          onClick={handleAddContactForm}
          className="datasheet-form__add-contact"
        >
          Añadir contacto
        </button>
        <button
          type="button"
          onClick={handleSaveContacts}
          className="datasheet-form__save-contact"
        >
          Guardar cambios
        </button>
      </section>
    </ReusableFormStyled>
  );
};

export default ContactForm;
