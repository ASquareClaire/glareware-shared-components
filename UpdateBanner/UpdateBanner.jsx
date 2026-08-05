import "./UpdateBanner.css";

function UpdateBanner({ show, forceReload = false }) {
  if (!show) return null;

  if (forceReload) {
    window.location.reload();
    return null;
  }

  return (
    <div className="update-banner">
      <span>A new version is available.</span>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
}

export default UpdateBanner;