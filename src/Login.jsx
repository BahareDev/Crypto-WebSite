import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      console.log("successfuly");

      // navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div>
        <h2>Login</h2>

        <div className="flex gap-4 flex-col bg-red-500">
          <form>
            <input
              type="text"
              placeholder="username /email"
              className="border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={pass}
              placeholder="password"
              className="border"
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-400 border cursor-pointer"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "logging in ..." : "login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
