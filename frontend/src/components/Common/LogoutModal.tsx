import React, { Dispatch, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { signOut } from "next-auth/react";

function LogoutModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const logOut = () => {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };
  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="!p-2 !px-4">
            <AlertDialogTitle className="!p-2">
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription className="!p-2">
              You will be logged out
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="!p-2">
            <AlertDialogCancel className="!p-2 cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="!p-2 cursor-pointer bg-red-600 hover:bg-red-500"
              onClick={logOut}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default LogoutModal;
