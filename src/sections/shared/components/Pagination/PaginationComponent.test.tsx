import { renderRouterWithProviders } from "../../utils/testUtils/testUtils";
import PaginationComponent from "./PaginationComponent";
import { screen } from "@testing-library/react";

describe("Given the Pagination component", () => {
  describe("When it is rendered with current_page=1 last_page=21 and per_page=5", () => {
    test("Then it should render a Pagination component with the same props", () => {
      const expectedAreaLableText = "Go to next page";
      const current_page = 1;
      const last_page = 21;

      renderRouterWithProviders(
        <PaginationComponent
          current_page={current_page}
          last_page={last_page}
          pageName="orders"
          filterParams=""
        />,
      );

      const renderedPageButton = screen.getByLabelText(expectedAreaLableText);

      expect(renderedPageButton).toBeInTheDocument();
    });
  });
});
