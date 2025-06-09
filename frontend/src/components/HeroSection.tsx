import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

function HeroSection() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <Image src={"/banner.svg"} height={600} width={600} alt="Logo"></Image>
      </div>
      <div className="flex flex-col justify-center h-full">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium bg-gradient-to-r from-clash-200 to-clash-100 text-transparent bg-clip-text text-center p-4 md-50">
          Clash
        </h1>
        <p className=" mt-5 sm:text-2xl md:text-3xl lg:text-5xl font-bold ">
          Dicover the better choice, together
        </p>
        <Link href={"/login"}>
          <Button className="lg:p-6 md:p-6 sm:p-2 p-6 sm:text-xl md:text-2xl bg-clash-100 lg:text-3xl mt-5 active:bg-clash-200 hover:cursor-pointer active:cursor-pointer">
            Start Free
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
