import { HireMeIconArtwork } from "../../../components/HireMeIcon";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HireMeIcon from "../../../components/HireMeIcon";
import RegistrationProgress from "./RegistrationProgress";
import "./WorkerRegistration.css";

export default function WorkerRegisterDetails() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selfieTaken, setSelfieTaken] = useState(false);
  const [toast, setToast] = useState("");
  const fileInputRef = useRef(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — Register Your Details";
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

  const handleSelfieClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelfieTaken(true);
      showToast("Selfie photo captured successfully!");
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
          <Link
            to="/worker/register/verification"
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

        {/* 4-Step Progress Indicator (Step 2) */}
        <RegistrationProgress step={2} />

        {/* Title & Subtitle */}
        <div className="reg-title-wrap">
          <h1 className="reg-title">Register Your Details</h1>
          <p className="reg-subtitle">
            Tell us a bit about yourself and take a selfie<br />
            to verify your identity.
          </p>
        </div>

        {/* Selfie Verification Section */}
        <div className="reg-selfie-section">
          <input
            type="file"
            accept="image/*"
            capture="user"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <div
            className="reg-selfie-outer"
            style={{ cursor: "pointer" }}
            onClick={handleSelfieClick}
          >
            <div className="reg-selfie-inner">
              {selfieTaken ? (
                <svg viewBox="0 0 24 24" fill="#10B981"><HireMeIconArtwork name="verified" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
            </div>
            <div
              className="reg-camera-badge"
              aria-label="Take selfie camera"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
              </svg>
            </div>
          </div>
          <div className="reg-selfie-title">Take a Selfie</div>
          <div className="reg-selfie-subtitle">
            Make sure your face is clearly visible<br />
            and well lit.
          </div>
        </div>

        {/* Form Fields */}
        {/* 1. Full Name */}
        <div className="reg-form-group">
          <label className="reg-label" htmlFor="fullNameInput">
            Full Name
          </label>
          <div className="reg-input-pill">
            <div className="reg-input-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="profile" /></svg>
            </div>
            <input
              type="text"
              id="fullNameInput"
              className="reg-input-field"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>

        {/* 2. NIC or Passport Number */}
        <div className="reg-form-group">
          <label className="reg-label" htmlFor="nicInput">
            NIC or Passport Number
          </label>
          <div className="reg-input-pill">
            <div className="reg-input-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="identity" /></svg>
            </div>
            <input
              type="text"
              id="nicInput"
              className="reg-input-field"
              placeholder="Enter your NIC or Passport number"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
          </div>
        </div>

        {/* 3. Password */}
        <div className="reg-form-group">
          <label className="reg-label" htmlFor="passwordInput">
            Password
          </label>
          <div className="reg-input-pill">
            <div className="reg-input-icon">
              <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="password" /></svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="passwordInput"
              className="reg-input-field"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="reg-password-toggle"
              id="passwordToggleBtn"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ><HireMeIconArtwork name="hide-password" /></svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ><HireMeIconArtwork name="show-password" /></svg>
              )}
            </button>
          </div>
          <div className="reg-helper-text">Use at least 6 characters</div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          className="reg-btn-primary"
          style={{ marginTop: "20px" }}
          onClick={() => {
            try {
              window.sessionStorage.setItem(
                "workerDetails",
                JSON.stringify({ fullName: fullName.trim(), nicPassport: nic.trim() })
              );
            } catch {
              // Ignore storage errors
            }
            navigate("/worker/register/work");
          }}
        >
          <span>Create Account</span>
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

        {/* Login Link */}
        <div className="reg-login-prompt">
          Already have an account?{" "}
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
              color: "var(--reg-primary)",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() => showToast("Login screen will be available soon.")}
          >
            Login
          </button>
        </div>

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

