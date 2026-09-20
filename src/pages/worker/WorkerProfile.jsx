import { HireMeIconArtwork } from "../../components/HireMeIcon";
import AppHeader from "../../components/AppHeader";
import AppShell from "../../components/AppShell";
import BottomNavigation from "../../components/BottomNavigation";
import Toast from "../../components/Toast";
import WorkerDrawer from "../../components/WorkerDrawer";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getCurrentUser, getProfile } from "../../utils/auth";
import "./WorkerProfile.css";

// Markup and SVG artwork preserved from pages/worker-profile.html.
export default function WorkerProfile() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const workerProfile = getProfile("worker");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  const toastTimer = useRef(null);
  const mainRef = useRef(null);
  const menuRef = useRef(null);
  const drawerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — My Profile";
    viewport?.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover");
    return () => {
      clearTimeout(toastTimer.current);
      document.title = oldTitle;
      if (viewport) {
        if (oldViewport === null) viewport.removeAttribute("content");
        else viewport.setAttribute("content", oldViewport);
      }
    };
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const oldOverflow = document.body.style.overflow;
    const menuButton = menuRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function handleKey(event) {
      if (event.key === "Escape") setDrawerOpen(false);
      if (event.key === "Tab") {
        const controls = drawerRef.current.querySelectorAll("button, a[href]");
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", handleKey);
      menuButton?.focus();
    };
  }, [drawerOpen]);

  function showToast(message) {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }

  function scrollToTop(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleStatusToggle() {
    const nextStatus = !isOnline;
    setIsOnline(nextStatus);
    if (nextStatus) {
      showToast("🟢 Status set to Online: You are visible to customers");
    } else {
      showToast("⚪ Status set to Offline: You will not receive immediate job alerts");
    }
  }

  function handleLogout() {
    logout(navigate);
  }

  return (
    <div className="worker-profile">
      <WorkerDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        drawerRef={drawerRef}
        closeRef={closeRef}
        onShowToast={showToast}
        onLogout={handleLogout}
      />
      <Toast message={toast} />
      <AppShell inert={drawerOpen}>
        <AppHeader
          role="worker"
          onMenuClick={() => setDrawerOpen(true)}
          menuRef={menuRef}
          drawerOpen={drawerOpen}
          isOnline={isOnline}
          statusTitle={isOnline ? "Online" : "Offline"}
          onNotificationClick={() =>
            showToast("🔔 Your profile was viewed by 14 customers this week")
          }
          onLogoClick={scrollToTop}
        />

        {/* MAIN SCROLLABLE VIEWPORT */}
        <main className="main-content" ref={mainRef}>
          <div className="profile-rebuild">
            {/* PAGE HEADING */}
            <section className="profile-page-heading" aria-label="Profile Page Title">
              <h1 className="page-main-title">My Profile</h1>
              <p className="page-subtitle">Manage your account and settings</p>
            </section>

            {/* PROFILE SUMMARY CARD */}
            <section className="profile-summary-card" aria-label="Worker profile summary">
              <div className="profile-card-top">
                <div className="profile-avatar-large" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z" />
                  </svg>
                </div>
                <div className="profile-primary-info">
                  <h2 className="profile-worker-name">{user.fullName}</h2>
                  <span className="profile-worker-role">{workerProfile.category || "Worker"}</span>
                  <div className="profile-rating-row">
                    <span>★ 4.8</span>
                    <span className="profile-rating-reviews">(24 reviews)</span>
                  </div>
                  <span
                    className="profile-status-pill"
                    onClick={handleStatusToggle}
                    style={{ cursor: "pointer" }}
                    title="Click to toggle status"
                  >
                    <span
                      className="profile-status-dot"
                      style={
                        isOnline
                          ? { backgroundColor: "#05aa76" }
                          : { backgroundColor: "#94A3B8" }
                      }
                    >
                      {isOnline ? "✓" : "○"}
                    </span>
                    {isOnline ? "Verified • Online" : "Verified • Offline"}
                  </span>
                </div>
                <button
                  id="editProfileBtn"
                  className="btn-edit-profile"
                  onClick={() => showToast("✏️ Opening Profile Editor...")}
                  aria-label="Edit Profile"
                >
                  <svg
                    className="edit-icon-svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  ><HireMeIconArtwork name="edit" /></svg>
                  Edit Profile
                </button>
              </div>
            </section>

            {/* PROFILE STATS */}
            <section className="profile-stats" aria-label="Profile statistics">
              <div className="profile-stat">
                <span className="profile-stat-icon jobs" aria-hidden="true">
                  ▣
                </span>
                <div>
                  <strong>12</strong>
                  <span>Total Jobs</span>
                </div>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-icon complete" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <strong>10</strong>
                  <span>Completed</span>
                </div>
              </div>
              <div className="profile-stat">
                <span className="profile-stat-icon earnings" aria-hidden="true">
                  ▣
                </span>
                <div>
                  <strong className="earnings-amount">LKR 28,500</strong>
                  <span>Total Earnings</span>
                </div>
              </div>
            </section>

            {/* PROFILE SETTINGS MENU */}
            <section className="profile-menu" aria-label="Profile settings">
              <a
                href="#personal-info"
                className="account-menu-item"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Navigating to Personal Information");
                }}
              >
                <span className="profile-menu-icon person" aria-hidden="true">
                  ●
                </span>
                <span className="account-menu-details">
                  <b>Personal Information</b>
                  <small>Update your personal details</small>
                </span>
                <i aria-hidden="true">›</i>
              </a>
              <a
                href="#work-details"
                className="account-menu-item"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Navigating to Work Details");
                }}
              >
                <span className="profile-menu-icon work" aria-hidden="true">
                  ▣
                </span>
                <span className="account-menu-details">
                  <b>Work Details</b>
                  <small>Manage your skills and services</small>
                </span>
                <i aria-hidden="true">›</i>
              </a>
              <a
                href="#documents"
                className="account-menu-item"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Navigating to Documents");
                }}
              >
                <span className="profile-menu-icon documents" aria-hidden="true">
                  ▤
                </span>
                <span className="account-menu-details">
                  <b>Documents</b>
                  <small>Upload and manage your documents</small>
                </span>
                <i aria-hidden="true">›</i>
              </a>
              <a
                href="#verification"
                className="account-menu-item"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Navigating to Verification");
                }}
              >
                <span className="profile-menu-icon verification" aria-hidden="true">
                  ♢
                </span>
                <span className="account-menu-details">
                  <b>Verification</b>
                  <small>KYC and identity verification</small>
                </span>
                <i aria-hidden="true">›</i>
              </a>
              <a
                href="#notifications"
                className="account-menu-item"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Navigating to Notifications");
                }}
              >
                <span className="profile-menu-icon notifications" aria-hidden="true">
                  ♟
                </span>
                <span className="account-menu-details">
                  <b>Notifications</b>
                  <small>Manage your notification preferences</small>
                </span>
                <i aria-hidden="true">›</i>
              </a>
              <a
                href="#settings"
                className="account-menu-item"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Navigating to Settings");
                }}
              >
                <span className="profile-menu-icon settings" aria-hidden="true">
                  ⚙
                </span>
                <span className="account-menu-details">
                  <b>Settings</b>
                  <small>App settings and preferences</small>
                </span>
                <i aria-hidden="true">›</i>
              </a>
              <a
                href="#help-support"
                className="account-menu-item"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Navigating to Help & Support");
                }}
              >
                <span className="profile-menu-icon help" aria-hidden="true">
                  ?
                </span>
                <span className="account-menu-details">
                  <b>Help &amp; Support</b>
                  <small>Get help and contact support</small>
                </span>
                <i aria-hidden="true">›</i>
              </a>
              <button
                id="profileLogoutBtn"
                type="button"
                className="account-menu-item logout-menu"
                onClick={handleLogout}
              >
                <span className="profile-menu-icon logout" aria-hidden="true">
                  ⇥
                </span>
                <span className="account-menu-details">
                  <b>Logout</b>
                  <small>Sign out from your account</small>
                </span>
                <i aria-hidden="true">›</i>
              </button>
            </section>
          </div>
        </main>

        {/* BOTTOM FIXED NAVIGATION BAR */}
        <BottomNavigation role="worker" onActiveTabClick={scrollToTop} />
      </AppShell>
    </div>
  );
}
