import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import Home from "@/components/dashboard/home/Home";
import AuthGuard from "@/components/auth/AuthGuard";

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <Home />
      </DashboardLayout>
    </AuthGuard>
  );
}