import { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("nextplay-user");
    return raw ? JSON.parse(raw) : null;
  });
  const [message, setMessage] = useState("");

  const login = async (email, password) => {
    try {
      const result = await api.login({ email, password });
      if (result.success) {
        setUser(result.user);
        localStorage.setItem("nextplay-user", JSON.stringify(result.user));
        return { success: true };
      }
      return { success: false, error: result.error || "Invalid credentials" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async ({ firstName, lastName, username, email, password }) => {
    try {
      const result = await api.signup({ firstName, lastName, username, email, password });
      if (result.success) {
        setUser(result.user);
        localStorage.setItem("nextplay-user", JSON.stringify(result.user));
        setMessage(`Verification code sent to ${email}`);
        return { success: true, code: result.code };
      }
      return { success: false, error: result.error || "Signup failed" };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const verifyCode = async (email, code) => {
    try {
      const result = await api.verifyCode({ email, code });
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const result = await api.forgotPassword({ email });
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (email, code, password) => {
    try {
      const result = await api.resetPassword({ email, code, password });
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nextplay-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, verifyCode, forgotPassword, resetPassword, message }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);