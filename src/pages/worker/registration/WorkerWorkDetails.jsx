import { HireMeIconArtwork } from "../../../components/HireMeIcon";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HireMeIcon from "../../../components/HireMeIcon";
import RegistrationProgress from "./RegistrationProgress";
import "./WorkerRegistration.css";

export default function WorkerWorkDetails() {
  const [category, setCategory] = useState("Electrician & Maintenance");
  const [skills, setSkills] = useState("Wiring, Circuit Repair, Appliance Installation");
  const [expLevel, setExpLevel] = useState("beginner"); // "beginner" | "intermediate" | "experienced"
  const [rate, setRate] = useState("1500");
  const [area, setArea] = useState("Colombo, Sri Lanka");
  const [availability, setAvailability] = useState("Mon - Fri (Full Time)");
  const [bio, setBio] = useState("");
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — Add Your Work Details";
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

  const showToast = (msg) => {
    clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(""), 3000);
  };

  const handleGpsClick = () => {
    setArea("Colombo, Western Province");
    showToast("Current location detected: Colombo, WP");
  };

  const handleCategoryCycle = () => {
    const categories = [
      "Electrician & Maintenance",
      "AC Repair & Servicing",
      "Plumbing Services",
      "Home Deep Cleaning",
      "Carpentry & Woodwork",
    ];
    const currentIndex = categories.indexOf(category);
    const nextCategory = categories[(currentIndex + 1) % categories.length];
    setCategory(nextCategory);
    showToast(`Selected category: ${nextCategory}`);
  };

  const handleSkillsCycle = () => {
    const skillSets = [
      "Wiring, Circuit Repair, Appliance Installation",
      "Filter Cleaning, Gas Refill, Compressor Repair",
      "Pipe Fixing, Leak Detection, Tap Installation",
      "Floor Mopping, Sanitization, Window Wash",
    ];
    const currentIndex = skillSets.indexOf(skills);
    const nextSkills = skillSets[(currentIndex + 1) % skillSets.length];
    setSkills(nextSkills);
    showToast("Updated trade skills");
  };

  const handleAvailabilityCycle = () => {
    const options = [
      "Mon - Fri (Full Time)",
      "Weekends Only",
      "Flexible Hours / On-Call",
      "All 7 Days (Emergency Service)",
    ];
    const currentIndex = options.indexOf(availability);
    const nextOpt = options[(currentIndex + 1) % options.length];
    setAvailability(nextOpt);
    showToast(`Availability: ${nextOpt}`);
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
            to="/worker/register/details"
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

        {/* 4-Step Progress Indicator (Step 3) */}
        <RegistrationProgress step={3} />

        {/* Title & Subtitle */}
        <div className="reg-title-wrap">
          <h1 className="reg-title">Add Your Work Details</h1>
          <p className="reg-subtitle">Tell us about your skills and work preferences</p>
        </div>

        {/* 1. Work Category Dropdown */}
        <div className="reg-form-group">
          <label className="reg-label" htmlFor="categoryInput">
            Select Your Work Category
          </label>
          <div
            className="reg-input-pill"
            style={{ cursor: "pointer" }}
            onClick={handleCategoryCycle}
          >
            <div className="reg-input-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="briefcase" /></svg>
            </div>
            <input
              type="text"
              id="categoryInput"
              className="reg-input-field"
              placeholder="Choose a category"
              value={category}
              readOnly
              style={{ cursor: "pointer" }}
            />
            <span className="reg-dropdown-arrow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ><HireMeIconArtwork name="expand" /></svg>
            </span>
          </div>
        </div>

        {/* 2. Select Your Skills Dropdown */}
        <div className="reg-form-group">
          <label className="reg-label" htmlFor="skillsInput">
            Select Your Skills
          </label>
          <div
            className="reg-input-pill"
            style={{ cursor: "pointer" }}
            onClick={handleSkillsCycle}
          >
            <div className="reg-input-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
            </div>
            <input
              type="text"
              id="skillsInput"
              className="reg-input-field"
              placeholder="Select your skills (you can choose multiple)"
              value={skills}
              readOnly
              style={{ cursor: "pointer" }}
            />
            <span className="reg-dropdown-arrow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ><HireMeIconArtwork name="expand" /></svg>
            </span>
          </div>
        </div>

        {/* 3. Experience Level */}
        <div className="reg-form-group">
          <label className="reg-label">Experience Level</label>
          <div className="reg-exp-grid" role="radiogroup" aria-label="Experience Level">
            {/* Beginner */}
            <div
              className={`reg-exp-card ${expLevel === "beginner" ? "selected" : ""}`}
              role="radio"
              aria-checked={expLevel === "beginner"}
              tabIndex={0}
              onClick={() => setExpLevel("beginner")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpLevel("beginner");
                }
              }}
            >
              <div className="reg-exp-radio"></div>
              <div>
                <div className="reg-exp-title">Beginner</div>
                <div className="reg-exp-sub">0 - 1 year</div>
              </div>
            </div>

            {/* Intermediate */}
            <div
              className={`reg-exp-card ${expLevel === "intermediate" ? "selected" : ""}`}
              role="radio"
              aria-checked={expLevel === "intermediate"}
              tabIndex={0}
              onClick={() => setExpLevel("intermediate")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpLevel("intermediate");
                }
              }}
            >
              <div className="reg-exp-radio"></div>
              <div>
                <div className="reg-exp-title">Intermediate</div>
                <div className="reg-exp-sub">1 - 3 years</div>
              </div>
            </div>

            {/* Experienced */}
            <div
              className={`reg-exp-card ${expLevel === "experienced" ? "selected" : ""}`}
              role="radio"
              aria-checked={expLevel === "experienced"}
              tabIndex={0}
              onClick={() => setExpLevel("experienced")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setExpLevel("experienced");
                }
              }}
            >
              <div className="reg-exp-radio"></div>
              <div>
                <div className="reg-exp-title">Experienced</div>
                <div className="reg-exp-sub">3+ years</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Hourly Rate (LKR) */}
        <div className="reg-form-group">
          <label className="reg-label" htmlFor="rateInput">
            Hourly Rate (LKR)
          </label>
          <div className="reg-input-pill">
            <div className="reg-input-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="balance" /></svg>
            </div>
            <input
              type="text"
              id="rateInput"
              className="reg-input-field"
              placeholder="Enter your expected hourly rate"
              inputMode="numeric"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
            <span className="reg-input-suffix">LKR</span>
          </div>
        </div>

        {/* 5. Service Area */}
        <div className="reg-form-group">
          <label className="reg-label" htmlFor="areaInput">
            Service Area
          </label>
          <div className="reg-input-pill">
            <div className="reg-input-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <input
              type="text"
              id="areaInput"
              className="reg-input-field"
              placeholder="Enter your city or area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
            <button
              type="button"
              className="reg-gps-control"
              aria-label="Use current location"
              onClick={handleGpsClick}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="12" y1="2" x2="12" y2="5"></line>
                <line x1="12" y1="19" x2="12" y2="22"></line>
                <line x1="2" y1="12" x2="5" y2="12"></line>
                <line x1="19" y1="12" x2="22" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* 6. Availability */}
        <div className="reg-form-group">
          <label className="reg-label" htmlFor="availabilityInput">
            Availability
          </label>
          <div
            className="reg-input-pill"
            style={{ cursor: "pointer" }}
            onClick={handleAvailabilityCycle}
          >
            <div className="reg-input-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z" />
              </svg>
            </div>
            <input
              type="text"
              id="availabilityInput"
              className="reg-input-field"
              placeholder="Select your available days"
              value={availability}
              readOnly
              style={{ cursor: "pointer" }}
            />
            <span className="reg-dropdown-arrow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ><HireMeIconArtwork name="expand" /></svg>
            </span>
          </div>
        </div>

        {/* 7. Short Bio (Optional) */}
        <div className="reg-form-group">
          <label className="reg-label" htmlFor="regBioTextarea">
            Short Bio (Optional)
          </label>
          <div className="reg-bio-container">
            <div className="reg-bio-header">
              <div className="reg-input-icon" style={{ marginTop: "2px" }}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              </div>
              <textarea
                id="regBioTextarea"
                className="reg-bio-textarea"
                placeholder="Tell customers a little about yourself..."
                maxLength={200}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="reg-char-counter" id="regBioCounter">
              {bio.length}/200
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          className="reg-btn-primary"
          style={{ marginTop: "14px" }}
          onClick={() => {
            try {
              window.sessionStorage.setItem(
                "workerWorkData",
                JSON.stringify({ category, skills, expLevel, rate, area, availability, bio })
              );
            } catch {
              // Ignore storage errors
            }
            window.location.href = "/worker/register/complete";
          }}
        >
          <span>Save &amp; Continue</span>
          <div className="reg-btn-arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ><HireMeIconArtwork name="forward" /></svg>
          </div>
        </button>

        {/* Toast */}
        {toast && (
          <div className="reg-toast" role="status" aria-live="polite">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}

