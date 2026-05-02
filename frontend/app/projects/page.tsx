"use client";

import { useMemo, useState } from "react";
import CreateProjectButton from "@/components/create_project_button/create_projectbutton";
import "./page.css";
import PageTitle from "@/components/page_title/page_title";
import PageNavigationList from "@/components/page_navigation/page_navigation";
import Sidebar from "@/components/sidebar/sidebar";
import SearchBar from "@/components/search-bar/search-bar";
import PageSection from "@/components/page_section/page_section";
import ReadyTemplateCards from "@/components/ready_template_cards/ready_template_cards";
import ProjectCard from "@/components/project_card/project_card";

type Project = {
  id: number;
  name: string;
  description: string;
  teamId: number;
  cover?: string;
  status?: string;
  members?: string[];
};

type ProjectsListProps = {
  projectList?: Project[];
  hasProjects?: boolean;
  isSearching?: boolean;
};

function emptyProjects() {
  return (
    <div>
      <div className="projects-empty">
        <h2>No Project Yet</h2>
        <p>
          This page will show your working projects once you create or are added
          to one
        </p>
        <CreateProjectButton />
      </div>

      <PageSection sectionName="Ready templates" />
      <div className="projects-templates">
        <ReadyTemplateCards
          projectName="Project Management Template"
          projectDescription="Kickstart your project with our comprehensive project management template, designed to help you plan, execute, and track your projects efficiently."
          projecticon="/file.svg"
        />

        <ReadyTemplateCards
          projectName="Project Management Template"
          projectDescription="Kickstart your project with our comprehensive project management template, designed to help you plan, execute, and track your projects efficiently."
          projecticon="/file.svg"
        />

        <ReadyTemplateCards
          projectName="Project Management Template"
          projectDescription="Kickstart your project with our comprehensive project management template, designed to help you plan, execute, and track your projects efficiently."
          projecticon="/file.svg"
        />
      </div>
    </div>
  );
}

function ProjectsList({
  projectList = [],
  hasProjects = true,
}: ProjectsListProps) {
  if (!hasProjects) {
    return emptyProjects();
  }

  return (
    <div className="projects-list">
      <div className="new-project-card">
        <div className="new-project-icon" aria-hidden="true">
          +
        </div>
        <p className="new-project-text">
          New ideas?
          <br />
          Create a new project!
        </p>
        <CreateProjectButton />
      </div>

      {projectList.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);

  const projectList = useMemo<Project[]>(
    () => [
      {
        id: 1,
        name: "Title Number",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet pretium sit odio non.",
        teamId: 101,
        cover: "/file.svg",
        status: "Active",
        members: ["AL", "SN", "MR"],
      },
      {
        id: 2,
        name: "Title Number",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dolor, ullamcorper amet dolor donec.",
        teamId: 102,
        cover: "/file.svg",
        status: "Active",
        members: ["YN", "RT", "EA"],
      },
      {
        id: 3,
        name: "Title Number",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquet pretium sit odio non.",
        teamId: 103,
        cover: "/file.svg",
        status: "Active",
        members: ["BD", "KM", "LU"],
      },
    ],
    [],
  );

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return projectList;
    }

    return projectList.filter((project) => {
      const searchable = [project.name, project.description, project.status]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(q);
    });
  }, [projectList, searchQuery]);

  return (
    <div className="projects-page-shell app-shell">
      <Sidebar />
      <div className="projects-content app-content">
        <div className="projects-header page-header-block">
          <PageTitle title="Projects" />
          <div className="projects-header-navigation">
            <div className="project-navigation">
              <PageNavigationList
                pageList={[
                  { pageName: "Recently Viewed", pageref: 1 },
                  { pageName: "In progress projects", pageref: 2 },
                  { pageName: "Complete Projects", pageref: 3 },
                ]}
                activePage={activePage}
                onPageClick={setActivePage}
              />
            </div>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
        <ProjectsList
          projectList={filteredProjects}
          hasProjects={projectList.length > 0}
        />
      </div>
    </div>
  );
}

export default Projects;
