import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/useAuth";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-0);
    background-color: var(--color-indigo-700);
    border-radius: var(--border-radius-sm);
  }
`;

function MainNav() {
  const { user } = useAuth();

  const navItems = {
    admin: [
      { path: "/app/admin/employees", label: "员工" },
      { path: "/app/admin/customers", label: "客户" },
    ],
    customer: [
      { path: "/app/customer/announcements", label: "公告" },
      { path: "/app/customer/bookings", label: "预订" },
      { path: "/app/customer/history", label: "历史" },
    ],
    employee: [
      { path: "/app/employee/bookings", label: "预订" },
      { path: "/app/employee/announcements", label: "公告" },
      { path: "/app/employee/rooms", label: "房间" },
      { path: "/app/employee/history", label: "历史" },
    ],
  };

  const items = navItems[user?.role] || [];

  return (
    <NavList>
      {items.map((item, index) => (
        <li key={index}>
          <StyledNavLink to={item.path}>{item.label}</StyledNavLink>
        </li>
      ))}
    </NavList>
  );
}

export default MainNav;
