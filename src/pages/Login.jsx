import { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import {
  loginUser,
  registerUser,
  resetPassword,
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

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
    useState(false);

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

  const handleForgotPassword =
    async () => {

      if (!email) {

        toast.error(
          "Enter your email first"
        );

        return;
      }

      try {

        await resetPassword(email);

        toast.success(
          "Password reset email sent"
        );

      } catch (error) {

        toast.error(error.message);
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

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  minLength={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >

                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

            </div>

            {isRegistering && (

              <div className="space-y-2">

                <label className="font-medium text-gray-700">
                  Confirm Password
                </label>

                <div className="relative">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                  minLength={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >

                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

                </div>

              </div>

            )}

            <div className="text-right">

              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-700 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

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