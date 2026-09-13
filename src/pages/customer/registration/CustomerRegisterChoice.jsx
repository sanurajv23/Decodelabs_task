import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./CustomerRegisterChoice.css";

export default function CustomerRegisterChoice() {
  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — Join as a Customer or Worker";
    viewport?.setAttribute("content", "width=device-width, initial-scale=1.0, viewport-fit=cover");

    return () => {
      document.title = oldTitle;
      if (viewport) {
        if (oldViewport === null) viewport.removeAttribute("content");
        else viewport.setAttribute("content", oldViewport);
      }
    };
  }, []);

  return (
    <div className="register-choice">
      <div className="register-choice-shell">
        <div className="choice-orb choice-orb-top-left" aria-hidden="true" />
        <div className="choice-orb choice-orb-right" aria-hidden="true" />
        <div className="choice-orb choice-orb-center" aria-hidden="true" />
        <div className="choice-orb choice-orb-bottom-left" aria-hidden="true" />

        <main className="register-choice-content">
          <header className="choice-brand">
            <h1 className="choice-brand-logo">
              Hire<span className="choice-logo-accent">Me</span>
            </h1>
            <p className="choice-brand-tagline">Work. Earn. Grow.</p>
          </header>

          <section className="choice-intro" aria-labelledby="choice-title">
            <h2 id="choice-title" className="choice-title">
              Join as a
            </h2>
            <p className="choice-subtitle">Choose how you want to get started</p>
          </section>

          <section className="choice-role-list" aria-label="Choose an account type">
            <Link
              className="choice-role-card choice-role-card-unavailable choice-role-card-link"
              to="/customer/register"
              aria-label="Register as Customer"
            >
              <div className="choice-icon-panel" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="currentColor">
                  <circle cx="32" cy="20" r="11" />
                  <path d="M12 52.5c0-12.1 8.9-21 20-21s20 8.9 20 21c0 2.5-2 4.5-4.5 4.5h-31c-2.5 0-4.5-2-4.5-4.5Z" />
                </svg>
              </div>
              <div className="choice-card-copy">
                <h3>
                  Register as
                  <br />
                  Customer
                </h3>
                <p>
                  Find and book trusted
                  <br />
                  workers for your needs.
                </p>
              </div>
              <div className="choice-arrow-button choice-arrow-pending" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <polyline points="13 5 20 12 13 19" />
                </svg>
              </div>
            </Link>

            <Link
              className="choice-role-card choice-role-card-link"
              to="/worker/register"
              aria-label="Register as Worker"
            >
              <div className="choice-icon-panel" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="currentColor">
                  <path d="M21.5 19.5V16a10.5 10.5 0 0 1 21 0v3.5h3.1c2.3 0 4.1 1.8 4.1 4.1v2.8H14.3v-2.8c0-2.3 1.8-4.1 4.1-4.1h3.1Zm4.4 0h12.2V16a6.1 6.1 0 0 0-12.2 0v3.5Z" />
                  <path d="M16.3 30.5h31.4v7.3a15.7 15.7 0 0 1-31.4 0v-7.3Zm-.9 26.2v-9.3c0-4.1 3.3-7.4 7.4-7.4h18.4c4.1 0 7.4 3.3 7.4 7.4v9.3H39v-9h-14v9h-9.6Zm12-13.3v7h9.2v-7h-9.2Z" />
                  <path d="M25 40h14v7.8H25z" fill="#F4F8FD" />
                </svg>
              </div>
              <div className="choice-card-copy">
                <h3>
                  Register as
                  <br />
                  Worker
                </h3>
                <p>
                  Offer your skills and
                  <br />
                  get job opportunities.
                </p>
              </div>
              <span className="choice-arrow-button" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <polyline points="13 5 20 12 13 19" />
                </svg>
              </span>
            </Link>
          </section>

          <div className="choice-platform-divider" aria-label="Same Platform. More Opportunities.">
            <span />
            <p>Same Platform. More Opportunities.</p>
            <span />
          </div>
        </main>
      </div>
    </div>
  );
}

