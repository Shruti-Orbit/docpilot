import Hero from "./Hero";
import AICommandCenter from "./AICommandCenter";
import QuickActions from "./QuickActions";
import ContinueWorking from "./ContinueWorking";
import AIStatus from "./AIStatus";
import WorkspaceGrid from "./WorkspaceGrid";
import RecentDocuments from "./RecentDocuments";

// import ActivityTimeline from "./ActivityTimeline";

export default function Home() {
  return (
    <div className="space-y-8">

      {/* Hero */}
      <Hero />

      {/* AI Command Center */}
      <AICommandCenter />

      {/* Quick Actions */}
      <QuickActions />

      {/* Continue Working + AI Status */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ContinueWorking />
        <AIStatus />
      </div>

      {/* Workspaces */}
      <WorkspaceGrid />

      {/* Recent Documents */}
      <RecentDocuments />

      {/* Next Sections */}


      {/* <ActivityTimeline /> */}

    </div>
  );
}