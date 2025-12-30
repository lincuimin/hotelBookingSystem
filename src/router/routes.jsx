import { Navigate, Outlet } from "react-router-dom";
import { Login } from "../pages/Login";
import { Unauthorized } from "../pages/Unauthorized";
import { ProtectedRoute } from "../components/ProtectedRoute";
import AppLayout from "../ui/AppLayout";
import { Employees } from "../pages/Employees";
import { Customers } from "../pages/Customers";
import { Announcements } from "../pages/Announcements";
import { Announcements_emp } from "../pages/Announcements_emp";
import { Bookings } from "../pages/Bookings";
import { Bookings_emp } from "../pages/Bookings_emp";
import { History } from "../pages/History";
import { History_emp } from "../pages/History_emp";
import { Rooms } from "../pages/Rooms";

export const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="employees" replace /> },
          { path: "employees", element: <Employees /> },
          { path: "customers", element: <Customers /> },
        ],
      },
      {
        path: "customer",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="announcements" replace /> },
          { path: "announcements", element: <Announcements /> },
          { path: "bookings", element: <Bookings /> },
          { path: "history", element: <History /> },
        ],
      },
      {
        path: "employee",
        element: (
          <ProtectedRoute allowedRoles={["employee"]}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="bookings_emp" replace /> },
          { path: "bookings_emp", element: <Bookings_emp /> },
          { path: "announcements_emp", element: <Announcements_emp /> },
          { path: "rooms", element: <Rooms /> },
          { path: "history_emp", element: <History_emp /> },
        ],
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
];
