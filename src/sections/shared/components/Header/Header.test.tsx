import { screen } from "@testing-library/react";
import { renderRouterWithProviders } from "../../utils/testUtils/testUtils";
import Header from "./Header";
import { mockOffers } from "mocks/offersMocks";
import { mockUsers } from "mocks/userMocks";

describe("Given a Header component", () => {
  describe("When it is rendered", () => {
    test("Then it should show an image with the company logo", () => {
      renderRouterWithProviders(
        <Header
          badgeCountCompanies={1}
          badgeCountInfluencers={1}
          badgeCountUsers={1}
          badgeCountsLeads={1}
          offer={mockOffers[0]}
          user={mockUsers[0]}
        />,
      );

      const expectedImage = screen.getByRole("img");

      expect(expectedImage).toBeInTheDocument();
    });
  });
});
