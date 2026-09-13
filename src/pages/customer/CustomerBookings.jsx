import AppHeader from "../../components/AppHeader";
import AppShell from "../../components/AppShell";
import BottomNavigation from "../../components/BottomNavigation";
import HireMeIcon from "../../components/HireMeIcon";
import Toast from "../../components/Toast";
import { useEffect, useRef, useState } from "react";
import "./CustomerBookings.css";

function CustomerBookings() {
  // The original opens as an overview; clicking a tab switches to one status.
  const [selectedTab, setSelectedTab] = useState(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const previousTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const previousViewport = viewport?.getAttribute("content");
    document.title = "HireMe — My Bookings";
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

  function cancelBooking() {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      showToast("Booking cancellation requested.");
    }
  }

  function scrollToTop(event) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="bookings">
      <Toast message={toast} />
      <AppShell>
        <AppHeader
          role="customer"
          onMenuClick={() => showToast("This option will be available shortly.")}
          onNotificationClick={() => showToast("This option will be available shortly.")}
          onLogoClick={scrollToTop}
        />
      <main className="bookings-content" ref={mainRef}>
      <section className="bookings-heading">
      <h1>My Bookings</h1>
      <p>Manage your service bookings and track their status</p>
      </section>
      <div className="tabs" data-filtering={selectedTab !== null ? "true" : undefined} role="tablist" aria-label="Booking status">
      <button type="button" className={(selectedTab ?? "upcoming") === "upcoming" ? "active" : ""} role="tab" aria-selected={(selectedTab ?? "upcoming") === "upcoming"} data-tab="upcoming" id="booking-tab-upcoming" aria-controls="upcoming" onClick={() => setSelectedTab("upcoming")}>Upcoming (2)</button>
      <button type="button" className={(selectedTab ?? "upcoming") === "ongoing" ? "active" : ""} role="tab" aria-selected={(selectedTab ?? "upcoming") === "ongoing"} data-tab="ongoing" id="booking-tab-ongoing" aria-controls="ongoing" onClick={() => setSelectedTab("ongoing")}>Ongoing (1)</button>
      <button type="button" className={(selectedTab ?? "upcoming") === "completed" ? "active" : ""} role="tab" aria-selected={(selectedTab ?? "upcoming") === "completed"} data-tab="completed" id="booking-tab-completed" aria-controls="completed" onClick={() => setSelectedTab("completed")}>Completed (5)</button>
      <button type="button" className={(selectedTab ?? "upcoming") === "cancelled" ? "active" : ""} role="tab" aria-selected={(selectedTab ?? "upcoming") === "cancelled"} data-tab="cancelled" id="booking-tab-cancelled" aria-controls="cancelled" onClick={() => setSelectedTab("cancelled")}>Cancelled (1)</button>
      </div>
      <section id="upcoming" className={`panel${(selectedTab ?? "upcoming") === "upcoming" ? " active" : ""}`} role="tabpanel" aria-labelledby="booking-tab-upcoming">
      <div className="section-title">
      <h2>Upcoming Bookings (2)</h2>
      <button className="see-all" onClick={() => showToast("This option will be available shortly.")} type="button">See All <b>›</b>
      </button>
      </div>
      <article className="booking-card">
      <i className="service-icon electrical">ϟ</i>
      <div className="booking-details">
      <h3>Electrical Repair</h3>
      <p>▣ <span>Sat, 6 Sep 2026</span>
      </p>
      <p>◷ <span>12:00 PM - 1:00 PM</span>
      </p>
      <p>⌖ <span>No. 123, Lake Road, Colombo 06</span>
      </p>
      </div>
      <span className="status confirmed">Confirmed</span>
      <button className="card-arrow" onClick={() => showToast("This option will be available shortly.")} type="button" aria-label="View Electrical Repair booking">›</button>
      <footer>
      <button className="outline-action reschedule" onClick={() => showToast("Rescheduling options will be available shortly.")} type="button">▣ <span>Reschedule</span>
      </button>
      <button className="outline-action cancel" onClick={cancelBooking} type="button">Cancel Booking</button>
      </footer>
      </article>
      <article className="booking-card">
      <i className="service-icon plumbing">♢</i>
      <div className="booking-details">
      <h3>Plumbing Service</h3>
      <p>▣ <span>Sun, 7 Sep 2026</span>
      </p>
      <p>◷ <span>3:00 PM - 5:00 PM</span>
      </p>
      <p>⌖ <span>No. 45, Galle Road, Dehiwala</span>
      </p>
      </div>
      <span className="status confirmed">Confirmed</span>
      <button className="card-arrow" onClick={() => showToast("This option will be available shortly.")} type="button" aria-label="View Plumbing Service booking">›</button>
      <footer>
      <button className="outline-action reschedule" onClick={() => showToast("Rescheduling options will be available shortly.")} type="button">▣ <span>Reschedule</span>
      </button>
      <button className="outline-action cancel" onClick={cancelBooking} type="button">Cancel Booking</button>
      </footer>
      </article>
      </section>
      <section id="ongoing" className={`panel${(selectedTab ?? "upcoming") === "ongoing" ? " active" : ""}`} role="tabpanel" aria-labelledby="booking-tab-ongoing">
      <div className="section-title">
      <h2>Ongoing Booking (1)</h2>
      <button className="see-all" onClick={() => showToast("This option will be available shortly.")} type="button">See All <b>›</b>
      </button>
      </div>
      <article className="booking-card">
      <i className="service-icon cleaning">♨</i>
      <div className="booking-details">
      <h3>Home Cleaning</h3>
      <p>▣ <span>Mon, 8 Sep 2026</span>
      </p>
      <p>◷ <span>10:00 AM - 12:00 PM</span>
      </p>
      <p>⌖ <span>No. 78, Station Road, Colombo 04</span>
      </p>
      </div>
      <span className="status progress">In Progress</span>
      <button className="card-arrow" onClick={() => showToast("This option will be available shortly.")} type="button" aria-label="View Home Cleaning booking">›</button>
      <footer>
      <button className="outline-action message" onClick={() => showToast("Messaging is not yet available.")} type="button"><HireMeIcon name="messages" /><span>Message Worker</span>
      </button>
      <button className="outline-action call" onClick={() => showToast("Worker contact details will be available shortly.")} type="button">⌕ <span>Call Worker</span>
      </button>
      </footer>
      </article>
      </section>
      <section id="completed" className={`panel${(selectedTab ?? "upcoming") === "completed" ? " active" : ""}`} role="tabpanel" aria-labelledby="booking-tab-completed">
      <div className="section-title">
      <h2>Completed Bookings (5)</h2>
      <button className="see-all" onClick={() => showToast("This option will be available shortly.")} type="button">See All <b>›</b>
      </button>
      </div>
      <article className="booking-card completed-card">
      <i className="service-icon painting">▱</i>
      <div className="booking-details">
      <h3>Painting Service</h3>
      <p>▣ <span>25 Aug 2026</span>
      </p>
      <p>◷ <span>2:00 PM - 5:00 PM</span>
      </p>
      <p>⌖ <span>No. 12, Temple Road, Nugegoda</span>
      </p>
      </div>
      <span className="status complete">Completed</span>
      <button className="card-arrow" onClick={() => showToast("This option will be available shortly.")} type="button" aria-label="View Painting Service booking">›</button>
      <footer>
      <button className="outline-action book-again" onClick={() => showToast("Booking again will be available shortly.")} type="button">⟳ <span>Book Again</span>
      </button>
      </footer>
      </article>
      </section>
      <section id="cancelled" className={`panel${(selectedTab ?? "upcoming") === "cancelled" ? " active" : ""}`} role="tabpanel" aria-labelledby="booking-tab-cancelled">
      <div className="section-title">
      <h2>Cancelled Bookings (1)</h2>
      </div>
      <article className="booking-card">
      <i className="service-icon electrical">ϟ</i>
      <div className="booking-details">
      <h3>Electrical Repair</h3>
      <p>▣ <span>20 Aug 2026</span>
      </p>
      <p>◷ <span>10:00 AM - 11:00 AM</span>
      </p>
      <p>⌖ <span>Colombo 06</span>
      </p>
      </div>
      <span className="status cancelled">Cancelled</span>
      </article>
      </section>
      </main>
        <BottomNavigation role="customer" onActiveTabClick={scrollToTop} />
      </AppShell>
    </div>
  );
}

export default CustomerBookings;
