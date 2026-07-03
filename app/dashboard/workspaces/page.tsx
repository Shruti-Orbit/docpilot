import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import WorkspaceGrid from "@/components/dashboard/home/WorkspaceGrid";

export default function WorkspacesPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <WorkspaceGrid />
      </DashboardLayout>
    </AuthGuard>
  );
}
