import { createContext, useContext, useState } from "react";
import { demoAccounts } from "../data/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(role, email, password) {
    const account = demoAccounts[role];
    if (!account) return { success: false, message: "Unknown role selected." };
    // Demo auth: accept the seeded credentials, or any non-empty email/password
    // so the reviewer can explore every dashboard without memorizing accounts.
    if (email && password) {
      setUser({ ...account, role });
      return { success: true };
    }
    return { success: false, message: "Please enter an email and password." };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
