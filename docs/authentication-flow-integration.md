# Authentication & Entry Flow Integration

## Date
2026-09-14

## Purpose
The purpose of this task was to connect the complete HireMe authentication, entry, registration, and dashboard flows together as a unified system in the React application (`HireMe-React`). This integration bridges first-time visitors, role selection, customer/worker onboarding, unified login, session establishment, role-based route protection, and logout into a seamless, cohesive user journey without breaking any existing pages or altering the visual design language.

---

## 1. Original Authentication Files Discovered
Inspection of the original vanilla project (`HireMe/`) identified the canonical authentication architecture:
- `pages/login.html`: Unified role-neutral login page featuring squircle profile avatar, email/phone input pill, password input with eye visibility toggle, remember-me checkbox, forgot password link, primary submit button, OR divider, and Google sign-in button.
- `css/login.css`: Complete styling for the login screen, including atmospheric glowing orbs, squircle avatar container, pill input fields, focus states, floating toast notifications, and responsive breakpoints.
- `js/login.js`: Form submission handling, credential validation, show/hide password toggle, remember-me persistence in `localStorage`, role resolution (detecting `customer` vs. `worker`), session initiation, and destination redirection.
- `js/auth.js`: Prototype session engine defining `SESSION_KEY = 'hireme_session'`, `startSession({ role })`, `getSession()`, `getHomeDestination(role)`, and `logout()`.
- `tests/auth-flows.test.cjs`: Comprehensive integration test suite validating:
  - Worker completion session establishment (`role: 'worker'`) and reload resilience.
  - Customer registration session establishment (`role: 'customer'`) and redirect to `customer-home.html`.
  - Profile logout removing session and routing to `login.html`.
  - Unified login routing `customer` identifiers to `customer-home.html` and other accounts to `worker-home.html`.
  - Malformed session rejection and unsupported role validation.
- `index.html`: Entry redirect pointing to `pages/register.html`.

---

## 2. Original Login Flow
In the original project, login is unified and role-neutral:
1. User lands on `pages/login.html`.
2. Enters identifier (Email or Mobile Phone) and Password.
3. Can toggle "Remember me" (saved to `localStorage` under `hireme_remember_me` and `hireme_remembered_identifier`).
4. Can click "Forgot Password?" to simulate password reset feedback or "Continue with Google" for OAuth 2.0 placeholder toast.
5. On form submit:
   - Validates that both identifier and password are provided.
   - If identifier contains `"customer"`, assigns `role: 'customer'`.
   - Otherwise, assigns `role: 'worker'`.
   - Saves `{ authenticated: true, role }` to `sessionStorage` under `hireme_session`.
   - Shows welcome toast and redirects after delay to `worker-home.html` or `customer-home.html`.
   - Features "Don't have an account? Register" link leading to the registration flow.

---

## 3. Original Registration Flow
The original registration architecture branches at `pages/register.html`:
- **Role Selection (`pages/register.html`)**:
  - Displays "Join as a — Choose how you want to get started".
  - Choice 1: "Register as Customer" -> navigates to `customer-verify.html`.
  - Choice 2: "Register as Worker" -> navigates to `worker-verify.html`.
- **Customer Registration Sequence**:
  - `pages/customer-verify.html` -> `pages/customer-verification-code.html` -> `pages/customer-register-details.html` -> initiates session and enters `customer-home.html`.
- **Worker Registration Sequence**:
  - `pages/worker-verify.html` -> `pages/verification-code.html` -> `pages/worker-register-details.html` -> `pages/worker-work-details.html` -> `pages/worker-complete.html` -> initiates session and enters `worker-home.html`.

---

## 4. Customer Authentication Flow
In React, the Customer flow seamlessly connects across routes:
1. **Entry**: User visits `/` or `/register` and selects "Register as Customer".
2. **Method Selection (`/customer/register`)**: Selects Mobile (+94 prefix with Sri Lanka flag) or Email address.
3. **OTP Code (`/customer/register/code`)**: Inputs 6-digit verification code with auto-advance, backspace, paste, and 28-second timer.
4. **Account Details (`/customer/register/details`)**: Inputs Full Name, NIC/Passport number, and Password with eye toggle.
5. **Session Initiation**: On valid submission:
   - Sets `customerProfile` in `sessionStorage` (strictly without password).
   - Sets `hireme_session: { authenticated: true, role: 'customer' }`.
   - Displays success toast: *"Account created! Taking you to HireMe…"*.
   - Automatically navigates to `/customer/home`.
6. **Subsequent Visits**:
   - Customer accesses `/customer/home`, `/customer/explore`, and `/customer/bookings`.
   - If a Customer attempts to navigate to any Worker route (`/worker/home`, `/worker/jobs`, `/worker/earnings`, `/worker/messages`, `/worker/profile`), `ProtectedRoute` blocks the attempt and redirects back to `/customer/home`.

---

## 5. Worker Authentication Flow
In React, the Worker flow connects across routes:
1. **Entry**: User visits `/` or `/register` and selects "Register as Worker".
2. **Method Selection (`/worker/register`)**: Selects Mobile or Email verification.
3. **OTP Code (`/worker/register/code`)**: 6-digit verification code with live 28s timer.
4. **Identity & Details (`/worker/register/details`)**: Selfie photo frame, Full Name, NIC/Passport, and Password.
5. **Work Details (`/worker/register/work`)**: Trade category, skills, experience level, rate, service area with GPS, and bio.
6. **Registration Complete (`/worker/register/complete`)**: Celebration rays, checklist summary, and "Go to Home" button.
7. **Session Initiation**:
   - Sets `hireme_session: { authenticated: true, role: 'worker' }`.
   - Navigates to `/worker/home`.
8. **Subsequent Visits**:
   - Worker accesses `/worker/home`, `/worker/jobs`, `/worker/earnings`, `/worker/messages`, and `/worker/profile`.
   - If a Worker attempts to navigate to any Customer route (`/customer/home`, `/customer/explore`, `/customer/bookings`), `ProtectedRoute` blocks the attempt and redirects back to `/worker/home`.

---

## 6. Session Structure
Sessions are stored in `window.sessionStorage` under the key `hireme_session`, matching original `HireMeAuth`:
```json
{
  "authenticated": true,
  "role": "customer"
}
```
or
```json
{
  "authenticated": true,
  "role": "worker"
}
```
Key constraints:
- Strictly no passwords or secret tokens are ever stored in session storage.
- Session validity requires `authenticated === true` and `role` to be either `"customer"` or `"worker"`. Any malformed or altered JSON returns `null`.

---

## 7. Role Handling
The application strictly segregates user roles:
- **`customer`**: Has access to `/customer/*` dashboard pages (`CustomerHome`, `CustomerExplore`, `CustomerBookings`).
- **`worker`**: Has access to `/worker/*` dashboard pages (`WorkerHome`, `WorkerJobs`, `WorkerEarnings`, `WorkerMessages`, `WorkerProfile`).
- Cross-role navigation is automatically intercepted and redirected to the user's appropriate home.
- Login determines the role:
  - If the identifier contains `"customer"` or matches the saved `customerProfile.verifiedContact`, the session role is set to `"customer"`.
  - Otherwise, the session role is set to `"worker"`.

---

## 8. Routes Added & Modified
Updated in `src/App.jsx`:

| Route Path | Component / Guard | Status | Description |
| :--- | :--- | :--- | :--- |
| `/` | `RootRedirect` | **MODIFIED** | Redirects authenticated users to their dashboard, or unauthenticated users to `/register` |
| `/login` | `Login` | **NEW** | Unified role-neutral login page |
| `/register` | `CustomerRegisterChoice` | Existing | Account type selection (Customer vs Worker) |
| `/customer/register` | `CustomerVerify` | Existing | Customer Step 1: Verification method |
| `/customer/register/verify` | `CustomerVerify` | Existing | Customer Step 1 alias |
| `/customer/register/code` | `CustomerVerificationCode` | Existing | Customer Step 2: 6-digit OTP |
| `/customer/register/otp` | `CustomerVerificationCode` | Existing | Customer Step 2 alias |
| `/customer/register/details` | `CustomerRegisterDetails` | Existing | Customer Step 3: Account details |
| `/customer/home` | `<ProtectedRoute requiredRole="customer"><CustomerHome /></ProtectedRoute>` | **PROTECTED** | Customer Dashboard |
| `/customer/explore` | `<ProtectedRoute requiredRole="customer"><CustomerExplore /></ProtectedRoute>` | **PROTECTED** | Customer Explore |
| `/customer/bookings` | `<ProtectedRoute requiredRole="customer"><CustomerBookings /></ProtectedRoute>` | **PROTECTED** | Customer Bookings |
| `/worker/register` | `WorkerVerify` | Existing | Worker Step 1: Verification method |
| `/worker/register/verify` | `WorkerVerify` | Existing | Worker Step 1 alias |
| `/worker/register/code` | `WorkerVerificationCode` | Existing | Worker Step 2: 6-digit OTP |
| `/worker/register/details` | `WorkerRegisterDetails` | Existing | Worker Step 3: Identity & details |
| `/worker/register/work` | `WorkerWorkDetails` | Existing | Worker Step 4: Trade & skills |
| `/worker/register/complete` | `WorkerComplete` | Existing | Worker Step 5: Celebration & complete |
| `/worker/home` | `<ProtectedRoute requiredRole="worker"><WorkerHome /></ProtectedRoute>` | **PROTECTED** | Worker Dashboard |
| `/worker/jobs` | `<ProtectedRoute requiredRole="worker"><WorkerJobs /></ProtectedRoute>` | **PROTECTED** | Worker Jobs |
| `/worker/earnings` | `<ProtectedRoute requiredRole="worker"><WorkerEarnings /></ProtectedRoute>` | **PROTECTED** | Worker Earnings |
| `/worker/messages` | `<ProtectedRoute requiredRole="worker"><WorkerMessages /></ProtectedRoute>` | **PROTECTED** | Worker Messages |
| `/worker/profile` | `<ProtectedRoute requiredRole="worker"><WorkerProfile /></ProtectedRoute>` | **PROTECTED** | Worker Profile |

---

## 9. Protected Routes
Implemented via `src/components/ProtectedRoute.jsx`:
- Inspects `getSession()` from `src/utils/auth.js`.
- If `!session || !session.authenticated`:
  Renders `<Navigate to="/login" replace />`.
- If `requiredRole` does not match `session.role`:
  Renders `<Navigate to={session.role === 'worker' ? '/worker/home' : '/customer/home'} replace />`.
- If authorized, renders the requested child component.

---

## 10. Redirect Behavior
- **Unauthenticated Visitor**:
  - Accessing `/` -> redirected to `/register`.
  - Accessing `/customer/*` -> redirected to `/login`.
  - Accessing `/worker/*` -> redirected to `/login`.
- **Authenticated Customer**:
  - Accessing `/` -> redirected to `/customer/home`.
  - Accessing `/customer/home` -> access granted.
  - Accessing `/worker/*` -> intercepted and redirected to `/customer/home`.
  - Completing customer registration -> redirected to `/customer/home`.
  - Completing customer login -> redirected to `/customer/home`.
- **Authenticated Worker**:
  - Accessing `/` -> redirected to `/worker/home`.
  - Accessing `/worker/home` -> access granted.
  - Accessing `/customer/*` -> intercepted and redirected to `/worker/home`.
  - Completing worker registration -> redirected to `/worker/home`.
  - Completing worker login -> redirected to `/worker/home`.

---

## 11. Logout Behavior
1. Triggered from:
   - Worker Profile logout button (`button#profileLogoutBtn`).
   - Worker Drawer menu "Logout" link (`.logout-link`).
2. Execution:
   - Invokes `logout(navigate)` in `src/utils/auth.js`.
   - Clears `hireme_session` from `window.sessionStorage`.
   - Navigates immediately to `/login` with `{ replace: true }`.
3. Post-Logout Security:
   - Subsequent navigation to protected routes (`/customer/home`, `/worker/home`, etc.) is blocked by `ProtectedRoute`, redirecting back to `/login`.

---

## 12. Components Created
- **`src/utils/auth.js`**: Core session and authentication engine (`startSession`, `getSession`, `logout`, `isAuthenticated`, `getRole`, `getHomeDestination`).
- **`src/components/ProtectedRoute.jsx`**: Reusable route guard checking authentication and role matching.
- **`src/pages/auth/Login.jsx`**: Unified login page faithfully ported from `pages/login.html` and `js/login.js`.
- **`src/pages/auth/Login.css`**: Dedicated stylesheet scoped under `:where(.login-page)`.

---

## 13. Components Reused
- **`<HireMeIcon name="back" />`**: Reused for standard header back buttons.
- **`<WorkerDrawer />`**: Integrated with `logout(navigate)` on the logout menu item.
- **`<Toast />`**: Centralized toast notification feedback.
- **`<AppShell />`** & **`<AppHeader />`**: Application shells across all dashboards.

---

## 14. Icon Consistency
- Conformed to the Global HireMe design rule: **ONE ITEM / ONE MEANING = ONE ICON**.
- Header back buttons reuse `<HireMeIcon name="back" />` with shared SVG paths and stroke widths.
- Squircle avatar, password lock, eye toggle, and checkmark SVGs preserve original coordinates from `pages/login.html`.
- No third-party icon libraries or emojis were introduced as UI icons.

---

## 15. Design Preservation
- Exact color tokens preserved:
  - Primary Blue: `#1A5CFF` (gradient to `#0047E0`)
  - Navy Headings: `#0B1938`
  - Body Text: `#1E293B`
  - Slate Muted: `#64748B`
  - Pill Input Background: `#EAF1FA`
- Neumorphic dual shadows and convex button elevation matching original styles.
- Squircle profile avatar container with hover micro-interaction (`translateY(-2px)`).
- Plus Jakarta Sans font family applied throughout.

---

## 16. Responsive Behavior
- **Mobile First**: Default layout is optimized for 360px–430px screens.
- **Safe-Area Insets**:
  - Top padding: `calc(32px + env(safe-area-inset-top, 0px))`
  - Bottom padding: `calc(32px + env(safe-area-inset-bottom, 0px))`
  - Horizontal padding: `calc(24px + env(safe-area-inset-left, 0px))` / `calc(24px + env(safe-area-inset-right, 0px))`
- **Desktop Adaptation (`>= 1024px`)**:
  - Centered `430px - 450px` phone shell on a soft ambient background gradient (`#DFE6F3` to `#CCD9ED`).
  - Elevated box shadow `0 20px 60px rgba(15, 23, 42, 0.14)`.
  - Custom 5px scrollbar.
  - Zero zoom hacks, zero `transform: scale()`, zero fake status bars.

---

## 17. Problems Encountered
1. **Oxlint set-state-in-effect warning**:
   - Initial hydration of `rememberMe` and `identifier` from `localStorage` inside `useEffect` triggered linter warnings.
2. **Cross-role URL tampering**:
   - Without an authentication guard, manual navigation by a customer to `/worker/home` allowed viewing the worker dashboard.
3. **Logout redirection**:
   - Previously, logout on `WorkerProfile` only cleared `sessionStorage` without navigating away from the protected page.

---

## 18. Fixes Applied
1. **Lazy State Initializers**:
   - Initialized `rememberMe` and `identifier` directly in `useState` via functional initializers reading `localStorage` synchronously during component mount.
2. **Role-Based ProtectedRoute**:
   - Created `ProtectedRoute` to check role validity and redirect cross-role access to the user's rightful dashboard.
3. **Integrated Logout Redirection**:
   - Passed `navigate` to `logout(navigate)`, executing an immediate replace navigation to `/login`.

---

## 19. Testing Performed
- **Linting (`oxlint`)**:
  ```bash
  cmd.exe /c "npm run lint"
  # Finished in 81ms on 34 files with 104 rules using 12 threads.
  # Found 0 warnings and 0 errors.
  ```
- **Build (`vite build`)**:
  ```bash
  cmd.exe /c "npm run build"
  # ✓ 69 modules transformed.
  # ✓ built in 961ms (Zero errors)
  ```
- **Automated Auth Unit Tests**:
  - `startSession` persists valid customer and worker sessions.
  - `getSession` returns active session.
  - `logout` removes session and returns null.
  - Malformed session strings and invalid roles are rejected.
- **Route Accessibility & Flow Tests**:
  - `/` redirects unauthenticated users to `/register`.
  - `/login` renders unified login page.
  - `/register` renders role choice screen.
  - Customer registration flow (`/customer/register/*`) completes to `/customer/home`.
  - Worker registration flow (`/worker/register/*`) completes to `/worker/home`.
  - Logging out from Worker Profile redirects to `/login`.
  - Direct access to `/customer/home` or `/worker/home` while unauthenticated redirects to `/login`.
  - Regression verified for all existing Customer and Worker pages.

---

## 20. Final Authentication Architecture
**UNIFIED & COMPLETE**:
- Single coherent authentication system supporting both Customer and Worker roles.
- Role-based route guards actively protecting all dashboards.
- Seamless bi-directional navigation between Register and Login.
- Zero external package dependencies added.
- 100% linter and build compliance.

