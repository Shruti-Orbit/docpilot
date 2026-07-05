"use client";

import { useEffect, useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import AICommandCenter from "@/components/dashboard/home/AICommandCenter";
import { getDashboard } from "@/services/dashboard.service";

export default function UploadPage() {
  type DashboardData = {
    recentDocuments?: {
      _id: string;
      originalName: string;
    }[];
  };

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getDashboard()
      .then((response) => {
        if (active) {
          setDashboard(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AuthGuard>
      <DashboardLayout>
        {loading ? (
          <div className="py-24 text-center text-slate-500">
            Loading Dashboard...
          </div>
        ) : (
          <AICommandCenter data={dashboard} />
        )}
      </DashboardLayout>
    </AuthGuard>
  );
}
