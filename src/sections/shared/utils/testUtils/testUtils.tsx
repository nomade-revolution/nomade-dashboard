import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";
import { AuthContextProvider } from "../../../auth/AuthContext/AuthContext";
import theme from "../../../../assets/styles/theme";
import GlobalStyles from "../../../../assets/styles/GlobalStyles";
import { getComponentRouter, router } from "../../../../router/router";
import { RouterProvider } from "react-router-dom";
import { CollabsContextProvider } from "sections/collabs/CollabsContext/CollabsContext";
import { CompanyContextProvider } from "sections/company/CompanyContext/CompanyContext";
import { InfluencerContextProvider } from "sections/influencer/InfluencerContext/InfluencerContext";
import { OffersContextProvider } from "sections/offers/OffersContext/OffersContext";
import { UserContextProvider } from "sections/user/UserContext/UserContext";
import { repositories } from "../repositories/repositories";

export const renderWithProviders = (ui: React.ReactElement) => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    return (
      <AuthContextProvider repository={repositories.user}>
        <OffersContextProvider repository={repositories.offers}>
          <CollabsContextProvider repository={repositories.collabs}>
            <UserContextProvider repository={repositories.users}>
              <InfluencerContextProvider repository={repositories.influencers}>
                <CompanyContextProvider repository={repositories.companies}>
                  <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    {children}
                  </ThemeProvider>
                </CompanyContextProvider>
              </InfluencerContextProvider>
            </UserContextProvider>
          </CollabsContextProvider>
        </OffersContextProvider>
      </AuthContextProvider>
    );
  };

  return render(ui, { wrapper: Wrapper });
};

export const renderRouterWithProviders = (ui?: React.ReactElement) => {
  const routerWithProvider = ui ? getComponentRouter(ui) : router;

  return renderWithProviders(
    <RouterProvider router={routerWithProvider}></RouterProvider>,
  );
};
