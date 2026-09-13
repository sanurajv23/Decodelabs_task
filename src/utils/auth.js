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
export function startSession({ role }) {
  if (!role || !Object.prototype.hasOwnProperty.call(DESTINATIONS, role)) {
    throw new Error(`Unsupported account role: ${role}`);
  }
  const session = { authenticated: true, role };
  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (err) {
    console.warn("Storage write unavailable:", err);
  }
  return session;
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

