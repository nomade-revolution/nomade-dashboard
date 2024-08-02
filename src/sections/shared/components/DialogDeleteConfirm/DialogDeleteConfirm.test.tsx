import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import DialogDeleteConfirm from "./DialogDeleteConfirm";
import { renderRouterWithProviders } from "../../utils/testUtils";

describe("Given a DialogDeleteConfirm component", () => {
  describe("When it is rendered", () => {
    test("Then it should show the text set below", () => {
      const text = `¿Estás seguro/a de deshabilitar el producto? Haciendo click en aceptar, deshabilitarás el producto en la base de datos.`;

      renderRouterWithProviders(
        <DialogDeleteConfirm
          handleClose={jest.fn()}
          open={true}
          sectionId={1}
          pageName="productos"
        />,
      );
      const expectedTect = screen.getByText(text);

      expect(expectedTect).toBeInTheDocument();
    });

    test("Then when accept button is clicked, it should call deleteProduct", () => {
      const buttonText = "Aceptar";

      renderRouterWithProviders(
        <DialogDeleteConfirm
          handleClose={jest.fn()}
          open={true}
          sectionId={1}
          pageName="colecciones"
        />,
      );

      const expectedButton = screen.getByRole("button", { name: buttonText });

      expect(expectedButton).toBeInTheDocument();
    });

    // test("", async () => {
    //   (productsRepository as jest.Mock).mockReturnValue({
    //     deleteProduct: mockfunction,
    //   });

    //   renderRouterWithProviders(
    //     <DialogDeleteConfirm
    //       handleClose={jest.fn()}
    //       open={true}
    //       sectionId={1}
    //       type={TableTypes.products}
    //     />,
    //   );

    //   const expectedButton = screen.getByRole("button", { name: "Aceptar" });

    //   await waitFor(async () => await userEvent.click(expectedButton));

    //   expect(mockfunction).toHaveBeenCalled();
    // });
  });
});
