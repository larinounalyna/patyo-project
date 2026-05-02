"use client";
import React from "react";
import HeadingSection from "./DailyPlanningComponents/jsx/HeadingSection";
import TimeChart from "./DailyPlanningComponents/jsx/TimeChart";
import ToDoCards from "./DailyPlanningComponents/jsx/ToDocards";
import DoneTaskCard from "./DailyPlanningComponents/jsx/DoneCards";
import InProgressCard from "./DailyPlanningComponents/jsx/InProgressCards";
import "./DailyPlanning.css";
import PageSection from "@/components/page_section/page_section";

export default function DailyPlanning() {
  return (
    <div className="daily-planning-page">
      <HeadingSection />

      <TimeChart />

      <div className="board-heading">
        <PageSection sectionName="Today's Tasks" />
      </div>

      <div className="kanban-board">
        <div className="kanban-column">
          <div className="column-header">
            <h3>New</h3>
            <span className="count">3</span>
          </div>
          <div className="column-content">
            <ToDoCards
              wo="#WO-4022"
              badge="DELIVERY"
              title="Grade 80 Rebar Delivery"
              description="5 tons scheduled for West Gate. Coordinate with site security for unloading."
              location="West Gate - Zone A"
              rightIcon="HOT"
            />
            <ToDoCards
              wo="#WO-4009"
              badge="CRITICAL"
              title="Plumbing Leak Pressure Test"
              description="Floor 3 Wing Bravo restrooms and moisture test require."
              location="L3, MEP Crew 2"
              rightIcon="ALERT"
            />
            <div className="add-task-row">
              <button type="button" className="add-task-btn">
                + Add Task
              </button>
            </div>
          </div>
        </div>

        <div className="kanban-column">
          <div className="column-header">
            <h3>In progress</h3>
            <span className="count">1</span>
          </div>
          <div className="column-content">
            <InProgressCard />
            <div className="add-task-row">
              <button type="button" className="add-task-btn">
                + Add Task
              </button>
            </div>
          </div>
        </div>

        <div className="kanban-column">
          <div className="column-header">
            <h3>Review</h3>
            <span className="count">0</span>
          </div>
          <div className="column-content">
            <div className="add-task-row">
              <button type="button" className="add-task-btn">
                + Add Task
              </button>
            </div>
          </div>
        </div>

        <div className="kanban-column">
          <div className="column-header">
            <h3>Done</h3>
            <span className="count">5</span>
          </div>
          <div className="column-content">
            <DoneTaskCard
              wo="#WO-3977"
              title="Site Clearing – Zone A"
              subtitle="Removal of debris after formwork stripping."
              status="VERIFIED"
              completedAt="Completed 09:15 AM"
            />
            <div style={{ marginTop: "16px" }}>
              <DoneTaskCard
                wo="#WO-3953"
                title="Rebar Inspection – L4 Cols"
                subtitle="IR-D25 DFPR1 fld134"
                status="VERIFIED"
                completedAt="Completed 08:45 AM"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
