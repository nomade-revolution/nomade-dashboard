import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto";
import "@fontsource/roboto/700.css";
import GlobalStyles from "./assets/styles/GlobalStyles.ts";
import theme from "./assets/styles/theme.ts";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import { UserContextProvider } from "./sections/user/UserContext/UserContext.tsx";
import { loginUserLocalStorageUserRepository } from "./modules/user/infrastructure/localStorageRepo.ts";

const repository = loginUserLocalStorageUserRepository();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider repository={repository}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </UserContextProvider>
  </React.StrictMode>,
);
