import { Navigate } from "react-router-dom";
import { Login } from "../pages/Login";
import { AdminDashboard } from "../pages/AdminDashboard";
import { CustomerDashboard } from "../pages/CustomerDashboard";
import { EmployeeDashboard } from "../pages/EmployeeDashboard";
import { Unauthorized } from "../pages/Unauthorized";
import { ProtectedRoute } from "../components/ProtectedRoute";
import AppLayout from "../ui/AppLayout";

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
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "customer",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            <CustomerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee",
        element: (
          <ProtectedRoute allowedRoles={["employee"]}>
            <EmployeeDashboard />
          </ProtectedRoute>
        ),
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
