const serviceIcons = {"ϟ":"electrical","♢":"plumbing","▰":"painting","⌁":"cleaning","✳":"ac"};
import WorkerDrawer from "../../components/WorkerDrawer";
import useNavigationDrawer from "../../components/useNavigationDrawer";
import AppHeader from "../../components/AppHeader";
import AppShell from "../../components/AppShell";
import BottomNavigation from "../../components/BottomNavigation";
import HireMeIcon from "../../components/HireMeIcon";
import Toast from "../../components/Toast";
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

function CustomerHome() {
  const drawer = useNavigationDrawer();
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
      <Toast message={toast} />
      <WorkerDrawer role="customer" isOpen={drawer.isOpen} onClose={drawer.close} drawerRef={drawer.drawerRef} closeRef={drawer.closeRef} onShowToast={showToast} />
      <AppShell inert={drawer.isOpen}>
        <AppHeader
          role="customer"
          onMenuClick={drawer.open}
          menuRef={drawer.menuRef}
          drawerOpen={drawer.isOpen}
          onNotificationClick={() => showToast("You have 1 new notification.")}
          onLogoClick={scrollHomeToTop}
        />

        <main className="main-content" ref={mainRef}>
          <section className="customer-intro">
            <h1>Find the Right<br />Worker for Your Needs</h1>
            <p>Book trusted professionals, anytime.</p>
          </section>

          {/* The original search has no results handler; prevent a full-page reload. */}
          <form className="service-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <label>
              <HireMeIcon name="search" />
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
                  <b className={iconClass}>{serviceIcons[icon] ? <HireMeIcon name={serviceIcons[icon]} size="large" color="inherit" /> : icon}</b><span>{name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="customer-hero">
            <div className="customer-hero-copy">
              <h2>Need a Professional<br />Worker?</h2>
              <p>Get your tasks done quickly and safely<br />with trusted workers.</p>
              <button type="button" onClick={() => showToast("Choose a service to get started.")}>
                Book a Service <HireMeIcon name="chevron" size="medium" color="inherit" />
              </button>
            </div>
            <ul>
              <li><i><HireMeIcon name="verified" size="small" color="inherit" /></i>Verified Workers</li>
              <li><i><HireMeIcon name="clock" size="small" color="inherit" /></i>On-Time Service</li>
              <li><i>☆</i>Quality Work</li>
            </ul>
          </section>

          <section className="customer-section">
            <div className="customer-section-title">
              <h2><span className="section-mark fire">♨</span>Popular Services</h2>
              <Link to="/customer/explore">View All <b><HireMeIcon name="chevron" size="medium" color="inherit" /></b></Link>
            </div>
            <div className="popular-scroll">
              <div className="popular-cards">
                {services.map(([name, type, , price]) => (
                  <Link key={name} className="popular-card" to="/customer/explore">
                    <i className={`service-icon ${type}`}><HireMeIcon name={type} size="large" color="inherit" /></i>
                    <h3>{name}</h3>
                    <p>From LKR {price}</p>
                    <b><HireMeIcon name="chevron" size="medium" color="inherit" /></b>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="customer-section worker-section">
            <div className="customer-section-title">
              <h2><span className="section-mark">★</span>Top Rated Workers</h2>
              <Link to="/customer/explore">View All <b><HireMeIcon name="chevron" size="medium" color="inherit" /></b></Link>
            </div>
            <div className="worker-list">
              {workers.map((worker) => (
                <article key={worker.name} className="customer-worker">
                  <i className={`worker-service ${worker.type}`}><HireMeIcon name={worker.type} size="large" color="inherit" /></i>
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

        <BottomNavigation role="customer" onActiveTabClick={scrollHomeToTop} />
      </AppShell>
    </div>
  );
}

export default CustomerHome;
