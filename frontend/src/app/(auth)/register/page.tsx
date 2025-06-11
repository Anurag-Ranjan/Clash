import React from "react";
import RegisterForm from "@/components/auth/Register";

function Register() {
  return (
    <div className="flex items-center justify-center max-h-screen w-screen">
      <div className="bg-white w-[550px] sm:w-3/4 h-full rounded-md shadow-2xl padding-50 mt-80">
        <h1 className="block text-2xl font-bold marginBottom">Sign Up</h1>
        <p className="marginBottom">Glad to have you here</p>
        <RegisterForm></RegisterForm>
      </div>
    </div>
  );
}

export default Register;
