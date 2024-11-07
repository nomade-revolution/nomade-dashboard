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

  const [types_id, setTypesId] = useState<string[]>(
    contacts.map((contact) => contact.type_id.toString()),
  );

  const formRefs = useRef<FormikProps<Contact>[]>([]);

  const handleAddContactForm = () => {
    setContactForms([...contactForms, { ...initialState }]);
    setTypesId([...types_id, "0"]);
  };

  const handleSaveContacts = () => {
    const updatedContacts = formRefs.current.map((formik) => formik.values);

    const contacts = updatedContacts.map((contact, index) => ({
      ...contact,
      type_id: +types_id[index],
    }));

    setContacts(contacts);
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
      setTypesId(contacts.map((contact) => contact.type_id.toString()));
    }
  }, [contacts]);

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
            <form className="datasheet-form__contact">
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
                {errors.name && touched.name && <ErrorMessage name="name" />}
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
                  <ErrorMessage name="surname" />
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
                {errors.email && touched.email && <ErrorMessage name="email" />}
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
                {errors.phone && touched.phone && <ErrorMessage name="phone" />}
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
                  options={contact_types.map((type) => ({
                    id: type.id,
                    name: type.name,
                    value: type.id,
                  }))}
                  value={types_id[index]}
                  setValue={(value) => handleSelectChange(index, value)}
                />
              </div>
            </form>
          )}
        </Formik>
      ))}
      <section className="datasheet-form__btns">
        <button
          onClick={handleAddContactForm}
          className="datasheet-form__add-contact"
        >
          Añadir contacto
        </button>
        <button
          onClick={handleSaveContacts}
          className="datasheet-form__save-contact"
        >
          Guardar contactos
        </button>
      </section>
    </ReusableFormStyled>
  );
};

export default ContactForm;
