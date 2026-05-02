import PageSection from "@/frontend/components/page_section/page_section";
import "./page.css";
import ReportDailyCard from "@/frontend/components/report_card/report_daily_card";
import ReportmeetingCard from "@/frontend/components/report_card/report_meeting_card";
import Calendar from "react-calendar";

function ReportsPage() {
  return (
    <div className="reports-page">
      <PageSection sectionName="Available Reports" />
      <div className="reports-grid">
        <ReportDailyCard />
        <Calendar />
      </div>

      <PageSection sectionName="Meetings" />
      <h3>Meeting Reports</h3>
      <ReportmeetingCard />
    </div>
  );
}

export default ReportsPage;
