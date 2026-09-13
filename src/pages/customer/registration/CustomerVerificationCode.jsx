import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import HireMeIcon from "../../../components/HireMeIcon";
import "./CustomerVerificationCode.css";

function formatPhone(value) {
  const digitsOnly = String(value || "").replace(/\D/g, "");
  if (!digitsOnly) return "";
  const local = digitsOnly.startsWith("94") ? digitsOnly.slice(2) : digitsOnly.replace(/^0/, "");
  const spaced = local.replace(/(\d{2})(\d{3})(\d{4}).*/, "$1 $2 $3").trim();
  return spaced ? `+94 ${spaced}` : String(value);
}

function getStoredVerification() {
  let details = {};
  try {
    details = JSON.parse(window.sessionStorage.getItem("customerVerification") || "{}");
  } catch {
    // Retain neutral placeholder
  }

  const method = String(details.method || details.verificationMethod || "").toLowerCase();
  const isEmail = method === "email" || method === "emailaddress" || (Boolean(details.email) && !details.phone);
  const contact = isEmail ? String(details.email || "") : formatPhone(details.phone || details.mobile || details.mobileNumber);
  return { isEmail, contact: contact || "your selected contact" };
}

export default function CustomerVerificationCode() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [verificationData] = useState(getStoredVerification);
  const isEmailMethod = verificationData.isEmail;
  const contactText = verificationData.contact;
  const [secondsRemaining, setSecondsRemaining] = useState(28);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const timerIntervalRef = useRef(null);

  const startCountdown = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setSecondsRemaining(28);
    setCanResend(false);

    const deadline = Date.now() + 28000;
    timerIntervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(timerIntervalRef.current);
        setCanResend(true);
      }
    }, 1000);
  };

  useEffect(() => {
    const oldTitle = document.title;
    const viewport = document.querySelector('meta[name="viewport"]');
    const oldViewport = viewport?.getAttribute("content");
    document.title = "HireMe — Enter Verification Code";
    viewport?.setAttribute("content", "width=device-width, initial-scale=1.0, viewport-fit=cover");

    const deadline = Date.now() + 28000;
    timerIntervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(timerIntervalRef.current);
        setCanResend(true);
      }
    }, 1000);

    return () => {
      document.title = oldTitle;
      if (viewport) {
        if (oldViewport === null) viewport.removeAttribute("content");
        else viewport.setAttribute("content", oldViewport);
      }
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const handleDigitChange = (index, value) => {
    const numeric = value.replace(/\D/g, "");
    const digit = numeric.slice(-1);

    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    setMessage("");

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      e.preventDefault();
      const newDigits = [...digits];
      newDigits[index - 1] = "";
      setDigits(newDigits);
      inputRefs.current[index - 1]?.focus();
      inputRefs.current[index - 1]?.select();
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
      inputRefs.current[index - 1]?.select();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData)
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || "";
    }
    setDigits(newDigits);
    setMessage("");

    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleResend = () => {
    if (!canResend) return;
    setMessage("Demo only: no SMS or email was sent.");
    setDigits(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    startCountdown();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = digits.join("");
    if (!/^\d{6}$/.test(fullCode)) {
      setMessage("Enter all six digits to continue.");
      const firstEmptyIdx = digits.findIndex((d) => !d);
      if (firstEmptyIdx !== -1) {
        inputRefs.current[firstEmptyIdx]?.focus();
      }
      return;
    }

    navigate("/customer/register/details");
  };

  return (
    <div className="customer-code">
      <div className="customer-code-shell">
        <div className="customer-code-orb customer-code-orb-top-right" aria-hidden="true" />
        <div className="customer-code-orb customer-code-orb-center" aria-hidden="true" />
        <div className="customer-code-orb customer-code-orb-bottom-left" aria-hidden="true" />

        <header className="customer-code-header">
          <Link
            to="/customer/register"
            className="customer-code-back"
            id="customerCodeBack"
            aria-label="Back to customer verification"
          >
            <HireMeIcon name="back" />
          </Link>
          <div className="customer-code-brand">
            <p className="customer-code-logo">
              Hire<span>Me</span>
            </p>
            <p className="customer-code-tagline">Work. Earn. Grow.</p>
          </div>
        </header>

        <nav className="customer-code-progress" aria-label="Customer registration progress">
          <div className="customer-code-step customer-code-step-complete">
            <div className="customer-code-step-top">
              <span className="customer-code-step-circle">1</span>
              <i />
            </div>
            <span>Verify</span>
          </div>
          <div className="customer-code-step customer-code-step-active" aria-current="step">
            <div className="customer-code-step-top">
              <i />
              <span className="customer-code-step-circle">2</span>
              <i />
            </div>
            <span>Enter Code</span>
          </div>
          <div className="customer-code-step">
            <div className="customer-code-step-top">
              <i />
              <span className="customer-code-step-circle">3</span>
            </div>
            <span>Register Details</span>
          </div>
        </nav>

        <main className="customer-code-main">
          <section className="customer-code-intro" aria-labelledby="customerCodeTitle">
            <h1 id="customerCodeTitle">Enter Verification Code</h1>
            <p>We have sent a 6-digit verification code to</p>
            <strong id="customerCodeContact" aria-live="polite">
              {contactText}
            </strong>
          </section>

          <form id="customerCodeForm" onSubmit={handleSubmit} noValidate>
            <div
              className="customer-code-otp"
              role="group"
              aria-label="Six digit verification code"
              aria-describedby="customerCodeInstruction customerCodeMessage"
            >
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  className="customer-code-digit"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete={idx === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  aria-label={`Verification digit ${idx + 1}`}
                />
              ))}
            </div>

            <p className="customer-code-instruction" id="customerCodeInstruction">
              {isEmailMethod
                ? "Enter the 6-digit code sent to your email address."
                : "Enter the 6-digit code sent to your mobile number."}
            </p>

            <p className="customer-code-message" id="customerCodeMessage" role="status" aria-live="polite">
              {message}
            </p>

            <div className="customer-code-resend" id="customerCodeResend">
              <p>Didn't receive the code?</p>
              <button
                type="button"
                id="customerCodeResendButton"
                disabled={!canResend}
                onClick={handleResend}
              >
                <span id="customerCodeResendLabel">
                  {canResend ? "Resend Code" : "Resend Code in"}
                </span>{" "}
                {!canResend && (
                  <span id="customerCodeTimer">
                    00:{String(secondsRemaining).padStart(2, "0")}
                  </span>
                )}
              </button>
            </div>

            <button type="submit" className="customer-code-submit" id="customerCodeSubmit">
              <span>Verify</span>
              <i aria-hidden="true">
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
              </i>
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
