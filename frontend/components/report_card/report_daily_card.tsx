import "./report_card.css";
import Link from "next/link";
import Image from "next/image";

function ReportDailyCard() {
  return (
    <Link
      href="/projects/project-details/reports/daily"
      className="report-card-link"
    >
      <div className="report-daily-card">
        <Image
          className="report-icon"
          src="/report-daily.png"
          alt="Daily Report"
          width={40}
          height={40}
        />
        <div className="report-daily-content">
          <h3>Daily Report</h3>
          <p>description of the daily report blah blah blah </p>
        </div>
      </div>
    </Link>
  );
}

export default ReportDailyCard;
