"use client";

import { useEffect, useState } from "react";

import Hero from "./Hero";
import AICommandCenter from "./AICommandCenter";
import QuickActions from "./QuickActions";
import ContinueWorking from "./ContinueWorking";
import AIStatus from "./AIStatus";
import WorkspaceGrid from "./WorkspaceGrid";
import RecentDocuments from "./RecentDocuments";

import { getDashboard } from "@/services/dashboard.service";

export default function Home() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <Hero data={dashboard} />

      <AICommandCenter />

      <QuickActions />

      <div className="grid gap-6 lg:grid-cols-2">
        <ContinueWorking data={dashboard} />
        <AIStatus />
      </div>

      <WorkspaceGrid />

      <RecentDocuments />
    </div>
  );
}