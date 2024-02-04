"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { useState } from "react";

import { register } from "@/lib/api";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router: AppRouterInstance = useRouter();

  const handleRegister = async (): Promise<void> => {
    try {
      const token: string = await register(email, username, password);
      localStorage.setItem("token", token);
      router.push("/home");
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center rounded-lg bg-[#FFFDFA] p-8 text-[#171717]">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-screen flex-col items-center justify-center"
        >
          <div className="mb-8 text-3xl font-semibold">Register</div>
          <div className="mb-4">
            <label className="text-md mb-1 block px-2 font-medium">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="block w-72 rounded-3xl bg-[#bdbdbd] p-2.5 px-5 text-sm placeholder:text-[#171717]"
            />
          </div>
          <div className="mb-4">
            <label className="text-md mb-1 block px-2 font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="block w-72 rounded-3xl bg-[#bdbdbd] p-2.5 px-5 text-sm placeholder:text-[#171717]"
            />
          </div>
          <div className="mb-4">
            <label className="text-md mb-1 block px-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="block w-72 rounded-3xl bg-[#bdbdbd] p-2.5 px-5 text-sm placeholder:text-[#171717]"
            />
          </div>
          <button
            type="submit"
            onClick={handleRegister}
            className="mx-8 my-4 w-72 rounded-3xl bg-[#6E4AFF] px-6 py-2 font-semibold text-[#FFFDFA]"
          >
            Register
          </button>
          <div className="font-semibold">Or</div>
          <Link href={"/login"}>
            <button
              type="submit"
              className="mx-8 my-4 w-72 rounded-3xl border-2 border-[#6E4AFF] px-6 py-2 font-semibold text-[#6E4AFF]"
            >
              Login
            </button>
          </Link>
        </form>
      </main>
    </>
  );
}
