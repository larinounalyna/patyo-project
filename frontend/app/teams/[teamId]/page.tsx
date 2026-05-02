import { notFound } from "next/navigation";
import Sidebar from "@/frontend/components/sidebar/sidebar";
import PageTitle from "@/frontend/components/page_title/page_title";
import { findTeamById } from "../teams-data";
import "./page.css";

type TeamDetailsPageProps = {
  params: Promise<{ teamId: string }>;
};

export default async function TeamDetailsPage({
  params,
}: TeamDetailsPageProps) {
  const { teamId } = await params;
  const id = Number(teamId);

  if (!Number.isFinite(id)) {
    notFound();
  }

  const team = findTeamById(id);

  if (!team) {
    notFound();
  }

  return (
    <div className="team-details-shell app-shell">
      <Sidebar />

      <main className="team-details-content app-content">
        <div className="team-details-header">
          <PageTitle
            title={team.name}
            precedingTitle={[{ label: "Teams", href: "/teams" }]}
          />
          <div className="team-details-actions">
            <button type="button" className="primary-btn">
              + Add Member
            </button>
          </div>
        </div>

        <section className="team-overview-card" aria-label="Team overview">
          <p className="team-focus-text">{team.focus}</p>

          <div className="team-overview-grid">
            <div className="overview-item">
              <span className="overview-label">Lead</span>
              <span className="overview-value">{team.lead}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Department</span>
              <span className="overview-value">{team.department}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Location</span>
              <span className="overview-value">{team.location}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">Status</span>
              <span
                className={`overview-status ${team.status.toLowerCase().replace(" ", "-")}`}
              >
                {team.status}
              </span>
            </div>
          </div>
        </section>

        <div className="team-details-sections">
          <section className="details-card" aria-label="Active projects">
            <h2>Active Projects</h2>
            <ul className="details-list">
              {team.activeProjects.map((project) => (
                <li key={project}>{project}</li>
              ))}
            </ul>
          </section>

          <section className="details-card" aria-label="Team members">
            <h2>Members</h2>
            <div className="members-grid">
              {team.members.map((member, index) => (
                <div key={`${member}-${index}`} className="member-row">
                  <span className="member-avatar">{member}</span>
                  <div className="member-info">
                    <p>Member {index + 1}</p>
                    <span>Updated {team.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
