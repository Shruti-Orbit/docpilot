"use client";

import Link from "next/link";
import { Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";

import AuthCard from "@/components/ui/AuthCard";
import Divider from "@/components/ui/Divider";
import GoogleButton from "@/components/ui/GoogleButton";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";

const signupSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupData) => {
    setLoading(true);

    console.log(data);

    setTimeout(() => {
      toast.success("Account Created Successfully 🎉");
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-violet-50 p-10">
      <AuthCard
        title="Create Account"
        subtitle="Join DocPilot AI and get started."
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            icon={User}
            {...register("fullName")}
            error={errors.fullName?.message}
          />

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

          <PasswordField
            label="Confirm Password"
            placeholder="Confirm your password"
            register={register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <button
            disabled={loading}
            className="h-14 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 font-semibold text-white transition hover:scale-[1.02]"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <Divider />

          <GoogleButton />

          <p className="text-center text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-violet-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </AuthCard>
    </section>
  );
}