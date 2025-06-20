import React from "react";
import Navbar from "@/components/base/navbar";
import AddClash from "@/components/Clash/AddClash";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div>
      <Navbar></Navbar>
      <div className="!p-5">
        <AddClash user={session?.user!}></AddClash>
      </div>
    </div>
  );
}

export default Dashboard;
