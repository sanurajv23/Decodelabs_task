import AppHeader from "../../components/AppHeader";
import AppShell from "../../components/AppShell";
import BottomNavigation from "../../components/BottomNavigation";
import HireMeIcon from "../../components/HireMeIcon";
import Toast from "../../components/Toast";
import WorkerDrawer from "../../components/WorkerDrawer";
import useNavigationDrawer from "../../components/useNavigationDrawer";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getCurrentUser, getProfile } from "../../utils/auth";
import "./CustomerProfile.css";

const PROFILE_OPTIONS = [
  {
    id: "personal-info",
    icon: "user",
    title: "Personal Information",
    description: "Update your name, contact details, etc.",
  },
  {
    id: "saved-addresses",
    icon: "address",
    title: "Saved Addresses",
    description: "Manage your saved locations",
  },
  {
    id: "payment-methods",
    icon: "payment",
    title: "Payment Methods",
    description: "Manage your cards and payments",
  },
  {
    id: "favorites",
    icon: "favorites",
    title: "Favorites",
    description: "Your saved workers and services",
  },
  {
    id: "notifications",
    icon: "notifications",
    title: "Notifications",
    description: "Manage your notification preferences",
  },
  {
    id: "privacy-security",
    icon: "privacy",
    title: "Privacy & Security",
    description: "Manage your account security",
  },
  {
    id: "help-support",
    icon: "help",
    title: "Help & Support",
    description: "Get help or contact support",
  },
  {
    id: "logout",
    icon: "logout-arrow",
    title: "Log Out",
    description: "Sign out from your account",
    isLogout: true,
  },
];

export default function CustomerProfile() {
  const navigate = useNavigate();
  const drawer = useNavigationDrawer();
  const user = getCurrentUser();
  const customerProfile = getProfile("customer");
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — Profile";
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

  function handleOptionClick(option) {
    if (option.isLogout) {
      logout(navigate);
    } else {
      showToast("This feature will be available soon.");
    }
  }

  function handleEditProfile() {
    showToast("Profile editing will be available soon.");
  }

  function handleViewBookings() {
    navigate("/customer/bookings");
  }

  return (
    <div className="customer-profile">
      <Toast message={toast} />
      <WorkerDrawer
        role="customer"
        isOpen={drawer.isOpen}
        onClose={drawer.close}
        drawerRef={drawer.drawerRef}
        closeRef={drawer.closeRef}
        onShowToast={showToast}
      />
      <AppShell inert={drawer.isOpen}>
        <AppHeader
          role="customer"
          onMenuClick={drawer.open}
          menuRef={drawer.menuRef}
          drawerOpen={drawer.isOpen}
          onNotificationClick={() => showToast("You have 1 new notification.")}
          onLogoClick={scrollToTop}
        />

        <main className="main-content" ref={mainRef}>
          {/* Page Heading */}
          <section className="profile-page-heading" aria-label="Profile Page Title">
            <h1 className="page-main-title">Profile</h1>
            <p className="page-subtitle">Manage your account and preferences</p>
          </section>

          {/* Profile Summary Card */}
          <section className="profile-summary-card" aria-label="Customer Profile Summary">
            <div className="profile-card-top-row">
              <div className="profile-avatar-box" aria-hidden="true">
                <HireMeIcon name="user" />
              </div>

              <div className="profile-user-details">
                <span className="profile-welcome-label">Welcome back,</span>
                <h2 className="profile-user-name">{user.fullName}</h2>

                <div className="profile-meta-rows">
                  {customerProfile.verifiedContact && (
                    <span className="profile-meta-item">
                      {customerProfile.verificationMethod === "email"
                        ? <HireMeIcon name="mail" />
                        : <HireMeIcon name="call" />}
                      <span>{customerProfile.verifiedContact}</span>
                    </span>
                  )}

                  <span className="profile-account-type-row">
                    <HireMeIcon name="user" />
                    <span>Account Type</span>
                    <span className="account-type-badge">Customer</span>
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn-edit-profile"
                onClick={handleEditProfile}
                aria-label="Edit Profile"
              >
                <HireMeIcon name="edit" />
                <span>Edit Profile</span>
              </button>
            </div>

            <p className="profile-desc-text">
              Find trusted professionals for your needs.
            </p>
          </section>

          {/* Profile Options List */}
          <section aria-label="Account Settings and Preferences">
            <ul className="profile-options-list">
              {PROFILE_OPTIONS.map((opt) => (
                <li key={opt.id}>
                  <button
                    type="button"
                    className="profile-option-card"
                    onClick={() => handleOptionClick(opt)}
                    aria-label={`${opt.title}: ${opt.description}`}
                  >
                    <div
                      className={`option-icon-box${opt.isLogout ? " logout-icon" : ""}`}
                      aria-hidden="true"
                    >
                      <HireMeIcon name={opt.icon} />
                    </div>

                    <div className="option-details">
                      <span className="option-title">{opt.title}</span>
                      <span className="option-desc">{opt.description}</span>
                    </div>

                    <i className="option-chevron" aria-hidden="true">
                      <HireMeIcon name="chevron" />
                    </i>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Promotional Rebooking Card */}
          <section className="promo-rebook-card" aria-label="Rebook Services">
            <div className="promo-crown-box" aria-hidden="true">
              <HireMeIcon name="crown" />
            </div>

            <div className="promo-copy">
              <h3>Need a service again?</h3>
              <p>Rebook your past services in just one tap.</p>
            </div>

            <button
              type="button"
              className="btn-view-bookings"
              onClick={handleViewBookings}
              aria-label="View Past Bookings"
            >
              <span>View Bookings</span>
              <span aria-hidden="true">&rsaquo;</span>
            </button>
          </section>
        </main>

        <BottomNavigation role="customer" onActiveTabClick={scrollToTop} />
      </AppShell>
    </div>
  );
}
