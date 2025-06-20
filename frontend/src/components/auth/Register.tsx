"use client";
import React, { useActionState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { FormButton } from "@/components/FormButton";
import { registerAction } from "@/actions/authActions";
import { REGISTER_URL } from "@/lib/apiEndPoints";

type FormState = {
  status: number;
  message: string;
  errors: {
    name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
  };
};

function RegisterForm() {
  console.log(REGISTER_URL);
  const initState: FormState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [formState, formAction] = useActionState<FormState, FormData>(
    registerAction,
    initState
  );
  console.log(formState);
  return (
    <form action={formAction}>
      <div className="marginBottom">
        <Label className="font-semibold text-xl">Username</Label>
        <Input
          className="w-full"
          type="text"
          placeholder="Enter your Username"
          name="name"
        ></Input>
        <span className="text-red-500">{formState?.errors?.name}</span>
      </div>
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
      <div className="marginBottom">
        <Label className="font-semibold text-xl">Confirm Password</Label>
        <Input
          className="w-full"
          type="password"
          placeholder="Re Enter your password"
          name="confirm_password"
        ></Input>
        <span className="text-red-500">
          {formState?.errors?.confirm_password}
        </span>
      </div>
      <div className="padding-10 marginBottom">
        <FormButton message={"Register"}></FormButton>
      </div>
      <p>
        Already have an account?{" "}
        <strong>
          <Link href={"/login"}>Login</Link>
        </strong>
      </p>
    </form>
  );
}

export default RegisterForm;
