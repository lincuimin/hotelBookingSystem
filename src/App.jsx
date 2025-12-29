import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { routes } from "./router/routes";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  const element = useRoutes(routes);

  return (
    <>
      <GlobalStyles />
      <AuthProvider>{element}</AuthProvider>
    </>
  );
}

export default App;
