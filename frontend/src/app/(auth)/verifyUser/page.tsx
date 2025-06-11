// "use client";
// import React, { useState } from "react";
// import axios from "axios";

// function VerifyPage({ params }: any) {
//   const email = params.email;
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const verifyMail = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/auth/verify/${email}`
//       );
//       console.log("Verified email successfully");
//       setMessage("Email Verified Successfully!");
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error.response?.status === 400) {
//           console.error("Bad Request:", error.response.data);
//           setMessage("Verification failed: Bad Request.");
//         } else {
//           console.error("Axios error:", error.message);
//           setMessage(`Verification failed: ${error.message}`);
//         }
//       } else {
//         console.error("Unexpected error:", error);
//         setMessage("An unexpected error occurred during verification.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Email Verification</h1>
//       <p>Your email: {email}</p>
//       <button onClick={verifyMail} disabled={loading}>
//         {loading ? "Verifying..." : "Click to Verify"}
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default VerifyPage;

// app/verifyEmail/page.tsx

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
