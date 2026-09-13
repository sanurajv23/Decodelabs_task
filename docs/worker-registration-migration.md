# Worker Registration Migration

## Date
2026-09-13

## Purpose
The purpose of this migration was to transition the existing HireMe Worker Registration flow from the original vanilla HTML/CSS/JavaScript project into the modern React application (`HireMe-React`). The migration faithfully preserves the exact visual design, neumorphic cards, pill input fields, atmospheric glowing orbs, 4-step progress indicators, responsive layouts, and interactive frontend behaviors across all 5 registration screens without simplifying, redesigning, or inventing new fields.

## Original Source Files
- **HTML**:
  - `pages/worker-verify.html` (Step 1: Account verification method selection — Mobile SMS vs. Email)
  - `pages/verification-code.html` (Step 1 continued: 6-digit verification code input screen with resend timer)
  - `pages/worker-register-details.html` (Step 2: Personal details, selfie identity capture, NIC/passport, and password)
  - `pages/worker-work-details.html` (Step 3: Trade category, skills, experience level, rate, service area, and short bio)
  - `pages/worker-complete.html` (Step 4: Celebration hero, account verification summary, under-review status, and session completion)
- **CSS**:
  - `css/registration.css` (Complete neumorphic styling, glow orbs, progress bar, pill inputs, OTP boxes, and responsive rules)
  - `css/style.css` (Base design tokens and typography)
  - `css/responsive.css` (Safe-area padding and mobile/desktop viewport safeguards)
- **JavaScript**:
  - `js/registration.js` (Method selection, OTP input handling, 28s live countdown, password toggle, experience card selection, bio counter, and back navigation)
  - `js/auth.js` (SessionStorage prototype session creation and destination resolution)
- **Assets & Fonts**:
  - `Plus Jakarta Sans` Google Font
  - Embedded SVG artwork (Sri Lanka national flag, celebration rays, neumorphic check badge, shields, camera, and icons)

## Registration Flow
The registration process retains its exact 5-screen logical sequence:
1. **Worker Verification** (`/worker/register` / `/worker/register/verify`) — Step 1: Selection of verification channel (SMS vs. Email), phone prefix (+94) with national flag, and email entry.
2. **Verification Code** (`/worker/register/verification` / `/worker/register/code`) — Step 1 (continued): 6-digit OTP boxes with auto-advance, backspace handling, paste support, and a live 28-second resend countdown timer.
3. **Register Details** (`/worker/register/details`) — Step 2: Selfie verification frame, full name, NIC/Passport number, password field with show/hide toggle, and login link.
4. **Work Details** (`/worker/register/work`) — Step 3: Work category picker, skills picker, 3-option experience level cards (Beginner, Intermediate, Experienced), hourly rate (LKR), service area with GPS location detection, availability picker, and short bio with live 200-character counter.
5. **Registration Complete** (`/worker/register/complete`) — Step 4: Confetti celebration rays, check badge, account completion summary checklist, "Profile is Under Review" banner, and "Go to Home" action that initializes the worker prototype session in `sessionStorage` and navigates to `/worker/home`.

## React Files
- **Files Created**:
  - `src/pages/worker/registration/RegistrationProgress.jsx` (Shared 4-step progress indicator component with active/completed line and circle states)
  - `src/pages/worker/registration/WorkerVerify.jsx` (Step 1 component)
  - `src/pages/worker/registration/WorkerVerificationCode.jsx` (Step 1 OTP component)
  - `src/pages/worker/registration/WorkerRegisterDetails.jsx` (Step 2 component)
  - `src/pages/worker/registration/WorkerWorkDetails.jsx` (Step 3 component)
  - `src/pages/worker/registration/WorkerComplete.jsx` (Step 4 component)
  - `src/pages/worker/registration/WorkerRegistration.css` (Complete scoped styles under `:where(.worker-registration)`)
  - `docs/worker-registration-migration.md` (This documentation)
- **Files Modified**:
  - `src/components/HireMeIcon.jsx` (Registered standard `back` arrow icon from existing HireMe project artwork)
  - `src/App.jsx` (Added routes for `/worker/register`, `/worker/register/verify`, `/worker/register/verification`, `/worker/register/code`, `/worker/register/details`, `/worker/register/work`, `/worker/register/complete`)

## UI Migrated
1. **Atmospheric Background**: Radial gradient glowing orbs (`.reg-orb-tr`, `.reg-orb-mr`, `.reg-orb-bl`) with blur filters providing soft ambient light.
2. **Header**: Centered HireMe brand logo with `.logo-accent` and subtitle ("Work. Earn. Grow."), and round neumorphic back button with standardized `<HireMeIcon name="back" />`.
3. **4-Step Progress Indicator**: Dynamic progress tracker with completed, active, and upcoming circle states, connecting progress lines, and responsive labels.
4. **Verification Method Selection**: 2 interactive radiogroup cards (Mobile SMS vs. Email) with radio indicators and icons.
5. **Phone Number Pill**: Sri Lanka flag SVG, country code (+94), dropdown chevron, vertical divider, and numeric input field.
6. **OTP Grid**: 6 distinct numeric boxes styled with inset neumorphic shadows.
7. **Resend Timer**: Live 28-second countdown displaying `00:SS` before switching to an interactive "Resend Code" button.
8. **Selfie Frame**: Dashed circular border, inner silhouette frame, and circular camera badge button supporting photo selection.
9. **Password Field**: Pill input with lock icon, hide/show password toggle button, and minimum 6-character guidance text.
10. **Experience Level Cards**: 3 radio cards with title and duration subtitle ("0 - 1 year", "1 - 3 years", "3+ years").
11. **GPS Location Picker**: Integrated GPS button allowing one-click location population.
12. **Bio Textarea**: Rounded multi-line container with live `0/200` character counter.
13. **Celebration Screen**: Radiating multi-color confetti rays SVG, elevated checkmark badge, 3-point summary card, and blue review banner.

## Functionality Migrated
- **Navigation**: Seamless React Router transitions between steps using `<Link>` and `useNavigate()`.
- **Keyboard / Focus Trap in OTP**: Auto-advances focus to next box upon entering a digit, returns focus on backspace, and parses pasted 6-digit codes.
- **Countdown Timer**: 28-second live timer automatically updating every second via `useEffect`.
- **Password Visibility**: Toggles input type between `password` and `text` with corresponding eye / eye-off SVGs.
- **Dynamic Field Cycles**: Clicking category, skills, or availability triggers realistic option selection cycles.
- **Character Counter**: Real-time counter updates as user types in the bio textarea (`${bio.length}/200`).
- **Session Authentication**: On the completion screen, clicking "Go to Home" saves `{ authenticated: true, role: 'worker' }` to `sessionStorage` under `hireme_session` (matching `window.HireMeAuth.startSession`) and redirects to `/worker/home`.
- **Accessible Toasts**: User feedback notifications appear for resending codes, capturing selfie, selecting options, and GPS detection.

## Icon Consistency
The migration strictly respects the project-wide design rule: **ONE ITEM / ONE MEANING = ONE ICON**:
- The header back button on all registration screens reuses the shared `<HireMeIcon name="back" />`.
- `HireMeIcon.jsx` was extended using the existing SVG back arrow artwork shared across original HireMe customer and worker registration pages (`<line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />` with `strokeWidth={2.4}`).
- All form-specific SVGs (Sri Lanka flag, camera, lock, eye, briefcase, gear, wallet, map-pin, calendar, confetti rays) match the original vanilla vector graphics exactly.
- Zero external icon libraries were added and zero emojis were introduced.

## Responsive Design
- **Mobile First**: Default layout is optimized for mobile viewports (360px–430px) with touch-friendly 52px/56px pill inputs and action buttons.
- **Desktop Adaptation**: On viewports `>= 1024px`, the registration UI is presented within a centered 440px/450px container with rounded corners (28px radius), subtle drop shadow (`0 20px 60px rgba(15, 23, 42, 0.14)`), elegant gradient backdrop, and thin scrollbars without horizontal scrolling or transform scaling hacks.
- **Safe-Area Insets**: Header respects `env(safe-area-inset-top, 0px)` and bottom padding respects `env(safe-area-inset-bottom, 0px)` to accommodate device notches and home indicators.

## Routing
All routes are integrated in `src/App.jsx`:
- `/worker/register` -> `WorkerVerify` (Step 1)
- `/worker/register/verify` -> `WorkerVerify` (Step 1 alias)
- `/worker/register/verification` -> `WorkerVerificationCode` (Step 1 OTP)
- `/worker/register/code` -> `WorkerVerificationCode` (Step 1 OTP alias)
- `/worker/register/details` -> `WorkerRegisterDetails` (Step 2)
- `/worker/register/work` -> `WorkerWorkDetails` (Step 3)
- `/worker/register/complete` -> `WorkerComplete` (Step 4)

## Verification
- **Lint**: `npm run lint` (`oxlint`) passed with 0 errors and 0 warnings.
- **Build**: `npm run build` (`vite build`) compiled successfully into production bundles.
- **Route Validation**:
  - `/worker/register` — Clean render & method selection
  - `/worker/register/verification` — Clean render, OTP inputs, and 28s timer
  - `/worker/register/details` — Clean render, selfie frame, and password toggle
  - `/worker/register/work` — Clean render, experience level cards, rate, and bio counter
  - `/worker/register/complete` — Clean render, celebration hero, summary card, and home navigation
- **Regression Testing**:
  - `/worker/home` — Intact and operational
  - `/worker/jobs` — Intact and operational
  - `/worker/earnings` — Intact and operational
  - `/worker/messages` — Intact and operational
  - `/worker/profile` — Intact and operational
  - `/customer/home` — Intact and operational
  - `/customer/explore` — Intact and operational
  - `/customer/bookings` — Intact and operational

## Important Notes
- **Frontend / Prototype State**: The registration flow operates in client-side prototype mode. State changes and demo submissions navigate between screens and persist the worker role in `sessionStorage` upon completion without requiring an active backend or live database.

