"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useLoginMutation } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, validateUser } from "../../store/slices/userSlice";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/lib/authentication";
import { useEffect } from "react";
import { useToast } from "@/components/hooks/use-toast";
import { loginFailure } from "../../store/slices/userSlice";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export function LoginForm() {
  const isAuthenticated =
    useSelector((state) => state.user.isAuthenticated) || false;
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  async function onSubmit(values) {
    console.log(values);
    try {
      const response = await login(values).unwrap();
      // Dispatch loginSuccess action with the user data
      if (response.token) {
        setAuthToken(response.token);
        dispatch(loginSuccess());
        dispatch(validateUser());
        console.log("Login successful", response);

        // Show success toast with API response message
        toast({
          variant: "success",
          title: "Login Successful",
          description: response.message || "Successfully logged in!",
        });

        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
      dispatch(loginFailure(error.data?.message));

      // Show error toast
      toast({
        variant: "destructive",
        title: "Login Failed",
        description:
          error.data?.message || "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={isLoading} type="submit" className="w-full">
          Login
        </Button>
      </form>
      <div className="mt-4 text-center">
        <Link
          href="/register"
          className="text-sm text-blue-600 hover:underline"
        >
          Don't have an account? Register here
        </Link>
      </div>
    </Form>
  );
}
