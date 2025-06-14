import React from "react";
import ForgotPasswordForm from "@/components/password/ForgotPassword";

function ForgotPass() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="bg-white w-[550px] h-3/4 rounded-md shadow-2xl padding-50">
        <h1 className="block text-2xl font-bold marginBottom">
          Forgot Password
        </h1>
        <p className="marginBottom">Enter your registered email</p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}

export default ForgotPass;
