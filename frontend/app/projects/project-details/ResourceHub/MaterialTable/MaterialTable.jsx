import React from "react";
import "./MaterialTable.css";

const rows = [
  {
    item: "Structural Steel Beams (I-Section)",
    po: "PO A-19374",
    supplier: { name: "ArcelorMittal", initials: "AM" },
    qty: "12.5 Tons",
    status: "IN TRANSIT",
    statusType: "info",
    pipeline: { fab: 65, ship: 35, site: 0 },
    eta: { headline: "Delivered Today", sub: "Awaiting unloading" },
    action: "VIEW DETAILS",
  },
  {
    item: "Concrete Mix - Grade C30",
    po: "PO A-19379",
    supplier: { name: "Cemex Ready-Mix", initials: "CM" },
    qty: "450 cu yd",
    status: "ON SITE",
    statusType: "success",
    pipeline: { fab: 100, ship: 100, site: 85 },
    eta: { headline: "Delivered Today", sub: "Awaiting tests" },
    action: "LOG RECEIPT",
  },
  {
    item: "Rebar Grade 60 (16mm)",
    po: "PO A-19412",
    supplier: { name: "Nucor Steel", initials: "NC" },
    qty: "5 Tons",
    status: "ORDERED",
    statusType: "neutral",
    pipeline: { fab: 0, ship: 0, site: 0 },
    eta: { headline: "Est. Oct 25", sub: "Awaiting shipment" },
    action: "MODIFY",
  },
  {
    item: "HVAC Units (Phase 2)",
    po: "PO A-19831",
    supplier: { name: "Trane Tech", initials: "TR" },
    qty: "8 Units",
    status: "DELAYED",
    statusType: "danger",
    pipeline: { fab: 35, ship: 0, site: 0 },
    eta: { headline: "Late +4 Days", sub: "Chain interruption" },
    action: "EXPEDITE",
  },
];

export default function MaterialTable() {
  return (
    <div className="material-table-container">
      <div className="table-header">
        <div className="table-title">Materials Tracking</div>
        <div className="table-subtitle">Status & pipeline overview</div>
      </div>

      <table className="material-table">
        <thead>
          <tr>
            <th>ITEM NAME / ID</th>
            <th>SUPPLIER</th>
            <th>QTY</th>
            <th>STATUS & PIPELINE</th>
            <th>TRACKING / ETA</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <div className="item-info">
                  <div className="item-name">{row.item}</div>
                  <div className="item-id">{row.po}</div>
                </div>
              </td>

              <td>
                <div className="supplier-info">
                  <div className="supplier-avatar">{row.supplier.initials}</div>
                  <div className="supplier-name">{row.supplier.name}</div>
                </div>
              </td>

              <td>
                <div className="qty">{row.qty}</div>
              </td>

              <td>
                <span className={`status ${row.statusType}`}>{row.status}</span>
                <div className="pipeline">
                  <div className="pipeline-item">
                    <span className="pipeline-label">FAB</span>
                    <div className="pipeline-bar">
                      <div
                        className="pipeline-fill warn"
                        style={{ width: `${row.pipeline.fab}%` }}
                      />
                    </div>
                    <span className="pipeline-value">{row.pipeline.fab}%</span>
                  </div>
                  <div className="pipeline-item">
                    <span className="pipeline-label">SHIP</span>
                    <div className="pipeline-bar">
                      <div
                        className="pipeline-fill info"
                        style={{ width: `${row.pipeline.ship}%` }}
                      />
                    </div>
                    <span className="pipeline-value">{row.pipeline.ship}%</span>
                  </div>
                  <div className="pipeline-item">
                    <span className="pipeline-label">SITE</span>
                    <div className="pipeline-bar">
                      <div
                        className="pipeline-fill success"
                        style={{ width: `${row.pipeline.site}%` }}
                      />
                    </div>
                    <span className="pipeline-value">{row.pipeline.site}%</span>
                  </div>
                </div>
              </td>

              <td>
                <div className="eta-info">
                  <div className="eta-main">{row.eta.headline}</div>
                  <div className="eta-sub">{row.eta.sub}</div>
                </div>
              </td>

              <td>
                <button className="action-btn">{row.action}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
