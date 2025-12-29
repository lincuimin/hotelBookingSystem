import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

const ErrorCard = styled.div`
  background-color: var(--color-grey-0);
  padding: 4rem;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-lg);
  text-align: center;
  max-width: 500px;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  margin: 0;
  color: var(--color-red-700);
  font-weight: bold;
`;

const ErrorTitle = styled.h2`
  font-size: 2.4rem;
  margin: 1.5rem 0;
  color: var(--color-grey-800);
`;

const ErrorMessage = styled.p`
  color: var(--color-grey-600);
  margin: 1.5rem 0 3rem;
  font-size: 1.4rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;

  button {
    min-width: 120px;
  }
`;

export function Unauthorized() {
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <ErrorCard>
        <ErrorCode>403</ErrorCode>
        <ErrorTitle>访问被拒绝</ErrorTitle>
        <ErrorMessage>您没有权限访问此页面</ErrorMessage>
        <ButtonGroup>
          <Button onClick={() => navigate(-1)} variation="secondary">
            返回
          </Button>
          <Button onClick={() => navigate("/login")} variation="primary">
            重新登录
          </Button>
        </ButtonGroup>
      </ErrorCard>
    </ErrorContainer>
  );
}
