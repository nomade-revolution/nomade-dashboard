import { loginUserLocalStorageUserRepository } from "./modules/user/infrastructure/LocalStorageUserRepository";
import { UserContextProvider } from "./sections/user/UserContext/UserContext";
import LoginPage from "./sections/user/pages/LoginPage";

function App() {
  const repository = loginUserLocalStorageUserRepository();
  return (
    <UserContextProvider repository={repository}>
      <LoginPage />
    </UserContextProvider>
  );
}

export default App;
