import { createContext, useContext, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

function readCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name, value) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=604800`;
}

function removeCookie(name) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("nextplay-user") || readCookie("nextplay-user");
    return raw ? JSON.parse(raw) : null;
  });
  const [message, setMessage] = useState("");

  const login = async (email, password) => {
    try {
      const result = await api.login({ email, password });
      if (result.success) {
        setUser(result.user);
        const serialized = JSON.stringify(result.user);
        localStorage.setItem("nextplay-user", serialized);
        writeCookie("nextplay-user", serialized);
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
        const serialized = JSON.stringify(result.user);
        localStorage.setItem("nextplay-user", serialized);
        writeCookie("nextplay-user", serialized);
        const inboxMessage = `Verification code sent to ${email}: ${result.code}`;
        setMessage(inboxMessage);
        const existing = JSON.parse(localStorage.getItem("nextplay-messages") || "[]");
        const next = [{ id: Date.now(), title: 'Virtual inbox', body: inboxMessage }, ...existing].slice(0, 5);
        localStorage.setItem("nextplay-messages", JSON.stringify(next));
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
      if (result.success) {
        const inboxMessage = `Reset code sent to ${email}: ${result.code}`;
        const existing = JSON.parse(localStorage.getItem("nextplay-messages") || "[]");
        const next = [{ id: Date.now(), title: 'Virtual inbox', body: inboxMessage }, ...existing].slice(0, 5);
        localStorage.setItem("nextplay-messages", JSON.stringify(next));
      }
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
    removeCookie("nextplay-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, verifyCode, forgotPassword, resetPassword, message }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);