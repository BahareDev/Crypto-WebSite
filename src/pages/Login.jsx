import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await login(email, pass);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-center font-bold my-4">Login</h2>

        <div className="">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 ">
            <input
              type="text"
              placeholder="username /email"
              className="rounded-sm border border-gray-400 p-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={pass}
              placeholder="password"
              className="rounded-sm border border-gray-400 p-1"
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-400 cursor-pointer rounded-sm p-2 hover:bg-blue-300 text-white"
              disabled={loading}
            >
              {loading ? "logging in ..." : "login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
