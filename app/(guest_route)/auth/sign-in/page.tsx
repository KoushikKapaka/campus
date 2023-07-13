"use client";

import InputField from "@/app/components/InputField";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/Alert";

const SignIn = () => {
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { email, password } = userInfo;
  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) return setError(res.error);
    router.replace("/dashboard");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="w-1/3" onSubmit={handleSubmit}>
        {error ? (
          <div className="mb-4">
            <Alert value={error} />
          </div>
        ) : null}
        <InputField
          label="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button
          className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          type="submit"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Create an Account{" "}
        <Link href="/auth/sign-up" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
