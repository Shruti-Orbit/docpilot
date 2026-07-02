import LoginHero from "@/components/auth/LoginHero";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      <LoginHero />
      <SignupForm />
    </main>
  );
}