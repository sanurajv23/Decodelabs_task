import WorkerDrawer from "../../components/WorkerDrawer";
import useNavigationDrawer from "../../components/useNavigationDrawer";
import AppHeader from "../../components/AppHeader";
import AppShell from "../../components/AppShell";
import BottomNavigation from "../../components/BottomNavigation";
import HireMeIcon from "../../components/HireMeIcon";
import Toast from "../../components/Toast";
import { useEffect, useRef, useState } from "react";
import "./CustomerExplore.css";

function CustomerExplore() {
  const drawer = useNavigationDrawer();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const previousTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const previousViewport = viewport?.getAttribute("content");
    document.title = "HireMe — Explore Services";
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

  function matchesService(category, text) {
    return (selectedCategory === "all" || selectedCategory === category)
      && text.toLowerCase().includes(query.toLowerCase());
  }

  function scrollToTop(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="customer-explore">
      <Toast message={toast} />
      <WorkerDrawer role="customer" isOpen={drawer.isOpen} onClose={drawer.close} drawerRef={drawer.drawerRef} closeRef={drawer.closeRef} onShowToast={showToast} />
      <AppShell inert={drawer.isOpen}>
        <AppHeader
          role="customer"
          onMenuClick={drawer.open}
          menuRef={drawer.menuRef}
          drawerOpen={drawer.isOpen}
          onNotificationClick={() => showToast("You have 1 new notification.")}
          onLogoClick={scrollToTop}
        />
      <main className="explore-main" ref={mainRef}>
      <section className="explore-intro">
      <h1>Explore Services</h1>
      <p>Find trusted professionals near you</p>
      </section>
      <form className="explore-search" role="search" onSubmit={(event) => event.preventDefault()}>
      <label>
      <HireMeIcon name="search" />
      <input id="exploreSearch" value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search for services..." aria-label="Search for services" />
      </label>
      <button id="locationButton" onClick={() => showToast("Location selection will be available soon.")} type="button">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/>
      <circle cx="12" cy="10" r="2.5"/>
      </svg>
      <span>Colombo</span>
      <b>⌄</b>
      </button>
      </form>
      <section className="explore-categories" aria-label="Service categories">
      <button className={`explore-category${selectedCategory === "all" ? " active" : ""}`} data-category="all" aria-pressed={selectedCategory === "all"} onClick={() => setSelectedCategory("all")}>
      <i>▦</i>
      <span>All</span>
      </button>
      <button className={`explore-category${selectedCategory === "electrical" ? " active" : ""}`} data-category="electrical" aria-pressed={selectedCategory === "electrical"} onClick={() => setSelectedCategory("electrical")}>
      <i className="orange"><HireMeIcon name="electrical" size="large" color="inherit" /></i>
      <span>Electrical</span>
      </button>
      <button className={`explore-category${selectedCategory === "plumbing" ? " active" : ""}`} data-category="plumbing" aria-pressed={selectedCategory === "plumbing"} onClick={() => setSelectedCategory("plumbing")}>
      <i className="red"><HireMeIcon name="plumbing" size="large" color="inherit" /></i>
      <span>Plumbing</span>
      </button>
      <button className={`explore-category${selectedCategory === "painting" ? " active" : ""}`} data-category="painting" aria-pressed={selectedCategory === "painting"} onClick={() => setSelectedCategory("painting")}>
      <i className="purple"><HireMeIcon name="painting" size="large" color="inherit" /></i>
      <span>Painting</span>
      </button>
      <button className={`explore-category${selectedCategory === "cleaning" ? " active" : ""}`} data-category="cleaning" aria-pressed={selectedCategory === "cleaning"} onClick={() => setSelectedCategory("cleaning")}>
      <i className="green"><HireMeIcon name="cleaning" size="large" color="inherit" /></i>
      <span>Cleaning</span>
      </button>
      <button className={`explore-category${selectedCategory === "ac" ? " active" : ""}`} data-category="ac" aria-pressed={selectedCategory === "ac"} onClick={() => setSelectedCategory("ac")}>
      <i className="cyan"><HireMeIcon name="ac" size="large" color="inherit" /></i>
      <span>AC Repair</span>
      </button>
      <button className={`explore-category${selectedCategory === "tv" ? " active" : ""}`} data-category="tv" aria-pressed={selectedCategory === "tv"} onClick={() => setSelectedCategory("tv")}>
      <i className="orange">▭</i>
      <span>TV Mounting</span>
      </button>
      <button className={`explore-category${selectedCategory === "carpentry" ? " active" : ""}`} data-category="carpentry" aria-pressed={selectedCategory === "carpentry"} onClick={() => setSelectedCategory("carpentry")}>
      <i className="brown">⚒</i>
      <span>Carpentry</span>
      </button>
      <button className={`explore-category${selectedCategory === "gardening" ? " active" : ""}`} data-category="gardening" aria-pressed={selectedCategory === "gardening"} onClick={() => setSelectedCategory("gardening")}>
      <i className="green">◒</i>
      <span>Gardening</span>
      </button>
      <button className={`explore-category${selectedCategory === "moving" ? " active" : ""}`} data-category="moving" aria-pressed={selectedCategory === "moving"} onClick={() => setSelectedCategory("moving")}>
      <i><HireMeIcon name="painting" size="large" color="inherit" /></i>
      <span>Moving</span>
      </button>
      <button className={`explore-category${selectedCategory === "appliance" ? " active" : ""}`} data-category="appliance" aria-pressed={selectedCategory === "appliance"} onClick={() => setSelectedCategory("appliance")}>
      <i>⚙</i>
      <span>Appliance Repair</span>
      </button>
      <button className={`explore-category${selectedCategory === "more" ? " active" : ""}`} data-category="more" aria-pressed={selectedCategory === "more"} onClick={() => setSelectedCategory("more")}>
      <i>•••</i>
      <span>More</span>
      </button>
      </section>
      <section className="nearby">
      <div className="nearby-header">
      <h2>Popular Near You</h2>
      <button id="seeAllButton" onClick={() => showToast("All services are shown below.")}>See All <b><HireMeIcon name="chevron" size="medium" color="inherit" /></b>
      </button>
      </div>
      <div id="serviceResults" className="service-results">
      <article className="nearby-card" data-category="electrical" hidden={!matchesService("electrical", "ϟElectrical Repair★ 4.8 (120+ reviews)⌖ Colombo 06  •  2.3 km awayFromLKR 2,500View Details ›")}>
      <i className="nearby-icon orange"><HireMeIcon name="electrical" size="large" color="inherit" /></i>
      <div className="nearby-info">
      <h3>Electrical Repair</h3>
      <p className="nearby-rating">★ 4.8 <span>(120+ reviews)</span>
      </p>
      <p className="nearby-place"><HireMeIcon name="location" size="small" color="inherit" /> Colombo 06&nbsp; • &nbsp;2.3 km away</p>
      </div>
      <div className="nearby-price">
      <small>From</small>
      <strong>LKR 2,500</strong>
      <button type="button" onClick={() => showToast("Service details will be available soon.")}>View Details <b><HireMeIcon name="chevron" size="medium" color="inherit" /></b>
      </button>
      </div>
      </article>
      <article className="nearby-card" data-category="plumbing" hidden={!matchesService("plumbing", "♢Plumbing Service★ 4.7 (98+ reviews)⌖ Colombo 05  •  1.8 km awayFromLKR 2,000View Details ›")}>
      <i className="nearby-icon red"><HireMeIcon name="plumbing" size="large" color="inherit" /></i>
      <div className="nearby-info">
      <h3>Plumbing Service</h3>
      <p className="nearby-rating">★ 4.7 <span>(98+ reviews)</span>
      </p>
      <p className="nearby-place"><HireMeIcon name="location" size="small" color="inherit" /> Colombo 05&nbsp; • &nbsp;1.8 km away</p>
      </div>
      <div className="nearby-price">
      <small>From</small>
      <strong>LKR 2,000</strong>
      <button type="button" onClick={() => showToast("Service details will be available soon.")}>View Details <b><HireMeIcon name="chevron" size="medium" color="inherit" /></b>
      </button>
      </div>
      </article>
      <article className="nearby-card" data-category="painting" hidden={!matchesService("painting", "▰Painting Service★ 4.6 (64+ reviews)⌖ Colombo 04  •  3.1 km awayFromLKR 3,000View Details ›")}>
      <i className="nearby-icon purple"><HireMeIcon name="painting" size="large" color="inherit" /></i>
      <div className="nearby-info">
      <h3>Painting Service</h3>
      <p className="nearby-rating">★ 4.6 <span>(64+ reviews)</span>
      </p>
      <p className="nearby-place"><HireMeIcon name="location" size="small" color="inherit" /> Colombo 04&nbsp; • &nbsp;3.1 km away</p>
      </div>
      <div className="nearby-price">
      <small>From</small>
      <strong>LKR 3,000</strong>
      <button type="button" onClick={() => showToast("Service details will be available soon.")}>View Details <b><HireMeIcon name="chevron" size="medium" color="inherit" /></b>
      </button>
      </div>
      </article>
      <article className="nearby-card" data-category="cleaning" hidden={!matchesService("cleaning", "⌁Home Cleaning★ 4.8 (210+ reviews)⌖ Colombo 03  •  2.0 km awayFromLKR 1,800View Details ›")}>
      <i className="nearby-icon green"><HireMeIcon name="cleaning" size="large" color="inherit" /></i>
      <div className="nearby-info">
      <h3>Home Cleaning</h3>
      <p className="nearby-rating">★ 4.8 <span>(210+ reviews)</span>
      </p>
      <p className="nearby-place"><HireMeIcon name="location" size="small" color="inherit" /> Colombo 03&nbsp; • &nbsp;2.0 km away</p>
      </div>
      <div className="nearby-price">
      <small>From</small>
      <strong>LKR 1,800</strong>
      <button type="button" onClick={() => showToast("Service details will be available soon.")}>View Details <b><HireMeIcon name="chevron" size="medium" color="inherit" /></b>
      </button>
      </div>
      </article>
      <article className="nearby-card" data-category="ac" hidden={!matchesService("ac", "✳AC Repair★ 4.5 (75+ reviews)⌖ Colombo 06  •  4.5 km awayFromLKR 3,500View Details ›")}>
      <i className="nearby-icon cyan"><HireMeIcon name="ac" size="large" color="inherit" /></i>
      <div className="nearby-info">
      <h3>AC Repair</h3>
      <p className="nearby-rating">★ 4.5 <span>(75+ reviews)</span>
      </p>
      <p className="nearby-place"><HireMeIcon name="location" size="small" color="inherit" /> Colombo 06&nbsp; • &nbsp;4.5 km away</p>
      </div>
      <div className="nearby-price">
      <small>From</small>
      <strong>LKR 3,500</strong>
      <button type="button" onClick={() => showToast("Service details will be available soon.")}>View Details <b><HireMeIcon name="chevron" size="medium" color="inherit" /></b>
      </button>
      </div>
      </article>
      <article className="nearby-card" data-category="tv" hidden={!matchesService("tv", "▭TV Mounting★ 4.7 (60+ reviews)⌖ Colombo 05  •  2.7 km awayFromLKR 2,200View Details ›")}>
      <i className="nearby-icon orange">▭</i>
      <div className="nearby-info">
      <h3>TV Mounting</h3>
      <p className="nearby-rating">★ 4.7 <span>(60+ reviews)</span>
      </p>
      <p className="nearby-place"><HireMeIcon name="location" size="small" color="inherit" /> Colombo 05&nbsp; • &nbsp;2.7 km away</p>
      </div>
      <div className="nearby-price">
      <small>From</small>
      <strong>LKR 2,200</strong>
      <button type="button" onClick={() => showToast("Service details will be available soon.")}>View Details <b><HireMeIcon name="chevron" size="medium" color="inherit" /></b>
      </button>
      </div>
      </article>
      </div>
      </section>
      </main>
        <BottomNavigation role="customer" onActiveTabClick={scrollToTop} />
      </AppShell>
    </div>
  );
}

export default CustomerExplore;
