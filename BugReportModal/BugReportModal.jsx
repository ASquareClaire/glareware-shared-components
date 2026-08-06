import { useState } from "react";
import "./BugReportModal.css";

function BugReportModal({ gameMode, formspreeEndpoint }) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;
    if (!formspreeEndpoint) {
      console.error("BugReportModal: no formspreeEndpoint prop provided");
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          email: email || "(not provided)",
          // Auto-included context - saves the player from having to describe
          // their setup, and gives you what you actually need to reproduce it.
          version: __APP_VERSION__,
          gameMode,
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setDescription("");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function handleClose() {
    setOpen(false);
    setStatus("idle");
  }

  if (!open) {
    return (
      <button className="bug-report-toggle" onClick={() => setOpen(true)}>
        Report a bug
      </button>
    );
  }

  return (
    <div className="bug-report-overlay" onClick={handleClose}>
      <div className="bug-report-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Report a bug</h2>

        {status === "sent" ? (
          <>
            <p className="bug-report-thanks">Thanks - got it!</p>
            <button className="bug-report-btn bug-report-btn--secondary" onClick={handleClose}>
              Close
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="What happened?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
            <input
              type="email"
              placeholder="Your email (optional, if you'd like a reply)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {status === "error" && (
              <p className="bug-report-error">Something went wrong - mind trying again?</p>
            )}
            <div className="bug-report-actions">
              <button
                type="submit"
                className="bug-report-btn bug-report-btn--primary"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send"}
              </button>
              <button
                type="button"
                className="bug-report-btn bug-report-btn--secondary"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default BugReportModal;