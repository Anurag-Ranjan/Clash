import React from "react";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="text-red-500 m-2">This is a sample text</div>
      <Button>Click me</Button>
    </>
  );
}
