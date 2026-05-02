import "./report_card.css";
import Image from "next/image";

function ReportmeetingCard() {
  return (
    <div className="report-daily-card">
      <Image
        className="report-icon"
        src="/report-daily.png"
        alt="Daily Report"
        width={40}
        height={40}
      />
      <div className="report-daily-content">
        <h3>meeting Report</h3>
        <p>description of the daily report blah blah blah </p>
      </div>
    </div>
  );
}

export default ReportmeetingCard;
