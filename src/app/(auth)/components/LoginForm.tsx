"use client";
import React, { FC, useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
interface Props {}
const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
const LoginForm: FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: `${window.location.origin}/`,
        redirect: false,
      });
      console.log(res);
      if (res?.ok) {
        push("/");
      } else {
        toast.error(res?.error ?? "Something went wrong. Try again later!");
      }
    } catch (error) {
      console.log("ERROR WHEN LOGIN", error);
    } finally {
      setIsLoading(false);
    }
    // console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="dev@gmail.com" {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*******" {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? <Loader2 className="animate-spin" /> : <span>Sign in</span>}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
