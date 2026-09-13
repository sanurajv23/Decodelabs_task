import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { startSession } from "../../utils/auth";
import "./Login.css";

const SAVED_IDENTIFIER_KEY = "hireme_remembered_identifier";
const REMEMBER_ME_FLAG = "hireme_remember_me";

export default function Login() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(() => {
    try {
      if (localStorage.getItem(REMEMBER_ME_FLAG) === "true") {
        return localStorage.getItem(SAVED_IDENTIFIER_KEY) || "";
      }
    } catch {
      // Ignore storage access errors
    }
    return "";
  });

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return localStorage.getItem(REMEMBER_ME_FLAG) === "true";
    } catch {
      return false;
    }
  });

  const [errors, setErrors] = useState({ identifier: false, password: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" });

  const toastTimerRef = useRef(null);
  const identifierRef = useRef(null);
  const passwordRef = useRef(null);

  const showToast = (message, type = "info", duration = 3000) => {
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
    document.title = "HireMe — Welcome Back";
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

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
    if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: false }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: false }));
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const trimmed = identifier.trim();
    if (trimmed) {
      showToast(`Password reset link sent to ${trimmed}`, "info", 3200);
    } else {
      showToast("Enter your Email or Phone to receive a password reset link.", "info", 3200);
      identifierRef.current?.focus();
    }
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    showToast("Google Sign-In ready for OAuth 2.0 client credentials.", "info", 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedIdentifier = identifier.trim();

    let hasError = false;
    const newErrors = { identifier: false, password: false };

    if (!trimmedIdentifier) {
      newErrors.identifier = true;
      hasError = true;
    }

    if (!password) {
      newErrors.password = true;
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      showToast("Please enter both your email/phone and password.", "error");
      if (newErrors.identifier) {
        identifierRef.current?.focus();
      } else if (newErrors.password) {
        passwordRef.current?.focus();
      }
      return;
    }

    // Persist or clear remember-me preference
    try {
      if (rememberMe) {
        localStorage.setItem(REMEMBER_ME_FLAG, "true");
        localStorage.setItem(SAVED_IDENTIFIER_KEY, trimmedIdentifier);
      } else {
        localStorage.removeItem(REMEMBER_ME_FLAG);
        localStorage.removeItem(SAVED_IDENTIFIER_KEY);
      }
    } catch {
      // Storage unavailable
    }

    setIsSubmitting(true);

    // Determine role (matching original HireMe authentication logic)
    let isCustomer = trimmedIdentifier.toLowerCase().includes("customer");
    try {
      const storedProfile = JSON.parse(window.sessionStorage.getItem("customerProfile") || "{}");
      if (storedProfile.verifiedContact && trimmedIdentifier.includes(storedProfile.verifiedContact)) {
        isCustomer = true;
      }
    } catch {
      // Ignore
    }

    const role = isCustomer ? "customer" : "worker";

    try {
      startSession({ role });
      showToast("Welcome back! Redirecting to Home...", "success", 1800);
      setTimeout(() => {
        const destination = role === "worker" ? "/worker/home" : "/customer/home";
        navigate(destination, { replace: true });
      }, 600);
    } catch {
      showToast("Authentication failed. Please check your credentials.", "error");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        {/* Atmospheric Ambient Background Orbs */}
        <div className="login-orb login-orb-tl" aria-hidden="true" />
        <div className="login-orb login-orb-mr" aria-hidden="true" />
        <div className="login-orb login-orb-bl" aria-hidden="true" />

        <main className="login-content">
          {/* Top Branding */}
          <header className="login-brand">
            <h1 className="login-brand-logo">
              Hire<span className="logo-accent">Me</span>
            </h1>
            <p className="login-brand-tagline">Work. Earn. Grow.</p>
          </header>

          {/* Large Profile Squircle Icon Container */}
          <div className="login-avatar-squircle" aria-hidden="true">
            <div className="login-avatar-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.67 0 4.8-2.13 4.8-4.8S14.67 2.4 12 2.4 7.2 4.53 7.2 7.2 9.33 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          </div>

          {/* Welcome Back Header Section */}
          <section className="login-welcome-section">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to continue to HireMe</p>
          </section>

          {/* Unified Login Form (Role-Neutral) */}
          <form className="login-form" id="loginForm" onSubmit={handleSubmit} noValidate>
            {/* Email or Phone Number Input */}
            <div className="login-input-group">
              <div className={`login-input-pill ${errors.identifier ? "has-error" : ""}`}>
                <div className="login-input-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <input
                  ref={identifierRef}
                  type="text"
                  id="identifierInput"
                  className="login-input-field"
                  placeholder="Email or Phone Number"
                  autoComplete="username"
                  required
                  value={identifier}
                  onChange={handleIdentifierChange}
                  aria-label="Email or Phone Number"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="login-input-group">
              <div className={`login-input-pill ${errors.password ? "has-error" : ""}`}>
                <div className="login-input-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </div>
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  id="passwordInput"
                  className="login-input-field"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  aria-label="Password"
                />
                <button
                  type="button"
                  className="login-toggle-password"
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
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="login-options-row">
              <label className="login-remember-label" htmlFor="rememberCheckbox">
                <input
                  type="checkbox"
                  id="rememberCheckbox"
                  className="login-checkbox-hidden"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="login-checkbox-custom" aria-hidden="true">
                  <svg
                    className="login-checkbox-check"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="login-remember-text">Remember me</span>
              </label>

              <button
                type="button"
                className="login-forgot-link"
                id="forgotPasswordBtn"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            {/* Primary Login Action Button */}
            <button
              type="submit"
              className="login-btn-primary"
              id="loginSubmitBtn"
              disabled={isSubmitting}
              style={{ opacity: isSubmitting ? 0.85 : 1 }}
            >
              <span className="login-btn-text">Login</span>
              <div className="login-btn-arrow-circle" aria-hidden="true">
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
              </div>
            </button>
          </form>

          {/* Subtle OR Separator */}
          <div className="login-or-divider" role="separator" aria-label="Or continue with other methods">
            <div className="login-or-line" />
            <span className="login-or-text">OR</span>
            <div className="login-or-line" />
          </div>

          {/* Continue with Google Button */}
          <button
            type="button"
            className="login-google-btn"
            id="googleLoginBtn"
            onClick={handleGoogleLogin}
          >
            <div className="login-google-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <span>Continue with Google</span>
          </button>

          {/* Register Prompt linking to Register choice */}
          <footer className="login-register-prompt">
            Don’t have an account?{" "}
            <Link to="/register" className="login-register-link">
              Register
            </Link>
          </footer>
        </main>

        {/* Accessible Toast Message Floating Notification */}
        <div
          className={`login-toast ${toast.visible ? "visible" : ""} ${
            toast.type === "error"
              ? "toast-error"
              : toast.type === "success"
              ? "toast-success"
              : ""
          }`}
          id="loginToast"
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      </div>
    </div>
  );
}

