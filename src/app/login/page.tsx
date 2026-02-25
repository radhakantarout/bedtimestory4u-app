"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/cognito";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      await loginUser(email, password);

      // Redirect after successful login
      router.push("/dashboard");
    } catch (err: any) {
      if (err.code === "UserNotConfirmedException") {
        setError("Please verify your email before logging in.");
      } else if (err.code === "NotAuthorizedException") {
        setError("Incorrect email or password.");
      } else {
        setError(err.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-purple-900 p-8 rounded-xl w-full max-w-md shadow-lg">

        <h1 className="text-xl mb-6 text-center font-semibold">
          Login to Your Account
        </h1>

        {error && (
          <p className="text-red-400 mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="p-3 w-full mb-4 bg-black border rounded focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-3 w-full mb-6 bg-black border rounded focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-pink-500 p-3 w-full rounded hover:bg-pink-600 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-gray-300 text-center mt-4">
          Don’t have an account?{" "}
          <span
            className="text-pink-400 cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}