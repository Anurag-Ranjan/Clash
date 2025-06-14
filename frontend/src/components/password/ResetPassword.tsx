"use client";
import React, { useActionState } from "react";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { FormButton } from "@/components/FormButton";
import { RESET_PASSWORD_URL } from "@/lib/apiEndPoints";
import { resetAction } from "@/actions/passwordActions";
import { useSearchParams } from "next/navigation";

type FormState = {
  status: number;
  message: string;
  errors: {
    email?: string;
    password?: string;
    confirm_password?: string;
  };
  token?: string;
};

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const initState: FormState = {
    status: 0,
    message: "",
    errors: {},
    token: token,
  };
  const [formState, formAction] = useActionState<FormState, FormData>(
    resetAction,
    initState
  );
  return (
    <form action={formAction}>
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
        <span className="text-red-500">{formState?.errors?.password}</span>
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
          name="confirm_password"
        ></Input>
        <span className="text-red-500">
          {formState?.errors?.confirm_password}
        </span>
      </div>
      <div className="padding-10 marginBottom">
        <FormButton message={"Confirm"}></FormButton>
      </div>
      <p>{formState.message}</p>
    </form>
  );
}

export default ResetPasswordForm;
