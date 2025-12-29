import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import Button from "../../ui/Button";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} variation="secondary" size="small">
      登出
    </Button>
  );
}

export default Logout;
