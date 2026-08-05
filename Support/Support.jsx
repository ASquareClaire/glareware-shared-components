import "./Support.css";

const SUPPORT_LINKS = {
  koFi: "https://ko-fi.com/asquareclaire",
  paypal: "https://paypal.me/ASquareClaire",
  venmo: "https://venmo.com/ASquareClaire",
  // patreon: "https://patreon.com/...",
};

function Support() {
  return (
    <div className="support-card">
      <span className="support-card__label">💛 Support this project 💛</span>
      <div className="support-card__links">
        <div className="support-card__row">
          <a className="support-link" href={SUPPORT_LINKS.koFi} target="_blank" rel="noopener noreferrer">
            Ko-fi
          </a>
        </div>
        <div className="support-card__row">
          <a className="support-link" href={SUPPORT_LINKS.paypal} target="_blank" rel="noopener noreferrer">
            PayPal
          </a>
        </div>
        <div className="support-card__row">
          <a className="support-link" href={SUPPORT_LINKS.venmo} target="_blank" rel="noopener noreferrer">
            Venmo
          </a>
        </div>
      </div>
    </div>
  );
}

export default Support;