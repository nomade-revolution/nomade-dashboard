import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";
import { UserContextProvider } from "../../../user/UserContext/UserContext";
import theme from "../../../../assets/styles/theme";
import GlobalStyles from "../../../../assets/styles/GlobalStyles";
import { getComponentRouter, router } from "../../../../router/router";
import { RouterProvider } from "react-router-dom";
import { loginUserLocalStorageUserRepository } from "../../../../modules/user/infrastructure/localStorageRepo";

export const renderWithProviders = (ui: React.ReactElement) => {
  const Wrapper = ({ children }: PropsWithChildren) => {
    const repository = loginUserLocalStorageUserRepository();
    return (
      <ThemeProvider theme={theme}>
        <UserContextProvider repository={repository}>
          {children}
          <GlobalStyles />
        </UserContextProvider>
      </ThemeProvider>
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
