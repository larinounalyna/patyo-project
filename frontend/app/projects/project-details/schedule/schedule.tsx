"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  format,
  setHours,
  setMinutes,
  startOfDay,
  subDays,
} from "date-fns";
import { EventCalendar } from "../../../calendar/event-calendar/components/event-calendar/event-calendar";
import type { CalendarEvent } from "../../../calendar/event-calendar/components/event-calendar/types";
import "./schedule.css";

type ScheduleEvent = CalendarEvent & {
  assignees?: string[];
};

const initialEvents: ScheduleEvent[] = [
  {
    id: "sch-1",
    title: "Excavation Zone A",
    description: "Complete trench and handover for footing setup.",
    start: setMinutes(setHours(subDays(new Date(), 2), 9), 0),
    end: setMinutes(setHours(subDays(new Date(), 2), 12), 0),
    color: "amber",
    location: "North Block",
    assignees: ["Ali", "Sara"],
  },
  {
    id: "sch-2",
    title: "Rebar Assembly",
    description: "Tie and inspect reinforcement before concrete pour.",
    start: setMinutes(setHours(addDays(new Date(), 1), 8), 30),
    end: setMinutes(setHours(addDays(new Date(), 1), 12), 30),
    color: "sky",
    location: "Level 02",
    assignees: ["Omar", "Nour", "Hassan"],
  },
  {
    id: "sch-3",
    title: "Concrete Pour",
    description: "Slab pour and vibration with QA witness.",
    start: setMinutes(setHours(addDays(new Date(), 3), 13), 0),
    end: setMinutes(setHours(addDays(new Date(), 3), 17), 0),
    color: "orange",
    location: "Podium",
    assignees: ["Mina", "Fatma"],
  },
  {
    id: "sch-4",
    title: "Facade Survey",
    description: "Future milestone check with design and site teams.",
    start: addDays(new Date(), 9),
    end: addDays(new Date(), 9),
    allDay: true,
    color: "violet",
    location: "South Elevation",
    assignees: ["Karim", "Nada", "Youssef"],
  },
  {
    id: "sch-5",
    title: "MEP Rough-In",
    description: "Coordinate sleeves and route checks.",
    start: setMinutes(setHours(addDays(new Date(), 15), 10), 0),
    end: setMinutes(setHours(addDays(new Date(), 15), 14), 0),
    color: "emerald",
    location: "Tower B",
    assignees: ["Rami", "Laila"],
  },
];

function LeanLookAheadPanel({ events }: { events: ScheduleEvent[] }) {
  const futureEvents = useMemo(() => {
    const today = startOfDay(new Date());

    return events
      .filter((event) => new Date(event.end) >= today)
      .sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
  }, [events]);

  if (futureEvents.length === 0) {
    return (
      <div className="schedule-lla-empty">
        No upcoming tasks for the look ahead window.
      </div>
    );
  }

  return (
    <div className="schedule-lla-grid">
      {futureEvents.map((event) => (
        <article key={event.id} className="schedule-lla-card">
          <p className="schedule-lla-date">
            {format(new Date(event.start), "EEE, MMM d")}
          </p>
          <h3 className="schedule-lla-title">{event.title}</h3>
          <p className="schedule-lla-meta">
            {event.location ? `${event.location} · ` : ""}
            {event.allDay
              ? "All day"
              : `${format(new Date(event.start), "h:mma")} - ${format(
                  new Date(event.end),
                  "h:mma",
                )}`}
          </p>
          <div className="schedule-lla-workers" aria-label="Assigned workers">
            {(event.assignees || ["Unassigned"]).map((worker) => (
              <span
                key={`${event.id}-${worker}`}
                className="schedule-worker-chip"
              >
                {worker}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function ScheduleModule() {
  const [events, setEvents] = useState<ScheduleEvent[]>(initialEvents);

  const upcomingEvents = useMemo(() => {
    const today = startOfDay(new Date());

    return events
      .filter((event) => new Date(event.end) >= today)
      .sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
  }, [events]);

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, { ...event, assignees: [] }]);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id
          ? { ...updatedEvent, assignees: event.assignees }
          : event,
      ),
    );
  };

  const handleEventDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  return (
    <section className="schedule-module" aria-label="Project schedule">
      <div className="schedule-module-shell">
        <EventCalendar
          events={events}
          onEventAdd={handleEventAdd}
          onEventUpdate={handleEventUpdate}
          onEventDelete={handleEventDelete}
        />
        <LeanLookAheadPanel events={upcomingEvents} />
      </div>
    </section>
  );
}
