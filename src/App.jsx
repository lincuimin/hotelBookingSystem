import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { routes } from "./router/routes";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  const element = useRoutes(routes);

  return (
    <>
      <GlobalStyles />
      <ToastProvider>
        <AuthProvider>{element}</AuthProvider>
      </ToastProvider>
    </>
  );
}

export default App;
