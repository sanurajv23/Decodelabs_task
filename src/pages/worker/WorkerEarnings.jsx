import AppHeader from "../../components/AppHeader";
import AppShell from "../../components/AppShell";
import BottomNavigation from "../../components/BottomNavigation";
import Toast from "../../components/Toast";
import WorkerDrawer from "../../components/WorkerDrawer";
import { useEffect, useRef, useState } from "react";
import "./WorkerEarnings.css";

const TIMEFRAMES = ["This Month", "Last Month", "Last 3 Months", "Year 2026"];

const CHART_DATA = [
  { month: "March", label: "Mar", height: "50%", amount: "LKR 6,000" },
  { month: "April", label: "Apr", height: "75%", amount: "LKR 9,000" },
  { month: "May", label: "May", height: "92%", amount: "LKR 11,000" },
  { month: "June", label: "Jun", height: "58%", amount: "LKR 7,000" },
  { month: "July", label: "Jul", height: "83%", amount: "LKR 10,000" },
  { month: "August", label: "Aug", height: "100%", amount: "LKR 12,000" },
  { month: "September", label: "Sep", height: "100%", amount: "LKR 28,500" },
];

// Markup and SVG artwork preserved from pages/worker-earnings.html.
export default function WorkerEarnings() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [currentTimeframeIndex, setCurrentTimeframeIndex] = useState(0);
  const [activeMonth, setActiveMonth] = useState("September");
  const toastTimer = useRef(null);
  const mainRef = useRef(null);
  const menuRef = useRef(null);
  const drawerRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — My Earnings";
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

  function handleTimeframeClick(e) {
    e.preventDefault();
    const nextIndex = (currentTimeframeIndex + 1) % TIMEFRAMES.length;
    setCurrentTimeframeIndex(nextIndex);
    const selected = TIMEFRAMES[nextIndex];
    showToast(`Showing earnings for: ${selected}`);
  }

  function handlePendingPaymentClick(e) {
    e.preventDefault();
    showToast("⏳ Pending Payments: LKR 5,000 awaiting customer release");
  }

  function handleBarClick(item) {
    setActiveMonth(item.month);
    showToast(`📊 ${item.month}: Total Earnings ${item.amount}`);
  }

  function handleViewChartDetails(e) {
    e.preventDefault();
    showToast("📈 Peak month: September (LKR 28,500, +12% growth)");
  }

  function handleSeeAllTransactions(e) {
    e.preventDefault();
    showToast("📄 Loading all 12 transaction records...");
  }

  function handleTransactionClick(service, amount) {
    showToast(`Invoice: ${service} (${amount})`);
  }

  return (
    <div className="worker-earnings">
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
          onNotificationClick={() =>
            showToast("🔔 Payment of LKR 2,500 received for AC Repair")
          }
          onLogoClick={scrollToTop}
        />

        {/* MAIN SCROLLABLE VIEWPORT */}
        <main className="main-content" ref={mainRef}>
          {/* PAGE HEADER ROW: TITLE & FILTER */}
          <section
            className="section-header"
            aria-label="Earnings Title and Timeframe"
          >
            <div className="page-title-section">
              <h1 className="page-main-title">My Earnings</h1>
              <p className="page-subtitle">
                Track your income and payment
                <br />
                history
              </p>
            </div>

            <button
              id="periodFilterBtn"
              className="period-filter-btn"
              onClick={handleTimeframeClick}
              aria-label={`Filter timeframe: ${TIMEFRAMES[currentTimeframeIndex]}`}
            >
              <svg
                className="period-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{TIMEFRAMES[currentTimeframeIndex]}</span>
              <span className="period-chevron">&#9660;</span>
            </button>
          </section>

          {/* TOTAL EARNINGS HERO BANNER */}
          <section
            className="earnings-hero-banner"
            aria-label="Total Earnings Summary"
          >
            <div className="earnings-hero-top">
              <span className="earnings-hero-label">Total Earnings</span>
              <a
                href="#pending-details"
                id="pendingPaymentPill"
                className="pending-payment-pill"
                onClick={handlePendingPaymentClick}
                aria-label="Pending Payment: LKR 5,000"
              >
                <svg
                  className="pending-pill-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <line x1="6" y1="12" x2="6" y2="12.01"></line>
                </svg>
                <span>Pending Payment</span>
                <span className="pending-pill-amount">LKR 5,000</span>
                <span className="pending-pill-chevron" aria-hidden="true">
                  &rsaquo;
                </span>
              </a>
            </div>

            <div className="earnings-hero-main-amount">LKR 28,500</div>

            <div className="earnings-hero-footer">
              <span className="earnings-growth-badge">&uarr; +12%</span>
              <span className="earnings-growth-text">
                compared to last month
              </span>
            </div>
          </section>

          {/* PERFORMANCE STATISTICS CARDS */}
          <section
            className="stats-container"
            aria-label="Earnings Performance Stats"
          >
            <div className="stats-grid">
              {/* Card 1: Total Jobs */}
              <div className="stat-card stat-card-jobs stat-card-textonly">
                <span className="stat-icon-wrapper" aria-hidden="true">
                  <svg
                    className="stat-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z" />
                  </svg>
                </span>
                <span className="stat-number">12</span>
                <span className="stat-title">Total Jobs</span>
              </div>

              {/* Card 2: Completed */}
              <div className="stat-card stat-card-completed stat-card-textonly">
                <span className="stat-icon-wrapper" aria-hidden="true">
                  <svg
                    className="stat-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="stat-number">10</span>
                <span className="stat-title">Completed</span>
              </div>

              {/* Card 3: In Progress */}
              <div className="stat-card stat-card-progress stat-card-textonly">
                <span className="stat-icon-wrapper" aria-hidden="true">
                  <svg
                    className="stat-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 16 14" />
                  </svg>
                </span>
                <span className="stat-number">2</span>
                <span className="stat-title">In Progress</span>
              </div>

              {/* Card 4: Pending Payment */}
              <div className="stat-card stat-card-earnings stat-card-textonly">
                <span className="stat-icon-wrapper" aria-hidden="true">
                  <svg
                    className="stat-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 7V6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-1h-9a3 3 0 0 1 0-6h9zm-9 2a1 1 0 0 0 0 2h10V9H11z" />
                  </svg>
                </span>
                <span className="stat-number stat-number-currency">
                  LKR 5,000
                </span>
                <span className="stat-title">Pending Payment</span>
              </div>
            </div>
          </section>

          {/* EARNINGS OVERVIEW (BAR CHART) */}
          <section
            className="earnings-chart-section"
            aria-label="Earnings Overview Chart"
          >
            <div className="section-header">
              <div className="section-title-with-icon">
                <svg
                  className="section-title-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                  <line x1="15" y1="3" x2="15" y2="21"></line>
                </svg>
                <span>Earnings Overview</span>
              </div>
              <a
                href="#view-details"
                className="see-all-link"
                id="viewChartDetailsBtn"
                onClick={handleViewChartDetails}
              >
                View Details
              </a>
            </div>

            <div className="chart-card-container">
              <div className="bar-chart-flex">
                {CHART_DATA.map((item) => {
                  const isActive = activeMonth === item.month;
                  return (
                    <button
                      key={item.month}
                      type="button"
                      className={`chart-bar-column${isActive ? " active" : ""}`}
                      onClick={() => handleBarClick(item)}
                      aria-label={`${item.month}: ${item.amount}`}
                    >
                      <div
                        className="chart-bar-fill"
                        style={{ height: item.height }}
                      ></div>
                      <span className="chart-bar-month">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* RECENT TRANSACTIONS */}
          <section
            className="recent-transactions-section"
            aria-label="Recent Transactions"
          >
            <div className="section-header">
              <div className="section-title-with-icon">
                <svg
                  className="section-title-svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
                <span>Recent Transactions</span>
              </div>
              <a
                href="#see-all-transactions"
                className="see-all-link"
                id="seeAllTransactionsBtn"
                onClick={handleSeeAllTransactions}
              >
                See All
              </a>
            </div>

            <ul className="transactions-list">
              {/* Transaction 1: Home Cleaning */}
              <li
                className="transaction-row-card"
                onClick={() =>
                  handleTransactionClick("Home Cleaning", "+ LKR 2,000")
                }
              >
                <div className="transaction-left-group">
                  <div
                    className="transaction-circle-icon circle-mint"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-4.25v-6h-6.5v6H4.5A1.5 1.5 0 0 1 3 19.5v-9z" />
                    </svg>
                  </div>
                  <div className="transaction-details">
                    <h4 className="transaction-service-name">Home Cleaning</h4>
                    <span className="transaction-customer-meta">
                      From Nadeesha Kumar
                    </span>
                    <time className="transaction-date-meta" dateTime="2026-09-01">
                      1 Sep 2026
                    </time>
                  </div>
                </div>
                <div className="transaction-right-group">
                  <span className="transaction-amount-received">
                    + LKR 2,000
                  </span>
                  <span className="badge-received">Received</span>
                </div>
              </li>
            </ul>
          </section>
        </main>

        {/* BOTTOM FIXED NAVIGATION BAR */}
        <BottomNavigation role="worker" onActiveTabClick={scrollToTop} />
      </AppShell>
    </div>
  );
}
