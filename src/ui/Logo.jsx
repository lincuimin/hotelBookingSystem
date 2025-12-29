import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-brand-600);
`;

function Logo() {
  return <StyledLogo>📱 系统</StyledLogo>;
}

export default Logo;
