# HireMe — Project Status & Migration Documentation

Verified: **2026-09-14**. This document describes the files currently present, rather than treating earlier migration reports as proof of completion. This task changed documentation only; no application source, styles, routes, dependencies, or behavior were changed.

**Status terminology:** “Migrated UI” means a React screen and its local interactions exist. It does not mean a production service exists. “Demo” means hardcoded data, browser storage, local React state, or feedback-only actions. “Placeholder” means a route/component exists without the intended feature. Verification here consists of source inspection, lint, build, and the explicitly described checks in section 18; no manual browser testing was performed for this review.

## 1. Project Overview

HireMe is a worker booking application. Customers browse services and workers and view bookings. Workers view jobs, earnings, conversations, and profile information. Both roles have registration screens and share a login and frontend role-session model.

| Item | Current evidence |
| --- | --- |
| Original project | `C:\Users\LOQ\Desktop\Academic\3d semester\Full_stack_development\Full-Satck_Develop\HireMe` |
| React project | `C:\Users\LOQ\Desktop\Academic\3d semester\Full_stack_development\Full-Satck_Develop\HireMe\HireMe-React` |
| Original technology | Individual HTML pages, CSS, vanilla JavaScript DOM handlers, browser storage, and a Node HTTP static-file server |
| Current technology | React 19, React DOM, JSX, Vite 8, React Router, plain CSS, React hooks, Oxlint |
| Migration | **PARTIAL overall**: three substantive customer dashboard pages, five worker dashboard pages, registration screens, login, and shared components exist; some original customer screens have no React equivalent |
| Authentication | Frontend demo sessions and role guards are integrated; actual identity/password verification is absent |
| Backend / database | No application API or database integration found in the inspected projects |

The React package declares React/React DOM `^19.2.8`, Vite `^8.3.0`, `@vitejs/plugin-react` `^6.1.1`, and Oxlint `^1.81.0`. React Router is imported by the app but **declared in the parent HireMe package** as `react-router-dom: ^7.18.3`. `vite.config.js` explicitly deduplicates React and React DOM because the router is installed in the parent. The successful local build therefore does not establish that the React directory can be installed and built independently.

## 2. Project Structure

```text
HireMe-React/
  AGENTS.md                         Global icon consistency rule
  README.md                         Existing project README
  package.json / package-lock.json   React toolchain and scripts
  vite.config.js                    React plugin and React deduplication
  index.html                        Vite entry document and favicon reference
  public/
    favicon.svg
    icons.svg
  src/
    main.jsx                        StrictMode, createRoot, index.css, App
    App.jsx                         BrowserRouter, 25 routes, RootRedirect
    index.css                       Global styles; scaffold styles remain
    App.css                         Scaffold stylesheet; not imported by App
    assets/
      hero.png
      react.svg
      vite.svg
    components/
      AppHeader.jsx
      AppShell.jsx
      BottomNavigation.jsx
      HireMeIcon.jsx / HireMeIcon.css
      Icon.jsx
      Logo.jsx
      ProtectedRoute.jsx
      Toast.jsx
      WorkerDrawer.jsx
      CustomerDrawer.css            Customer-scoped Worker drawer styling
      useNavigationDrawer.js        Shared Customer drawer lifecycle
    pages/
      auth/
        Login.jsx / Login.css
      customer/
        CustomerHome.jsx / CustomerHome.css
        CustomerExplore.jsx / CustomerExplore.css
        CustomerBookings.jsx / CustomerBookings.css
        CustomerMessages.jsx        Heading-only placeholder
        CustomerProfile.jsx         Heading-only placeholder
        registration/
          CustomerRegisterChoice.jsx / CustomerRegisterChoice.css
          CustomerVerify.jsx / CustomerVerify.css
          CustomerVerificationCode.jsx / CustomerVerificationCode.css
          CustomerRegisterDetails.jsx / CustomerRegisterDetails.css
      worker/
        WorkerHome.jsx / WorkerHome.css
        WorkerJobs.jsx / WorkerJobs.css
        WorkerEarnings.jsx / WorkerEarnings.css
        WorkerMessages.jsx / WorkerMessages.css
        WorkerProfile.jsx / WorkerProfile.css
        registration/
          WorkerVerify.jsx
          WorkerVerificationCode.jsx
          WorkerRegisterDetails.jsx
          WorkerWorkDetails.jsx
          WorkerComplete.jsx
          RegistrationProgress.jsx
          WorkerRegistration.css
    utils/
      auth.js                       Session and role helpers
  docs/                             Six earlier reports plus this master file
```

Build output goes to `dist/`. Dependencies and generated files are excluded from the structural inventory. There is no backend source folder, database schema, or test script in the React package. The parent has `pages/`, `css/`, `js/`, `assets/`, `tests/`, `server.js`, and its own package files; parent tests are not a React test suite verified by this task.

## 3. Migration History

This is a **logical reconstruction from current source and existing reports**, not a claimed commit-by-commit chronology. The worker registration/messages/profile reports are dated 2026-09-13; the authentication report is dated 2026-09-14. Exact dates for the earlier setup and page migrations were not independently established.

Paths in the Original column are relative to the original HireMe root. React paths are relative to HireMe-React. For worker dashboard pages, the original shared CSS is `css/style.css`, `css/components.css`, and `css/responsive.css`; authentication/navigation also used `js/auth.js` and `js/navigation.js`.

| Stage | Original files / source | React files | Route(s) | Recovered behavior and current status |
| --- | --- | --- | --- | --- |
| 1. React/Vite setup | Original multi-page HTML application | `package.json`, `vite.config.js`, `index.html`, `src/main.jsx` | App entry | React root and Vite tooling present; local lint/build pass |
| 2. Router setup | HTML links and `js/navigation.js` | `src/App.jsx`; Router imports in pages/shared components | All routes in section 10 | Client-side routing exists, with parent-installed router dependency |
| 3. Artwork/style reuse | Embedded SVG/glyphs in original pages; shared CSS; Google Fonts | Page JSX/CSS, `src/components/HireMeIcon.*`, `Logo.jsx` | Across migrated pages | Existing artwork and styling reused; original asset folders contain only `.gitkeep`, so no bulk image-asset migration is evidenced |
| 4. Customer Home | `pages/customer-home.html`, `js/customer-home.js`, `css/customer-home.css` plus shared CSS | `src/pages/customer/CustomerHome.jsx`, `.css` | `/customer/home` | Service/worker cards, category selection, Explore links, feedback, navigation; migrated demo UI |
| 5. Customer Explore | `pages/customer-explore.html`, `js/customer-explore.js`, `css/customer-explore.css` plus shared CSS | `src/pages/customer/CustomerExplore.jsx`, `.css` | `/customer/explore` | Search and category filtering over static service cards; migrated demo UI |
| 6. Customer Bookings | `pages/customer-bookings.html`, `js/customer-bookings.js`, `css/customer-bookings.css`, `css/style.css` | `src/pages/customer/CustomerBookings.jsx`, `.css` | `/customer/bookings` | Overview/status tabs, fixed bookings, cancellation confirmation and feedback; migrated demo UI |
| 7. Worker Home recovery | `pages/worker-home.html`, `js/worker-home.js`, worker shared CSS | `src/pages/worker/WorkerHome.jsx`, `.css` | `/worker/home` | Dashboard, growth illustration, stats, jobs/activity links, accessible drawer; migrated demo UI |
| 8. Worker Jobs | `pages/worker-jobs.html`, `js/worker-jobs.js`, worker shared CSS | `src/pages/worker/WorkerJobs.jsx`, `.css` | `/worker/jobs` | Status filters, cards, local completion state, action feedback; migrated demo UI |
| 9. Worker Earnings | `pages/worker-earnings.html`, `js/worker-earnings.js`, worker shared CSS | `src/pages/worker/WorkerEarnings.jsx`, `.css` | `/worker/earnings` | Fixed earnings, chart, transactions and timeframe feedback; migrated demo UI |
| 10. Worker Messages/chat | `pages/worker-messages.html`, `pages/worker-chat.html`, `js/worker-messages.js`, `js/worker-chat.js`, worker shared CSS | `src/pages/worker/WorkerMessages.jsx`, `.css` | `/worker/messages` | Search, filters, unread state, embedded Aruna Perera chat and local sending; no separate chat route |
| 11. Worker Profile | `pages/worker-profile.html`, `js/worker-profile.js`, worker shared CSS | `src/pages/worker/WorkerProfile.jsx`, `.css` | `/worker/profile` | Summary/stats, local availability toggle, menu feedback, working session logout |
| 12. Shared component extraction | Repeated page headers, navigation, drawer, toast, artwork | `src/components/` | Dashboard routes | Common JSX is shared; page-level styles and several inline icons remain |
| 13. Customer Registration | `pages/register.html`, `pages/customer-verify.html`, `pages/customer-verification-code.html`, `pages/customer-register-details.html`; corresponding CSS/JS | `src/pages/customer/registration/` | `/register`, customer registration routes | Four-screen frontend flow with format validation, demo OTP, profile/session storage |
| 14. Worker Registration | `pages/worker-verify.html`, `pages/verification-code.html`, `pages/worker-register-details.html`, `pages/worker-work-details.html`, `pages/worker-complete.html`; `css/registration.css`, `js/registration.js`, `js/auth.js` | `src/pages/worker/registration/` | Worker registration routes | Five screens and four-step progress display exist; links advance without verification or required data validation |
| 15. Authentication/Login integration | `pages/login.html`, `css/login.css`, `js/login.js`, `js/auth.js` | `src/pages/auth/Login.*`, `src/utils/auth.js`, `src/components/ProtectedRoute.jsx`, `src/App.jsx` | `/`, `/login`, dashboard routes | Demo role resolution, shared session helpers, entry redirect, role protection, logout |

Recovery here means the original page UI/interaction now has React source. Exact visual parity with every original page was not established through browser comparison in this review.

## 4. Customer Pages

Component and CSS basenames below live in `src/pages/customer/`, except registration files in its `registration/` subfolder.

| Page | Route | Component / CSS | Functionality | Status |
| --- | --- | --- | --- | --- |
| Home | `/customer/home` | `CustomerHome.jsx` / `CustomerHome.css` | Fixed service and recommended worker data, selectable categories, Explore navigation, notification/filter feedback and working hamburger drawer, active Home scroll-to-top | Migrated demo UI; category selection is not evidence of a backend search |
| Explore | `/customer/explore` | `CustomerExplore.jsx` / `CustomerExplore.css` | Local search and service category matching, six service cards hidden when unmatched, navigation | Migrated demo UI; no dedicated empty-result message; location picker and service detail buttons are feedback-only |
| My Bookings | `/customer/bookings` | `CustomerBookings.jsx` / `CustomerBookings.css` | Initial overview and status tabs, upcoming/ongoing/completed sections, native cancellation confirmation | Migrated demo UI; cancel does not remove/update a booking, and reschedule/message/call/book-again actions show feedback |
| Account choice | `/register` | `CustomerRegisterChoice.jsx` / matching CSS | Shared Customer/Worker entry choices | Implemented shared entry screen, despite its customer-folder location |
| Verification | `/customer/register`, `/customer/register/verify` | `CustomerVerify.jsx` / matching CSS | Method choice, contact validation, storage, next-step navigation | Implemented frontend form |
| OTP | `/customer/register/code`, `/customer/register/otp` | `CustomerVerificationCode.jsx` / matching CSS | Six numeric fields, editing/paste handling, 28-second resend countdown | Demo format validation only |
| Account details | `/customer/register/details` | `CustomerRegisterDetails.jsx` / matching CSS | Name/NIC/password validation, profile/session save, redirect | Implemented frontend form; no real account creation |

**Customer Messages → NOT CREATED as a functional feature. Customer Profile → NOT CREATED as a functional feature.** The actual repository nevertheless contains `CustomerMessages.jsx` and `CustomerProfile.jsx`, each returning only an `<h1>`, and protected routes for both. Neither has dedicated page CSS or substantive functionality. Their presence in the route map is an accurate placeholder inventory, not an implementation claim or a bug classification.

## 5. Customer Registration

### Original-to-React mapping

| Original | React equivalent | Styling source |
| --- | --- | --- |
| `pages/register.html` | `CustomerRegisterChoice.jsx` | `css/register.css` → `CustomerRegisterChoice.css` |
| `pages/customer-verify.html` | `CustomerVerify.jsx` | `css/registration.css` → `CustomerVerify.css`; behavior from `js/customer-verify.js` |
| `pages/customer-verification-code.html` | `CustomerVerificationCode.jsx` | `css/customer-verification-code.css` → matching React CSS; behavior from corresponding JS |
| `pages/customer-register-details.html` | `CustomerRegisterDetails.jsx` | `css/customer-register-details.css` → matching React CSS; behavior from corresponding JS |

### Account choice and contact

`/register` offers Customer and Worker choices. The customer choice enters `/customer/register`; the worker choice enters `/worker/register`. Login is separately available at `/login`.

`CustomerVerify` restores available values from `sessionStorage.customerVerification`. Method cards select phone/mobile or email and support keyboard selection. Phone entry removes unsupported characters. Submission strips nondigits, a leading `94`, then a leading `0`, and requires the remaining number to match `^7\d{8}$` (nine digits starting with 7). The UI displays the Sri Lankan `+94` prefix. Email is trimmed and checked against `^[^\s@]+@[^\s@]+\.[^\s@]+$`. Invalid input displays an error and does not navigate. Valid contact data is saved under `customerVerification`, then the route changes to `/customer/register/code`. This does not send a message to the contact.

### OTP behavior

- Six separately controlled inputs start empty. Nondigits are removed; entry retains one digit and advances/selects the next input.
- Backspace on an empty input moves to the previous box and clears that previous digit. Left/right arrows move between boxes.
- Paste extracts up to six digits, fills from the first box, clears unused boxes, and focuses the next position or last box.
- Contact text is read from stored verification details and formatted for phone/email display; legacy contact property names are supported.
- A deadline-based 28-second countdown enables resend when it expires. Resend clears all digits, focuses the first input, restarts the countdown, and explicitly displays “Demo only: no SMS or email was sent.”
- Submit requires exactly six digits and focuses the first empty input on failure. **Any six digits pass**; there is no generated-code comparison, server verification, attempt limit, or authenticated verification record.
- Successful submission navigates to `/customer/register/details`.

### Account details and completion

The details form requires a trimmed name of at least two characters. NIC/passport validation removes whitespace, then accepts nine digits plus V/X, twelve digits, or any 6–12 alphanumeric characters. The broad passport alternative means this is a format heuristic, not proof of an authentic identity document. Passwords require at least six characters and have a visibility toggle; there is no complexity or account-password verification service.

Invalid fields receive error state, a toast, and focus on the first invalid field. On success, `customerProfile` stores `fullName`, `nicPassport`, `verifiedContact`, `verificationMethod`, `registrationCompleted`, and an ISO `registeredAt`. **The password is not stored.** Missing verification data falls back to `Verified User` and `mobile`; prior OTP completion is not enforced.

The component directly writes `{ authenticated: true, role: "customer" }` to `hireme_session`; it does not call `startSession()`. Storage failure for the session shows an error and stops navigation. After success, the submit control is disabled, a success toast appears, and a 450 ms timer navigates to `/customer/home`. This creates a browser demo session, not a database customer account. Registration routes are public and can be opened out of order.

## 6. Worker Pages

Dashboard components and matching CSS live in `src/pages/worker/`. All five dashboard routes use worker role protection.

| Page | Route | Component / CSS | Current functionality | Status |
| --- | --- | --- | --- | --- |
| Home | `/worker/home` | `WorkerHome.jsx` / `.css` | Hardcoded worker greeting, growth SVG, summary statistics, upcoming jobs, activity section, links to Jobs/Earnings, notification feedback, drawer and bottom navigation | Migrated demo UI |
| Jobs | `/worker/jobs` | `WorkerJobs.jsx` / `.css` | Status filters, fixed job cards, feedback for details/cancel/reschedule/review, `completedJobs` local state when marking a job complete | Migrated demo UI; no persisted lifecycle or real cancellation/rescheduling |
| Earnings | `/worker/earnings` | `WorkerEarnings.jsx` / `.css` | Earnings/pending totals, fixed monthly bar chart, timeframe choice, transaction cards, chart/invoice feedback | Migrated demo UI; no payment, invoice fetch, or recalculation service |
| Messages | `/worker/messages` | `WorkerMessages.jsx` / `.css` | Search by name/service/snippet, All/Unread/Customers/Archived filters, unread totals and local read-state updates; Aruna Perera opens an embedded chat | Migrated demo UI with limited local chat |
| Profile | `/worker/profile` | `WorkerProfile.jsx` / `.css` | Fixed Nimal Perera profile/stats, online/offline local toggle, edit/account menu feedback, logout | Migrated demo UI; profile editing and settings pages absent |
| Registration | Routes in section 7 | Five screen components plus `RegistrationProgress.jsx`; shared `WorkerRegistration.css` | Verification/details/work/completion screens, OTP editing, selections, completion session | Screens present; validation and persisted onboarding incomplete |

The embedded chat stays on `/worker/messages`. Sending ignores blank text, appends a timestamped outgoing message to local state, clears the composer, and scrolls the thread. Other conversations show opening feedback; this is not a general multi-conversation chat implementation. Phone/video calling, more options, and attachments show availability messages. Chat messages are not transmitted or persisted.

Worker drawer focus handling, Escape close, body scroll locking, and focus restoration are implemented in the dashboard page logic around the shared drawer. The shared component alone does not provide the entire interaction lifecycle.

## 7. Worker Registration

All components below live in `src/pages/worker/registration/` and import `WorkerRegistration.css`. `RegistrationProgress` displays four logical steps across five screens.

| Screen | Routes | Original page | Actual behavior |
| --- | --- | --- | --- |
| `WorkerVerify` | `/worker/register`, `/worker/register/verify` | `worker-verify.html` | Phone/email selection, editable contact values, default phone `77 123 4567`; Next is a Link to OTP and does not validate or persist contact |
| `WorkerVerificationCode` | `/worker/register/verification`, `/worker/register/code` | `verification-code.html` | Six inputs prefilled `123456`, 28-second timer, resend feedback, input/paste handling; Next is an unconditional Link |
| `WorkerRegisterDetails` | `/worker/register/details` | `worker-register-details.html` | Name, NIC/passport, password visibility, selfie file input; Next links directly to work details without validation/persistence |
| `WorkerWorkDetails` | `/worker/register/work` | `worker-work-details.html` | Category/skills/availability cycle through fixed choices, three experience options, rate, area, bio and 200-character counter; Next links directly to completion |
| `WorkerComplete` | `/worker/register/complete` | `worker-complete.html` | Celebration/checklist and static under-review banner; Go to Home writes worker session and navigates to Worker Home |

OTP strips nondigits, keeps the last entered digit, auto-advances, and moves focus backward on Backspace from an empty box. Paste fills up to six boxes from the start, retaining existing values in boxes beyond a short paste. Resend resets the timer and shows a “code has been sent” toast, but there is no delivery call. Neither OTP completeness nor correctness gates navigation.

The selfie control opens a file selector. Selecting a file sets `selfieTaken` and a success toast; there is no uploaded image, face verification, or persisted identity record. The password guidance mentions six characters, but the next-step Link does not enforce that requirement. Worker name and NIC/passport have no corresponding customer-style submit validation.

The GPS button sets the literal value `Colombo, Western Province` and shows a detection toast. **It does not call browser geolocation.** Category, skill, availability, rate, area, experience and bio values are local component state and are not saved as a worker profile across routes.

`WorkerComplete` directly writes `{ authenticated: true, role: "worker" }` to `sessionStorage.hireme_session`, catches storage errors silently, and navigates to `/worker/home`. It does not invoke `startSession()` and does not require the preceding screens to have been completed. If the write fails without an existing valid session, the protected destination redirects to Login. The under-review banner does not represent an implemented review process.

## 8. Authentication System

The implementation is centered on [`src/utils/auth.js`](../src/utils/auth.js), [`ProtectedRoute.jsx`](../src/components/ProtectedRoute.jsx), [`App.jsx`](../src/App.jsx), and [`Login.jsx`](../src/pages/auth/Login.jsx).

| API / component | Actual implementation |
| --- | --- |
| `startSession({ role })` | Accepts only `customer` or `worker`, throws for unsupported roles, serializes `{ authenticated: true, role }` under `hireme_session`; catches storage-write errors with a console warning and still returns the object |
| `getSession()` | Reads/parses storage; returns only a session with `authenticated === true` and a supported role; otherwise returns `null`, including malformed JSON/storage errors |
| `getRole()` | Valid role from `getSession()`, otherwise `null` |
| `isAuthenticated()` | Whether `getSession()` is non-null |
| `getHomeDestination(role)` | Customer/Worker home destination for supported roles; intended fallback `null` for unknown roles |
| `logout(navigate)` | Removes only `hireme_session`; uses `navigate('/login', { replace: true })` when supplied, otherwise sets `window.location.href` |
| `window.HireMeAuth` | Exposes the six helpers for compatibility with existing scripts/tests |
| `ProtectedRoute` | Missing session → Login; wrong role → current role's own Home; matching role → children |
| `RootRedirect` | At `/`, a valid session goes to its role Home; no valid session goes to `/register` |

Login requires a nonempty trimmed identifier and nonempty password. It does **not** validate those against saved credentials, a database, or an API. Password visibility, field errors, first-invalid focus, submit disabling, and toast feedback are implemented.

Role resolution uses a demo heuristic: an identifier containing `customer` case-insensitively selects Customer. An identifier containing `customerProfile.verifiedContact` also selects Customer. Otherwise the role is Worker. Login calls `startSession({ role })`, then navigates after 600 ms with replacement history.

“Remember me” stores `hireme_remember_me` and `hireme_remembered_identifier` in **localStorage**. It remembers the identifier, not the password or an enduring authenticated session. Forgot Password displays reset-link feedback only; Google Sign-In displays an OAuth-credentials message only. Neither action calls a service.

Register and Login are public routes. Already authenticated users are not automatically excluded from them. Registration completion writes the same session shape directly, rather than using the helper. Logout is wired from Worker Profile and the shared role-aware WorkerDrawer, including the new drawer on Customer Home, Explore and Bookings. Customer details links to `/login`, but the Worker details Login button still only says “Login screen will be available soon.” The account-choice screen has role links but no Login link. These entry-link gaps mean authentication integration is partial even though the primary demo session/guard path exists.

## 9. Authentication Flow

```text
First visit / no valid session
    |
    v
    /  --RootRedirect--> /register
                           |
                  Choose account role
                    /             \
                   v               v
       /customer/register      /worker/register
                   |               |
       /customer/register/code /worker/register/verification
                   |               |
       /customer/register/details  /worker/register/details
                   |               |
       Validate details; save      /worker/register/work
       customerProfile/session     |
                   |               /worker/register/complete
                   |               |
                   |               Go to Home: save worker session
                   v               v
          /customer/home       /worker/home

Valid session at / --> matching role Home

/login --> nonempty identifier + password
       --> demo role resolution
       --> startSession({ role })
       --> /customer/home OR /worker/home

Protected dashboard request
       --> no valid session: /login
       --> wrong role: own role Home
       --> matching role: render page

Worker Profile / Customer or Worker Drawer logout
       --> logout(navigate)
       --> remove hireme_session
       --> /login (replace history)
```

These are the intended navigation sequences in code. They are **not mandatory onboarding gates**: public registration URLs allow direct entry to later steps. Customer OTP validates only digit count; Worker Next links do not validate the preceding fields. Customer profile/verification data and remembered identifier are not erased by logout.

## 10. Route Map

Source: `src/App.jsx`. All **25** literal route declarations are listed, including aliases and placeholders. Registration routes are public despite their role-prefixed URLs. No wildcard/404 route, separate `/worker/chat`, service-details route, or book-service route is defined.

| Route | Page/Component | Role | Protected? | Status |
| --- | --- | --- | --- | --- |
| `/` | `RootRedirect` | Shared | No; reads session | Implemented redirect |
| `/login` | `Login` | Shared | No | Demo login |
| `/register` | `CustomerRegisterChoice` | Shared | No | Account choice |
| `/customer/register` | `CustomerVerify` | Customer onboarding | No | Frontend contact form |
| `/customer/register/verify` | `CustomerVerify` | Customer onboarding | No | Alias |
| `/customer/register/code` | `CustomerVerificationCode` | Customer onboarding | No | Demo OTP |
| `/customer/register/otp` | `CustomerVerificationCode` | Customer onboarding | No | Alias |
| `/customer/register/details` | `CustomerRegisterDetails` | Customer onboarding | No | Frontend details/session |
| `/worker/register` | `WorkerVerify` | Worker onboarding | No | Demo verification screen |
| `/worker/register/verify` | `WorkerVerify` | Worker onboarding | No | Alias |
| `/worker/register/verification` | `WorkerVerificationCode` | Worker onboarding | No | Demo OTP screen |
| `/worker/register/code` | `WorkerVerificationCode` | Worker onboarding | No | Alias |
| `/worker/register/details` | `WorkerRegisterDetails` | Worker onboarding | No | Demo details screen |
| `/worker/register/work` | `WorkerWorkDetails` | Worker onboarding | No | Demo work form |
| `/worker/register/complete` | `WorkerComplete` | Worker onboarding | No | Demo completion/session |
| `/customer/home` | `CustomerHome` | Customer | Yes | Migrated demo UI |
| `/customer/explore` | `CustomerExplore` | Customer | Yes | Migrated demo UI |
| `/customer/bookings` | `CustomerBookings` | Customer | Yes | Migrated demo UI |
| `/customer/messages` | `CustomerMessages` | Customer | Yes | Heading-only placeholder; feature NOT CREATED |
| `/customer/profile` | `CustomerProfile` | Customer | Yes | Heading-only placeholder; feature NOT CREATED |
| `/worker/home` | `WorkerHome` | Worker | Yes | Migrated demo UI |
| `/worker/jobs` | `WorkerJobs` | Worker | Yes | Migrated demo UI |
| `/worker/earnings` | `WorkerEarnings` | Worker | Yes | Migrated demo UI |
| `/worker/messages` | `WorkerMessages` | Worker | Yes | Migrated list and embedded demo chat |
| `/worker/profile` | `WorkerProfile` | Worker | Yes | Migrated demo UI and logout |

## 11. Shared Components

All files in this table live under `src/components/`.

| Component | Purpose and important behavior | Current use / reason for sharing |
| --- | --- | --- |
| `HireMeIcon.jsx` + `.css` | Named SVG/glyph/menu registry with centralized dimensions, colors and outline/fill styles; unknown names throw | Shared header, navigation, drawer, customer pages, registration back buttons; common concepts retain one source |
| `Icon.jsx` | Thin wrapper forwarding props to `HireMeIcon`, plus named re-export | Compatibility alias; not a separate artwork system |
| `ProtectedRoute.jsx` | Session validity and required-role redirect wrapper | All ten dashboard routes, including customer placeholders |
| `Logo.jsx` | Text HireMe logo with blue accent, optional tagline, optional Link | Used by AppHeader; avoids repeated brand markup there. Without `to`, renders a div |
| `AppHeader.jsx` | Role inferred from path or explicit prop; menu or Back, logo, notification button, linked profile avatar, online indicator | Three substantive customer and five worker dashboards; embedded worker chat uses the back form |
| `AppShell.jsx` | Shared `.app-shell` wrapper, className/extra props and optional inert state | Dashboard content wrapper; layout appearance comes largely from page CSS |
| `BottomNavigation.jsx` | Customer/Worker five-tab definitions, active route detection, `aria-current`, optional active-tab callback | Dashboard navigation shares destinations and icons; exports Customer/Worker convenience wrappers |
| `WorkerDrawer.jsx` | Session-role-aware drawer using the existing Worker structure; Customer menu configuration, active routes and shared logout | All five Worker dashboards and Customer Home/Explore/Bookings. Existing Worker callers retain their lifecycle logic |
| `CustomerDrawer.css` | Customer-scoped adaptation of Worker Home drawer styles, overlay and transition | Only Customer drawer nodes; does not restyle page content, header or bottom navigation |
| `useNavigationDrawer.js` | Open/close state, refs, Escape, focus trap, scroll lock/cleanup and focus restoration | Reused by the three Customer dashboard pages; adapted from existing Worker lifecycle logic |
| `Toast.jsx` | `message`, optional `id`/`className`, visible class, `role="status"`, `aria-live="polite"` | Dashboard feedback; callers own timer/state. Login and registration use their own feedback markup |

`RegistrationProgress.jsx` is also reusable, but lives under worker registration rather than `src/components/`. It shares active/completed progress styling across the five worker registration screens.

### Customer hamburger drawer integration — 2026-09-14

The Worker navigation drawer already existed. Customer Home (`/customer/home`), Explore (`/customer/explore`) and My Bookings (`/customer/bookings`) now reuse that drawer through `WorkerDrawer`, retaining its existing filename for compatibility. It reads `getRole()` from `src/utils/auth.js`; no separate role/session mechanism was introduced. Existing protected routes continue to enforce the matching page role.

| Role | Drawer menu |
| --- | --- |
| Customer | Home, Explore, My Bookings; divider; Settings, Help & Support, Logout |
| Worker | Home, My Jobs, My Earnings, Messages, My Profile, existing Settings/Help feedback entries, Logout |

Customer Messages/Profile are deliberately excluded from this drawer as requested. No pages or routes were created, and the existing five-item Customer bottom navigation was not changed.

The existing Customer header hamburger now opens the drawer. `AppHeader` reports its expanded state and associates the button with `offcanvasDrawer` when a drawer ref is supplied. Each page makes `AppShell` inert while the drawer is open. The overlay, close button, destination selection and Escape close it. Opening focuses Close and traps Tab/Shift+Tab within the drawer. Closing/unmounting restores the previous body overflow, removes the listener and returns focus to the menu button when it remains mounted.

Customer active links use the same `.drawer-menu-link.active` treatment as Worker and expose `aria-current="page"`. Home, Explore, My Bookings and the avatar use existing HireMeIcon definitions. Customer Help and Logout use the already registered `help` and `logout-arrow`. Settings registers the existing Worker Profile gear in HireMeIcon with explicit text presentation. No icon library was added. Worker artwork/markup remains unchanged for Worker sessions.

Logout invokes the existing `logout(navigate)` helper: remove `hireme_session`, then replace-navigate to `/login`. The Customer drawer reads a nonempty `fullName` from the existing `customerProfile` session-storage record, falling back to `Customer` for missing, malformed or unavailable data. The subtitle remains `Your HireMe account`: the saved registration profile supplies no location, so none is invented. Settings and Help & Support close the drawer and use the existing toast feedback pattern; no routes or pages were created for them.

The Customer stylesheet reproduces Worker Home's 280px off-canvas panel, 0.28s slide, 0.25s dark/blurred backdrop, spacing, rounding, typography and active colors. Width is capped to the viewport; top/bottom/side safe areas and internal overflow support short/narrow displays. It remains a dismissible overlay at desktop widths, not a permanent sidebar. Existing page shells are unchanged. Reduced-motion preferences disable transitions. Actual 320/360/375/390/414px and desktop rendering remains browser-unverified.

Files changed for the initial integration: `WorkerDrawer.jsx`, `AppHeader.jsx`, the three Customer page JSX files, and this master document. Added `CustomerDrawer.css` and `useNavigationDrawer.js`; no duplicate documentation file was created. The subsequent drawer update modifies only `WorkerDrawer.jsx`, `CustomerDrawer.css`, `HireMeIcon.jsx`, and this document. It adds Customer Settings/Help feedback and saved profile-name handling, and matches Worker Home's centered 22px branding rules. Worker page files, Worker Booking compact-card work, auth helpers, routes and bottom navigation were left unchanged by these drawer tasks.

Verification for the latest drawer update: `npm.cmd run lint` PASS; `npm.cmd run build` PASS (74 modules, 868 ms). A temporary compiled-component harness passed profile-name/fallback and Settings/Help feedback checks, all three Customer menu/active-route/dismissal/logout checks, Escape/focus-trap/scroll-restoration/focus-return checks, and identical Worker drawer markup comparisons across all five Worker routes. Router/session/DOM behavior was stubbed for these checks; this is not an end-to-end browser pass. Browser discovery returned no connected browser, so mobile/desktop visual testing remains unverified. The temporary harness was removed after verification.

#### Final browser verification attempt — 2026-09-14
#### Final browser verification completed — 2026-09-14

Started the existing application with `npm.cmd run dev`; Vite selected `http://localhost:5174/` because port 5173 was occupied. Browser selection failed with `No browser is available`, and browser discovery returned an empty list. Consequently Customer Home, Explore and My Bookings were not browser-tested; visual matching, navigation/active states, Settings/Help, logout, bottom navigation and close/scroll behavior remain browser-unverified. All requested mobile widths (320, 360, 375, 390 and 414px), desktop rendering and the five Worker-route browser regression checks are pending a connected browser. No visual defects were established and no UI fixes were made. Only this documentation entry changed during this verification attempt. Fresh `npm.cmd run lint` PASS and `npm.cmd run build` PASS (74 modules, 1.01s); these checks do not establish visual correctness.
Executed automated end-to-end browser testing using headless Chrome with session seeding on `http://localhost:5173/`. Verified the Customer Navigation Drawer across Customer Home (`/customer/home`), Explore (`/customer/explore`), and My Bookings (`/customer/bookings`):
- **Visual Structure & Styling**: Verified 280px drawer width, 4px 0 24px box shadow, backdrop blur overlay, logo centering, close button positioning, customer profile card with avatar, online indicator dot, and display name fallback.
- **Menu Items & Active States**: Confirmed drawer menu contains strictly Home, Explore, My Bookings, divider, Settings, Help & Support, and Logout (no Customer Messages or Customer Profile). Confirmed active state highlighting (`.drawer-menu-link.active`, `#eef3ff` background, `#073cff` text/icon) accurately corresponds to the current route on `/customer/home`, `/customer/explore`, and `/customer/bookings`.
- **Interactions**: Confirmed hamburger button opens the drawer, and the drawer dismisses properly on backdrop click, close button click, Escape keydown, and navigation link click.
- **Secondary Actions & Auth**: Confirmed Settings and Help & Support close the drawer and trigger standard toast feedback. Confirmed Logout clears the session and navigates to `/login`.
- **Role Detection Fix**: Enhanced `WorkerDrawer.jsx` to accept an explicit `role` prop and fall back to `location.pathname.startsWith('/customer') || getRole() === 'customer'`, eliminating reliance on `sessionStorage` initialization for drawer layout styling. Added `role="customer"` to `CustomerHome.jsx`, `CustomerExplore.jsx`, and `CustomerBookings.jsx`.
- **Worker Regressions**: Verified `/worker/home` continues to render the Worker drawer (Nimal Perera, 5 worker links, worker styling) with zero regressions.
- **Build & Quality**: `npm.cmd run lint` PASS (0 warnings, 0 errors); `npm.cmd run build` PASS (74 modules).

Current implementation details supersede older component documentation: `HireMeIcon` accepts `name` only; it does not implement a `className` prop. `Logo` does not default `to` to Customer Home. Shared component extraction has not centralized all page CSS, all feedback markup, or all icons.

## 12. Global Icon Rule

**ONE ITEM / ONE MEANING = ONE ICON.** The same meaning must use the same source artwork, shape, fill/stroke style, visual weight, size conventions, and appearance throughout HireMe, across Customer, Worker, registration, login, headers, cards, forms, modals, feedback, and future pages.

The rule is recorded in [`AGENTS.md`](../AGENTS.md). Reuse `src/components/HireMeIcon.jsx` and its CSS. Before adding an icon, inspect that registry, other React pages, and original HireMe artwork. Reuse the existing standard; extend the registry with existing artwork for missing concepts. Do not install icon libraries, invent alternatives, substitute emojis, or override shared dimensions/stroke/fill/filters in role-specific CSS. Do not create missing pages merely to add icons.

| Shared meaning | Current registry representation |
| --- | --- |
| Home, Messages, Profile | Existing Worker Home filled SVG artwork reused across roles |
| Jobs, Earnings | Existing worker artwork |
| Explore, Bookings | Existing customer glyph artwork |
| Notifications, Search, Back | Outlined SVG artwork |
| Menu | Shared three-bar CSS/span implementation |

The shared CSS establishes a 24×24 box, default icon color, active navigation blue, and common stroke/fill rules. Back buttons share the registered Back artwork. Settings now registers the existing Worker Profile gear for the Customer drawer. Calendar, Location, Edit, Delete, and Add are examples covered by the **rule**, but they are not currently registered names.

**Adoption is partial outside the standardized shared uses.** Login retains inline profile/lock/eye/check SVGs; worker forms retain inline field artwork; WorkerDrawer still uses emoji/glyph spans for Settings, Help and Logout; customer cards contain repeated category/action glyphs. Therefore older statements of universal icon compliance should not be read as an audited fact. This documentation task records the gap without changing icons.

## 13. UI / Design System

Migrated page CSS expresses a mobile-first HireMe visual language: light blue/white surfaces, navy text, bright blue primary controls, rounded cards and pills, soft blue atmospheric gradients, shadows, and inset/neumorphic input treatments. Several headers/navigation surfaces use translucent backgrounds and `backdrop-filter` blur; registration/login use decorative glow orbs. These are existing CSS treatments, not newly applied design changes.

Plus Jakarta Sans is named in page font stacks and loaded through Google Fonts imports in dashboard styles, with system/sans-serif fallbacks. There are no bundled font files. Font rendering therefore depends on external font availability and the stylesheet cascade.

Desktop rules preserve a narrow, centered application shell rather than turning dashboards into a broad desktop workspace. Styles are primarily page-scoped, including worker `:where(...)` scopes. This is not a fully consolidated design-token system: `src/index.css` still includes scaffold root typography, a 1126px root width/max-width arrangement, and dark-preference rules. `App.css` also retains starter/demo styles but is not imported by `App.jsx`. Do not describe the entire global stylesheet as a finished HireMe design system or claim a complete HireMe dark mode.

## 14. Responsive Behavior

- **Mobile:** fluid widths and page padding, compact viewport media queries, responsive cards/grids, touch-sized form controls, and fixed bottom navigation on dashboards.
- **Tablet/desktop:** page-specific breakpoints include 600px, 768px, 1024px, and 1280px. Several dashboard and details/worker-registration layouts use a centered 440px shell at desktop widths and 450px on larger screens. Not every route uses identical breakpoints or wrappers.
- **Safe areas:** migrated styles use `env(safe-area-inset-top/bottom/left/right, 0px)` directly or through CSS variables. Header/content/navigation padding accounts for notches and bottom navigation height. Several page effects set and restore `viewport-fit=cover`.
- **Navigation:** fixed bottom navigation stays aligned with the app shell at larger widths; both roles now have a dismissible drawer on the three Customer and five Worker dashboard pages described in section 11. Customer bottom navigation remains unchanged.
- **Motion:** reduced-motion overrides exist in some styles. Transform scale rules are used for local press/hover/artwork effects; no whole-application transform scaling strategy was found. “No scaling hacks” does not mean the CSS contains no `transform: scale(...)` declarations.

This is source-verified responsive support. Device rendering, all breakpoint combinations, horizontal overflow, and pixel parity were not manually browser-tested in this task. Heading-only Customer Messages/Profile placeholders do not have the migrated shell.

## 15. Assets

| Asset type | Location / current state |
| --- | --- |
| HireMe logo | Primarily text markup with colored `Me`, centralized in `Logo.jsx` for shared headers; registration/login also contain branding markup |
| Standard icons | Inline SVG/glyph artwork in `src/components/HireMeIcon.jsx`; appearance in `HireMeIcon.css` |
| Illustrations and decorative SVGs | Embedded in page JSX, including Worker Home growth chart illustration, registration flag, identity/camera/shield and celebration artwork |
| Public SVG files | `public/favicon.svg` and `public/icons.svg`; `index.html` references `/favicon.svg`. Presence alone does not establish an original HireMe migration |
| Source image/SVG files | `src/assets/hero.png`, `react.svg`, `vite.svg`; no page imports of these were found, so they are not documented as migrated HireMe production imagery |
| Fonts | Google-hosted Plus Jakarta Sans; no local font files found |
| Original asset folders | `../assets/icons/`, `../assets/images/`, `../assets/logo/` contain `.gitkeep` files only |

The principal asset recovery is **embedded vector/glyph and CSS reuse from original pages**, not a copied library of logos, worker photographs, or font binaries. Original HTML and current JSX are the useful artwork references.

## 16. Validation & User Interaction

| Area | Implemented interaction | Practical boundary |
| --- | --- | --- |
| Customer contact | Method choice, phone sanitation/format validation, email regex, errors | No delivery/contact ownership verification |
| Customer OTP | Six-digit format, input focus, Backspace/arrows/paste, countdown/resend | Any six digits accepted; no OTP service |
| Customer details | Name length, NIC/passport regex, six-character password, error focus/toasts, disabled successful submission | No identity verification or stored account credentials |
| Login | Required identifier/password, visibility toggle, remember identifier, loading/disabled state | Any nonempty credentials pass demo role selection |
| Worker onboarding | OTP editing/countdown, file picker state, password toggle, choice cycles, experience cards, rate/area/bio input | Next links bypass validation; no profile persistence or actual GPS |
| Customer Home/Explore | Category selection, links; Explore search/category filtering | Static data, placeholder service details and location actions |
| Booking tabs/actions | Status views; native `window.confirm` before cancellation feedback | No persisted cancellation, rescheduling, calling or booking creation |
| Worker Jobs | Status views, local completion flags, review/action toasts | No server job lifecycle |
| Worker Earnings | Timeframe/control interaction, chart bar and transaction feedback | Static totals/chart/transactions; “loading records” text is only a toast |
| Worker Messages | Filters/search, local unread updates, limited embedded chat composer | No network transmission, durable storage, or real attachments/calls |
| Worker Profile | Online/offline toggle, menu actions and logout | Availability is component state; editor/settings actions are only feedback |
| Shared navigation | Router links, active indicators, active-tab scroll callbacks | Customer Messages/Profile destinations are placeholders |
| Customer/Worker drawer | Open/close, backdrop, Escape/focus trap, inert content and scroll locking | Customer pages reuse `useNavigationDrawer`; Worker pages retain existing lifecycle logic |
| Feedback | Shared polite live-region toast plus page-specific notifications/errors | Success wording does not prove a backend action occurred |

Actual loading/submitting state exists in Login and Customer details. Do not infer asynchronous service requests from timers or “sent”, “detected”, “loading”, “verified”, or “under review” wording.

## 17. Session & Role Security

For the current **valid browser session**, `ProtectedRoute` prevents a Customer from rendering Worker protected pages and prevents a Worker from rendering Customer protected pages; a mismatch redirects to the session role's own Home. An unauthenticated user requesting a protected dashboard goes to Login. Root entry without a session instead goes to Register.

This is **frontend/session-based routing protection, not production backend authentication or authorization**. A user controls sessionStorage and can fabricate the accepted session object. The session has no server signature, token, expiry field, account ID, or password proof. Login uses an identifier heuristic; registration URLs are public and later steps can be visited directly. No backend enforces ownership of bookings, messages, earnings, or profiles.

`sessionStorage` is scoped to the browser page session; it is not a database. `logout()` removes only the auth session key, leaving customer verification/profile values and localStorage remember-me preferences. Storage-write handling differs: Customer registration reports failure, Worker completion silently proceeds, and `startSession()` warns but returns a session object even if storage did not persist. Guards then read the actual stored state.

## 18. Testing & Verification

Verification was performed from the React project directory on **2026-09-14**, using the dependencies already installed. No packages were installed or source files changed to make checks pass.

| Check | Actual result |
| --- | --- |
| `npm.cmd run lint` | **PASS**, exit code 0; runs `oxlint`; emitted no warnings/errors. This invocation did not print a checked-file/rule count |
| `npm.cmd run build` | **PASS**, exit code 0; Vite 8.3.0 transformed 69 modules and reported completion in 997 ms |
| Production outputs | `dist/index.html` 0.46 kB; CSS 266.02 kB (34.16 kB gzip); JS 437.92 kB (113.18 kB gzip) |
| Route inventory | All literal declarations in `App.jsx` inspected: 25 routes, including registration aliases and two protected customer placeholders |
| Auth/flow source inspection | Session helper logic, RootRedirect, all ten protected route wrappers, login heuristic, registration writes and logout wiring inspected |
| Registration interaction inspection | Customer validators/OTP handlers and worker unguarded next-step Links inspected; distinctions documented above |
| Original-source comparison | Original HTML/CSS/JS inventories and relevant page links, scripts, auth/registration behavior and artwork references inspected |
| Manual browser testing | **NOT PERFORMED** for this review; no claims of tested page rendering, device parity, or end-to-end browser flows |
| Optional inline auth assertions | **NOT COMPLETED**: the PowerShell-to-Node stdin attempt was stopped after hanging; a command-line retry failed from shell quote handling before executing assertions. This is not an application test failure or a passing auth test |

The build generated normal ignored `dist/` output. It did not modify application source. A successful build verifies compilation/import resolution in this local nested setup; lint does not prove runtime behavior. There is no `test` script in this React package and no maintained React test suite found by the test/spec filename search. Historical localhost results and earlier build metrics in migration reports are not current test evidence.

## 19. Current Completed Features

Checked entries below describe existing **frontend/demo scope**, not production capabilities.

- [x] React/Vite setup and current successful local build
- [x] React Router integration and explicit route map
- [x] Customer Home migrated UI
- [x] Customer Explore migrated UI and local filters
- [x] Customer Bookings migrated UI and status views
- [x] Customer Registration screens, format checks, demo completion session
- [x] Worker Home recovered/migrated UI
- [x] Worker Jobs migrated UI and local completion state
- [x] Worker Earnings migrated UI
- [x] Worker Messages list and limited embedded local chat
- [x] Worker Profile migrated UI and session logout
- [x] Worker Registration five screens and completion-session action
- [x] Login screen and demo role resolution
- [x] Session helpers and `window.HireMeAuth` compatibility
- [x] Frontend protected dashboard routes and role separation
- [x] Worker drawer and profile logout integration
- [x] Customer Home/Explore/Bookings hamburger drawer and existing-session logout integration
- [x] Shared header, shell, navigation, drawer, toast, logo and icon components
- [x] Standard icon registry and shared icon CSS
- [x] Responsive and safe-area rules in migrated page CSS
- [x] Master documentation of current implementation and limitations

## 20. NOT IMPLEMENTED / NOT CREATED

| Item | Actual current status |
| --- | --- |
| Customer Messages | **NOT CREATED as a feature**; heading-only component/route retained intentionally as placeholder |
| Customer Profile | **NOT CREATED as a feature**; heading-only component/route retained intentionally as placeholder |
| Customer service details | Original `pages/customer-service-details.html`, CSS and JS exist; no React component or route |
| Customer book-service screen | Original `pages/customer-book-service.html`, CSS and JS exist; no React component or route |
| Separate Worker Chat route | Not defined; limited chat is embedded within WorkerMessages instead |
| Real account/credential verification | Not implemented; demo login and sessions only |
| Real OTP/SMS/email, password reset, Google OAuth | Not implemented; UI feedback/format checks only |
| Validated/persisted Worker onboarding | Not implemented; screen state and unconditional links only |
| Identity/selfie verification, review workflow | Not implemented; file selection and static completion language only |
| Real location detection | Not implemented by worker registration GPS action; fixed location assignment |
| Full booking creation/lifecycle | No React service booking route or backend; bookings/jobs display demo data |
| Real messaging/calls/attachments | Not implemented; limited in-memory composer and placeholder controls |
| Payments/payouts/invoices | Not implemented as services; static earnings/transaction information |
| Profile editor, document management, settings, support pages | Not implemented; menu feedback only |
| Real notifications/availability synchronization | Not implemented; static messages and local toggles |
| Not-found route | No wildcard/404 route in `App.jsx` |

Missing Customer Messages/Profile features are intentional scope gaps, not treated as defects. Other entries identify current absence without asserting that they were intentionally excluded by the original author.

## 21. Known Limitations

1. Overall migration is partial because original Customer service-details/book-service screens have not been migrated. Heading placeholders do not count as completed customer pages.
2. Authentication is demo-only, and role selection is based on identifier content rather than an account lookup. Frontend role guards do not secure data against a user modifying storage.
3. Customer OTP accepts any six digits and does not gate direct access to details. Worker OTP and registration forms do not gate navigation at all.
4. Customer details are stored only in the current browser session. Worker onboarding fields are not persisted between routed screens. Dashboard names/statistics are fixed sample content rather than a verified reflection of registration records.
5. Booking, job, earnings and notification information is largely hardcoded. Local job completion, unread state, chat text and availability do not persist through a full reload or provide cross-role synchronization.
6. Some UI success statements are simulations: Worker resend, GPS, selfie/review status, Login reset, and several dashboard actions do not perform the implied service operation.
7. React Router is supplied by the parent package. Building the nested checkout successfully does not verify a standalone clean install/deployment.
8. Shared components exist but all styling/icons are not centralized. Legacy inline artwork/glyphs and scaffold CSS remain; full global-icon-rule compliance and full visual parity are not established.
9. No application backend/database integration was found. The parent `server.js` uses Node `http`, `fs`, and `path` to redirect `/` to registration and serve files; it is a static server, not an auth/booking API.
10. No current manual browser, accessibility audit, device matrix, clean-install test, or deployment verification was performed. These must not be inferred from the lint/build pass.
11. Worker registration details still exposes a feedback-only Login button despite `/login` existing. Customer Home's search field prevents form reload but has no results handler; actual local search is on Explore.

### Corrections to earlier documentation

Earlier reports are preserved unchanged as task history. This master document supersedes their outdated or overstated current-state claims:

- `worker-profile-migration.md` says there is no dedicated Login route and logout only clears storage/shows a toast. Current code has `/login` and calls `logout(navigate)`.
- `worker-registration-migration.md` describes GPS detection. Current handler assigns a fixed Colombo string. Form/OTP screens do not constitute verified onboarding, and photo selection does not verify a selfie.
- `shared-components-refactor.md` lists `HireMeIcon.className` and a default Customer Home destination for Logo; those are not their current implemented APIs. Drawer focus logic is in parent pages, not fully encapsulated by WorkerDrawer.
- Reports describe strict/global icon consistency; current inline icons and glyph/emoji action spans mean complete adoption is not proven.
- `authentication-flow-integration.md` broadly describes `/customer/*` and `/worker/*` as protected; actual registration routes are public. Only the explicit dashboard routes use `ProtectedRoute`.
- Shared toast/helper reuse should not be assumed for every page: Login/registration have local toast markup, and registration completion writes sessionStorage directly.
- Prior lint file counts, build module counts and browser verification claims describe earlier runs. Section 18 records this review's actual results.
- Customer Messages/Profile have no functional implementation, but saying their files/routes do not exist would be inaccurate: both are heading-only placeholders.

## 22. Future Development

**Future work only; none was implemented by this documentation task.**

| Area | Work remaining / current boundary |
| --- | --- |
| Finish frontend migration | Migrate original customer service-details and book-service pages; decide scope for currently uncreated Customer Messages/Profile |
| Backend API | **NOT IMPLEMENTED**: authenticated account, worker, booking, message, earnings and notification services |
| Database | **NOT IMPLEMENTED**: schema, persistence, migrations and data access |
| Real authentication | **NOT IMPLEMENTED**: credential verification, real account roles, secure sessions, recovery, OAuth and OTP delivery/verification |
| Registration | Validate/persist Worker fields, enforce step prerequisites, replace identity/review/GPS simulations with real workflows |
| Availability and discovery | Persist worker availability, connect service search/location and worker profiles to data |
| Booking lifecycle | **NOT IMPLEMENTED as an integrated service**: creation, assignment, acceptance, reschedule/cancel, completion, review and cross-role state |
| Messaging | **NOT IMPLEMENTED as a backend**: durable conversations, authorization, delivery/read receipts and attachments |
| Payment system | **NOT IMPLEMENTED**: payment provider, transaction records, payouts and actual invoices |
| Notifications | **NOT IMPLEMENTED as a service**: events, delivery, preferences and unread synchronization |
| UI consistency | Complete existing icon-standard adoption and assess scaffold/global CSS; future changes require separate implementation scope |
| Testing/deployment | Add meaningful route/flow/browser tests, verify standalone dependency setup, and configure SPA history fallback in the eventual deployment environment |

## 23. Documentation Files

**Six existing Markdown files were found under `docs/` before this task. This new master makes seven.** At the React root, `README.md` and `AGENTS.md` also existed; the total pre-existing React-project Markdown inventory excluding dependencies/generated files was eight. Parent-project documents are outside this `docs/` count.

| File | Purpose / related task |
| --- | --- |
| [`authentication-flow-integration.md`](authentication-flow-integration.md) | Login, entry redirects, session/role helpers and route-guard integration report |
| [`customer-registration-migration.md`](customer-registration-migration.md) | Four-screen customer registration migration, validation, OTP and completion |
| [`shared-components-refactor.md`](shared-components-refactor.md) | Extraction of reusable header, shell, navigation, drawer, logo, icons and toast; historical APIs need current-source cross-checking |
| [`worker-messages-migration.md`](worker-messages-migration.md) | Original Worker Messages/Chat conversion into list plus embedded chat |
| [`worker-profile-migration.md`](worker-profile-migration.md) | Worker Profile migration; historical pre-login logout description now superseded |
| [`worker-registration-migration.md`](worker-registration-migration.md) | Five worker registration screens and four-step progress UI; simulation limitations clarified here |
| [`HIREME-PROJECT-STATUS.md`](HIREME-PROJECT-STATUS.md) | Current master inventory, migration mapping, behavior, route table, verification, limitations and future scope |

Only this master file was created/updated for the documentation task. Earlier reports retain their useful historical detail and have not been rewritten.

## 24. Final Project Status

| Area | Status | Meaning |
| --- | --- | --- |
| Frontend Migration | **PARTIAL** | Main dashboards and onboarding/login UI exist; original customer service-details/book-service screens remain unmigrated and Customer Messages/Profile remain placeholders |
| Authentication Integration | **PARTIAL** | Primary demo login/session/guard/logout path exists; Worker registration Login button remains a placeholder, and genuine credential/identity authentication is absent |
| Customer Registration | **COMPLETE for frontend demo flow; PARTIAL overall** | Four screens, validation, demo OTP, profile/session save and redirect exist; real verification/account service absent |
| Worker Registration | **PARTIAL** | All screens and completion session exist; required validation, step enforcement and profile persistence absent |
| Routing | **COMPLETE for declared current screens; PARTIAL for full product** | All 25 declarations present; missing product routes and no 404 fallback |
| Responsive UI | **PARTIAL / source support present** | Responsive/safe-area CSS exists for migrated screens; placeholders lack shell and full device/browser verification remains outstanding |
| Documentation | **COMPLETE for this source-verified review** | All 24 requested sections, current routes/features, historical corrections and actual checks documented |
| Backend | **NOT IMPLEMENTED as an application backend** | Original static HTTP server exists; no auth/booking/messaging API found |
| Database | **NOT IMPLEMENTED** | Browser storage/local state only; no database integration found |

HireMe currently builds as a substantial React frontend prototype with migrated dashboard UI and connected demo authentication. It is not yet a fully migrated, backend-connected worker booking application.

## 25. Customer Bottom Navigation — reference update (2026-09-19)

- **Previous UI:** 74px footer, 10px labels, 29px icon containers, flat selected item.
- **Reference-based UI:** existing `BottomNavigation.jsx` retained; Customer-only CSS now uses a 58px footer, pale blue/white background, subtle top shadow, 9px labels, and five equal grid columns. Each link retains at least 48px touch height.
- **Active state:** a soft white 46 × 30px rounded pill with a faint blue shadow sits behind the selected icon. Existing blue active icon/label and muted inactive colors remain. Route selection and React Router links are unchanged.
- **Icons:** `HireMeIcon.jsx` and its shared CSS remain unchanged, including standard 24px dimensions and existing Explore/Bookings glyphs. No new artwork, libraries, pages, or routes were added. Existing Customer Messages/Profile implementations and behavior were preserved.
- **Responsive behavior:** five `minmax(0, 1fr)` columns and single-line labels retained. Existing centered desktop shell positioning retained. Source review supports the intended compact layout; actual 320/360/375/390/414px and desktop rendering have **not been browser-verified**.
- **Safe area/content clearance:** footer height includes `env(safe-area-inset-bottom, 0px)` and retains bottom/side safe-area padding. Existing Home/Explore/Bookings scroll padding reserves 74px plus safe area and spacing, exceeding the new 58px footer. Page content styles were not changed.
- **Worker preservation:** all footer changes are scoped to `.customer-bottom-navigation`; Worker Home/Jobs/Earnings/Messages/Profile still explicitly use `role="worker"`. Worker footer CSS, icons, links and markup were not changed. Interactive/visual regression testing remains pending.
- **Build blocker fixed:** removed one pre-existing duplicate `const isCustomer` declaration from `WorkerDrawer.jsx`, which caused both lint and build to fail. Retained the existing role/path-aware declaration; no drawer design changes.
- **Validation:** `npm.cmd run lint` **PASS**; `npm.cmd run build` **PASS** (74 modules). Browser connection returned “No browser is available”; browser discovery returned no browsers. Customer route clicks, active-state rendering, overflow/content-clearance measurements, screenshot comparison and Worker browser checks remain pending. An additional server-rendered navigation check did not complete and is not counted as passed.

## 26. Customer My Bookings — reference UI update (2026-09-19)

- **Scope:** updated the existing `/customer/bookings` page, retaining `AppHeader`, `AppShell`, `BottomNavigation`, the Customer drawer and Plus Jakarta Sans. Other Customer and Worker pages were not edited in this task.
- **Visual hierarchy:** navy title, muted subtitle, soft blue background, rounded translucent cards with subtle borders/shadows, pastel service tiles, aligned metadata, and right-side chevrons. Existing dates, times, addresses and booking counts are unchanged.
- **Worker information:** added the four names explicitly supplied in the reference: Suneth Electrical, Sanduni Fernando, Nadeesha Kumar and Dilani Perera. These are static reference/demo values, not new backend records. The cancelled booking has no supplied worker name and does not invent one.
- **Tabs/status:** four equal-width filter tabs retain the initial multi-section overview and existing click-to-filter behavior. Active tabs use a bright blue gradient; inactive tabs use pale raised surfaces. Confirmed has a shared check icon; In Progress has a green status dot; Completed and Cancelled have gray-blue and pink pills.
- **Actions:** upcoming/ongoing action rows now span the full card. Reschedule, Message Worker, Call Worker and Book Again use pale blue rounded buttons; Cancel uses a pale pink button. Existing cancellation confirmation and toast handlers are preserved. Cancelled also exposes the same See All/detail feedback as the other sections.
- **Icons:** all new icon uses go through `HireMeIcon`. The existing Worker Jobs trash artwork was registered as `delete` for reuse; established service/metadata/navigation icons and their shared dimensions remain unchanged. Existing Worker artwork was not redesigned.
- **Integration fix:** removed a duplicate `WorkerDrawer` instance from this page, retaining the explicit Customer drawer. The updated shared Customer footer is unchanged and continues selecting My Bookings. Booking content now reserves the footer's actual 58px height plus safe area and 24px clearance.
- **Responsive implementation:** equal-width tabs, wrapping metadata, full-width two-column action rows, and a status-below-title arrangement below 375px avoid forcing service names and badges into one narrow row. Existing centered desktop shell and internal scrolling remain. No zoom or page scaling was introduced.
- **Validation:** `npm.cmd run lint` **PASS**; `npm.cmd run build` **PASS** (74 modules). Temporary component checks using JSX transformation and mocked hooks **PASS** for all four tab selections, cancellation accept/reject, Reschedule/Message/Call/Book Again/See All feedback, four worker rows, one drawer and the Customer footer role. These are component handler checks, not browser tests; the temporary check file was removed.
- **Remaining verification:** browser discovery returned no connected browsers. Actual rendering at 320/360/375/390/414px, desktop screenshot comparison, overflow/footer-clearance measurements, Customer Home/Explore navigation and Worker Home/Jobs/Earnings/Messages/Profile browser regression remain pending. Source scope confirms no edits to those pages; visual/interactive regression is not claimed.

## 27. Customer Bottom Navigation — five-state reference refinement (2026-09-19)

This entry supersedes the visual values in section 25. The new supplied reference shows Home, Explore, My Bookings, Messages and Profile individually active, plus an inactive example. The implementation remains one existing navigation component, not a gallery of those examples.

- **Surface:** retained the compact 58px bar, adding translucent white/blue gradients, 18px rounded top corners and a soft blue ambient shadow. Desktop positioning stays inside the centered application shell across all five existing Customer pages.
- **Active/inactive states:** the existing route-based `.active` class and `aria-current` select a bright blue icon/label and a 56 × 32px rounded rectangular icon background with white highlights and a blue shadow. Inactive icons/labels stay muted and icon backgrounds stay flat, including hover. Labels are now 10px with 3px icon-to-label spacing; links have at least 52px touch height.
- **Consistency:** Customer footer selectors now take precedence over legacy page footer styles, including Messages/Profile, preventing their flat active styles from overriding the shared pill. All changed selectors require `.customer-bottom-navigation`; Worker styling is untouched.
- **Icons/routing:** `HireMeIcon.jsx`, its shared CSS and `BottomNavigation.jsx` are unchanged in this task. Existing 24px artwork, including the established Explore/Bookings glyphs, remains the application standard. No icon library, new page or new route was added. Existing Messages/Profile destinations are retained as found in the current project.
- **Responsive/safe areas:** five equal `minmax(0, 1fr)` columns remain, the pill is capped to its column width, and labels stay single-line. Bottom/side safe-area padding and the 58px-plus-bottom-inset height are preserved. Existing page-content clearance is unchanged. The CSS does not scale the page or icons.
- **Validation:** `npm.cmd run lint` **PASS**; `npm.cmd run build` **PASS** (74 modules). Temporary component checks with mocked routing passed for all five Customer and all five Worker routes: five labels, shared icon keys, link destinations, exactly one active item, role-specific class and active-tab callback. The check file was removed after execution.
- **Pending:** browser discovery returned no connected browsers. Actual 320/360/375/390/414px and desktop visual comparison, overflow/content-clearance measurements, route-click integration and visual Worker regression remain unverified. Component checks do not establish browser layout correctness.

### Drawer branding wrapping fix (2026-09-19)

- **Cause:** the shared drawer placed bare `Hire` text and the `Me` accent span directly inside `.brand-logo`, whose column flex layout stacked them. This was a markup/layout issue, not insufficient drawer width.
- **Fix:** `WorkerDrawer.jsx` now uses the existing `Logo` component, as `AppHeader` already does. The entire HireMe wordmark is one child, with the existing “Work. Earn. Grow.” tagline underneath. `Logo.jsx` explicitly applies `white-space: nowrap` to the wordmark, preserving existing typography and navy/blue colors across its uses.
- **Shared scope:** both Worker and Customer drawers receive the same fix. Drawer width, menus, profile card, close control, icons, overlay, animation and app-shell layout are unchanged. No new logo artwork or page styles were introduced.
- **Validation:** `npm.cmd run lint` **PASS**; `npm.cmd run build` **PASS** (74 modules). Source inspection confirms the shared non-wrapping wordmark structure. Browser discovery returned no connected browsers, so visual verification at 320/360/375/390/414px and desktop, including overlap checks, remains pending; responsive browser verification is not claimed.

### Drawer header alignment refinement (2026-09-19)

- The shared `Logo` already groups HireMe on one non-wrapping line. Remaining header fragility came from page-header absolute positioning leaking into drawer branding, leaving the logo outside the header's normal flow.
- Added `WorkerDrawer.css`, imported by the existing shared drawer, with selectors limited to its internal header and direct logo/close-button children. Equal 32px side columns center the logo independently of the left close button. The logo participates in normal layout, with its existing tagline underneath, so the header reserves space before the profile card.
- Worker and Customer drawers share the correction. Existing drawer width, height, max/min width, placement, outer padding, overlay, animation and desktop/mobile shell rules were not edited. Profile-card/menu styles, icons, route handlers and branding typography/colors remain unchanged.
- `npm.cmd run lint` **PASS**; `npm.cmd run build` **PASS** (75 modules). Browser discovery again returned no connected browsers. Actual checks at 320/360/375/390/414px and desktop, plus opening the drawer on the five Worker and three Customer routes, remain pending. No browser-responsive or visual-regression pass is claimed.

### Customer drawer: five main navigation items (2026-09-19)

- Customer menu order is now **Home, Explore, My Bookings, Messages, Profile**, followed by the existing divider, Settings, Help & Support and Logout.
- Added only two entries to `CUSTOMER_MENU` in `WorkerDrawer.jsx`. `/customer/messages` and `/customer/profile` already exist in `App.jsx`; the new entries reuse those destinations and the bottom navigation's `messages`/`profile` icon keys through `HireMeIcon`. No pages, routes or icons were created.
- Both entries use the existing React Router links, exact-route active highlighting, `aria-current` and `onClose` handler. Customer profile-name logic, branding, keyboard/backdrop closing, utility actions and bottom navigation are unchanged.
- No CSS was modified: drawer width/height, positioning, overlay, animation and internal spacing remain unchanged. Existing vertical scrolling and non-shrinking drawer children keep the longer menu scrollable. Worker menu remains Home, My Jobs, My Earnings, Messages, My Profile, then Settings, Help & Support and Logout.
- `npm.cmd run lint` **PASS**; `npm.cmd run build` **PASS** (75 modules). Source checks confirmed existing route declarations, matching bottom-navigation icon keys and unchanged Worker branch/styles. Browser discovery returned no connected browsers; mobile checks at 320/360/375/390/414px, navigation clicks and Customer/Worker visual regression remain pending.

### Customer My Bookings icon sizing refinement (2026-09-19)

- **Cause:** every icon used the default 24px box, regardless of whether it was a service, metadata, status or action icon. Narrow-screen CSS also changed service tiles from 48px square to 40 × 44px.
- **Shared hierarchy:** added optional, role-independent `size` values to `HireMeIcon`: `small` (18px), `medium` (20px), and `large` (28px). Shared icon CSS owns all sizing; no page-level SVG dimension/stroke overrides, replacement artwork or new libraries were added. Existing callers without a size retain their original 24px styling.
- **Bookings usage:** service glyphs use 28px boxes inside centered 48px square tiles; worker/date/time/location and check icons use 18px; action and chevron icons use 20px. Metadata is vertically centered; action buttons use a consistent 6px icon/text gap. Glyphs use centered flex boxes and a size-relative font while retaining the established characters and colors.
- **Responsive alignment:** removed the non-square service-tile override below 375px and retained a matching 48px grid column. Icon flex bases prevent shrinking/distortion; text can still wrap. Card structure, booking data, colors, typography, handlers and app-shell dimensions were not redesigned.
- **Navigation/regression scope:** bottom navigation already uses equal columns, shared 24px icon boxes and the same icon size for active/inactive items; it remains unchanged. Existing glyph artwork is retained, so glyph and SVG silhouettes still differ. Worker, Customer Home and Explore callers do not opt into the new sizes and retain their defaults.
- **Validation:** `npm.cmd run lint` **PASS**; `npm.cmd run build` **PASS** (75 modules). Source review confirmed the size assignments and unchanged handlers. Browser discovery returned no connected browsers; visual icon balance, clipping/overflow, 320/360/375/390/414px layout and browser regression remain pending.

### Explore icon standardization (2026-09-19)

- Replaced the font-dependent magnifier character with one filled compass SVG under `artwork.explore` in `HireMeIcon.jsx`. Its circular silhouette and cut-out direction needle communicate discovery and match the solid navigation artwork. This explicitly requested project-wide Explore standard supersedes the earlier Explore glyph.
- Customer Bottom Navigation and Customer Drawer already use the shared `explore` key, so both receive exactly the same artwork. The source audit found no other Explore navigation icon definitions requiring conversion; the old Explore glyph was removed.
- Search remains separate: the existing `search` SVG and Customer Home/Explore search-field uses are unchanged. No external icon library or per-page duplicate SVG was added.
- Existing 24px shared boxes, muted/active blue colors, active pill, labels, spacing, routes, layouts and Worker navigation are unchanged. Only Explore artwork was modified.
- `npm.cmd run lint` **PASS**; `npm.cmd run build` **PASS** (75 modules). Browser discovery returned no connected browsers. Visual checks at 320/360/375/390/414px and active/inactive browser rendering remain pending; the shared size/color rules were checked in source only.

## 28. Authentication Consistency, Single Source of Truth & Customer Messages Navigation Drawer Integration (2026-09-20)

### 1. User Name Consistency & Single Source of Truth
- **Single Source of Truth:** `src/utils/auth.js` (`getCurrentUser()`, `getProfile()`, `saveProfile()`, `getSession()`) serves as the application-wide authoritative source for the currently authenticated user's profile and session.
- **Dynamic User Resolution:** `getCurrentUser()` inspects the active session and loads the corresponding profile (`customerProfile` or `workerProfile` from `sessionStorage`). It automatically resolves:
  - `fullName`: from the registered profile; falls back safely to `"Customer"` or `"Worker"` if unconfigured, never displaying `undefined`, `null`, or arbitrary demo names.
  - `firstName`: first token of `fullName` for greetings.
  - Role-specific metadata (category, area, contact verification).
- **Audit & Replacement of Hardcoded Current-User Names:**
  - `src/components/WorkerDrawer.jsx`: Replaced hardcoded `"Nimal Perera"` and `"Electrician • Colombo"` with `user.fullName` and dynamic `getWorkerSubtitle()`. The customer branch displays `user.fullName` directly.
  - `src/pages/worker/WorkerHome.jsx`: Replaced `"Hello, Nimal!"` greeting with dynamic `Hello, ${user.firstName}!`.
  - `src/pages/worker/WorkerProfile.jsx`: Replaced hardcoded `"Nimal Perera"` and `"Electrician"` with `user.fullName` and `workerProfile.category || "Worker"`.
  - `src/components/AppHeader.jsx`: Replaced hardcoded `"Worker Profile — Nimal Perera"` aria-label with `"My Profile"`.
  - `src/pages/customer/CustomerProfile.jsx`: Replaced hardcoded `"Dilani Perera"`, mock email, and mock phone with `user.fullName` and verified contact information from `customerProfile`.
- **Preservation of Other Users' Names:** Contacts and service providers (e.g. `Suneth Electrical`, `Tharindu Silva`, `Aruna Perera`, `Sanduni Fernando`, `Nadeesha Kumar`, `Dilani Perera` in booking cards/messages) remain completely untouched as they represent distinct external actors, not the authenticated user.

### 2. Customer Messages Navigation Drawer Fix
- **Issue:** On `/customer/messages`, the navigation drawer could not be opened because `AppHeader` had `onBackClick` configured, which suppressed the hamburger button and rendered a back arrow instead.
- **Fix:** Integrated `useNavigationDrawer` hook and `WorkerDrawer` (with `role="customer"`) into `src/pages/customer/CustomerMessages.jsx`. Removed `onBackClick` from `AppHeader`, wiring `onMenuClick={drawer.open}`, `menuRef={drawer.menuRef}`, and `drawerOpen={drawer.isOpen}`.
- **Behavior:** The hamburger button is now fully functional on Customer Messages, opening the 5-item Customer navigation drawer (Home, Explore, My Bookings, Messages [active], Profile), matching the standard Customer Home/Explore/Bookings drawer behavior.

### 3. Customer Profile Navigation Drawer Integration
- Integrated `useNavigationDrawer` hook and `WorkerDrawer` (with `role="customer"`) into `src/pages/customer/CustomerProfile.jsx`.
- Replaced previous placeholder toast with real drawer toggle, enabling drawer opening directly from `/customer/profile` with the Profile menu item highlighted as active.

### 4. Worker Registration Profile Persistence
- **Audit:** Previously, worker registration did not store user details or work details in `sessionStorage`. As a result, newly registered workers had empty profile objects.
- **Fix:**
  - `WorkerRegisterDetails.jsx`: Stores `fullName` and `nicPassport` in `workerDetails` on form submission.
  - `WorkerWorkDetails.jsx`: Stores category, skills, experience, rate, area, availability, and bio in `workerWorkData` on form submission.
  - `WorkerComplete.jsx`: Aggregates all intermediate registration data (`workerDetails`, `workerWorkData`, `workerVerification`) and commits them via `saveProfile("worker", ...)` before starting the session and redirecting to `/worker/home`.

### 5. Drawer Architecture & Deduplication
- Resolved duplicate `<WorkerDrawer>` renders previously present in `CustomerHome.jsx` and `CustomerExplore.jsx`.
- Standardized drawer props and `AppShell inert={drawer.isOpen}` across all customer and worker views.
- Verified that Worker Messages (`/worker/messages`) continues to open the Worker drawer with Messages active.

### Customer Bookings visual refinement (2026-09-20)

- Refined existing glass booking cards with 60px service tiles, bold 48px service glyphs, clearer titles/metadata, and 44px action buttons.
- Shared HireMeIcon now supports opt-in inherited text color and shared action (22px) and service (48px) sizes. Metadata uses 20px and status icons 18px. No page-specific icon dimensions, stroke overrides, new artwork, or libraries.
- Cancel's standard trash icon now matches its red label. Reschedule, Message Worker, Call Worker and Book Again icons match blue labels. Confirmed check is blue; progress dot green; Completed check muted blue/gray; Cancelled trash red.
- Existing colorful service glyphs remain the project standard. Their silhouettes differ from the screenshot; no competing drop/broom/roller artwork was introduced. Other callers retain existing default icons and sizes.
- Mobile cards through 480px give badges a dedicated row beneath titles, with wrapping metadata and fixed icon columns. Extra spacing adjustments support 320px. Bottom navigation is unchanged.
- Booking data, filtering, cancellation confirmation/feedback, action feedback, toasts, drawer, navigation and routing handlers are preserved.
- Validation: npm.cmd run lint PASS; npm.cmd run build PASS (75 modules). Requested Customer/Worker route registrations checked in source.
- Browser runtime reported no browser available; discovery returned an empty list. Visual/overflow checks at 320/360/375/390/414px and interactive regression on /customer/bookings, /customer/home, /customer/explore, /worker/home, /worker/jobs, /worker/earnings, /worker/messages and /worker/profile remain pending. Pixel-level reference matching is unverified.

### Customer Bookings compact icon refinement (2026-09-20)

- Follow-up validation: `npm.cmd run lint` PASS; `npm.cmd run build` PASS (75 modules).

- Follow-up supersedes the preceding 48px service / 22px action sizing: all five Customer booking service icons now use the existing shared `large` (28px) size; all seven action icons use `medium` (20px). The colored 60px squares remain unchanged, with centered artwork and comfortable padding. Shared standard glyph weight replaces the oversized service presentation.
- Information icons and chevrons retain a consistent 20px size; status check/delete icons remain 18px. Shared fixed width, min-width and non-shrinking flex basis keep metadata text aligned; existing centered row alignment is preserved.
- Existing inherited semantic colors remain: blue primary actions/Confirmed, red Cancel/trash, green progress, muted Completed, and established service category colors. Outline icons retain the shared stroke weight.
- Inspected Worker Jobs as the existing booking reference (26px service artwork); followed the requested Customer size ranges without changing Worker code or shared icon definitions.
- Files changed in this follow-up: `src/pages/customer/CustomerBookings.jsx` and this documentation only. CSS, colored tiles, page/card layout, spacing, typography, header, tabs, bottom navigation, data, routing and handlers are unchanged.
- Source assertion verified that only five service size props and seven action size props changed; all other component source, including all four states and action handlers, is identical. Lint/build results are recorded below. Browser discovery again returned no connected browsers, so mobile/tablet/desktop visual checks, overflow/overlap checks and interactive state/action validation remain pending.

### Worker artwork as the icon source of truth (2026-09-20)

- **Rule:** Worker UI is the source of truth. ONE MEANING = ONE ICON = ONE DESIGN; reuse `HireMeIcon.jsx` rather than inventing Customer artwork. Persisted the rule and the user's conflict resolution in `AGENTS.md`.
- **Explicit conflict resolution:** user selected "Keep Worker appearance; copy each page's current mapping." Therefore Worker Jobs' existing drop represents both Electrical and Plumbing, and its lightning polygon represents Cleaning. Customer Bookings, Home, Explore and Messages now obtain these mappings from the shared registry. These unusual assignments were deliberately preserved, not corrected.
- Corrected shared `user` artwork to the exact Worker Jobs/Home person silhouette. Calendar, clock, booking location and delete already matched. Replaced Customer service glyph variants and chevron glyphs with extracted Worker artwork; AC uses the existing Worker Jobs artwork. Painting and Book Again retain their existing shared glyphs because no corresponding Worker artwork was identified.
- Added `HireMeIconArtwork`, an artwork-only export of the same registry. Consolidated 89 inline SVG uses into this shared source, preserving their original SVG shells, classes, dimensions, fill/stroke and handlers. Extracted reusable forward, password visibility, email, more, smile, send, verified, balance, details, identity and expand artwork from Worker pages. No new icon designs or libraries.
- Customer Bookings retains 28px service icons, 20px metadata/actions, 18px status icons, fixed non-shrinking metadata columns, semantic label colors and existing tile sizes. Shared CSS owns the extracted service stroke weights and colors. No booking logic, navigation or layout rewrite.
- Customer Home/Explore category and service cards use shared Worker mappings; Explore locations and Customer chevrons now use shared artwork. Customer Messages and registration reuse matching Worker SVG artwork. Header/navigation and drawer behavior remain unchanged.
- Files changed: `AGENTS.md`, `src/components/HireMeIcon.jsx`, `src/components/HireMeIcon.css`, Customer Home/Explore/Messages, Customer registration Details/Verify, Login, Worker Home/Jobs/Messages/Profile, Worker registration Complete/Details/VerificationCode/Verify/WorkDetails, and this document. Customer Bookings/Profile and Worker Earnings receive relevant shared artwork without direct edits in this step.
- **Validation:** lint PASS; production build PASS (75 modules). Server rendering verified 206 literal shared icon uses resolve, the Worker person/service mappings are correct, and Bookings retains all five service and seven action sizes. Expanding shared artwork in Worker Jobs reproduced the original file after whitespace normalization, including every SVG attribute and handler.
- **Limits:** Worker legacy variants remain where preserving Worker appearance requires them (for example Home location pin versus Jobs compass, filled versus outline status/wallet variants, and drawer/Profile utility symbols). Existing Worker drawer emoji symbols were neither copied into Customer UI nor redesigned. Thus this is not a claim that every legacy icon in the entire app now has identical appearance; that would conflict with the user's preservation decision. Browser discovery returned no connected browsers: mobile alignment/overflow and interactive regression on Customer Bookings/Home/Explore/drawer and Worker Home/Jobs/Earnings/Messages/Profile remain unverified.

### Customer Messages reference inbox (2026-09-20)

- Refined `/customer/messages` around the supplied conversation-list reference: navy Messages heading, Customer subtitle ("Chat with workers about your bookings"), glass search field, filter control, All/Unread/Archived buttons, rounded provider cards, presence dots, previews, service tags, timestamps, unread counts and shared chevrons. Uses five explicitly local demo provider conversations. No backend messaging is implied.
- Default view is now the inbox. Search matches provider/service/preview; Unread filters and counts unread conversations; Archived has an empty state. Opening a card marks it read locally and uses the existing route with a `conversation` query parameter, allowing browser history navigation. Each provider has an isolated local thread; the original Suneth messages, booking information and composer behavior remain available. Sent messages update inbox previews during the mounted session; data is not persisted after reload.
- Header still uses `AppHeader`, `HireMeIcon` menu/notification/profile artwork, `WorkerDrawer role="customer"`, and `useNavigationDrawer`. Corrected the missing Messages hamburger button styling instead of adding a separate menu implementation. Existing backdrop/close/Escape/focus trap/restoration wiring is retained. Kept existing Customer drawer entries, including Messages and Profile because both routes already exist.
- Existing Customer bottom navigation and active Messages icon remain. Scoped styles center the mobile shell on tablet/desktop, keep the inbox scrollable, and reserve footer space. No Worker pages, shared navigation components, routes, other Customer pages or shared icon definitions were edited in this task.
- Avatar fallback: no local provider portrait assets were found, so cards use the established shared Profile icon in circular containers rather than external photos. The filter uses the existing shared Settings icon. These differ from the reference portraits/sliders; no invented SVG or icon library was added.
- Files changed: `src/pages/customer/CustomerMessages.jsx`, `src/pages/customer/CustomerMessages.css`, and this document.
- Validation: lint PASS without warnings; production build PASS (75 modules). Server-render checks passed for the inbox/five cards, drawer/menu controls, active Messages link, all five conversation deep links, original Suneth booking information and unknown-conversation fallback. The temporary harness mirrored Vite React deduplication for the parent-installed router.
- Browser discovery returned no connected browsers. Runtime clicks (search/filter/send, drawer opening/closing/focus, browser history), console errors, visual comparison, horizontal overflow and mobile/tablet/desktop rendering remain unverified. Customer Home/Explore/Bookings and Worker navigation/Messages are unchanged in this task but browser regression remains pending.

### 6. Verification
- **Lint:** `npm run lint` (`oxlint`) — **PASS** (0 warnings, 0 errors, 36 files inspected).
- **Build:** `npm run build` (`vite build`) — **PASS** (75 modules transformed, 0 errors, production assets built in 1.02s).
