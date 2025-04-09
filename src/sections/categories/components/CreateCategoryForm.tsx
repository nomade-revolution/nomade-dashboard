import { Field, ErrorMessage, Formik } from "formik";
import { Category } from "modules/categories/domain";
import ReusableFormStyled from "assets/styles/ReusableFormStyled";
import { Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
  allCategories: Category[];
  setIsModalOpen: (isOpen: boolean) => void;
  onSubmit: (values: { name: string; parentCategories: number[] }) => void;
}

const CreateCategoryForm = ({
  allCategories,
  setIsModalOpen,
  onSubmit,
}: Props): React.ReactElement => {
  const [parentCategories, setParentCategories] = useState<number[]>([]);
  const handleSubmit = async (values: { name: string }) => {
    onSubmit({ name: values.name, parentCategories });
  };

  return (
    <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
      {({ errors, touched, handleSubmit, getFieldProps, isSubmitting }) => (
        <ReusableFormStyled onSubmit={handleSubmit} className="datasheet-form">
          <h3>Nueva categoría</h3>
          <section
            className="datasheet-form__section"
            style={{ marginBottom: "20px" }}
          >
            <div className="form-subsection">
              <label htmlFor="name" className="form-subsection__label">
                Nombre
              </label>
              <Field
                type="text"
                id="name"
                className="form-subsection__field-large"
                aria-label="Nombre"
                {...getFieldProps("name")}
              />
              {errors.name && touched.name && (
                <ErrorMessage
                  className="form-subsection__error-message"
                  component="span"
                  name="name"
                />
              )}
            </div>
          </section>
          <section className="datasheet-form__section">
            <div className="form-subsection">
              <label
                htmlFor="name"
                className="form-subsection__label"
                style={{ marginBottom: "10px" }}
              >
                Categoría superior
              </label>
              {allCategories.map((category) => (
                <div key={category.id}>
                  <label
                    style={{ gap: 5, display: "flex", flexDirection: "row" }}
                  >
                    <Checkbox
                      checked={parentCategories.includes(category.id)}
                      value={category.id}
                      key={category.id}
                      style={{
                        padding: 0,
                      }}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setParentCategories([
                            ...parentCategories,
                            category.id,
                          ]);
                        } else {
                          setParentCategories(
                            parentCategories.filter(
                              (cat) => cat !== category.id,
                            ),
                          );
                        }
                      }}
                    />
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </section>
          <div
            style={{
              display: "flex",
              gap: "10px",
              width: "100%",
              marginTop: "30px",
              // justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              type="submit"
              className="datasheet-form__submit"
              disabled={isSubmitting}
            >
              Guardar
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className={"datasheet-form__error"}
            >
              Cancelar
            </button>
          </div>
        </ReusableFormStyled>
      )}
    </Formik>
  );
};

export default CreateCategoryForm;
