"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AuthCard from "@/components/ui/AuthCard";
import Divider from "@/components/ui/Divider";
import GoogleButton from "@/components/ui/GoogleButton";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setLoading(true);

    console.log(data);

    setTimeout(() => {
      toast.success("Welcome Back 🚀");
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-violet-50 p-10">

      <AuthCard
        title="Welcome Back"
        subtitle="Login to continue to DocPilot AI."
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
            {...register("email")}
            error={errors.email?.message}
          />

          <PasswordField
            label="Password"
            placeholder="Enter your password"
            register={register("password")}
            error={errors.password?.message}
          />

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm font-medium text-violet-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            disabled={loading}
            className="h-14 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 font-semibold text-white transition hover:scale-[1.02]"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <Divider />

          <GoogleButton />

          <p className="text-center text-slate-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-violet-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </AuthCard>
    </section>
  );
}