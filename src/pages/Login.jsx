import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import {
  loginUser,
  registerUser,
} from "../services/authService";

export default function Login() {

  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] =
    useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (
        isRegistering &&
        password !== confirmPassword
      ) {

        toast.error(
          "Passwords do not match"
        );

        return;
      }

      setLoading(true);

      if (isRegistering) {

        await registerUser(
          email,
          password
        );

        toast.success(
          "Account created successfully"
        );

      } else {

        await loginUser(
          email,
          password
        );

        toast.success(
          "Login successful"
        );
      }

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      toast.error(error.message);

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

            {isRegistering
              ? "Create your account"
              : "Login to continue"}

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div className="space-y-2">

              <label className="font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

            </div>

            <div className="space-y-2">

              <label className="font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                minLength={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

            </div>

            {isRegistering && (

              <div className="space-y-2">

                <label className="font-medium text-gray-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                  minLength={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />

              </div>

            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
            >

              {loading
                ? "Please wait..."
                : isRegistering
                ? "Create Account"
                : "Login"}

            </button>

          </form>

          <div className="text-center mt-6">

            <button
              onClick={() =>
                setIsRegistering(
                  !isRegistering
                )
              }
              className="text-blue-700 font-medium"
            >

              {isRegistering
                ? "Already have an account? Login"
                : "Create new account"}

            </button>

          </div>

        </div>

      </div>
    </>
  );
}