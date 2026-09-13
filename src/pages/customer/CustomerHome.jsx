import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./CustomerHome.css";

// Content and icon glyphs from the original pages/customer-home.html.
const categories = [
  ["All Services", "cat-tools", "⚒"],
  ["Electrical", "cat-electric", "ϟ"],
  ["Plumbing", "cat-plumb", "♢"],
  ["Painting", "cat-paint", "▰"],
  ["Cleaning", "cat-clean", "⌁"],
  ["More", "cat-more", "⠿"],
];

const services = [
  ["Electrical Repair", "electrical", "ϟ", "2,500"],
  ["Plumbing Service", "plumbing", "♢", "2,000"],
  ["Painting Service", "painting", "▰", "3,000"],
];

const workers = [
  {
    name: "Suneth Electrical", type: "electrical", icon: "ϟ",
    rating: "4.8", reviews: "120+",
    description: "Electrical Repair • Installations • Maintenance",
  },
  {
    name: "Ruwan Plumbing", type: "plumbing", icon: "♢",
    rating: "4.7", reviews: "98+",
    description: "Plumbing • Pipe Repair • Bathroom Fitting",
  },
  {
    name: "CleanPro Services", type: "cleaning", icon: "⌁",
    rating: "4.6", reviews: "86+",
    description: "Home Cleaning • Office Cleaning • Deep Cleaning",
  },
];

const tabs = [
  ["home", "Home", "⌂"],
  ["explore", "Explore", "⌕"],
  ["bookings", "My Bookings", "▣"],
  ["messages", "Messages", "▰"],
  ["profile", "Profile", "♟"],
];

function CustomerHome() {
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const previousTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const previousViewport = viewport?.getAttribute("content");
    document.title = "HireMe — Home";
    viewport?.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover");

    return () => {
      clearTimeout(toastTimer.current);
      document.title = previousTitle;
      if (viewport) {
        if (previousViewport === null) viewport.removeAttribute("content");
        else viewport.setAttribute("content", previousViewport);
      }
    };
  }, []);

  function showToast(message) {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }

  function selectCategory(category) {
    setSelectedCategory(category);
    showToast(`${category} selected`);
  }

  function scrollHomeToTop(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="customer-home">
      <div className={`app-toast${toast ? " visible" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
      <div className="app-shell">
        <header className="app-header">
          <div className="header-container">
            {/* The source page has a menu button but no drawer markup. */}
            <button type="button" className="menu-btn" aria-label="Open menu" aria-expanded="false">
              <span className="menu-bar" />
              <span className="menu-bar" />
              <span className="menu-bar" />
            </button>
            <Link to="/customer/home" className="brand-logo" aria-label="HireMe home">
              <span>Hire<span className="logo-accent">Me</span></span>
              <span className="brand-tagline">Work. Earn. Grow.</span>
            </Link>
            <div className="header-actions">
              <button type="button" className="notification-btn customer-notification" aria-label="Notifications"
                onClick={() => showToast("You have 1 new notification.")}>
                <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </svg>
                <i />
              </button>
              <Link to="/customer/profile" className="user-avatar-link" aria-label="Customer profile">
                <div className="user-avatar-wrapper">
                  <svg className="avatar-silhouette" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z" />
                  </svg>
                  <span className="online-status-dot" />
                </div>
              </Link>
            </div>
          </div>
        </header>

        <main className="main-content" ref={mainRef}>
          <section className="customer-intro">
            <h1>Find the Right<br />Worker for Your Needs</h1>
            <p>Book trusted professionals, anytime.</p>
          </section>

          {/* The original search has no results handler; prevent a full-page reload. */}
          <form className="service-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <label>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 5 5" />
              </svg>
              <input type="search" placeholder="Search for services..." aria-label="Search for services" />
            </label>
            <button type="button" aria-label="Filter services" onClick={() => showToast("Filters will be available soon.")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M4 7h16M4 17h16M8 7a2 2 0 1 0-4 0 2 2 0 0 0 4 0Zm12 10a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
              </svg>
            </button>
          </form>

          <section className="category-scroll" aria-label="Service categories">
            <div className="categories">
              {categories.map(([name, iconClass, icon]) => (
                <button key={name} type="button" className={`category${selectedCategory === name ? " active" : ""}`}
                  aria-pressed={selectedCategory === name} onClick={() => selectCategory(name)}>
                  <b className={iconClass}>{icon}</b><span>{name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="customer-hero">
            <div className="customer-hero-copy">
              <h2>Need a Professional<br />Worker?</h2>
              <p>Get your tasks done quickly and safely<br />with trusted workers.</p>
              <button type="button" onClick={() => showToast("Choose a service to get started.")}>
                Book a Service <span>›</span>
              </button>
            </div>
            <ul>
              <li><i>♢</i>Verified Workers</li>
              <li><i>◷</i>On-Time Service</li>
              <li><i>☆</i>Quality Work</li>
            </ul>
          </section>

          <section className="customer-section">
            <div className="customer-section-title">
              <h2><span className="section-mark fire">♨</span>Popular Services</h2>
              <Link to="/customer/explore">View All <b>›</b></Link>
            </div>
            <div className="popular-scroll">
              <div className="popular-cards">
                {services.map(([name, type, icon, price]) => (
                  <Link key={name} className="popular-card" to="/customer/explore">
                    <i className={`service-icon ${type}`}>{icon}</i>
                    <h3>{name}</h3>
                    <p>From LKR {price}</p>
                    <b>›</b>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="customer-section worker-section">
            <div className="customer-section-title">
              <h2><span className="section-mark">★</span>Top Rated Workers</h2>
              <Link to="/customer/explore">View All <b>›</b></Link>
            </div>
            <div className="worker-list">
              {workers.map((worker) => (
                <article key={worker.name} className="customer-worker">
                  <i className={`worker-service ${worker.type}`}>{worker.icon}</i>
                  <div>
                    <h3>{worker.name}</h3>
                    <p className="rating">★ {worker.rating} <span>({worker.reviews} reviews)</span></p>
                    <p>{worker.description}</p>
                  </div>
                  <Link to="/customer/explore">View Profile</Link>
                </article>
              ))}
            </div>
          </section>
        </main>

        <nav className="bottom-nav-bar" aria-label="Customer navigation">
          <ul className="bottom-nav-list">
            {tabs.map(([path, label, icon]) => (
              <li key={path}>
                <Link to={`/customer/${path}`} className={`nav-tab-link${path === "home" ? " active" : ""}`}
                  aria-current={path === "home" ? "page" : undefined}
                  onClick={path === "home" ? scrollHomeToTop : undefined}>
                  <span className="nav-icon-box">{icon}</span>
                  <span className="nav-tab-label">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default CustomerHome;
