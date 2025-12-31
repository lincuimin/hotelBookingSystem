import { useState, useCallback } from "react";
import { AuthContext } from "./authContext.js";

const API_BASE = '/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback(async (email, password, role) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('登录失败:', error.error);
        return false;
      }

      const data = await response.json();
      setUser({
        id: data.user.id,
        username: data.user.name || email,
        email: data.user.email,
        role: data.user.role,
      });
      return true;
    } catch (error) {
      console.error('登录请求失败:', error);
      return false;
    }
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
