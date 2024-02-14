"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
interface Props {}

const LoginGoogle = (props: Props) => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const login = async () => {
    try {
      setIsLoading(true);
      await signIn("google", {
        callbackUrl: `${window.location.origin}/`,
        redirect: false,
      });
      push("/");
    } catch (error) {
      console.log("error when login with google", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button disabled={isLoading} onClick={login} className="space-x-2 w-full" variant={"outline"}>
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <FaGoogle /> <span>Google</span>
        </>
      )}
    </Button>
  );
};

export default LoginGoogle;
