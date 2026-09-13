import { Link, useLocation, useNavigate } from "react-router-dom";
import HireMeIcon from "./HireMeIcon";
import { logout } from "../utils/auth";

export default function WorkerDrawer({
  isOpen,
  onClose,
  drawerRef,
  closeRef,
  onShowToast,
  onLogout,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <div
        id="drawerBackdrop"
        className={`drawer-backdrop${isOpen ? " active" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside
        id="offcanvasDrawer"
        className={`offcanvas-drawer${isOpen ? " active" : ""}`}
        ref={drawerRef}
        inert={!isOpen ? true : undefined}
        role="dialog"
        aria-modal={isOpen ? true : undefined}
        aria-label="Worker App Menu"
      >
        <div className="drawer-top-row">
          <div className="brand-logo">
            Hire<span className="logo-accent">Me</span>
          </div>
          <button
            id="drawerCloseBtn"
            ref={closeRef}
            onClick={onClose}
            className="drawer-close-btn"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
        <div className="drawer-user-card">
          <div className="drawer-user-avatar">
            <HireMeIcon name="profile" />
            <span className="online-status-dot" aria-hidden="true"></span>
          </div>
          <div>
            <div className="drawer-user-name">Nimal Perera</div>
            <div className="drawer-user-title">Electrician • Colombo</div>
          </div>
        </div>
        <ul className="drawer-menu-list">
          <li>
            <Link
              to="/worker/home"
              className={`drawer-menu-link${location.pathname === "/worker/home" ? " active" : ""}`}
              onClick={onClose}
            >
              <HireMeIcon name="home" /> Home
            </Link>
          </li>
          <li>
            <Link
              to="/worker/jobs"
              className={`drawer-menu-link${location.pathname === "/worker/jobs" ? " active" : ""}`}
              onClick={onClose}
            >
              <HireMeIcon name="jobs" /> My Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/worker/earnings"
              className={`drawer-menu-link${location.pathname === "/worker/earnings" ? " active" : ""}`}
              onClick={onClose}
            >
              <HireMeIcon name="earnings" /> My Earnings
            </Link>
          </li>
          <li>
            <Link
              to="/worker/messages"
              className={`drawer-menu-link${location.pathname === "/worker/messages" ? " active" : ""}`}
              onClick={onClose}
            >
              <HireMeIcon name="messages" /> Messages
            </Link>
          </li>
          <li>
            <Link
              to="/worker/profile"
              className={`drawer-menu-link${location.pathname === "/worker/profile" ? " active" : ""}`}
              onClick={onClose}
            >
              <HireMeIcon name="profile" /> My Profile
            </Link>
          </li>
          <li className="drawer-separator"></li>
          <li>
            <Link
              to="#settings"
              className="drawer-menu-link"
              onClick={(event) => {
                event.preventDefault();
                onClose();
                onShowToast?.("⚙️ Settings will be available in future releases.");
              }}
            >
              <span>⚙️</span> Settings
            </Link>
          </li>
          <li>
            <Link
              to="#help"
              className="drawer-menu-link"
              onClick={(event) => {
                event.preventDefault();
                onClose();
                onShowToast?.("❓ Help & Support will be available in future releases.");
              }}
            >
              <span>❓</span> Help &amp; Support
            </Link>
          </li>
          <li>
            <Link
              to="#logout"
              className="drawer-menu-link logout-link"
              onClick={(event) => {
                event.preventDefault();
                onClose();
                if (onLogout) {
                  onLogout();
                } else {
                  logout(navigate);
                }
              }}
            >
              <span>🚪</span> Logout
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

