import { schoolInfo } from "../../data/mockData";

export default function Logo({ light = false, compact = false }) {
  return (
    <div className="ea-logo">
      <img src="/Excellence School.jpg" alt={schoolInfo.shortName} className="ea-logo-crest" />
      {!compact && (
        <div className="ea-logo-text">
          <span className={`ea-logo-name ${light ? "text-white" : ""}`}>{schoolInfo.shortName}</span>
          <span className="ea-logo-sub">{schoolInfo.tagline}</span>
        </div>
      )}
    </div>
  );
}
