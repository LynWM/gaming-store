import { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = logged out

  // Returns { success: true, user } or { success: false, error: "..." }
  const login = async (email, password) => {
    try {
      const res = await api.login({ email, password });
      if (res.success) {
        setUser(res.user);
        return { success: true, user: res.user };
      }
      return { success: false, error: res.error || 'Invalid email or password' };
    } catch (err) {
      return { success: false, error: err.message || 'Invalid email or password' };
    }
  };

  // Returns { success: true, user } or { success: false, error: "..." }
  const signup = async ({ firstName, lastName, username, email, password }) => {
    try {
      const res = await api.signup({ firstName, lastName, username, email, password });
      if (res.success) {
        setUser(res.user);
        return { success: true, user: res.user };
      }
      return { success: false, error: res.error || "Signup failed" };
    } catch (err) {
      return { success: false, error: err.message || "Signup failed" };
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);