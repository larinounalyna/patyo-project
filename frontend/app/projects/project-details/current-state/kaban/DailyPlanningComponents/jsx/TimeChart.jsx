import React, { useState } from "react";
import "../css/TimeChart.css";

export default function TimeChart() {
  const [timeWindow, setTimeWindow] = useState("48h");

  const tasks = [
    {
      row: "Crew A - Level 4",
      tasks: [
        {
          title: "Team Kickoff (Ren & Joe)",
          color: "#5d8be0",
          start: 0,
          width: 30,
        },
      ],
    },
    {
      row: "Crew B - Zone 2",
      tasks: [
        {
          title: "Steel Assembly (TM-04)",
          color: "#eeaf53",
          start: 35,
          width: 25,
        },
      ],
    },
    {
      row: "Inspections/Teams",
      tasks: [{ title: "Meeting etc", color: "#58b998", start: 20, width: 15 }],
    },
  ];

  const getTimeSlots = () => {
    switch (timeWindow) {
      case "24h":
        return [{ label: "TODAY (OCT 24)", hours: 24 }];
      case "48h":
        return [
          { label: "TODAY (OCT 24)", hours: 24 },
          { label: "TOMORROW (OCT 25)", hours: 24 },
        ];
      case "week":
        return [
          { label: "MON (OCT 24)", hours: 24 },
          { label: "TUE (OCT 25)", hours: 24 },
          { label: "WED (OCT 26)", hours: 24 },
          { label: "THU (OCT 27)", hours: 24 },
          { label: "FRI (OCT 28)", hours: 24 },
          { label: "SAT (OCT 29)", hours: 24 },
          { label: "SUN (OCT 30)", hours: 24 },
        ];
      default:
        return [];
    }
  };

  const timeSlots = getTimeSlots();
  const slotWidth =
    timeWindow === "week" ? 160 : timeWindow === "48h" ? 260 : 320;

  return (
    <div className="time-chart-container">
      <div className="time-chart-header">
        <div className="chart-controls">
          <div className="time-window-selector">
            <button
              className={`time-btn ${timeWindow === "48h" ? "active" : ""}`}
              onClick={() => setTimeWindow("48h")}
            >
              48h
            </button>
            <button
              className={`time-btn ${timeWindow === "week" ? "active" : ""}`}
              onClick={() => setTimeWindow("week")}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      <div className="gantt-chart">
        <div className="gantt-sidebar">
          <div className="sidebar-header">CREW / ZONE</div>
          {tasks.map((item, idx) => (
            <div key={idx} className="sidebar-row">
              {item.row}
            </div>
          ))}
        </div>

        <div className="gantt-timeline-wrapper">
          <div
            className="gantt-timeline"
            style={{
              minWidth: `${timeSlots.length * slotWidth}px`,
              ["--slot-width"]: `${slotWidth}px`,
            }}
          >
            <div className="timeline-header">
              {timeSlots.map((slot, idx) => (
                <div key={idx} className="timeline-day">
                  {slot.label}
                </div>
              ))}
            </div>

            <div className="gantt-rows">
              {tasks.map((item, idx) => (
                <div key={idx} className="gantt-row">
                  <div className="gantt-track">
                    {item.tasks.map((task, taskIdx) => (
                      <div
                        key={taskIdx}
                        className="gantt-task"
                        style={{
                          left: `${task.start}%`,
                          width: `${task.width}%`,
                          backgroundColor: task.color,
                        }}
                      >
                        <span className="task-label">{task.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
