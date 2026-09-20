import { Link, useLocation } from "react-router-dom";
import HireMeIcon from "./HireMeIcon";
import Logo from "./Logo";
import NotificationButton from "./NotificationButton";

export default function AppHeader({
  role,
  onMenuClick,
  menuRef,
  drawerOpen = false,
  onNotificationClick,
  notificationAriaLabel = "Notifications",
  onLogoClick,
  profileTo,
  homeTo,
  avatarAriaLabel,
  onBackClick,
  backAriaLabel = "Back",
  isOnline = true,
  statusTitle,
}) {
  const location = useLocation();
  const effectiveRole =
    role || (location.pathname.startsWith("/customer") ? "customer" : "worker");
  const isWorker = effectiveRole === "worker";

  const defaultHome = isWorker ? "/worker/home" : "/customer/home";
  const defaultProfile = isWorker ? "/worker/profile" : "/customer/profile";
  const defaultAvatarLabel = isWorker
    ? "My Profile"
    : "Customer profile";

  return (
    <header className="app-header">
      <div className="header-container">
        {onBackClick ? (
          <button
            type="button"
            className="chat-back-btn"
            onClick={onBackClick}
            aria-label={backAriaLabel}
          >
            <HireMeIcon name="back" />
          </button>
        ) : (
          <button
            id={isWorker ? "hamburgerMenuBtn" : undefined}
            ref={menuRef}
            type="button"
            onClick={onMenuClick}
            aria-controls={isWorker || menuRef ? "offcanvasDrawer" : undefined}
            className="menu-btn"
            aria-label={isWorker ? "Open Navigation Menu" : "Open menu"}
            aria-expanded={isWorker || menuRef ? drawerOpen : "false"}
          >
            <HireMeIcon name="menu" />
          </button>
        )}

        <Logo
          to={homeTo || defaultHome}
          onClick={onLogoClick}
          ariaLabel={isWorker ? "HireMe Home" : "HireMe home"}
        />

        <div className="header-actions">
          <NotificationButton
            onClick={onNotificationClick}
            aria-label={notificationAriaLabel}
          />
          <Link
            to={profileTo || defaultProfile}
            className="user-avatar-link"
            aria-label={avatarAriaLabel || defaultAvatarLabel}
          >
            <div className="user-avatar-wrapper">
              <HireMeIcon name="profile" />
              <span
                className="online-status-dot"
                title={statusTitle || (isOnline ? "Online" : "Offline")}
                aria-label={statusTitle || (isOnline ? "Online" : "Offline")}
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
