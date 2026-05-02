"use client";
import "./page.css";
import CurrentState from "./current-state/current-state";
import PageNavigationList from "@/components/page_navigation/page_navigation";
import { useState } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import PageTitle from "@/components/page_title/page_title";
import ResourceHubPage from "./ResourceHub/ResourceHubPage";
import ReportsPage from "./reports/page";
import ScheduleModule from "./schedule/schedule";

function handleNavigation(index: number) {
  if (index === 0) {
    return <CurrentState />;
  } else if (index === 1) {
    return <ScheduleModule />;
  } else if (index === 2) {
    return <ReportsPage />;
  } else if (index === 3) {
    return (
      <div>
        <ResourceHubPage />
      </div>
    );
  }
}

function ProjectDetailsPage() {
  const [activePage, setActivePage] = useState(0);

  const handlePageClick = (index: number) => {
    setActivePage(index);
  };

  return (
    <div className="project-details-page">
      <div className="project-details-navigation-row">
        <PageNavigationList
          pageList={[
            { pageName: "Current State", pageref: 0 },
            { pageName: "Schedule", pageref: 1 },
            { pageName: "Reports", pageref: 2 },
            { pageName: "Resources", pageref: 3 },
          ]}
          activePage={activePage}
          onPageClick={handlePageClick}
        />

        <div
          className="project-people-actions"
          aria-label="Project team actions"
        >
          <div className="project-team-avatars" aria-hidden="true">
            <span className="project-avatar-chip">AL</span>
            <span className="project-avatar-chip">SN</span>
            <span className="project-avatar-chip">MR</span>
            <span className="project-avatar-chip extra">+1</span>
          </div>
          <button type="button" className="project-add-people-btn">
            + Add people
          </button>
        </div>
      </div>
      {handleNavigation(activePage)}
    </div>
  );
}

function renderPageContent() {
  return (
    <div className="project-details-shell app-shell">
      <Sidebar />
      <div className="project-details-content app-content">
        <div className="project-details-header page-header-block">
          <PageTitle
            title="Project Name"
            precedingTitle={[{ label: "Projects", href: "/projects" }]}
          />
          <ProjectDetailsPage />
        </div>
      </div>
    </div>
  );
}

export default renderPageContent;
