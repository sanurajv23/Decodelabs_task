/**
 * HireMe Authentication & Session Utilities
 * Manages frontend session state in sessionStorage, matching original HireMeAuth.
 */

const SESSION_KEY = "hireme_session";
const DESTINATIONS = {
  worker: "/worker/home",
  customer: "/customer/home",
};

/**
 * Starts an authenticated session for the given role.
 * @param {Object} params - { role: 'customer' | 'worker' }
 * @returns {Object} { authenticated: true, role }
 */
export function startSession({ role, identifier }) {
  if (!role || !Object.prototype.hasOwnProperty.call(DESTINATIONS, role)) {
    throw new Error(`Unsupported account role: ${role}`);
  }
  const session = { authenticated: true, role, ...(identifier ? { identifier } : {}) };
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (err) {
    console.warn("Storage write unavailable:", err);
  }
  window.dispatchEvent(new Event("hireme-user-change"));
  return session;
}

const PROFILE_FIELDS = ["fullName", "nicPassport", "verifiedContact", "verificationMethod", "registrationCompleted", "registeredAt", "category", "skills", "expLevel", "rate", "area", "availability", "bio"];

export function getProfile(role) {
  if (!Object.hasOwn(DESTINATIONS, role)) return {};
  try {
    const profile = JSON.parse(window.sessionStorage.getItem(`${role}Profile`) || "{}");
    return profile && typeof profile === "object" && !Array.isArray(profile) ? profile : {};
  } catch { return {}; }
}

export function saveProfile(role, fields, { replace = false } = {}) {
  if (!Object.hasOwn(DESTINATIONS, role)) throw new Error("Unsupported profile role");
  const source = { ...(replace ? {} : getProfile(role)), ...fields };
  const profile = Object.fromEntries(PROFILE_FIELDS.filter(key => source[key] !== undefined).map(key => [key, source[key]]));
  window.sessionStorage.setItem(`${role}Profile`, JSON.stringify(profile));
  window.dispatchEvent(new Event("hireme-user-change"));
  return profile;
}

function contactKey(value) {
  if (typeof value !== "string") return "";
  const text = value.trim().toLowerCase();
  if (text.includes("@")) return text;
  if (!/^[+\d\s()-]+$/.test(text)) return text;
  const digits = text.replace(/\D/g, "");
  return digits.replace(/^(?:94|0)(?=\d{9}$)/, "");
}

export function resolveLoginRole(identifier) {
  const key = contactKey(identifier);
  for (const role of ["customer", "worker"]) {
    if (key && key === contactKey(getProfile(role).verifiedContact)) return role;
  }
  // Preserve the existing local demo login convention for unregistered accounts.
  return String(identifier).toLowerCase().includes("customer") ? "customer" : "worker";
}

export function getCurrentUser() {
  const session = getSession();
  const role = session?.role;
  const stored = getProfile(role);
  const profile = session && (!session.identifier || contactKey(session.identifier) === contactKey(stored.verifiedContact)) ? stored : {};
  const name = typeof profile.fullName === "string" ? profile.fullName.trim() : "";
  const fullName = name && !["undefined", "null", "[object object]"].includes(name.toLowerCase()) ? name : role === "worker" ? "Worker" : "Customer";
  return { ...profile, role, fullName, firstName: fullName.split(/\s+/)[0] };
}

/**
 * Retrieves the current valid session, or null if unauthenticated.
 * @returns {Object|null} { authenticated: true, role: 'customer'|'worker' } or null
 */
export function getSession() {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (
      session?.authenticated === true &&
      Object.prototype.hasOwnProperty.call(DESTINATIONS, session.role)
    ) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Checks whether an active authenticated session exists.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return getSession() !== null;
}

/**
 * Gets the current session's authenticated role.
 * @returns {'customer' | 'worker' | null}
 */
export function getRole() {
  return getSession()?.role || null;
}

/**
 * Returns the destination dashboard route for a given role.
 * @param {string} role - 'customer' | 'worker'
 * @returns {string|null}
 */
export function getHomeDestination(role) {
  return DESTINATIONS[role] || null;
}

/**
 * Clears the session and redirects to the login page.
 * @param {Function} [navigate] - Optional React Router navigate function
 */
export function logout(navigate) {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore storage errors
  }
  window.dispatchEvent(new Event("hireme-user-change"));
  if (typeof navigate === "function") {
    navigate("/login", { replace: true });
  } else if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

// Attach to window.HireMeAuth for backward compatibility with existing tests and scripts
if (typeof window !== "undefined") {
  window.HireMeAuth = {
    startSession,
    getSession,
    getHomeDestination,
    logout,
    isAuthenticated,
    getRole,
  };
}
