import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import { loginUser } from "../services/authService";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await loginUser(email, password);

      toast.success("Login successful");

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      toast.error("Invalid credentials");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <Toaster />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

          <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
            SwasthyaSaathi
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Healthcare Assistant
          </p>

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>

      </div>
    </>
  );
}