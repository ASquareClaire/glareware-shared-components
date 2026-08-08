import './HubLink.css';

function HubLink() {
  return (
    <a
      href="https://starkravingarcade.com"
      className="hub-link"
      aria-label="Back to Stark Raving Arcade"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="10" rx="5" />
        <line x1="7" y1="10" x2="7" y2="14" />
        <line x1="5" y1="12" x2="9" y2="12" />
        <circle cx="15" cy="10.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="13" r="1" fill="currentColor" stroke="none" />
      </svg>
    </a>
  );
}

export default HubLink;