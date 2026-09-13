import AppHeader from "../../components/AppHeader";
import AppShell from "../../components/AppShell";
import BottomNavigation from "../../components/BottomNavigation";
import Toast from "../../components/Toast";
import WorkerDrawer from "../../components/WorkerDrawer";
import { useEffect, useRef, useState } from "react";
import "./WorkerJobs.css";

// Markup and SVG artwork preserved from pages/worker-jobs.html.
export default function WorkerJobs() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const toastTimer = useRef(null);
  const mainRef = useRef(null);
  const menuRef = useRef(null);
  const drawerRef = useRef(null);
  const closeRef = useRef(null);

  // Job completion state (for "Mark as Completed" button)
  const [completedJobs, setCompletedJobs] = useState({});

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — My Jobs";
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

  function scrollToTop(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFilterClick(filterKey) {
    setActiveFilter(filterKey);
    const filterNames = { upcoming: "Upcoming", ongoing: "Ongoing", completed: "Completed" };
    showToast(`Showing ${filterNames[filterKey]} jobs`);
  }

  function handleSeeAll(sectionTitle) {
    showToast(`Viewing full list for ${sectionTitle}`);
  }

  function handleReschedule(jobName) {
    showToast(`🗓️ Opening rescheduling calendar for ${jobName}`);
  }

  function handleCancel(jobName) {
    showToast(`⚠️ Cancellation requested for ${jobName}`);
  }

  function handleViewDetails(jobName) {
    showToast(`📋 Opening work order details for ${jobName}`);
  }

  function handleMarkComplete(jobName) {
    setCompletedJobs(prev => ({ ...prev, [jobName]: true }));
    showToast(`🎉 ${jobName} successfully marked as Completed!`);
  }

  function handleViewReview() {
    showToast('⭐ Review by Nadeesha: "Great work! Very professional." (5.0)');
  }

  // Determine which sections to show based on active filter
  const showUpcoming = activeFilter === "upcoming";
  const showOngoing = activeFilter === "upcoming" || activeFilter === "ongoing";
  const showCompleted = activeFilter === "completed";

  return (
    <div className="worker-jobs">
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
          onNotificationClick={() => showToast("🔔 1 upcoming job starting tomorrow at 12:00 PM")}
          onLogoClick={scrollToTop}
        />

        {/* Main Content */}
        <main className="main-content" ref={mainRef}>

          {/* Page Title */}
          <section className="page-title-section" aria-label="My Jobs Title">
            <h1 className="page-main-title">My Jobs</h1>
            <p className="page-subtitle">Manage your job requests and appointments</p>
          </section>

          {/* Filter Tabs */}
          <nav className="filter-tabs-container" aria-label="Filter Jobs by Status">
            <ul className="filter-tabs-list">
              <li>
                <button className={`filter-tab-btn${activeFilter === "upcoming" ? " active" : ""}`} onClick={() => handleFilterClick("upcoming")}>Upcoming (2)</button>
              </li>
              <li>
                <button className={`filter-tab-btn${activeFilter === "ongoing" ? " active" : ""}`} onClick={() => handleFilterClick("ongoing")}>Ongoing (1)</button>
              </li>
              <li>
                <button className={`filter-tab-btn${activeFilter === "completed" ? " active" : ""}`} onClick={() => handleFilterClick("completed")}>Completed (10)</button>
              </li>
            </ul>
          </nav>

          {/* Section 1: Upcoming Jobs */}
          {showUpcoming && (
            <section className="jobs-group-section" id="upcomingSection" aria-label="Upcoming Jobs">
              <div className="section-header">
                <h2 className="section-title">Upcoming Jobs (2)</h2>
                <a href="#see-all-upcoming" className="see-all-link" onClick={(e) => { e.preventDefault(); handleSeeAll("Upcoming Jobs (2)"); }}>See All</a>
              </div>

              <div className="jobs-cards-stack">

                {/* Card 1: AC Repair */}
                <article className="job-card-detailed">
                  <div className="job-card-header">
                    <div className="service-icon-box icon-box-ac">
                      <svg className="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="2" x2="12" y2="22"></line>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                        <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"></line>
                      </svg>
                    </div>
                    <div className="job-card-body">
                      <div className="job-card-top-row">
                        <h3 className="job-service-heading">AC Repair</h3>
                        <span className="badge badge-confirmed">Confirmed</span>
                      </div>
                      <div className="job-meta-row-item">
                        <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>Aruna Perera</span>
                      </div>
                      <div className="job-meta-row-item">
                        <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>Sat, 6 Sep 2026</span>
                      </div>
                      <div className="job-meta-row-item">
                        <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>12:00 PM - 1:00 PM</span>
                      </div>
                      <div className="job-meta-row-item">
                        <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                        </svg>
                        <span>No. 123, Lake Road, Colombo 06</span>
                      </div>
                    </div>
                  </div>
                  <div className="job-actions-row">
                    <button className="job-action-btn btn-outline-blue btn-reschedule" onClick={() => handleReschedule("AC Repair")}>
                      <svg className="job-action-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>Reschedule</span>
                    </button>
                    <button className="job-action-btn btn-outline-red btn-cancel" onClick={() => handleCancel("AC Repair")}>
                      <svg className="job-action-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5M14 11v5"></path>
                      </svg>
                      <span>Cancel</span>
                    </button>
                  </div>
                </article>

                {/* Card 2: Plumbing Service */}
                <article className="job-card-detailed">
                  <div className="job-card-header">
                    <div className="service-icon-box icon-box-plumbing">
                      <svg className="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2c0 3-4 6-4 9a4 4 0 0 0 8 0c0-3-4-6-4-9z"></path>
                        <path d="M6 16c0 2 2 3 4 3s4-1 4-3"></path>
                      </svg>
                    </div>
                    <div className="job-card-body">
                      <div className="job-card-top-row">
                        <h3 className="job-service-heading">Plumbing Service</h3>
                        <span className="badge badge-confirmed">Confirmed</span>
                      </div>
                      <div className="job-meta-row-item">
                        <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>Sanduni Fernando</span>
                      </div>
                      <div className="job-meta-row-item">
                        <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>Sun, 7 Sep 2026</span>
                      </div>
                      <div className="job-meta-row-item">
                        <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>3:00 PM - 5:00 PM</span>
                      </div>
                      <div className="job-meta-row-item">
                        <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                        </svg>
                        <span>No. 45, Galle Road, Dehiwala</span>
                      </div>
                    </div>
                  </div>
                  <div className="job-actions-row">
                    <button className="job-action-btn btn-outline-blue btn-reschedule" onClick={() => handleReschedule("Plumbing Service")}>
                      <svg className="job-action-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>Reschedule</span>
                    </button>
                    <button className="job-action-btn btn-outline-red btn-cancel" onClick={() => handleCancel("Plumbing Service")}>
                      <svg className="job-action-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5M14 11v5"></path>
                      </svg>
                      <span>Cancel</span>
                    </button>
                  </div>
                </article>

              </div>
            </section>
          )}

          {/* Section 2: Ongoing Jobs */}
          {showOngoing && (
            <section className="jobs-group-section" id="ongoingSection" aria-label="Ongoing Jobs">
              <div className="section-header">
                <h2 className="section-title">Ongoing Jobs (1)</h2>
                <a href="#see-all-ongoing" className="see-all-link" onClick={(e) => { e.preventDefault(); handleSeeAll("Ongoing Jobs (1)"); }}>See All</a>
              </div>

              <article className="job-card-detailed">
                <div className="job-card-header">
                  <div className="service-icon-box icon-box-electrical">
                    <svg className="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2c0 3-4 6-4 9a4 4 0 0 0 8 0c0-3-4-6-4-9z"></path>
                      <path d="M6 16c0 2 2 3 4 3s4-1 4-3"></path>
                    </svg>
                  </div>
                  <div className="job-card-body">
                    <div className="job-card-top-row">
                      <h3 className="job-service-heading">Electrical Repair</h3>
                      <span className={`badge ${completedJobs["Electrical Repair"] ? "badge-completed" : "badge-in-progress"}`}>
                        {completedJobs["Electrical Repair"] ? "Completed" : "In Progress"}
                      </span>
                    </div>
                    <div className="job-meta-row-item">
                      <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span>Tharindu Silva</span>
                    </div>
                    <div className="job-meta-row-item">
                      <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>Mon, 8 Sep 2026</span>
                    </div>
                    <div className="job-meta-row-item">
                      <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>10:00 AM - 12:00 PM</span>
                    </div>
                    <div className="job-meta-row-item">
                      <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                      </svg>
                      <span>No. 78, Kandy Road, Colombo 08</span>
                    </div>
                  </div>
                </div>
                <div className="job-actions-row">
                  <button className="job-action-btn btn-outline-blue btn-details" onClick={() => handleViewDetails("Electrical Repair")}>
                    <svg className="job-action-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                    <span>View Details</span>
                  </button>
                  <button
                    className="job-action-btn btn-solid-green btn-complete"
                    onClick={() => handleMarkComplete("Electrical Repair")}
                    disabled={!!completedJobs["Electrical Repair"]}
                    style={completedJobs["Electrical Repair"] ? { backgroundColor: "#15803D", borderColor: "#15803D" } : undefined}
                  >
                    <svg className="job-action-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{completedJobs["Electrical Repair"] ? "Completed" : "Mark as Completed"}</span>
                  </button>
                </div>
              </article>
            </section>
          )}

          {/* Section 3: Completed Jobs */}
          {showCompleted && (
            <section className="jobs-group-section" id="completedSection" aria-label="Completed Jobs">
              <div className="section-header">
                <h2 className="section-title">Completed Jobs (10)</h2>
                <a href="#see-all-completed" className="see-all-link" onClick={(e) => { e.preventDefault(); handleSeeAll("Completed Jobs (10)"); }}>See All</a>
              </div>

              <article className="job-card-detailed">
                <div className="job-card-header">
                  <div className="service-icon-box icon-box-cleaning">
                    <svg className="service-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <div className="job-card-body">
                    <div className="job-card-top-row">
                      <h3 className="job-service-heading">Home Cleaning</h3>
                      <span className="badge badge-completed">Completed</span>
                    </div>
                    <div className="job-meta-row-item">
                      <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span>Nadeesha Kumar</span>
                    </div>
                    <div className="job-meta-row-item">
                      <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>Mon, 1 Sep 2026</span>
                    </div>
                    <div className="job-meta-row-item">
                      <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>10:00 AM - 12:00 PM</span>
                    </div>
                    <div className="job-meta-row-item">
                      <svg className="job-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                      </svg>
                      <span>No. 56, Flower Road, Colombo 07</span>
                    </div>
                  </div>
                </div>
                <div className="job-actions-row">
                  <button className="job-action-btn btn-outline-blue btn-details" onClick={() => handleViewDetails("Home Cleaning")}>
                    <svg className="job-action-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"></line>
                      <line x1="8" y1="12" x2="21" y2="12"></line>
                      <line x1="8" y1="18" x2="21" y2="18"></line>
                      <line x1="3" y1="6" x2="3.01" y2="6"></line>
                      <line x1="3" y1="12" x2="3.01" y2="12"></line>
                      <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                    <span>View Details</span>
                  </button>
                  <button className="job-action-btn btn-outline-blue btn-review" onClick={handleViewReview}>
                    <svg className="job-action-btn-icon" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>View Review</span>
                  </button>
                </div>
              </article>
            </section>
          )}

        </main>

        {/* Bottom Navigation */}
        <BottomNavigation role="worker" onActiveTabClick={scrollToTop} />
      </AppShell>
    </div>
  );
}
