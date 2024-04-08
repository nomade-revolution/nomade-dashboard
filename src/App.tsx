import { userRepository } from "./modules/user/infrastructure/userRepository";
import { UserContextProvider } from "./sections/user/UserContext/UserContext";
import LoginPage from "./sections/user/pages/LoginPage";

function App() {
  const repository = userRepository();
  return (
    <UserContextProvider repository={repository}>
      <LoginPage />
    </UserContextProvider>
  );
}

export default App;
