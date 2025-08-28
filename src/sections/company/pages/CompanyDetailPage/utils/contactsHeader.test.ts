import contactsHeader from "./contactsHeader";
import { SectionTypes } from "sections/shared/interfaces/interfaces";

describe("contactsHeader", () => {
  test("should have the correct structure with all required columns", () => {
    expect(contactsHeader).toHaveLength(5);

    // Check Nombre column
    expect(contactsHeader[0]).toEqual({
      id: 1,
      name: "Nombre",
      property: "name",
      sortTag: "",
      pageName: SectionTypes.users,
    });

    // Check Apellido column (new)
    expect(contactsHeader[1]).toEqual({
      id: 2,
      name: "Apellido",
      property: "surname",
      sortTag: "",
      pageName: SectionTypes.users,
    });

    // Check Email column
    expect(contactsHeader[2]).toEqual({
      id: 3,
      name: "Email",
      property: "email",
      sortTag: "",
      pageName: "",
    });

    // Check Teléfono column
    expect(contactsHeader[3]).toEqual({
      id: 4,
      name: "Teléfono",
      property: "phone",
      sortTag: "",
      pageName: "",
    });

    // Check Tipo column
    expect(contactsHeader[4]).toEqual({
      id: 5,
      name: "Tipo",
      property: "type",
      sortTag: "",
      pageName: "",
    });
  });

  test("should have unique IDs for all columns", () => {
    const ids = contactsHeader.map((header) => header.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(contactsHeader.length);
  });

  test("should have the Apellido column positioned after Nombre", () => {
    const nombreIndex = contactsHeader.findIndex(
      (header) => header.name === "Nombre",
    );
    const apellidoIndex = contactsHeader.findIndex(
      (header) => header.name === "Apellido",
    );

    expect(nombreIndex).toBe(0);
    expect(apellidoIndex).toBe(1);
    expect(apellidoIndex).toBe(nombreIndex + 1);
  });
});
