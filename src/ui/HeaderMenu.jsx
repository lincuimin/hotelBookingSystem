import styled from "styled-components";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
