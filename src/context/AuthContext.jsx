import { useState, useCallback } from "react";
import { AuthContext } from "./authContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((username, password, role) => {
    // 模拟登录验证
    if (username && password) {
      setUser({
        username,
        role, // 'admin' | 'customer' | 'employee'
        id: role === "customer" ? 1 : undefined, // Mock customer ID for demo
      });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
