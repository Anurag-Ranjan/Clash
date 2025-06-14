import React from "react";
import ResetPasswordForm from "@/components/password/ResetPassword";

function ResetPass() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="bg-white w-[550px] h-3/4 rounded-md shadow-2xl padding-50">
        <h1 className="block text-2xl font-bold marginBottom">
          Reset Password
        </h1>
        <p className="marginBottom">Enter new password</p>
        <ResetPasswordForm />
      </div>
    </div>
  );
}

export default ResetPass;
