import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import LoginForm from "../components/LoginForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
import LoginGoogle from "../components/LoginGoogle";
interface Props {}

const page: NextPage<Props> = (props) => {
  return (
    <div className="w-full h-full flex flex-col p-10">
      <Button asChild className="w-fit self-end" variant={"ghost"}>
        <Link href={"/register"}>Register</Link>
      </Button>
      <div className="w-full h-full  flex flex-col justify-center items-center text-foreground max-w-md mx-auto">
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="font-bold text-2xl">Sign in to Twitter copy</div>
          <div className="text-muted-foreground text-lg">
            Enter your email and password to login
          </div>
          <LoginForm />
          <div className="flex items-center w-full relative justify-center">
            <div className="absolute w-full">
              <Separator className="" />
            </div>
            <div className="py-1 px-4 text-sm bg-background relative">
              <span className="text-muted-foreground">OR CONTINUE WITH</span>
            </div>
          </div>
          <div className="w-full">
            <LoginGoogle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
