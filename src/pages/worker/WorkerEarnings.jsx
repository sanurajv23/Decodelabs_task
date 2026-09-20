import AppHeader from "../../components/AppHeader";
import AppShell from "../../components/AppShell";
import BottomNavigation from "../../components/BottomNavigation";
import HireMeIcon from "../../components/HireMeIcon";
import Toast from "../../components/Toast";
import WorkerDrawer from "../../components/WorkerDrawer";
import { useEffect, useRef, useState } from "react";
import "./WorkerEarnings.css";

const TIMEFRAMES = ["This Month", "Last Month", "Last 3 Months", "Year 2026"];

const CHART_DATA = [
  { month: "March", label: "Mar", height: "50%", amount: "LKR 6,000" },
  { month: "April", label: "Apr", height: "75%", amount: "LKR 9,000" },
  { month: "May", label: "May", height: "91.6%", amount: "LKR 11,000" },
  { month: "June", label: "Jun", height: "62.5%", amount: "LKR 7,500" },
  { month: "July", label: "Jul", height: "83.3%", amount: "LKR 10,000" },
  { month: "August", label: "Aug", height: "100%", amount: "LKR 12,000" },
  { month: "September", label: "Sep", height: "104%", amount: "LKR 28,500", isCurrent: true },
];

const Y_AXIS_LABELS = ["12K", "9K", "6K", "3K", "0"];

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
    showToast("📄 Loading all transaction records...");
  }

  function handleTransactionClick(service, amount) {
    showToast(`Invoice: ${service} (${amount})`);
  }

  function handleWithdrawClick(e) {
    e.preventDefault();
    showToast("💸 Withdrawal request initiated for LKR 28,500");
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
            className="page-header-row"
            aria-label="Earnings Title and Timeframe"
          >
            <div className="page-title-section">
              <h1 className="page-main-title">My Earnings</h1>
              <p className="page-subtitle">
                Track your income and payment history
              </p>
            </div>

            <button
              id="periodFilterBtn"
              className="period-filter-btn"
              onClick={handleTimeframeClick}
              aria-label={`Filter timeframe: ${TIMEFRAMES[currentTimeframeIndex]}`}
            >
              <HireMeIcon name="calendar" />
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
                <HireMeIcon name="payment" />
                <span className="pending-pill-label">Pending Payment</span>
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

            {/* Ascending bar decoration on right */}
            <div className="hero-chart-decoration" aria-hidden="true">
              <span className="hero-bar hero-bar-1" />
              <span className="hero-bar hero-bar-2" />
              <span className="hero-bar hero-bar-3" />
              <span className="hero-bar hero-bar-4" />
            </div>
          </section>

          {/* PERFORMANCE STATISTICS CARDS */}
          <section
            className="stats-container"
            aria-label="Earnings Performance Stats"
          >
            <div className="stats-grid">
              {/* Card 1: Total Jobs */}
              <div className="stat-card stat-card-jobs">
                <span className="stat-icon-wrapper" aria-hidden="true">
                  <HireMeIcon name="briefcase" />
                </span>
                <span className="stat-number">12</span>
                <span className="stat-title">Total Jobs</span>
              </div>

              {/* Card 2: Completed */}
              <div className="stat-card stat-card-completed">
                <span className="stat-icon-wrapper" aria-hidden="true">
                  <HireMeIcon name="check" />
                </span>
                <span className="stat-number">10</span>
                <span className="stat-title">Completed</span>
              </div>

              {/* Card 3: In Progress */}
              <div className="stat-card stat-card-progress">
                <span className="stat-icon-wrapper" aria-hidden="true">
                  <HireMeIcon name="clock" />
                </span>
                <span className="stat-number">2</span>
                <span className="stat-title">In Progress</span>
              </div>

              {/* Card 4: Pending Payment */}
              <div className="stat-card stat-card-earnings">
                <span className="stat-icon-wrapper" aria-hidden="true">
                  <HireMeIcon name="wallet" />
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
                <span className="section-title-icon" aria-hidden="true">
                  <HireMeIcon name="chart" />
                </span>
                <span>Earnings Overview</span>
              </div>
              <a
                href="#view-details"
                className="see-all-link"
                id="viewChartDetailsBtn"
                onClick={handleViewChartDetails}
              >
                <span>View Details</span>
                <span className="see-all-arrow" aria-hidden="true">&rsaquo;</span>
              </a>
            </div>

            <div className="chart-card-container">
              <div className="chart-grid-layout">
                {/* Y-Axis Labels Column */}
                <div className="chart-y-axis" aria-hidden="true">
                  {Y_AXIS_LABELS.map((lbl) => (
                    <span key={lbl} className="chart-y-label">
                      {lbl}
                    </span>
                  ))}
                </div>

                {/* Bars Area with Grid Lines */}
                <div className="chart-bars-wrapper">
                  <div className="chart-grid-lines" aria-hidden="true">
                    {Y_AXIS_LABELS.map((lbl) => (
                      <div key={lbl} className="chart-grid-line" />
                    ))}
                  </div>

                  <div className="bar-chart-flex">
                    {CHART_DATA.map((item) => {
                      const isActive = activeMonth === item.month;
                      const isHighlighted = item.isCurrent;
                      return (
                        <button
                          key={item.month}
                          type="button"
                          className={`chart-bar-column${isActive ? " active" : ""}${isHighlighted ? " current-month" : ""}`}
                          onClick={() => handleBarClick(item)}
                          aria-label={`${item.month}: ${item.amount}`}
                        >
                          <div className="chart-bar-track">
                            <div
                              className="chart-bar-fill"
                              style={{ height: item.height }}
                            />
                          </div>
                          <span className="chart-bar-month">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
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
                <span className="section-title-icon" aria-hidden="true">
                  <HireMeIcon name="calendar" />
                </span>
                <span>Recent Transactions</span>
              </div>
              <a
                href="#see-all-transactions"
                className="see-all-link"
                id="seeAllTransactionsBtn"
                onClick={handleSeeAllTransactions}
              >
                <span>See All</span>
                <span className="see-all-arrow" aria-hidden="true">&rsaquo;</span>
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
                    <HireMeIcon name="home" />
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

          {/* WITHDRAW EARNINGS */}
          <section
            className="withdraw-earnings-section"
            aria-label="Withdraw Earnings"
          >
            <div className="withdraw-card">
              <div className="withdraw-left-group">
                <div className="withdraw-circle-icon" aria-hidden="true">
                  <HireMeIcon name="wallet" />
                </div>
                <div className="withdraw-details">
                  <h3 className="withdraw-title">Withdraw Earnings</h3>
                  <p className="withdraw-subtitle">
                    Transfer your earnings to your bank account
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="withdraw-now-btn"
                onClick={handleWithdrawClick}
                aria-label="Withdraw Now"
              >
                <span>Withdraw Now</span>
                <span className="withdraw-btn-arrow" aria-hidden="true">&rsaquo;</span>
              </button>
            </div>
          </section>
        </main>

        {/* BOTTOM FIXED NAVIGATION BAR */}
        <BottomNavigation role="worker" onActiveTabClick={scrollToTop} />
      </AppShell>
    </div>
  );
}
