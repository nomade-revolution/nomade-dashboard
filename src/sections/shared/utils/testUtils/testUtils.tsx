import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";
import { UserContextProvider } from "../../../user/UserContext/UserContext";
import theme from "../../../../assets/styles/theme";
import GlobalStyles from "../../../../assets/styles/GlobalStyles";
import { loginUserLocalStorageUserRepository } from "../../../../modules/user/infrastructure/LocalStorageUserRepository";

const renderWithProviders = (ui: React.ReactElement) => {
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

export default renderWithProviders;
