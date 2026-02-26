"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { confirmUser } from "@/lib/cognito";

export default function VerifyContent() {
  const router = useRouter();
  const params = useSearchParams();

  const email = params.get("email") || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setError("");

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      await confirmUser(email, otp);

      alert("Account verified successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-purple-900 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h1 className="text-xl mb-6 text-center font-semibold">
          Verify Email OTP
        </h1>

        <p className="text-sm text-gray-300 mb-4 text-center">
          OTP sent to <span className="text-white">{email}</span>
        </p>

        {error && (
          <p className="text-red-400 mb-4 text-sm text-center">{error}</p>
        )}

        <input
          type="text"
          placeholder="Enter OTP"
          className="p-3 w-full mb-4 bg-black border rounded focus:outline-none"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="bg-green-500 p-3 w-full rounded hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify Account"}
        </button>
      </div>
    </div>
  );
}