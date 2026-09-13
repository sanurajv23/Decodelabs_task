import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HireMeIcon from "../../../components/HireMeIcon";
import RegistrationProgress from "./RegistrationProgress";
import "./WorkerRegistration.css";

export default function WorkerComplete() {
  const navigate = useNavigate();

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — You're All Set!";
    viewport?.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover");

    return () => {
      document.title = oldTitle;
      if (viewport) {
        if (oldViewport === null) viewport.removeAttribute("content");
        else viewport.setAttribute("content", oldViewport);
      }
    };
  }, []);

  const handleGoHome = (e) => {
    e.preventDefault();
    try {
      window.sessionStorage.setItem(
        "hireme_session",
        JSON.stringify({ authenticated: true, role: "worker" })
      );
    } catch {
      // Ignore storage errors in restricted iframe/browser environments
    }
    navigate("/worker/home");
  };

  return (
    <div className="worker-registration">
      <div className="reg-shell">
        {/* Atmospheric Background Glow Orbs */}
        <div className="reg-orb reg-orb-tr"></div>
        <div className="reg-orb reg-orb-mr"></div>
        <div className="reg-orb reg-orb-bl"></div>

        {/* Header */}
        <header className="reg-header">
          <Link
            to="/worker/register/work"
            className="reg-back-btn"
            aria-label="Go back"
          >
            <HireMeIcon name="back" />
          </Link>

          <div className="reg-brand">
            <div className="reg-brand-logo">
              Hire<span className="logo-accent">Me</span>
            </div>
            <div className="reg-brand-tagline">Work. Earn. Grow.</div>
          </div>
        </header>

        {/* 4-Step Progress Indicator (Step 4 - All Done) */}
        <RegistrationProgress step={4} />

        {/* Celebration Hero */}
        <div className="reg-success-hero">
          <div className="reg-celebrate-wrap">
            {/* Radiating Confetti Celebration Rays */}
            <svg className="reg-celebrate-particles" viewBox="0 0 160 160">
              {/* Top Rays */}
              <line x1="80" y1="12" x2="80" y2="24" stroke="#1A5CFF" strokeWidth="3" strokeLinecap="round" />
              <line x1="108" y1="20" x2="114" y2="30" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
              <circle cx="128" cy="40" r="2.5" fill="#10B981" />
              <circle cx="134" cy="54" r="2.5" fill="#1A5CFF" />
              {/* Right Rays */}
              <line x1="126" y1="80" x2="138" y2="80" stroke="#1A5CFF" strokeWidth="3" strokeLinecap="round" />
              <circle cx="128" cy="116" r="2.5" fill="#1A5CFF" />
              <line x1="108" y1="138" x2="114" y2="128" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
              {/* Bottom Rays */}
              <line x1="80" y1="146" x2="80" y2="136" stroke="#1A5CFF" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="136" r="2.5" fill="#10B981" />
              <line x1="50" y1="138" x2="44" y2="128" stroke="#1A5CFF" strokeWidth="3" strokeLinecap="round" />
              {/* Left Rays */}
              <circle cx="32" cy="116" r="2.5" fill="#10B981" />
              <line x1="32" y1="80" x2="20" y2="80" stroke="#1A5CFF" strokeWidth="3" strokeLinecap="round" />
              <line x1="50" y1="20" x2="44" y2="30" stroke="#1A5CFF" strokeWidth="3" strokeLinecap="round" />
              <circle cx="32" cy="40" r="2.5" fill="#10B981" />
            </svg>

            {/* Neumorphic Check Badge */}
            <div className="reg-check-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="reg-title-wrap" style={{ marginBottom: "8px" }}>
            <h1 className="reg-title">You're All Set!</h1>
            <p className="reg-subtitle">
              Your worker account has been created<br />
              successfully.
            </p>
          </div>
        </div>

        {/* Verification Summary Card */}
        <div className="reg-summary-card">
          {/* 1. Account Verified */}
          <div className="reg-summary-item">
            <div className="reg-summary-left">
              <div className="reg-summary-icon-box">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div>
                <div className="reg-summary-title">Account Verified</div>
                <div className="reg-summary-desc">Your mobile number has been verified.</div>
              </div>
            </div>
            <div className="reg-summary-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          {/* 2. Profile Completed */}
          <div className="reg-summary-item">
            <div className="reg-summary-left">
              <div className="reg-summary-icon-box">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <div>
                <div className="reg-summary-title">Profile Completed</div>
                <div className="reg-summary-desc">Your details and selfie have been saved.</div>
              </div>
            </div>
            <div className="reg-summary-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          {/* 3. Work Details Added */}
          <div className="reg-summary-item">
            <div className="reg-summary-left">
              <div className="reg-summary-icon-box">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                </svg>
              </div>
              <div>
                <div className="reg-summary-title">Work Details Added</div>
                <div className="reg-summary-desc">Your skills and preferences are set.</div>
              </div>
            </div>
            <div className="reg-summary-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Review Notice Card */}
        <div className="reg-review-banner">
          <div className="reg-review-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
          </div>
          <div className="reg-review-content">
            <div className="reg-review-title">Your Profile is Under Review</div>
            <div className="reg-review-desc">
              We'll review your information and notify you once your account is approved.
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          id="workerCompleteBtn"
          onClick={handleGoHome}
          className="reg-btn-primary"
          style={{ marginTop: "14px" }}
        >
          <span>Go to Home</span>
          <div className="reg-btn-arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </button>

        {/* Footer Thank You */}
        <div className="reg-footer-thanks">
          Thank you for joining HireMe!
          <strong>Work. Earn. Grow.</strong>
        </div>
      </div>
    </div>
  );
}

