import styled from "styled-components";
import { useAuth } from "../../context/useAuth";

const StyledUserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.4rem;
  color: var(--color-grey-700);
`;

const Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`;

function UserAvatar() {
  const { user } = useAuth();

  return (
    <StyledUserAvatar>
      <div>
        <div style={{ fontWeight: "600" }}>{user?.username}</div>
        <div style={{ fontSize: "1.2rem", color: "var(--color-grey-500)" }}>
          {user?.role === "admin"
            ? "管理员"
            : user?.role === "customer"
            ? "客户"
            : "员工"}
        </div>
      </div>
      <Avatar src="/api/placeholder/avatar.jpg" alt="用户头像" />
    </StyledUserAvatar>
  );
}

export default UserAvatar;
