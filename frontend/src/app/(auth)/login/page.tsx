import React from "react";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Login() {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="bg-white w-[550px] h-3/4 rounded-md shadow-2xl padding-50">
        <h1 className="block text-2xl font-bold marginBottom">Login</h1>
        <p className="marginBottom">Welcome Back</p>
        <div>
          <div className="marginBottom">
            <Label
              labelMessage="Email"
              className="font-semibold text-xl"
            ></Label>
            <Input
              className="w-full"
              type="email"
              placeholder="Enter your email"
              name="email"
            ></Input>
          </div>
          <div className="marginBottom">
            <Label
              labelMessage="Password"
              className="font-semibold text-xl"
            ></Label>
            <Input
              className="w-full"
              type="password"
              placeholder="Enter your password"
              name="password"
            ></Input>
          </div>
          <div className="marginBottom text-right marginInput">
            <Link href="forgot-password" className="font-bold">
              Forgot password?
            </Link>
          </div>
          <div className="padding-10 marginBottom">
            <Button className="padding-10 w-full hover:cursor-pointer active:bg-accent-violet-200">
              Login
            </Button>
          </div>
          <p>
            Don't have an account?{" "}
            <strong>
              <Link href={"/register"}>Register</Link>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
