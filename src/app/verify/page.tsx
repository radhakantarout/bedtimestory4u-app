"use client";

import { Suspense } from "react";
import VerifyContent from "./VerifyContent";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}