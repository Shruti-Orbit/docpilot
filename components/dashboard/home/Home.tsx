"use client";

import { useEffect, useState } from "react";

import Hero from "./Hero";
import AICommandCenter from "./AICommandCenter";
import QuickActions from "./QuickActions";
import ContinueWorking from "./ContinueWorking";
import WorkspaceGrid from "./WorkspaceGrid";
import RecentDocuments from "./RecentDocuments";

import { getDashboard } from "@/services/dashboard.service";

export default function Home() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ============================
  // Fetch Dashboard
  // ============================

  const fetchDashboard = async () => {
    try {
      const response = await getDashboard();
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Initial Load
  // ============================

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-500">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Hero */}
      <Hero data={dashboard} />

      {/* AI Command Center */}
      <AICommandCenter data={dashboard} />

      {/* Quick Actions */}
      <QuickActions refreshDashboard={fetchDashboard} />

      {/* Continue Working + AI Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ContinueWorking data={dashboard} />
        {/* <AIStatus /> */}
      </div>

      {/* Workspace */}
      <WorkspaceGrid />

      {/* Recent Documents */}
      <RecentDocuments />

    </div>
  );
}
