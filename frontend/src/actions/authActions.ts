"use server";
import { CHECK_URL, LOGIN_URL, REGISTER_URL } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";

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

export async function registerAction(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  try {
    console.log(
      formData.get("name"),
      formData.get("email"),
      formData.get("password"),
      formData.get("confirm_password"),
      REGISTER_URL
    );
    const { data } = await axios.post(REGISTER_URL, {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirm_password"),
    });
    console.log(data);
    return {
      status: 200,
      message: data?.message ?? "User registered successfully",
      errors: {},
    };
  } catch (error: any) {
    console.log(error);
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

export async function loginAction(
  prevState: any,
  formData: FormData
): Promise<FormState> {
  try {
    console.log(formData.get("email"), formData.get("password"), LOGIN_URL);
    const { data } = await axios.post(CHECK_URL, {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    console.log(data);
    return {
      status: 200,
      message: data?.message ?? "Logging in...",
      errors: {},
      data: data.data,
    };
  } catch (error: any) {
    console.log(error);
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
