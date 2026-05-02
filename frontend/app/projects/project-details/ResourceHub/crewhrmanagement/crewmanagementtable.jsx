import React, { useState } from "react";
import "./crewmanagementtable.css";
import MemberInfo from "./memberinfo";

const INITIAL_DATA = [
  {
    name: "James Wilson",
    id: "CP-7721",
    role: "Lead Structural Welder",
    dept: "Steel Operations",
    status: "Active On-Site",
    statusType: "active",
    skills: ["AWS Certified", "OSHA 30"],
    project: "River North Tower",
    phase: "Phase 2 — Structure",
    action: "Manage",
  },
  {
    name: "Sarah Chen",
    id: "CP-8842",
    role: "Site Safety Manager",
    dept: "Quality & Compliance",
    status: "Action Required",
    statusType: "warning",
    skills: ["First Aid Expired", "+2 More"],
    project: "Central Hub Plaza",
    phase: "Administrative",
    action: "Update Certs",
  },
  {
    name: "Marcus Knight",
    id: "CP-3109",
    role: "Excavation Lead",
    dept: "Groundworks",
    status: "Unassigned",
    statusType: "inactive",
    skills: ["Heavy Mach Op", "CDL-A"],
    project: "None — Awaiting Dispatch",
    phase: "",
    action: "Assign Task",
  },
  {
    name: "Elena Rodriguez",
    id: "CP-4411",
    role: "Journeyman Electrician",
    dept: "MEP Division",
    status: "Active On-Site",
    statusType: "active",
    skills: ["High Voltage", "Blueprints"],
    project: "Eastside Medical Ctr",
    phase: "LV Systems",
    action: "View Logs",
  },
];

function AddCrewModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    dept: "",
    status: "Active On-Site",
    statusType: "active",
    project: "",
    phase: "",
    skills: "",
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleAdd = () => {
    if (!form.name.trim()) return;
    onAdd({
      ...form,
      id: `CP-${Math.floor(1000 + Math.random() * 9000)}`,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      action: "Manage",
    });
    onClose();
  };

  return (
    <div className="crew-add-modal-overlay" onClick={onClose}>
      <div className="crew-add-modal" onClick={(e) => e.stopPropagation()}>
        <div className="crew-add-modal-header">
          <h3>Add crew member</h3>
          <button
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--surface-2)",
              color: "var(--text-3)",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="crew-add-form">
          {[
            {
              label: "Full name",
              key: "name",
              placeholder: "e.g. James Wilson",
            },
            {
              label: "Role / title",
              key: "role",
              placeholder: "e.g. Lead Structural Welder",
            },
            {
              label: "Department",
              key: "dept",
              placeholder: "e.g. Steel Operations",
            },
            {
              label: "Assigned project",
              key: "project",
              placeholder: "e.g. River North Tower",
            },
            {
              label: "Phase",
              key: "phase",
              placeholder: "e.g. Phase 2 — Structure",
            },
            {
              label: "Skills (comma-separated)",
              key: "skills",
              placeholder: "e.g. AWS Certified, OSHA 30",
            },
          ].map(({ label, key, placeholder }) => (
            <label key={key} className="crew-form-label">
              <span className="crew-form-label-text">{label}</span>
              <input
                className="crew-form-input"
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
              />
            </label>
          ))}

          <label className="crew-form-label">
            <span className="crew-form-label-text">Availability status</span>
            <select
              className="crew-form-select"
              value={form.statusType}
              onChange={(e) => {
                const map = {
                  active: "Active On-Site",
                  warning: "Action Required",
                  inactive: "Unassigned",
                };
                set("statusType", e.target.value);
                set("status", map[e.target.value]);
              }}
            >
              <option value="active">Active On-Site</option>
              <option value="warning">Action Required</option>
              <option value="inactive">Unassigned</option>
            </select>
          </label>

          <div className="crew-modal-actions">
            <button className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleAdd}>
              Add member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CrewTable() {
  const [data, setData] = useState(INITIAL_DATA);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = (member) => setData((prev) => [...prev, member]);

  return (
    <div className="crew-wrapper">
      <div className={`crew-table-box`}>
        {/* Header */}
        <div className="crew-table-header">
          <div>
            <div className="crew-table-title">Human Resource Tracking</div>
            <div className="crew-table-sub">
              Crew status & assignment overview
            </div>
          </div>
          <button
            className="btn btn-primary"
            style={{ height: 32, fontSize: 12 }}
            onClick={() => setShowAddModal(true)}
          >
            + Add member
          </button>
        </div>

        <table className="crew-table">
          <thead>
            <tr>
              <th>Crew Member</th>
              <th>Role & Department</th>
              <th>Status</th>
              <th>Skills & Certs</th>
              <th>Assigned Project</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((member) => (
              <tr
                key={member.id}
                className={`crew-row ${selectedMember?.id === member.id ? "selected" : ""}`}
                onClick={() => setSelectedMember(member)}
              >
                <td>
                  <div className="cell-member">
                    <div className="cell-avatar">{member.name.charAt(0)}</div>
                    <div>
                      <div className="cell-name">{member.name}</div>
                      <div className="cell-id">{member.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cell-role">{member.role}</div>
                  <div className="cell-dept">{member.dept}</div>
                </td>
                <td>
                  <span className={`status-pill ${member.statusType}`}>
                    {member.status}
                  </span>
                </td>
                <td>
                  <div className="skill-tags">
                    {member.skills.map((s, i) => (
                      <span key={i} className="skill-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="cell-project">{member.project}</div>
                  {member.phase && (
                    <div className="cell-phase">{member.phase}</div>
                  )}
                </td>
                <td>
                  <button
                    className="crew-action-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {member.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MemberInfo
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      {showAddModal && (
        <AddCrewModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
