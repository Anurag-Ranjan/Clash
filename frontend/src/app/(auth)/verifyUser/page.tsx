"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.post(`http://localhost:8000/api/v1/auth/verify?token=${token}`);
    }
  }, [token]);

  return loading ? (
    <div>Verifying email...</div>
  ) : (
    <div>Email Verified Successfully</div>
  );
}
