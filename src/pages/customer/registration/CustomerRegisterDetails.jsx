import { HireMeIconArtwork } from "../../../components/HireMeIcon";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HireMeIcon from "../../../components/HireMeIcon";
import "./CustomerRegisterDetails.css";

export default function CustomerRegisterDetails() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field errors
  const [errors, setErrors] = useState({ fullName: false, nic: false, password: false });

  // Floating Toast state
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });
  const toastTimerRef = useRef(null);

  const fullNameRef = useRef(null);
  const nicRef = useRef(null);
  const passwordRef = useRef(null);

  const showToast = (message, type = "info", duration = 3200) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ visible: true, message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, duration);
  };

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — Create Your Account";
    viewport?.setAttribute("content", "width=device-width, initial-scale=1.0, viewport-fit=cover");

    return () => {
      document.title = oldTitle;
      if (viewport) {
        if (oldViewport === null) viewport.removeAttribute("content");
        else viewport.setAttribute("content", oldViewport);
      }
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: false }));
  };

  const handleNicChange = (e) => {
    setNic(e.target.value);
    if (errors.nic) setErrors((prev) => ({ ...prev, nic: false }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedNic = nic.trim();
    const cleanNic = trimmedNic.replace(/\s+/g, "");
    const isValidNicOrPassport = /^[0-9]{9}[vVxX]$|^[0-9]{12}$|^[a-zA-Z0-9]{6,12}$/.test(cleanNic);

    let firstError = null;
    let errorMsg = "";
    const newErrors = { fullName: false, nic: false, password: false };

    if (!trimmedName || trimmedName.length < 2) {
      newErrors.fullName = true;
      firstError = fullNameRef.current;
      errorMsg = "Please enter your full name (at least 2 characters).";
    }

    if (!trimmedNic || !isValidNicOrPassport) {
      newErrors.nic = true;
      if (!firstError) firstError = nicRef.current;
      if (!errorMsg) {
        errorMsg = "Please enter a valid NIC (e.g. 200012345678 or 981234567V) or Passport number.";
      }
    }

    if (!password || password.length < 6) {
      newErrors.password = true;
      if (!firstError) firstError = passwordRef.current;
      if (!errorMsg) {
        errorMsg = "Password must be at least 6 characters.";
      }
    }

    setErrors(newErrors);

    if (firstError) {
      showToast(errorMsg, "error", 3500);
      firstError.focus();
      return;
    }

    // Retrieve prior verification details
    let verifiedCustomerData = {};
    try {
      const stored = window.sessionStorage.getItem("customerVerification");
      if (stored) {
        verifiedCustomerData = JSON.parse(stored);
      }
    } catch {
      // Storage fallback
    }

    // Store customer details in sessionStorage (strictly NO password stored)
    try {
      const customerRecord = {
        fullName: trimmedName,
        nicPassport: cleanNic,
        verifiedContact: verifiedCustomerData.phone || verifiedCustomerData.email || "Verified User",
        verificationMethod: verifiedCustomerData.method || "mobile",
        registrationCompleted: true,
        registeredAt: new Date().toISOString(),
      };
      window.sessionStorage.setItem("customerProfile", JSON.stringify(customerRecord));
    } catch {
      // Storage fallback
    }

    // Start shared customer session
    try {
      window.sessionStorage.setItem(
        "hireme_session",
        JSON.stringify({ authenticated: true, role: "customer" })
      );
    } catch {
      showToast("Unable to save your session. Please enable browser storage and try again.", "error", 3500);
      return;
    }

    setIsSubmitting(true);
    showToast("Account created! Taking you to HireMe…", "success", 900);
    setTimeout(() => {
      navigate("/customer/home");
    }, 450);
  };

  return (
    <div className="customer-details">
      <div className="customer-details-shell">
        <div className="crd-orb crd-orb-tr" aria-hidden="true" />
        <div className="crd-orb crd-orb-bl" aria-hidden="true" />

        <div className="crd-content">
          <header className="crd-header">
            <Link
              to="/customer/register/code"
              className="crd-back-btn"
              aria-label="Back to verification code"
            >
              <HireMeIcon name="back" />
            </Link>

            <div className="crd-brand">
              <h1 className="crd-brand-logo">
                Hire<span className="logo-accent">Me</span>
              </h1>
              <p className="crd-brand-tagline">Work. Earn. Grow.</p>
            </div>
          </header>

          <nav className="crd-progress" aria-label="Customer registration progress">
            <div className="crd-step-item">
              <div className="crd-step-top">
                <span className="crd-step-circle">1</span>
                <div className="crd-step-line completed" />
              </div>
              <span className="crd-step-label">Verify</span>
            </div>

            <div className="crd-step-item">
              <div className="crd-step-top">
                <div className="crd-step-line completed" />
                <span className="crd-step-circle">2</span>
                <div className="crd-step-line completed" />
              </div>
              <span className="crd-step-label">Enter Code</span>
            </div>

            <div className="crd-step-item">
              <div className="crd-step-top">
                <div className="crd-step-line" />
                <span className="crd-step-circle active" aria-current="step">
                  3
                </span>
              </div>
              <span className="crd-step-label active">Register Details</span>
            </div>
          </nav>

          <div className="crd-title-wrap">
            <h2 className="crd-title">Create Your Account</h2>
            <p className="crd-subtitle">Just a few details to get started.</p>
          </div>

          <form className="crd-form" id="customerDetailsForm" onSubmit={handleSubmit} noValidate>
            <div className="crd-form-group">
              <label className="crd-label" htmlFor="fullNameInput">
                Full Name
              </label>
              <div className={`crd-input-pill ${errors.fullName ? "has-error" : ""}`}>
                <div className="crd-input-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="profile" /></svg>
                </div>
                <input
                  ref={fullNameRef}
                  type="text"
                  id="fullNameInput"
                  className="crd-input-field"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={handleFullNameChange}
                  aria-label="Full Name"
                />
              </div>
            </div>

            <div className="crd-form-group">
              <label className="crd-label" htmlFor="nicInput">
                NIC or Passport Number
              </label>
              <div className={`crd-input-pill ${errors.nic ? "has-error" : ""}`}>
                <div className="crd-input-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="identity" /></svg>
                </div>
                <input
                  ref={nicRef}
                  type="text"
                  id="nicInput"
                  className="crd-input-field"
                  placeholder="Enter your NIC or Passport number"
                  autoComplete="off"
                  required
                  value={nic}
                  onChange={handleNicChange}
                  aria-label="NIC or Passport Number"
                />
              </div>
              <p className="crd-helper-text">
                You can enter either your National ID (NIC) or Passport number.
              </p>
            </div>

            <div className="crd-form-group">
              <label className="crd-label" htmlFor="passwordInput">
                Password
              </label>
              <div className={`crd-input-pill ${errors.password ? "has-error" : ""}`}>
                <div className="crd-input-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><HireMeIconArtwork name="password" /></svg>
                </div>
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  id="passwordInput"
                  className="crd-input-field"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  aria-label="Password"
                />
                <button
                  type="button"
                  className="crd-toggle-password"
                  id="togglePasswordBtn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    ><HireMeIconArtwork name="hide-password" /></svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    ><HireMeIconArtwork name="show-password" /></svg>
                  )}
                </button>
              </div>
              <p className="crd-helper-text">Use at least 6 characters</p>
            </div>

            <button
              type="submit"
              className="crd-btn-primary"
              id="customerSubmitBtn"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.9 : 1 }}
            >
              <span className="crd-btn-text">Create Account</span>
              <div className="crd-btn-arrow-circle" aria-hidden="true">
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
          </form>

          <div className="crd-success-card" id="crdSuccessCard" role="status" aria-live="polite">
            <div className="crd-success-title">Account Details Verified!</div>
            <p className="crd-success-desc" id="crdSuccessMsg">
              Your Customer account details are valid and ready for backend registration.
            </p>
          </div>

          <footer className="crd-login-prompt">
            Already have an account?{" "}
            <Link to="/login" className="crd-login-link">
              Login
            </Link>
          </footer>
        </div>

        <div
          className={`crd-toast ${toast.visible ? "visible" : ""} ${
            toast.type === "error"
              ? "crd-toast-error"
              : toast.type === "success"
              ? "crd-toast-success"
              : ""
          }`}
          id="crdToast"
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      </div>
    </div>
  );
}

