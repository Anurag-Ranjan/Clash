"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function FormButton({ message }: { message: any }) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="padding-10 w-full hover:cursor-pointer active:bg-accent-violet-200"
    >
      {message}
    </Button>
  );
}
