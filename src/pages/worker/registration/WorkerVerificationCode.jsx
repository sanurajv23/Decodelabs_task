import { HireMeIconArtwork } from "../../../components/HireMeIcon";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HireMeIcon from "../../../components/HireMeIcon";
import RegistrationProgress from "./RegistrationProgress";
import "./WorkerRegistration.css";

export default function WorkerVerificationCode() {
  const [otp, setOtp] = useState(["1", "2", "3", "4", "5", "6"]);
  const [timeLeft, setTimeLeft] = useState(28);
  const [toast, setToast] = useState("");
  const inputRefs = useRef([]);
  const toastTimer = useRef(null);

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — Enter Verification Code";
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

  // 28-second countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const handleResend = (e) => {
    e.preventDefault();
    setTimeLeft(28);
    showToast("A new 6-digit verification code has been sent.");
  };

  const handleOtpChange = (index, value) => {
    const clean = value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[index] = clean ? clean[clean.length - 1] : "";
    setOtp(newOtp);

    if (newOtp[index] && index < 5) {
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      inputRefs.current[index - 1]?.select();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData)
      .getData("text")
      .replace(/\D/g, "");
    if (pasted) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        if (i < pasted.length) {
          newOtp[i] = pasted[i];
        }
      }
      setOtp(newOtp);
      const nextIndex = Math.min(pasted.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const formattedTime = timeLeft < 10 ? `0${timeLeft}` : `${timeLeft}`;

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
            to="/worker/register"
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

        {/* 4-Step Progress Indicator (Step 1) */}
        <RegistrationProgress step={1} />

        {/* Title & Subtitle */}
        <div className="reg-title-wrap">
          <h1 className="reg-title">Enter Verification Code</h1>
          <p className="reg-subtitle">
            We have sent a 6-digit verification code to<br />
            <strong>+94 77 123 4567</strong>
          </p>
        </div>

        {/* 6-Digit OTP Box Grid */}
        <div
          className="reg-otp-grid"
          role="group"
          aria-label="6-Digit Verification Code Inputs"
          onPaste={handlePaste}
        >
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              maxLength={1}
              className="reg-otp-box"
              value={digit}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              inputMode="numeric"
              autoComplete={idx === 0 ? "one-time-code" : "off"}
              aria-label={`Digit ${idx + 1}`}
            />
          ))}
        </div>

        {/* Helper text */}
        <div
          style={{
            textAlign: "center",
            fontSize: "12.5px",
            color: "var(--reg-text-muted)",
            marginBottom: "8px",
          }}
        >
          Enter the 6-digit code sent to your mobile number.
        </div>

        {/* Resend Code Section */}
        <div className="reg-resend-wrap">
          <div className="reg-resend-prompt">Didn't receive the code?</div>
          {timeLeft > 0 ? (
            <div className="reg-resend-timer">
              Resend Code in <span className="time-highlight">00:{formattedTime}</span>
            </div>
          ) : (
            <button
              type="button"
              className="reg-resend-link"
              onClick={handleResend}
            >
              Resend Code
            </button>
          )}
        </div>

        {/* Primary Action Button */}
        <Link
          to="/worker/register/details"
          className="reg-btn-primary"
          style={{ marginTop: "36px" }}
        >
          <span>Verify</span>
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

        {/* Reusable Toast */}
        {toast && (
          <div className="reg-toast" role="status" aria-live="polite">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
