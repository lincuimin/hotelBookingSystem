import { useAuth } from "../context/useAuth";
import WelcomeSection from "../ui/WelcomeSection";

export function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <>
      <WelcomeSection>
        <h2>欢迎，{user?.username}！</h2>
        <p>您已以客户身份登录</p>
      </WelcomeSection>
    </>
  );
}
