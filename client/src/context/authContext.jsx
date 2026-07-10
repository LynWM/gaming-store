import { createContext, useContext, useState } from "react";
import { mockUsers } from "../data/mockUsers";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  const [users, setUsers] = useState(mockUsers);
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const signup = ({ firstName, lastName, username, email, password }) => {
    const existing = users.find((u) => u.email === email);
    if (existing) {
      return { success: false, error: "An account with this email already exists" };
    }

    const newUser = {
      id: users.length + 1,
      name: `${firstName} ${lastName}`,
      username,
      email,
      password,
      role: "customer",
    };

    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);