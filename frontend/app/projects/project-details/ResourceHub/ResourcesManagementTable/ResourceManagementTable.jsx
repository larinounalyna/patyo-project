import React, { useState } from "react";
import "./ResourceManagementTable.css";

const INITIAL_ROWS = [
  {
    item: "Excavator CAT 320D",
    po: "EQ-7821",
    supplier: { name: "Caterpillar Rentals", initials: "CR" },
    qty: "1 Unit",
    status: "ON SITE",
    statusType: "success",
    pipeline: { maint: 100, insp: 85, deploy: 100 },
    eta: { headline: "Active", sub: "Next maintenance: Mar 15" },
    action: "VIEW LOGS",
  },
  {
    item: "Tower Crane Liebherr 630",
    po: "EQ-7822",
    supplier: { name: "BigLift Equipment", initials: "BL" },
    qty: "1 Unit",
    status: "IN TRANSIT",
    statusType: "info",
    pipeline: { maint: 100, insp: 100, deploy: 40 },
    eta: { headline: "Arriving Feb 18", sub: "Setup scheduled" },
    action: "TRACK",
  },
  {
    item: "Concrete Mixer CME 300",
    po: "EQ-7823",
    supplier: { name: "MixTech Supplies", initials: "MT" },
    qty: "2 Units",
    status: "MAINTENANCE",
    statusType: "neutral",
    pipeline: { maint: 45, insp: 100, deploy: 0 },
    eta: { headline: "Est. Feb 20", sub: "Hydraulic repair" },
    action: "UPDATE",
  },
  {
    item: "Scaffold System Modular",
    po: "EQ-7824",
    supplier: { name: "SafeHeight Co", initials: "SH" },
    qty: "500 Units",
    status: "DELAYED",
    statusType: "danger",
    pipeline: { maint: 100, insp: 0, deploy: 0 },
    eta: { headline: "Late +6 Days", sub: "Supplier delay" },
    action: "EXPEDITE",
  },
];

function AddResourceModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    item: "",
    po: "",
    supplierName: "",
    supplierInitials: "",
    qty: "",
    status: "ON SITE",
    statusType: "success",
    etaHeadline: "",
    etaSub: "",
  });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const statusOptions = [
    { value: "success", label: "On Site" },
    { value: "info", label: "In Transit" },
    { value: "neutral", label: "Maintenance" },
    { value: "danger", label: "Delayed" },
  ];

  const handleAdd = () => {
    if (!form.item.trim()) return;
    const statusLabel =
      statusOptions
        .find((s) => s.value === form.statusType)
        ?.label.toUpperCase() ?? form.status;
    onAdd({
      item: form.item,
      po: form.po,
      supplier: {
        name: form.supplierName,
        initials:
          form.supplierInitials || form.supplierName.slice(0, 2).toUpperCase(),
      },
      qty: form.qty,
      status: statusLabel,
      statusType: form.statusType,
      pipeline: { maint: 0, insp: 0, deploy: 0 },
      eta: { headline: form.etaHeadline, sub: form.etaSub },
      action: "UPDATE",
    });
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(15,23,42,.45)",
        backdropFilter: "blur(3px)",
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "min(500px,100%)",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 18,
          boxShadow: "0 20px 48px rgba(15,23,42,.18)",
          padding: 24,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 20,
            paddingBottom: 14,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 17,
              fontWeight: 700,
              color: "var(--text-1)",
            }}
          >
            Add equipment / resource
          </h3>
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

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              label: "Item name",
              key: "item",
              placeholder: "e.g. Tower Crane Liebherr",
            },
            { label: "PO / ID", key: "po", placeholder: "e.g. EQ-7825" },
            {
              label: "Supplier name",
              key: "supplierName",
              placeholder: "e.g. BigLift Equipment",
            },
            { label: "Quantity", key: "qty", placeholder: "e.g. 1 Unit" },
            {
              label: "ETA headline",
              key: "etaHeadline",
              placeholder: "e.g. Arriving Feb 18",
            },
            {
              label: "ETA detail",
              key: "etaSub",
              placeholder: "e.g. Setup scheduled",
            },
          ].map(({ label, key, placeholder }) => (
            <label
              key={key}
              style={{ display: "flex", flexDirection: "column", gap: 4 }}
            >
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                }}
              >
                {label}
              </span>
              <input
                style={{
                  height: 38,
                  border: "1px solid var(--border)",
                  borderRadius: 9,
                  padding: "0 12px",
                  fontSize: 13.5,
                  fontFamily: "inherit",
                  background: "var(--surface-2)",
                  color: "var(--text-1)",
                  outline: "none",
                }}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </label>
          ))}

          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 600,
                color: "var(--text-3)",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              Status
            </span>
            <select
              style={{
                height: 38,
                border: "1px solid var(--border)",
                borderRadius: 9,
                padding: "0 12px",
                fontSize: 13.5,
                fontFamily: "inherit",
                background: "var(--surface-2)",
                color: "var(--text-1)",
              }}
              value={form.statusType}
              onChange={(e) => set("statusType", e.target.value)}
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 4,
            }}
          >
            <button className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleAdd}>
              Add resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResourceManagementTable() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [showAdd, setShowAdd] = useState(false);

  const pipelines = (row) => [
    { label: "Maint", val: row.pipeline.maint },
    { label: "Insp", val: row.pipeline.insp },
    { label: "Deploy", val: row.pipeline.deploy },
  ];

  return (
    <div className="res-table-box">
      <div className="res-table-header">
        <div>
          <div className="res-table-title">Equipment & Resources Tracking</div>
          <div className="res-table-sub">Status & deployment overview</div>
        </div>
        <button
          className="btn btn-primary"
          style={{ height: 32, fontSize: 12 }}
          onClick={() => setShowAdd(true)}
        >
          + Add resource
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="res-table">
          <thead>
            <tr>
              <th>Equipment / ID</th>
              <th>Supplier</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Pipeline</th>
              <th>Availability / ETA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>
                  <div className="res-item-name">{row.item}</div>
                  <div className="res-item-po">{row.po}</div>
                </td>
                <td>
                  <div className="res-supplier">
                    <div className="supplier-avatar">
                      {row.supplier.initials}
                    </div>
                    <span className="supplier-name">{row.supplier.name}</span>
                  </div>
                </td>
                <td>{row.qty}</td>
                <td>
                  <span className={`res-status-pill ${row.statusType}`}>
                    {row.status}
                  </span>
                </td>
                <td>
                  <div className="pipeline-wrap">
                    {pipelines(row).map(({ label, val }) => (
                      <div key={label} className="pipeline-row">
                        <span className="pipeline-label">{label}</span>
                        <div className="pipeline-track">
                          <div
                            className={`pipeline-fill ${val === 100 ? "complete" : val === 0 ? "zero" : ""}`}
                            style={{ width: `${val}%` }}
                          />
                        </div>
                        <span className="pipeline-pct">{val}%</span>
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="eta-headline">{row.eta.headline}</div>
                  <div className="eta-sub">{row.eta.sub}</div>
                </td>
                <td>
                  <button className="res-action-btn">{row.action}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <AddResourceModal
          onClose={() => setShowAdd(false)}
          onAdd={(r) => setRows((prev) => [...prev, r])}
        />
      )}
    </div>
  );
}
