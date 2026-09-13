import { Link } from "react-router-dom";

export default function Logo({
  to,
  showTagline = true,
  className = "brand-logo",
  onClick,
  ariaLabel = "HireMe Home",
}) {
  const content = (
    <>
      <span>
        Hire<span className="logo-accent">Me</span>
      </span>
      {showTagline && <span className="brand-tagline">Work. Earn. Grow.</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

