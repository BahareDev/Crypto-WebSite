import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Failed to parse user from localStorage:", e);
      localStorage.removeItem("user");
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth state loading (can add real API check here)
    setLoading(false);
  }, []);

  const login = async (email, pass) => {
    setLoading(true);

    //// Fake API delay ( we don't have so fake it)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "user@gmail.com" && pass === "456") {
      const userData = { email, role: "user" };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData)); // Persist user in localStorage
      setLoading(false);
      return userData;
    } else {
      setLoading(false);
      throw new Error("Invalid email or password");
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
