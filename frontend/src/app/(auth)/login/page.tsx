import React from "react";
import LoginForm from "@/components/auth/Login";

function Login() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="bg-white w-[550px] h-3/4 rounded-md shadow-2xl padding-50">
        <h1 className="block text-2xl font-bold marginBottom">Login</h1>
        <p className="marginBottom">Welcome Back</p>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}

export default Login;
