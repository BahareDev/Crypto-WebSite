import { createContext, useContext, useState } from "react";
import React from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, pass) => {
    setLoading(true);

    // Calling Api ( we don't have so fake it)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "user@gmail.com" && pass === "456") {
      setUser({ email, role: "user" });
    } else {
      throw new Error("Invalid");
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
