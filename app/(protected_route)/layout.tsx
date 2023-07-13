import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/sign-in");
  const user = session?.user as { role: string } | undefined;
  const isAdmin = user?.role === "admin";
  const isFaculty = user?.role === "faculty";
  const isStudent = user?.role === "student";
  if (isAdmin) redirect("/admindashboard");
  if (isFaculty) redirect("/facultydashboard");
  if (isStudent) redirect("/studentdashboard");
  return <>{children}</>;
}
