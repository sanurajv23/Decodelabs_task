import { HireMeIconArtwork } from "../../../components/HireMeIcon";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HireMeIcon from "../../../components/HireMeIcon";
import RegistrationProgress from "./RegistrationProgress";
import "./WorkerRegistration.css";

export default function WorkerVerify() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("phone"); // "phone" | "email"
  const [phone, setPhone] = useState("77 123 4567");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — Verify Your Account";
    viewport?.setAttribute("content", "width=device-width, initial-scale=1, viewport-fit=cover");

    return () => {
      document.title = oldTitle;
      if (viewport) {
        if (oldViewport === null) viewport.removeAttribute("content");
        else viewport.setAttribute("content", oldViewport);
      }
    };
  }, []);

  const handleBack = (e) => {
    e.preventDefault();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/worker/home");
    }
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
          <button
            type="button"
            onClick={handleBack}
            className="reg-back-btn"
            aria-label="Go back"
          >
            <HireMeIcon name="back" />
          </button>

          <div className="reg-brand">
            <div className="reg-brand-logo">
              Hire<span className="logo-accent">Me</span>
            </div>
            <div className="reg-brand-tagline">Work. Earn. Grow.</div>
          </div>
        </header>

        {/* 4-Step Progress Indicator */}
        <RegistrationProgress step={1} />

        {/* Title & Subtitle */}
        <div className="reg-title-wrap">
          <h1 className="reg-title">Verify Your Account</h1>
          <p className="reg-subtitle">Choose how you want to receive the verification code</p>
        </div>

        {/* Verification Method Selection Cards */}
        <div className="reg-method-grid" role="radiogroup" aria-label="Verification Method">
          {/* Via Mobile Number */}
          <div
            className={`reg-method-card ${selectedMethod === "phone" ? "selected" : ""}`}
            role="radio"
            aria-checked={selectedMethod === "phone"}
            tabIndex={0}
            onClick={() => setSelectedMethod("phone")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedMethod("phone");
              }
            }}
          >
            <div className="reg-radio-indicator"></div>
            <div className="reg-method-icon-wrap">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            <div className="reg-method-title">Via Mobile Number</div>
            <div className="reg-method-desc">Get a verification code via SMS to your mobile number.</div>
          </div>

          {/* Via Email Address */}
          <div
            className={`reg-method-card ${selectedMethod === "email" ? "selected" : ""}`}
            role="radio"
            aria-checked={selectedMethod === "email"}
            tabIndex={0}
            onClick={() => setSelectedMethod("email")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedMethod("email");
              }
            }}
          >
            <div className="reg-radio-indicator"></div>
            <div className="reg-method-icon-wrap">
              <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="email" /></svg>
            </div>
            <div className="reg-method-title">Via Email Address</div>
            <div className="reg-method-desc">Get a verification code via email to your Gmail address.</div>
          </div>
        </div>

        {/* Mobile Number Input Group */}
        <div className="reg-form-group">
          <label className="reg-label" htmlFor="phoneInput">
            Mobile Number
          </label>
          <div className="reg-input-pill">
            <div className="reg-phone-prefix">
              {/* Sri Lanka Flag SVG */}
              <svg className="reg-flag-svg" viewBox="0 0 640 480">
                <rect width="640" height="480" fill="#ffbe29" />
                <rect width="600" height="440" x="20" y="20" fill="#000" />
                <rect width="580" height="420" x="30" y="30" fill="#ffbe29" />
                <rect width="70" height="380" x="50" y="50" fill="#005f41" />
                <rect width="70" height="380" x="130" y="50" fill="#eb7600" />
                <rect width="360" height="380" x="230" y="50" fill="#8d153a" />
                {/* Stylized Lion & Bo Leaves */}
                <circle cx="255" cy="75" r="10" fill="#ffbe29" />
                <circle cx="565" cy="75" r="10" fill="#ffbe29" />
                <circle cx="255" cy="405" r="10" fill="#ffbe29" />
                <circle cx="565" cy="405" r="10" fill="#ffbe29" />
                <path
                  d="M410 200c-20 0-35 15-35 35 0 25 20 45 45 45 15 0 28-8 35-20l-15-10c-4 7-12 12-20 12-15 0-25-10-25-27h65c1-3 1-6 1-10 0-25-20-45-46-45zm-15 35c2-12 10-18 20-18 10 0 18 6 20 18h-40z"
                  fill="#ffbe29"
                />
              </svg>
              <span className="reg-phone-code">+94</span>
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
              <span className="reg-phone-divider"></span>
            </div>
            <input
              type="tel"
              id="phoneInput"
              className="reg-input-field"
              placeholder="77 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="numeric"
            />
          </div>
        </div>

        {/* OR Divider */}
        <div className="reg-or-divider">
          <div className="reg-or-line"></div>
          <span className="reg-or-text">OR</span>
          <div className="reg-or-line"></div>
        </div>

        {/* Email Address Input Group */}
        <div className="reg-form-group">
          <label className="reg-label" htmlFor="emailInput">
            Email Address
          </label>
          <div className="reg-input-pill">
            <div className="reg-input-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="email" /></svg>
            </div>
            <input
              type="email"
              id="emailInput"
              className="reg-input-field"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Primary Action Button */}
        <Link to="/worker/register/verification" className="reg-btn-primary">
          <span>Send Verification Code</span>
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
        </Link>
      </div>
    </div>
  );
}

