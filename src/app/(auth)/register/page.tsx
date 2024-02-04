import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import RegisterForm from "../components/RegisterForm";
import { Separator } from "@/components/ui/separator";
import LoginGoogle from "../components/LoginGoogle";
interface Props {}

const page: NextPage<Props> = (props) => {
  return (
    <div className="w-full h-full flex flex-col p-5 xs:p-10">
      <Button asChild className="w-fit self-end" variant={"ghost"}>
        <Link href={"/login"}>Login</Link>
      </Button>
      <div className="w-full h-full  flex flex-col justify-center items-center text-foreground max-w-md mx-auto">
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="font-bold text-xl xs:text-2xl">Create a new account</div>
          <RegisterForm />
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
