import LoginHero from "@/components/auth/LoginHero";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen grid lg:grid-cols-2 overflow-hidden">
      {/* Left Side */}
      <LoginHero />

      {/* Right Side */}
      <LoginForm />
    </main>
  );
}