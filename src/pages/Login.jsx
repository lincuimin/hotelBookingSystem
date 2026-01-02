import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import styled from "styled-components";
import Form from "../ui/Form";
import Input from "../ui/input";
import Button from "../ui/Button";
import Select from "../ui/Select";

const LoginContainer = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-lg);
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.6rem;

  label {
    font-weight: 500;
  }
`;

const ErrorMessage = styled.div`
  color: var(--color-red-700);
  background-color: var(--color-red-100);
  padding: 1.2rem;
  border-radius: var(--border-radius-sm);
  margin-bottom: 1.6rem;
`;

const FormTitle = styled.h1`
  text-align: center;
  margin-bottom: 2.4rem;
  font-size: 2rem;
  color: var(--color-grey-800);
`;

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const pendingRoleRef = useRef(null);

  // 当用户成功登录后导航
  useEffect(() => {
    if (user && pendingRoleRef.current) {
      const routes = {
        admin: "/app/admin",
        customer: "/app/customer",
        employee: "/app/employee",
      };
      navigate(routes[pendingRoleRef.current]);
      pendingRoleRef.current = null;
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("请输入用户名和密码");
      return;
    }

    setError(""); // Clear previous error

    const success = await login(username, password, role);

    if (success) {
      pendingRoleRef.current = role;
    } else {
      setError("登录失败：用户名或密码错误");
    }
  };

  const roleOptions = [
    { value: "admin", label: "管理员" },
    { value: "customer", label: "客户" },
    { value: "employee", label: "员工" },
  ];

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit}>
        <FormTitle>登录</FormTitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <FormRow>
          <label htmlFor="role">选择角色</label>
          <Select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            options={roleOptions}
          />
        </FormRow>

        <FormRow>
          <label htmlFor="username">用户名</label>
          <Input
            id="username"
            type="text"
            placeholder="请输入用户名"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
          />
        </FormRow>

        <FormRow>
          <label htmlFor="password">密码</label>
          <Input
            id="password"
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </FormRow>

        <Button variation="primary" size="large" style={{ width: "100%" }}>
          登录
        </Button>
      </Form>
    </LoginContainer>
  );
}
