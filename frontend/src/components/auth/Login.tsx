"use client";

import React, { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FormButton } from "../FormButton";
import { loginAction } from "@/actions/authActions";
import { signIn } from "next-auth/react";

type FormState = {
  status: number;
  message: string;
  errors: {
    name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
  };
  data?: { email?: string; password?: string };
};

function LoginForm() {
  const initState: FormState = {
    status: 0,
    message: "",
    errors: {},
    data: {},
  };
  const [formState, formAction] = useActionState<FormState, FormData>(
    loginAction,
    initState
  );

  useEffect(() => {
    if (formState.status === 200)
      signIn("credentials", {
        email: formState?.data?.email,
        password: formState?.data?.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
  }, [formState]);

  return (
    <form action={formAction}>
      <div className="marginBottom">
        <Label className="font-semibold text-xl">Email</Label>
        <Input
          className="w-full"
          type="email"
          placeholder="Enter your email"
          name="email"
        ></Input>
        <span className="text-red-500">{formState?.errors?.email}</span>
      </div>
      <div className="marginBottom">
        <Label className="font-semibold text-xl">Password</Label>
        <Input
          className="w-full"
          type="password"
          placeholder="Enter your password"
          name="password"
        ></Input>
        <span className="text-red-500">{formState?.errors?.password}</span>
      </div>
      <div className="marginBottom text-right marginInput">
        <Link href="forgotpassword" className="font-bold">
          Forgot password?
        </Link>
      </div>
      <div className="padding-10 marginBottom">
        <FormButton message={"Login"} />
      </div>
      <p>
        Don't have an account?{" "}
        <strong>
          <Link href={"/register"}>Register</Link>
        </strong>
      </p>
    </form>
  );
}

export default LoginForm;
