import React from "react";
import Input from "@/components/ui/input";
import Link from "next/link";
import Label from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function Register() {
  return (
    <div className="flex items-center justify-center max-h-screen w-screen">
      <div className="bg-white w-[550px] sm:w-3/4 h-full rounded-md shadow-2xl padding-50 mt-80">
        <h1 className="block text-2xl font-bold marginBottom">Sign Up</h1>
        <p className="marginBottom">Glad to have you here</p>
        <div>
          <div className="marginBottom">
            <Label
              labelMessage="Username"
              className="font-semibold text-xl"
            ></Label>
            <Input
              className="w-full"
              type="text"
              placeholder="Enter your Username"
              name="text"
            ></Input>
          </div>
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
          <div className="marginBottom">
            <Label
              labelMessage="Confirm Password"
              className="font-semibold text-xl"
            ></Label>
            <Input
              className="w-full"
              type="password"
              placeholder="Re Enter your password"
              name="password"
            ></Input>
          </div>
          <div className="padding-10 marginBottom">
            <Button className="padding-10 w-full hover:cursor-pointer active:bg-accent-violet-200">
              Register
            </Button>
          </div>
          <p>
            Already have an account?{" "}
            <strong>
              <Link href={"/login"}>Login</Link>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
