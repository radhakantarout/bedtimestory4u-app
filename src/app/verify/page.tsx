"use client";

export const dynamic = "force-dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { confirmUser } from "@/lib/cognito";

export default function VerifyPage() {
  const router = useRouter();
  const params = useSearchParams();

  const email = params.get("email") || "";
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      await confirmUser(email, otp);

      alert("Account verified successfully!");

      // Redirect to login
      router.push("/login");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Verify Account</h2>

      <p>OTP sent to {email}</p>

      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}