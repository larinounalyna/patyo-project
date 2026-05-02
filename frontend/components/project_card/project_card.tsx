import Image from "next/image";
import Link from "next/link";
import "./project_card.css";

type Project = {
  id: number;
  name: string;
  description: string;
  teamId: number;
  cover?: string;
  status?: string;
  members?: string[];
};

function ProjectCard({ project }: { project: Project }) {
  const members = project.members ?? [];

  return (
    <div className="project-card">
      <Link
        href={"/projects/project-details"}
        className="project-link"
        aria-label={`View details for ${project.name}`}
      >
        <div className="project-cover-wrap">
          <Image
            className="project-cover"
            src={project.cover ?? "/file.svg"}
            alt="Project cover"
            width={420}
            height={180}
          />
        </div>

        <div className="project-status">
          <span className="project-status-dot" aria-hidden="true"></span>
          <span>{project.status ?? "Active"}</span>
        </div>

        <h2 className="project-name">{project.name}</h2>
        <p className="project-description">{project.description}</p>

        {members.length > 0 && (
          <div className="project-members" aria-label="Project members">
            {members.map((member, index) => (
              <span key={member + index} className="member-chip">
                {member}
              </span>
            ))}
          </div>
        )}
      </Link>
    </div>
  );
}

export default ProjectCard;
