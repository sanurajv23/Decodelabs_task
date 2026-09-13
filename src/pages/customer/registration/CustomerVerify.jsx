import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HireMeIcon from "../../../components/HireMeIcon";
import "./CustomerVerify.css";

export default function CustomerVerify() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(() => {
    try {
      const stored = JSON.parse(window.sessionStorage.getItem("customerVerification") || "{}");
      if (stored.method) return stored.method;
    } catch {
      // Storage unavailable
    }
    return "mobile";
  });
  const [phone, setPhone] = useState(() => {
    try {
      const stored = JSON.parse(window.sessionStorage.getItem("customerVerification") || "{}");
      if (stored.phone) return stored.phone;
    } catch {
      // Storage unavailable
    }
    return "";
  });
  const [email, setEmail] = useState(() => {
    try {
      const stored = JSON.parse(window.sessionStorage.getItem("customerVerification") || "{}");
      if (stored.email) return stored.email;
    } catch {
      // Storage unavailable
    }
    return "";
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — Verify Your Account";
    viewport?.setAttribute("content", "width=device-width, initial-scale=1.0, viewport-fit=cover");

    return () => {
      document.title = oldTitle;
      if (viewport) {
        if (oldViewport === null) viewport.removeAttribute("content");
        else viewport.setAttribute("content", oldViewport);
      }
    };
  }, []);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setErrorMessage("");
  };

  const handleMethodKeyDown = (e, method) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelectMethod(method);
    }
  };

  const handlePhoneChange = (e) => {
    const sanitized = e.target.value.replace(/[^\d\s-]/g, "");
    setPhone(sanitized);
    if (selectedMethod === "mobile") setErrorMessage("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (selectedMethod === "email") setErrorMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredPhone = phone.replace(/\D/g, "").replace(/^94/, "").replace(/^0/, "");
    const enteredEmail = email.trim();

    if (selectedMethod === "mobile") {
      if (!/^7\d{8}$/.test(enteredPhone)) {
        setErrorMessage("Enter a valid Sri Lankan mobile number.");
        document.getElementById("customerPhoneInput")?.focus();
        return;
      }
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail)) {
      setErrorMessage("Enter a valid email address.");
      document.getElementById("customerEmailInput")?.focus();
      return;
    }

    const verification = {
      method: selectedMethod,
      phone: selectedMethod === "mobile" ? enteredPhone : "",
      email: selectedMethod === "email" ? enteredEmail : "",
    };

    try {
      window.sessionStorage.setItem("customerVerification", JSON.stringify(verification));
    } catch {
      // Storage fallback
    }

    navigate("/customer/register/code");
  };

  return (
    <div className="customer-verify">
      <div className="reg-shell">
        <div className="reg-orb reg-orb-tr" aria-hidden="true" />
        <div className="reg-orb reg-orb-mr" aria-hidden="true" />
        <div className="reg-orb reg-orb-bl" aria-hidden="true" />

        <header className="reg-header">
          <Link to="/register" className="reg-back-btn" aria-label="Back to account type selection">
            <HireMeIcon name="back" />
          </Link>

          <div className="reg-brand">
            <div className="reg-brand-logo">
              Hire<span className="logo-accent">Me</span>
            </div>
            <div className="reg-brand-tagline">Work. Earn. Grow.</div>
          </div>
        </header>

        <nav className="reg-progress" aria-label="Customer registration progress">
          <div className="reg-step-item">
            <div className="reg-step-top">
              <div className="reg-step-circle active">1</div>
              <div className="reg-step-line completed" />
            </div>
            <span className="reg-step-label active" aria-current="step">
              Verify
            </span>
          </div>

          <div className="reg-step-item">
            <div className="reg-step-top">
              <div className="reg-step-line" />
              <div className="reg-step-circle">2</div>
              <div className="reg-step-line" />
            </div>
            <span className="reg-step-label">Register Details</span>
          </div>

          <div className="reg-step-item">
            <div className="reg-step-top">
              <div className="reg-step-line" />
              <div className="reg-step-circle">3</div>
            </div>
            <span className="reg-step-label">Complete</span>
          </div>
        </nav>

        <div className="reg-title-wrap">
          <h1 className="reg-title">Verify Your Account</h1>
          <p className="reg-subtitle">Choose how you want to receive the verification code</p>
        </div>

        <form id="customerVerifyForm" onSubmit={handleSubmit} noValidate>
          <div className="reg-method-grid" role="radiogroup" aria-label="Verification method">
            <div
              className={`reg-method-card ${selectedMethod === "mobile" ? "selected" : ""}`}
              role="radio"
              aria-checked={selectedMethod === "mobile"}
              tabIndex={0}
              data-method="mobile"
              onClick={() => handleSelectMethod("mobile")}
              onKeyDown={(e) => handleMethodKeyDown(e, "mobile")}
            >
              <span className="reg-radio-indicator" aria-hidden="true" />
              <span className="reg-method-icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
                </svg>
              </span>
              <span className="reg-method-title">Via Mobile Number</span>
              <span className="reg-method-desc">Get a verification code via SMS to your mobile number.</span>
            </div>

            <div
              className={`reg-method-card ${selectedMethod === "email" ? "selected" : ""}`}
              role="radio"
              aria-checked={selectedMethod === "email"}
              tabIndex={0}
              data-method="email"
              onClick={() => handleSelectMethod("email")}
              onKeyDown={(e) => handleMethodKeyDown(e, "email")}
            >
              <span className="reg-radio-indicator" aria-hidden="true" />
              <span className="reg-method-icon-wrap" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
                </svg>
              </span>
              <span className="reg-method-title">Via Email Address</span>
              <span className="reg-method-desc">Get a verification code via email to your Gmail address.</span>
            </div>
          </div>

          <div className="reg-form-group">
            <label className="reg-label" htmlFor="customerPhoneInput">
              Mobile Number
            </label>
            <div className="reg-input-pill">
              <div className="reg-phone-prefix" aria-hidden="true">
                <svg className="reg-flag-svg" viewBox="0 0 640 480">
                  <rect width="640" height="480" fill="#ffbe29" />
                  <rect width="600" height="440" x="20" y="20" fill="#000" />
                  <rect width="580" height="420" x="30" y="30" fill="#ffbe29" />
                  <rect width="70" height="380" x="50" y="50" fill="#005f41" />
                  <rect width="70" height="380" x="130" y="50" fill="#eb7600" />
                  <rect width="360" height="380" x="230" y="50" fill="#8d153a" />
                  <circle cx="255" cy="75" r="10" fill="#ffbe29" />
                  <circle cx="565" cy="75" r="10" fill="#ffbe29" />
                  <circle cx="255" cy="405" r="10" fill="#ffbe29" />
                  <circle cx="565" cy="405" r="10" fill="#ffbe29" />
                  <path
                    d="M410 200c-20 0-35 15-35 35 0 25 20 45 45 45 15 0 28-8 35-20l-15-10c-4 7-12 12-20 12-15 0-25-10-25-27h65c1-3 1-6 1-10 0-25-20-45-46-45Zm-15 35c2-12 10-18 20-18 10 0 18 6 20 18h-40Z"
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
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
                <span className="reg-phone-divider" />
              </div>
              <input
                type="tel"
                id="customerPhoneInput"
                className="reg-input-field"
                placeholder="77 123 4567"
                inputMode="numeric"
                autoComplete="tel-national"
                required={selectedMethod === "mobile"}
                value={phone}
                onChange={handlePhoneChange}
                aria-describedby="customerVerifyMessage"
              />
            </div>
          </div>

          <div className="reg-or-divider" aria-label="or">
            <div className="reg-or-line" />
            <span className="reg-or-text">OR</span>
            <div className="reg-or-line" />
          </div>

          <div className="reg-form-group">
            <label className="reg-label" htmlFor="customerEmailInput">
              Email Address
            </label>
            <div className="reg-input-pill">
              <div className="reg-input-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
                </svg>
              </div>
              <input
                type="email"
                id="customerEmailInput"
                className="reg-input-field"
                placeholder="example@gmail.com"
                autoComplete="email"
                required={selectedMethod === "email"}
                value={email}
                onChange={handleEmailChange}
                aria-describedby="customerVerifyMessage"
              />
            </div>
          </div>

          <p id="customerVerifyMessage" className="reg-validation-message" role="alert" aria-live="polite">
            {errorMessage}
          </p>

          <button type="submit" className="reg-btn-primary">
            <span>Send Verification Code</span>
            <span className="reg-btn-arrow" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
