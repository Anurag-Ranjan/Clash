"use client";
import React, { useActionState } from "react";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { FormButton } from "@/components/FormButton";
import { forgetAction } from "@/actions/passwordActions";

type FormState = {
  status: number;
  message: string;
  errors: {
    email?: string;
    password?: string;
    confirm_password?: string;
  };
};

function ForgotPasswordForm() {
  const initState: FormState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [formState, formAction] = useActionState<FormState, FormData>(
    forgetAction,
    initState
  );
  return (
    <form action={formAction}>
      <div className="marginBottom">
        <Label labelMessage="Email" className="font-semibold text-xl"></Label>
        <Input
          className="w-full"
          type="text"
          placeholder="Enter your email"
          name="email"
        ></Input>
        <span className="text-red-500">{formState?.errors?.email}</span>
      </div>
      <div className="padding-10 marginBottom">
        <FormButton message={"Send Mail"}></FormButton>
        <p>{formState.message}</p>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
