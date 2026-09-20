import { Link, useLocation } from "react-router-dom";
import HireMeIcon from "./HireMeIcon";
import "./CustomerBottomNavigation.css";

const WORKER_TABS = [
  { path: "/worker/home", icon: "home", label: "Home" },
  { path: "/worker/jobs", icon: "jobs", label: "Jobs" },
  { path: "/worker/earnings", icon: "earnings", label: "Earnings" },
  { path: "/worker/messages", icon: "messages", label: "Messages" },
  { path: "/worker/profile", icon: "profile", label: "Profile" },
];

const CUSTOMER_TABS = [
  { path: "/customer/home", icon: "home", label: "Home" },
  { path: "/customer/explore", icon: "explore", label: "Explore" },
  { path: "/customer/bookings", icon: "bookings", label: "My Bookings" },
  { path: "/customer/messages", icon: "messages", label: "Messages" },
  { path: "/customer/profile", icon: "profile", label: "Profile" },
];

export default function BottomNavigation({
  role,
  onActiveTabClick,
}) {
  const location = useLocation();
  const effectiveRole =
    role || (location.pathname.startsWith("/customer") ? "customer" : "worker");
  const isWorker = effectiveRole === "worker";
  const tabs = isWorker ? WORKER_TABS : CUSTOMER_TABS;
  const ariaLabel = isWorker
    ? "Application Bottom Navigation"
    : "Customer navigation";

  return (
    <nav className={`bottom-nav-bar${isWorker ? "" : " customer-bottom-navigation"}`} aria-label={ariaLabel}>
      <ul className="bottom-nav-list">
        {tabs.map((tab) => {
          const isActive =
            location.pathname === tab.path ||
            (tab.path !== "/worker/home" &&
              tab.path !== "/customer/home" &&
              location.pathname.startsWith(tab.path));

          return (
            <li key={tab.path} className="nav-tab-item">
              <Link
                to={tab.path}
                className={`nav-tab-link${isActive ? " active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => {
                  if (isActive && onActiveTabClick) {
                    onActiveTabClick(e, tab.path);
                  }
                }}
              >
                <div className="nav-icon-box">
                  <HireMeIcon name={tab.icon} />
                </div>
                <span className="nav-tab-label">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function WorkerBottomNavigation(props) {
  return <BottomNavigation role="worker" {...props} />;
}

export function CustomerBottomNavigation(props) {
  return <BottomNavigation role="customer" {...props} />;
}
