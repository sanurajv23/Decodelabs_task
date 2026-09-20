import HireMeIcon from "./HireMeIcon";
import "./NotificationButton.css";

export default function NotificationButton({ onClick, "aria-label": ariaLabel = "Notifications" }) {
  return (
    <button
      id="notificationBtn"
      type="button"
      className="notification-btn"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <HireMeIcon name="notifications" size="action" />
      {/* Existing headers all show a static unread indicator, with no count state. */}
      <span className="notification-badge" aria-hidden="true" />
    </button>
  );
}
