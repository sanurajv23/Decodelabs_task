import AppHeader from "../../components/AppHeader";
import AppShell from "../../components/AppShell";
import BottomNavigation from "../../components/BottomNavigation";
import Toast from "../../components/Toast";
import WorkerDrawer from "../../components/WorkerDrawer";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WorkerHome.css";

// Markup and SVG artwork preserved from pages/worker-home.html.
export default function WorkerHome() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const mainRef = useRef(null);
  const activityRef = useRef(null);
  const menuRef = useRef(null);
  const drawerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — Worker Home";
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
        const controls = drawerRef.current.querySelectorAll('button, a[href]');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
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
  function activateCard(event) {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); event.currentTarget.click(); }
  }
  function scrollToTop(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function scrollToActivity(event) {
    event.preventDefault();
    activityRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return (
    <div className="worker-home">
      <WorkerDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        drawerRef={drawerRef}
        closeRef={closeRef}
        onShowToast={showToast}
      />
      <Toast message={toast} />
      <AppShell inert={drawerOpen}>
        <AppHeader
          role="worker"
          onMenuClick={() => setDrawerOpen(true)}
          menuRef={menuRef}
          drawerOpen={drawerOpen}
          onNotificationClick={() => showToast("🔔 Notification: 1 new message from Tharindu Silva")}
          onLogoClick={scrollToTop}
        />
        <main className="main-content" ref={mainRef}>
      <section className="greeting-section" aria-label="Worker Greeting">
        <h1 className="greeting-title">
          Hello, Nimal! <span className="wave-hand" aria-hidden="true">👋</span>
        </h1>
        <p className="greeting-subtitle">Ready for a productive day?</p>
      </section>
      <section className="hero-banner" aria-label="Promotion and Highlights">
        <div className="hero-content">
          <h2 className="hero-heading">Keep Earning, Keep<br />Growing!</h2>
          <p className="hero-description">
            Complete more jobs and get higher<br />
            ratings from customers.
          </p>
          <Link to="/worker/jobs" id="heroViewJobsBtn" className="hero-cta-btn">
            <span>View Jobs</span>
            <svg aria-hidden="true" className="hero-cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </div>
        <svg aria-hidden="true" className="hero-growth" viewBox="0 0 210 210" fill="none">
          <defs>
            <linearGradient id="growthBase" x1="55" y1="140" x2="120" y2="205" gradientUnits="userSpaceOnUse"><stop stopColor="#edf8ff"/><stop offset="1" stopColor="#74b7ff"/></linearGradient>
            <linearGradient id="growthFace" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#f6fcff"/><stop offset="1" stopColor="#b7ddff"/></linearGradient>
            <linearGradient id="growthSide" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#bce4ff"/><stop offset="1" stopColor="#68a7ff"/></linearGradient>
            <filter id="growthShadow" x="-40%" y="-30%" width="180%" height="190%"><feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0042ce" floodOpacity=".3"/></filter>
          </defs>
          <g filter="url(#growthShadow)">
            <path d="M20 152Q15 146 25 139L88 103Q98 97 109 102L186 133Q195 137 193 146L191 164Q190 171 180 176L143 195Q133 200 120 196L28 175Q18 173 18 165Z" fill="url(#growthBase)"/>
            <path d="M23 140 90 103Q99 99 109 103L184 132Q197 138 184 145L144 168Q134 174 121 170L27 151Q14 148 23 140Z" fill="#c6e7ff"/>
            <path d="m55 121 18 5v32l-18-5z" fill="url(#growthFace)"/><path d="m73 126 13-8v32l-13 8z" fill="url(#growthSide)"/><path d="m55 121 13-8 18 5-13 8z" fill="#effaff"/>
            <path d="m91 105 20 6v56l-20-5z" fill="url(#growthFace)"/><path d="m111 111 13-9v56l-13 9z" fill="url(#growthSide)"/><path d="m91 105 13-8 20 5-13 9z" fill="#effaff"/>
            <path d="m128 85 21 6v86l-21-6z" fill="url(#growthFace)"/><path d="m149 91 13-9v86l-13 9z" fill="url(#growthSide)"/><path d="m128 85 13-8 21 5-13 9z" fill="#effaff"/>
            <path d="M55 98C91 91 123 80 143 38" stroke="#b8ddff" strokeWidth="12" strokeLinecap="round"/>
            <path d="M55 95C91 88 123 77 143 35M127 40l20-13 3 25" stroke="url(#growthFace)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
        <div className="hero-motto">
          <span>Skilled</span>
          <span>Workers</span>
          <span>Build</span>
          <span>Better</span>
          <span>Lives</span>
        </div>
      </section>
      <section className="stats-container" aria-label="Work Performance Statistics">
        <div className="stats-grid">
          <div className="stat-card stat-card-jobs" role="button" tabIndex={0} onKeyDown={activateCard} onClick={() => navigate("/worker/jobs")}>
            <div className="stat-icon-wrapper">
              <svg aria-hidden="true" className="stat-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
              </svg>
            </div>
            <span className="stat-number">12</span>
            <span className="stat-title">Total Jobs</span>
          </div>
          <div className="stat-card stat-card-completed" role="button" tabIndex={0} onKeyDown={activateCard} onClick={() => showToast("📊 Completed: 10")}>
            <div className="stat-icon-wrapper">
              <svg aria-hidden="true" className="stat-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span className="stat-number">10</span>
            <span className="stat-title">Completed</span>
          </div>
          <div className="stat-card stat-card-progress" role="button" tabIndex={0} onKeyDown={activateCard} onClick={() => navigate("/worker/jobs")}>
            <div className="stat-icon-wrapper">
              <svg aria-hidden="true" className="stat-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
            </div>
            <span className="stat-number">2</span>
            <span className="stat-title">In Progress</span>
          </div>
          <div className="stat-card stat-card-earnings" role="button" tabIndex={0} onKeyDown={activateCard} onClick={() => navigate("/worker/earnings")}>
            <div className="stat-icon-wrapper">
              <svg aria-hidden="true" className="stat-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
            <span className="stat-number stat-number-currency">LKR 28,500</span>
            <span className="stat-title">Total Earnings</span>
          </div>
        </div>
      </section>
      <section className="schedule-section" aria-label="Today's Schedule">
        <div className="section-header">
          <h2 className="section-title">Today's Schedule</h2>
          <Link to="/worker/jobs" className="view-all-btn" aria-label="View all scheduled jobs">
            <span>View All</span>
            <svg aria-hidden="true" className="view-all-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </div>
        <article className="job-card" role="link" tabIndex={0} onKeyDown={activateCard} onClick={() => navigate("/worker/jobs")}>
          <div className="job-time-block job-time-highlight">
            <span>10:00 AM</span>
            <span className="time-divider">-</span>
            <span>12:00 PM</span>
          </div>
          <div className="job-details">
            <h3 className="job-title">Electrical Repair</h3>
            <div className="job-meta-row">
              <svg aria-hidden="true" className="meta-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>No. 78, Kandy Road, Colombo 08</span>
            </div>
            <div className="job-meta-row customer-name">
              <svg aria-hidden="true" className="meta-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Tharindu Silva</span>
            </div>
          </div>
          <div className="job-status-wrapper">
            <span className="badge badge-in-progress">
              <span className="badge-dot-green"></span>
              In Progress
            </span>
          </div>
        </article>
      </section>
      <section className="upcoming-section" aria-label="Upcoming Jobs">
        <div className="section-header">
          <h2 className="section-title">Upcoming Jobs</h2>
          <Link to="/worker/jobs" className="view-all-btn" aria-label="View all upcoming jobs">
            <span>View All</span>
            <svg aria-hidden="true" className="view-all-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </div>
        <article className="job-card" role="link" tabIndex={0} onKeyDown={activateCard} onClick={() => navigate("/worker/jobs")}>
          <div className="job-time-block job-time-muted">
            <span className="date-badge">Sat, 6 Sep</span>
            <span>12:00 PM</span>
            <span className="time-divider">-</span>
            <span>1:00 PM</span>
          </div>
          <div className="job-details">
            <h3 className="job-title">AC Repair</h3>
            <div className="job-meta-row">
              <svg aria-hidden="true" className="meta-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>No. 123, Lake Road, Colombo 06</span>
            </div>
            <div className="job-meta-row customer-name">
              <svg aria-hidden="true" className="meta-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Aruna Perera</span>
            </div>
          </div>
          <div className="job-status-wrapper">
            <span className="badge badge-confirmed">
              <svg aria-hidden="true" className="badge-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Confirmed
            </span>
          </div>
        </article>
      </section>
      <section id="recent-activity" ref={activityRef} className="activity-section" aria-label="Recent Worker Activity">
        <div className="section-header">
          <h2 className="section-title">Recent Activity</h2>
          <Link to="#recent-activity" className="view-all-btn" aria-label="View all activity logs" onClick={scrollToActivity}>
            <span>View All</span>
            <svg aria-hidden="true" className="view-all-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </div>
        <ul className="activity-list">
          <li className="activity-item"><Link className="activity-link" to="/worker/earnings">
            <div className="activity-indicator indicator-green" aria-hidden="true"></div>
            <div className="activity-info">
              <h4 className="activity-title">Payment Received</h4>
              <p className="activity-subtitle">Home Cleaning - LKR 2,000</p>
            </div>
            <time className="activity-timestamp" dateTime="2026-09-01">1 Sep 2026</time></Link></li>
          <li className="activity-item"><Link className="activity-link" to="/worker/messages">
            <div className="activity-indicator indicator-blue" aria-hidden="true"></div>
            <div className="activity-info">
              <h4 className="activity-title">New Message</h4>
              <p className="activity-subtitle">Tharindu Silva: "Can you come 10 mins early?"</p>
            </div>
            <time className="activity-timestamp" dateTime="2026-09-01">1 Sep 2026</time></Link></li>
          <li className="activity-item"><Link className="activity-link" to="/worker/profile">
            <div className="activity-indicator indicator-amber" aria-hidden="true"></div>
            <div className="activity-info">
              <h4 className="activity-title">You received a new review</h4>
              <p className="activity-subtitle">"Great work! Very professional."</p>
            </div>
            <time className="activity-timestamp" dateTime="2026-08-31">31 Aug 2026</time></Link></li>
        </ul>
      </section>
    </main>
        <BottomNavigation role="worker" onActiveTabClick={scrollToTop} />
      </AppShell>
    </div>
  );
}
