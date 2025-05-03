import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true);

    if (!email.trim() || !pass.trim()) {
      toast.error("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      await login(email, pass);
      toast.success("login Sucess:");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.message);
      toast.error("Login failed:" + err.message);
      setLoading(false);
    }
  };

  return (
    <div className=" w-full max-w-md mx-auto mt-8">
      <div className="m-8 ">
        <div>
          <h2 className="font-bold my-4 text-2xl">Crypto List</h2>
          <p className=" font-bold text-gray-500">
            Welcome to <span className="text-violet-500">Crypto List</span>
          </p>
          <p className="mb-4 mt-2 text-gray-400 text-sm">
            please Enter your info
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4  ">
          <div className="flex items-center gap-2 border rounded-sm p-2 justify-between border-gray-400 ">
            <input
              type="email"
              placeholder="username /email"
              className="focus:outline-0 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>
          </div>

          <div className="flex items-center gap-2 border rounded-sm p-2 justify-between border-gray-400 ">
            <input
              type="password"
              value={pass}
              placeholder="password"
              className="focus:outline-0 w-full "
              onChange={(e) => setPass(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </div>

          <button
            type="submit"
            className="text-white bg-violet-800 cursor-pointer rounded-sm p-2 hover:bg-white hover:border border-violet-800 hover:text-violet-800"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
