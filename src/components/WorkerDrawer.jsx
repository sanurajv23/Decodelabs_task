import { Link, useLocation, useNavigate } from "react-router-dom";
import HireMeIcon from "./HireMeIcon";
import Logo from "./Logo";
import { getRole, getCurrentUser, getProfile, logout } from "../utils/auth";
import "./CustomerDrawer.css";
import "./WorkerDrawer.css";

const CUSTOMER_MENU = [
  { path: "/customer/home", icon: "home", label: "Home" },
  { path: "/customer/explore", icon: "explore", label: "Explore" },
  { path: "/customer/bookings", icon: "bookings", label: "My Bookings" },
  { path: "/customer/messages", icon: "messages", label: "Messages" },
  { path: "/customer/profile", icon: "profile", label: "Profile" },
];

function getWorkerSubtitle() {
  try {
    const profile = getProfile("worker");
    const parts = [profile.category, profile.area].filter(Boolean);
    return parts.length ? parts.join(" • ") : "Worker";
  } catch {
    return "Worker";
  }
}

export default function WorkerDrawer({
  isOpen,
  onClose,
  drawerRef,
  closeRef,
  onShowToast,
  onLogout,
  role,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isCustomer =
    role === "customer" ||
    (role !== "worker" &&
      (location.pathname.startsWith("/customer") || getRole() === "customer"));

  const user = getCurrentUser();

  return (
    <>
      <div
        id="drawerBackdrop"
        className={`drawer-backdrop${isCustomer ? " customer-drawer-backdrop" : ""}${isOpen ? " active" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside
        id="offcanvasDrawer"
        className={`offcanvas-drawer${isCustomer ? " customer-drawer" : ""}${isOpen ? " active" : ""}`}
        ref={drawerRef}
        inert={!isOpen ? true : undefined}
        role="dialog"
        aria-modal={isOpen ? true : undefined}
        aria-label={isCustomer ? "Customer App Menu" : "Worker App Menu"}
      >
        <div className="drawer-top-row">
          <Logo />
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
            <div className="drawer-user-name">{user.fullName}</div>
            <div className="drawer-user-title">
              {isCustomer ? "Your HireMe account" : getWorkerSubtitle()}
            </div>
          </div>
        </div>
        <ul className="drawer-menu-list">
          {isCustomer ? CUSTOMER_MENU.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`drawer-menu-link${location.pathname === item.path ? " active" : ""}`}
                aria-current={location.pathname === item.path ? "page" : undefined}
                onClick={onClose}
              >
                <HireMeIcon name={item.icon} /> {item.label}
              </Link>
            </li>
          )) : <>
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
          </>}
          <li className="drawer-separator"></li>
          <li>
            <Link
              to="#settings"
              className="drawer-menu-link"
              onClick={(event) => {
                event.preventDefault();
                onClose();
                onShowToast?.(isCustomer ? "Settings will be available in future releases." : "⚙️ Settings will be available in future releases.");
              }}
            >
              {isCustomer ? <HireMeIcon name="settings" /> : <span>⚙️</span>} Settings
            </Link>
          </li>
          <li>
            <Link
              to="#help"
              className="drawer-menu-link"
              onClick={(event) => {
                event.preventDefault();
                onClose();
                onShowToast?.(isCustomer ? "Help & Support will be available in future releases." : "❓ Help & Support will be available in future releases.");
              }}
            >
              {isCustomer ? <HireMeIcon name="help" /> : <span>❓</span>} Help &amp; Support
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
              {isCustomer ? <HireMeIcon name="logout-arrow" /> : <span>🚪</span>} Logout
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
}
