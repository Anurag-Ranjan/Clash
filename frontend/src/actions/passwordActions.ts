"use server";
import { FORGOT_PASSWORD_URL, RESET_PASSWORD_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";

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

export async function forgetAction(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  try {
    console.log(formData.get("email"));
    const { data } = await axios.post(FORGOT_PASSWORD_URL, {
      email: formData.get("email"),
    });
    return {
      status: 200,
      message: data?.message ?? "Please check your email",
      errors: {},
    };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return {
        status: 422,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors,
      };
    }
    return {
      status: 500,
      message: "Something went wrong",
      errors: {},
    };
  }
}

export async function resetAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log(prevState.token);
  try {
    const { data } = await axios.post(
      `${RESET_PASSWORD_URL}?token=${prevState.token}`,
      {
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
      }
    );
    return {
      status: 200,
      message: data?.message ?? "Password has been reset successfully",
      errors: {},
      token: prevState.token,
    };
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return {
        status: 422,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors,
        token: prevState.token,
      };
    }
    return {
      status: 500,
      message: "Something went wrong",
      errors: {},
      token: prevState.token,
    };
  }
}
