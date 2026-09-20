import "./HireMeIcon.css";

// Existing artwork from WorkerHome (original pages/worker-home.html).
const artwork = {
  // Extracted unchanged from existing Worker pages.
  "plumbing": <><path d="M12 2c0 3-4 6-4 9a4 4 0 0 0 8 0c0-3-4-6-4-9z"></path> <path d="M6 16c0 2 2 3 4 3s4-1 4-3"></path></>,
  "cleaning": <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></>,
  "ac": <><line x1="12" y1="2" x2="12" y2="22"></line> <line x1="2" y1="12" x2="22" y2="12"></line> <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line> <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"></line></>,
  "chevron": <><polyline points="9 18 15 12 9 6"></polyline></>,
  "forward": <><line x1="5" y1="12" x2="19" y2="12" /> <polyline points="12 5 19 12 12 19" /></>,
  "password": <><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /></>,
  "hide-password": <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /> <line x1="1" y1="1" x2="23" y2="23" /></>,
  "show-password": <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /> <circle cx="12" cy="12" r="3" /></>,
  "email": <><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></>,
  "more": <><circle cx="12" cy="5" r="2" /> <circle cx="12" cy="12" r="2" /> <circle cx="12" cy="19" r="2" /></>,
  "smile": <><circle cx="12" cy="12" r="9" /> <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></>,
  "send": <><path d="m3 11 18-8-7.5 18-2.4-7.6L3 11zm9.3 1.2 4.8-5.6-7 4 2.2 1.6z" /></>,
  "verified": <><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></>,
  "balance": <><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></>,
  "details": <><line x1="8" y1="6" x2="21" y2="6"></line> <line x1="8" y1="12" x2="21" y2="12"></line> <line x1="8" y1="18" x2="21" y2="18"></line> <line x1="3" y1="6" x2="3.01" y2="6"></line> <line x1="3" y1="12" x2="3.01" y2="12"></line> <line x1="3" y1="18" x2="3.01" y2="18"></line></>,
  "identity": <><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-9 3h2v2h-2V7zm0 4h2v2h-2v-2zm-4-4h2v2H7V7zm0 4h2v2H7v-2zm12 6H5v-1.5c0-.83 1.67-1.5 5-1.5s5 .67 5 1.5V17zm2-4h-4v-1h4v1zm0-3h-4V9h4v1z" /></>,
  "expand": <><polyline points="6 9 12 15 18 9" /></>,
  // Explore/discovery: shared filled compass, distinct from search controls.
  explore: <><path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5 5-3 7-7 3 3-7 7-3z" /><circle cx="12" cy="12" r="1" /></>,
  // Existing Worker Jobs cancellation artwork, reused by booking actions.
  delete: <><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v5M14 11v5" /></>,
  // Existing Worker Jobs metadata/reschedule artwork and Worker Messages call artwork.
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  location: <><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>,
  call: <path d="M6.6 10.8c1.5 3 3.9 5.4 6.9 6.9l2.3-2.3c.3-.3.7-.4 1-.3 1.1.4 2.2.6 3.4.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.7 22 2 13.3 2 2.8c0-.6.4-1 1-1h4.3c.6 0 1 .4 1 1 0 1.2.2 2.3.6 3.4.1.3 0 .7-.3 1z" />,
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
  // Customer Profile option icons.
  edit: <path d="m4 20 4-1 11-11a2 2 0 0 0-3-3L5 16l-1 4z" />,
  address: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  payment: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></>,
  favorites: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.3l7.8-7.8 1-1.1a5.5 5.5 0 0 0 0-7.8z" />,
  privacy: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  help: <><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
  "logout-arrow": <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
  crown: <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 14h14v2H5v-2z" />,
  briefcase: <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />,
  check: <polyline points="20 6 9 17 4 12" />,
  wallet: <path d="M20 7V6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-1h-9a3 3 0 0 1 0-6h9zm-9 2a1 1 0 0 0 0 2h10V9H11z" />,
  chart: <><rect x="3" y="12" width="4.5" height="9" rx="1.5" /><rect x="9.75" y="7" width="4.5" height="14" rx="1.5" /><rect x="16.5" y="3" width="4.5" height="18" rx="1.5" /></>,
};
// Painting and repeat-booking retain existing glyphs where Worker has no equivalent.
// Existing Worker Profile Settings gear, with explicit text presentation.
const glyphs = { bookings: "▣", painting: "▰", "book-again": "⟳", settings: "⚙\uFE0E" };

// Legacy SVG shells retain their existing dimensions/colors while sharing artwork.
export function HireMeIconArtwork({ name }) {
  if (name === "electrical") name = "plumbing"; // Existing Worker Jobs mapping.
  if (!artwork[name]) throw new Error(`Unknown HireMe artwork: ${name}`);
  return artwork[name];
}

export default function HireMeIcon({ name, size, color }) {
  const artworkName = name === "electrical" ? "plumbing" : name;
  if (name === "menu") {
    // Original Worker Home menu bars, shared without page-dependent styles.
    return <span className="hireme-menu-icon" aria-hidden="true"><span /><span /><span /></span>;
  }
  if (glyphs[name]) return <span className="hireme-glyph" data-icon={name} data-size={size} data-color={color} aria-hidden="true">{glyphs[name]}</span>;
  if (!artwork[artworkName]) throw new Error(`Unknown HireMe icon: ${name}`);
  const outlined = ["electrical", "plumbing", "cleaning", "ac", "chevron", "forward", "hide-password", "show-password", "smile", "details", "expand", "delete", "notifications", "search", "back", "calendar", "clock", "location", "edit", "address", "payment", "favorites", "privacy", "help", "logout-arrow", "user", "mail", "check"].includes(name);
  const strokeWidth = name === "search" ? 2.5 : name === "back" ? 2.4 : name === "check" ? 3 : 2;
  return <svg className={`hireme-icon${outlined ? " hireme-icon-outline" : ""}`} data-icon={name} data-size={size}
    data-color={color} aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill={outlined ? "none" : "currentColor"}
    stroke={outlined ? "currentColor" : "none"} strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round"><HireMeIconArtwork name={name} /></svg>;
}
