// "use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CreatePost } from "./components/create-post/CreatePost";
import { Client } from "./components/client/Client";

export default function Home() {
  // const { data, update } = useSession();
  // const { push } = useRouter();
  return (
    <div className="flex-1 flex flex-col">
      <Client />
    </div>
  );
}
