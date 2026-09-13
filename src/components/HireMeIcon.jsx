import "./HireMeIcon.css";

// Existing artwork from WorkerHome (original pages/worker-home.html).
const artwork = {
  home: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  messages: <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />,
  profile: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
  jobs: <><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" /><circle cx="17.5" cy="17.5" r="4.5" fill="#ffffff" /><path d="M17.5 14a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm.5 4h-1.5V15h1v2.5h.5v.5z" fill="currentColor" /></>,
  earnings: <path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2zM4 9.17c1.84 1.1 4.79 1.83 8 1.83s6.16-.73 8-1.83V11c0 .66-3.58 2-8 2s-8-1.34-8-2V9.17zm0 5c1.84 1.1 4.79 1.83 8 1.83s6.16-.73 8-1.83V16c0 .66-3.58 2-8 2s-8-1.34-8-2v-1.83z" />,
  notifications: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
  // Existing Customer Home / Explore search artwork.
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>,
  // Existing back arrow artwork shared across Customer and Worker registration pages.
  back: <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></>,
};
const glyphs = { explore: "⌕", bookings: "▣" };

export default function HireMeIcon({ name }) {
  if (name === "menu") {
    // Original Worker Home menu bars, shared without page-dependent styles.
    return <span className="hireme-menu-icon" aria-hidden="true"><span /><span /><span /></span>;
  }
  if (glyphs[name]) return <span className="hireme-glyph" data-icon={name} aria-hidden="true">{glyphs[name]}</span>;
  if (!artwork[name]) throw new Error(`Unknown HireMe icon: ${name}`);
  const outlined = name === "notifications" || name === "search" || name === "back";
  const strokeWidth = name === "search" ? 2.5 : name === "back" ? 2.4 : 2;
  return <svg className={`hireme-icon${outlined ? " hireme-icon-outline" : ""}`} data-icon={name}
    aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill={outlined ? "none" : "currentColor"}
    stroke={outlined ? "currentColor" : "none"} strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round">{artwork[name]}</svg>;
}
