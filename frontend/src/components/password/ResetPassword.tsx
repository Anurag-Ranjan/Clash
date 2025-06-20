"use client";
import React, { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormButton } from "@/components/FormButton";
import { resetAction } from "@/actions/passwordActions";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
  useEffect(() => {
    if (formState.status === 200) {
      setTimeout(() => router.replace("/login"), 1000);
    }
  }, [formState]);
  return (
    <form action={formAction}>
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
        <FormButton message={"Confirm"}></FormButton>
      </div>
      <p>{formState.message}</p>
    </form>
  );
}

export default ResetPasswordForm;
