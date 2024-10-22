import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";
import GlobalStyles from "./assets/styles/GlobalStyles.ts";
import theme from "./assets/styles/theme.ts";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import { AuthContextProvider } from "./sections/auth/AuthContext/AuthContext.tsx";
import { repositories } from "sections/shared/utils/repositories/repositories.ts";
import { OffersContextProvider } from "sections/offers/OffersContext/OffersContext.tsx";
import { CollabsContextProvider } from "sections/collabs/CollabsContext/CollabsContext.tsx";
import { UserContextProvider } from "sections/user/UserContext/UserContext.tsx";
import { InfluencerContextProvider } from "sections/influencer/InfluencerContext/InfluencerContext.tsx";
import { CompanyContextProvider } from "sections/company/CompanyContext/CompanyContext.tsx";
import { LeadsContextProvider } from "sections/leads/LeadsContext/LeadsContext.tsx";
import { AddressContextProvider } from "sections/address/AddressContext/AddressContext.tsx";
import { CategoriesContextProvider } from "sections/categories/CategoriesContext/CategoriesContext.tsx";
import { CountryContextProvider } from "sections/country/CountryContext/CountryContext.tsx";
import { CityContextProvider } from "sections/city/CityContext/CityContext.tsx";
import { ContactContextProvider } from "sections/contact/ContactContext/ContactContext.tsx";
import { PlansContextProvider } from "sections/plans/PlansContext/PlansContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider repository={repositories.user}>
      <CategoriesContextProvider repository={repositories.categories}>
        <OffersContextProvider repository={repositories.offers}>
          <CollabsContextProvider repository={repositories.collabs}>
            <UserContextProvider repository={repositories.users}>
              <InfluencerContextProvider repository={repositories.influencers}>
                <CompanyContextProvider repository={repositories.companies}>
                  <LeadsContextProvider repository={repositories.leads}>
                    <AddressContextProvider repository={repositories.address}>
                      <CountryContextProvider
                        repository={repositories.countries}
                      >
                        <CityContextProvider repository={repositories.city}>
                          <ContactContextProvider
                            repository={repositories.contact}
                          >
                            <PlansContextProvider
                              repository={repositories.plans}
                            >
                              <ThemeProvider theme={theme}>
                                <GlobalStyles />
                                <RouterProvider router={router} />
                              </ThemeProvider>
                            </PlansContextProvider>
                          </ContactContextProvider>
                        </CityContextProvider>
                      </CountryContextProvider>
                    </AddressContextProvider>
                  </LeadsContextProvider>
                </CompanyContextProvider>
              </InfluencerContextProvider>
            </UserContextProvider>
          </CollabsContextProvider>
        </OffersContextProvider>
      </CategoriesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
