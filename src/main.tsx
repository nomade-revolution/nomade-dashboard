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
// TEST
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider repository={repositories.user}>
      <OffersContextProvider repository={repositories.offers}>
        <CollabsContextProvider repository={repositories.collabs}>
          <UserContextProvider repository={repositories.users}>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <RouterProvider router={router} />
            </ThemeProvider>
          </UserContextProvider>
        </CollabsContextProvider>
      </OffersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
);
