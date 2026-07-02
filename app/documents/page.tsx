import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import DocumentsPage from "@/components/dashboard/documents/DocumentsPage";

export default function Page() {
  return (
    <DashboardLayout>
      <DocumentsPage />
    </DashboardLayout>
  );
}