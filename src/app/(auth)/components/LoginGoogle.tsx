"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface Props {}

const LoginGoogle = (props: Props) => {
  const { push } = useRouter();
  const login = async () => {
    try {
      await signIn("google", {
        callbackUrl: `${window.location.origin}/`,
        redirect: false,
      });
      push("/");
      // console.log("LOGIN GOOGLE", res);
      // if (res?.ok) {
      //   push("/");
      // } else {
      //   toast.error(res?.error ?? "Something went wrong. Try again later!");
      // }
    } catch (error) {
      console.log("error when login with google", error);
    }
  };
  return (
    <Button onClick={login} className="space-x-2 w-full" variant={"outline"}>
      <FaGoogle /> <span>Google</span>
    </Button>
  );
};

export default LoginGoogle;
