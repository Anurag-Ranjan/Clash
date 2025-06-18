"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../Common/UserAvatar";
import LogoutModal from "../Common/LogoutModal";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LogoutModal open={open} setOpen={setOpen} />
      <nav className="h-14 !p-4 flex justify-between items-center w-full border-b-1 border-b-black">
        <h1
          className="text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-400
         text-transparent bg-clip-text text-center p-4 md-50"
        >
          Clash
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="!p-2 border-2  rounded-md cursor-pointer">
            <UserAvatar />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="!p-2 cursor-pointer">
            <DropdownMenuLabel className="!p-2">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="!p-2 cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="!p-2 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}

export default Navbar;
