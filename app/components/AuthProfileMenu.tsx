"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function AuthProfileMenu() {
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  if (isAuth) {
    return (
      <p>
        {data?.user?.name}
        <button onClick={() => signOut()}>logout</button>
      </p>
    );
  }
  return (
    <ul className="flex items-center space-x-6">
      <li>
        <Link href="/auth/sign-in">Login</Link>
      </li>
      <li>
        <Link
          className="bg-blue-500 text-white rounded p-1 inline-bloack shadow-sm"
          href="/auth/sign-up"
        >
          Sign Up
        </Link>
      </li>
    </ul>
  );
}
