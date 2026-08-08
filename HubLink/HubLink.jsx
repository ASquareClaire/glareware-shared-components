import './HubLink.css';

function HubLink() {
  return (
    <a
      href="https://starkravingarcade.com"
      className="hub-link"
      aria-label="Back to Stark Raving Arcade"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
+        <rect x="3" y="7" width="18" height="10" rx="1.5" />
+        <line x1="7.5" y1="9.5" x2="7.5" y2="14.5" />
+        <line x1="5" y1="12" x2="10" y2="12" />
+        <circle cx="15.5" cy="10" r="0.9" fill="currentColor" stroke="none" />
+        <circle cx="18" cy="12.5" r="0.9" fill="currentColor" stroke="none" />
+      </svg>
    </a>
  );
}

export default HubLink;