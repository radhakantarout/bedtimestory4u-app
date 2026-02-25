"use client";

import { useState } from "react";
import { signUpUser, confirmUser } from "@/lib/cognito";

const countryCodes = [
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+61", label: "🇦🇺 +61" },
];

export default function Signup() {
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUpUser(email, password, `${countryCode}${phone}`);
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleConfirm = async () => {
    try {
      await confirmUser(email, otp);
      alert("Account verified! Please login.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-purple-900 p-8 rounded-xl w-full max-w-md">

        {step === 1 && (
          <>
            <h1 className="text-xl mb-6 text-center">Create Account</h1>

            {error && (
              <p className="text-red-400 mb-4 text-sm">{error}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              className="p-3 w-full mb-4 bg-black border rounded"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex gap-2 mb-4">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="bg-black border rounded p-3"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                placeholder="Mobile number"
                className="p-3 w-full bg-black border rounded"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <input
              type="password"
              placeholder="Password"
              className="p-3 w-full mb-4 bg-black border rounded"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Re-enter Password"
              className="p-3 w-full mb-6 bg-black border rounded"
              onChange={(e) => setRePassword(e.target.value)}
            />

            <button
              onClick={handleSignup}
              className="bg-pink-500 p-3 w-full rounded hover:bg-pink-600"
            >
              Sign Up
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-xl mb-6 text-center">Verify Email OTP</h1>

            {error && (
              <p className="text-red-400 mb-4 text-sm">{error}</p>
            )}

            <input
              type="text"
              placeholder="Enter OTP"
              className="p-3 w-full mb-4 bg-black border rounded"
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleConfirm}
              className="bg-green-500 p-3 w-full rounded hover:bg-green-600"
            >
              Verify Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}