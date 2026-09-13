# Shared UI Components Refactoring Documentation

## 1. Overview & Architectural Goals

The HireMe application refactor centralizes common UI elements across all migrated pages into reusable components under `src/components/`. This ensures:
1. **Single Source of Truth**: Reusable navigation bars, headers, app shells, drawers, and toasts eliminate hundreds of lines of duplicated JSX across Worker and Customer pages.
2. **One Meaning = One Standard Icon**: Strict adherence to the global HireMe icon design rule (`AGENTS.md`), reusing `src/components/HireMeIcon.jsx` across all roles without external icon libraries or emoji substitutes.
3. **Zero Visual and Behavioral Regressions**: The existing visual layout, styling, class names, CSS tokens, responsive breakpoints, touch targets, and interaction behaviors remain 100% faithful to the source design.
4. **Clean Builds and Zero Lint Warnings**: Full compatibility with React Router, modern React best practices, and clean compilation via `oxlint` and `vite build`.

---

## 2. Created Shared Components

| Component | File Path | Description |
|---|---|---|
| `Logo` | `src/components/Logo.jsx` | Brand logo rendering `Hire` and `<span className="logo-accent">Me</span>`, with optional tagline ("Work. Earn. Grow.") and accessible link navigation. |
| `HireMeIcon` / `Icon` | `src/components/HireMeIcon.jsx`<br/>`src/components/Icon.jsx` | Standardized SVG artwork and glyph registry for all concept icons (home, jobs, earnings, messages, profile, notifications, search, back, menu, explore, bookings). `Icon.jsx` provides an alias wrapper. |
| `Toast` | `src/components/Toast.jsx` | Floating feedback pill with accessibility support (`role="status"`, `aria-live="polite"`) and standard `.app-toast.visible` animations. |
| `AppShell` | `src/components/AppShell.jsx` | Outer mobile viewport shell supporting inert state during off-canvas drawer expansion. |
| `AppHeader` | `src/components/AppHeader.jsx` | Shared top navigation header providing role-aware controls (hamburger menu or back button, centered HireMe brand logo, notification bell with unread badge, and user avatar with online status indicator). |
| `BottomNavigation` | `src/components/BottomNavigation.jsx` | Fixed bottom navigation bar with automatic active route detection, role-aware tabs, accessible aria landmarks, and smooth scroll-to-top support on active tab re-clicks. Also exports `WorkerBottomNavigation` and `CustomerBottomNavigation`. |
| `WorkerDrawer` | `src/components/WorkerDrawer.jsx` | Worker off-canvas slide-out navigation menu drawer featuring worker user card, 5 worker section links, settings, help, and logout triggers, with full backdrop dismiss and keyboard focus trap. |

---

## 3. Props Accepted by Each Component

### `Logo` (`src/components/Logo.jsx`)
- `to` (`string`, optional, default: `"/customer/home"`): Destination route for the logo link.
- `onClick` (`function`, optional): Custom click handler (e.g., smooth scroll-to-top).
- `showTagline` (`boolean`, optional, default: `true`): Whether to render "Work. Earn. Grow.".
- `className` (`string`, optional, default: `"brand-logo"`): Extra CSS class names.
- `ariaLabel` (`string`, optional, default: `"HireMe home"`): Accessible description.

### `HireMeIcon` / `Icon` (`src/components/HireMeIcon.jsx`, `src/components/Icon.jsx`)
- `name` (`string`, required): Name of standard icon (`home`, `jobs`, `earnings`, `messages`, `profile`, `notifications`, `search`, `back`, `menu`, `explore`, `bookings`).
- `className` (`string`, optional): Additional classes (e.g. for outlines or custom wrappers).

### `Toast` (`src/components/Toast.jsx`)
- `message` (`string`): Toast notification message string. Renders `.visible` class when truthy.
- `id` (`string`, optional, default: `"appToast"`): HTML element ID.

### `AppShell` (`src/components/AppShell.jsx`)
- `children` (`ReactNode`): Child page content (header, main, bottom nav).
- `className` (`string`, optional, default: `""`): Additional container classes.
- `inert` (`boolean`, optional, default: `false`): HTML `inert` attribute applied when modal/drawer is open.

### `AppHeader` (`src/components/AppHeader.jsx`)
- `role` (`"worker" | "customer"`, optional): Explicit role. Automatically inferred from current URL pathname if omitted.
- `onMenuClick` (`function`, optional): Callback when hamburger menu button is pressed.
- `menuRef` (`ReactRef`, optional): Ref passed to hamburger menu button for focus restoration.
- `drawerOpen` (`boolean`, optional, default: `false`): Reflects drawer open state to `aria-expanded`.
- `onNotificationClick` (`function`, optional): Callback for notification bell button click.
- `notificationAriaLabel` (`string`, optional, default: `"Notifications"`): Custom notification bell accessibility label.
- `onLogoClick` (`function`, optional): Click handler on brand logo (e.g., scroll-to-top).
- `profileTo` (`string`, optional): Target route for avatar link (defaults to `/worker/profile` or `/customer/profile`).
- `homeTo` (`string`, optional): Target route for brand logo link (defaults to `/worker/home` or `/customer/home`).
- `avatarAriaLabel` (`string`, optional): Accessible label for avatar link.
- `onBackClick` (`function`, optional): If provided, replaces the menu button with a back navigation button (`<HireMeIcon name="back" />`) using `.chat-back-btn`.
- `backAriaLabel` (`string`, optional, default: `"Back"`): Accessible label for back button.
- `isOnline` (`boolean`, optional, default: `true`): Sets online status title/label on avatar dot.
- `statusTitle` (`string`, optional): Custom title attribute for online status dot.

### `BottomNavigation` (`src/components/BottomNavigation.jsx`)
- `role` (`"worker" | "customer"`, optional): Bottom navigation role. Automatically inferred from current path if omitted.
- `onActiveTabClick` (`function`, optional): Callback when the already active tab is clicked (e.g., smooth scroll viewport to top).

### `WorkerDrawer` (`src/components/WorkerDrawer.jsx`)
- `isOpen` (`boolean`, required): Controls whether drawer and backdrop have the `.active` class.
- `onClose` (`function`, required): Callback to dismiss the drawer (backdrop click or close button).
- `drawerRef` (`ReactRef`, optional): Ref attached to `<aside id="offcanvasDrawer">`.
- `closeRef` (`ReactRef`, optional): Ref attached to the close (`&times;`) button for initial focus.
- `onShowToast` (`function`, optional): Toast callback invoked for Settings and Help links.
- `onLogout` (`function`, optional): Callback when worker clicks Logout.

---

## 4. Role-based Behaviors (Worker vs Customer)

### Bottom Navigation Differences
- **Worker Tabs**:
  1. Home (`/worker/home`, icon: `home`, label: "Home")
  2. Jobs (`/worker/jobs`, icon: `jobs`, label: "Jobs")
  3. Earnings (`/worker/earnings`, icon: `earnings`, label: "Earnings")
  4. Messages (`/worker/messages`, icon: `messages`, label: "Messages")
  5. Profile (`/worker/profile`, icon: `profile`, label: "Profile")
  - Uses `.nav-tab-item` wrapper with `.nav-icon-box` containing the SVG icon.
- **Customer Tabs**:
  1. Home (`/customer/home`, icon: `home`, label: "Home")
  2. Explore (`/customer/explore`, icon: `explore`, label: "Explore")
  3. My Bookings (`/customer/bookings`, icon: `bookings`, label: "My Bookings")
  4. Messages (`/customer/messages`, icon: `messages`, label: "Messages")
  5. Profile (`/customer/profile`, icon: `profile`, label: "Profile")
  - Uses `<li>` wrapper with `.nav-icon-box` containing the SVG icon.
- **Active State**: Dynamically calculated via React Router's `useLocation()`. The tab matching the current route automatically receives `.active` and `aria-current="page"`.
- **Active Tab Re-click**: Triggers `onActiveTabClick` to smooth-scroll the page and main viewport to the top.

### Top Header Differences
- **Worker**:
  - Hamburger button has `id="hamburgerMenuBtn"`, `aria-controls="offcanvasDrawer"`, `aria-label="Open Navigation Menu"`, and `aria-expanded={drawerOpen}`.
  - User avatar points to `/worker/profile` with default label `"Worker Profile — Nimal Perera"`.
  - Notification button triggers worker-specific notifications without customer badge pseudo-elements.
  - Supports `onBackClick` for detailed subviews (such as the 1-on-1 chat in `WorkerMessages.jsx`).
- **Customer**:
  - Menu button has `aria-label="Open menu"` and `aria-expanded="false"`.
  - User avatar points to `/customer/profile` with default label `"Customer profile"`.
  - Notification button includes `.customer-notification` class with the unread indicator dot `<i aria-hidden="true" />`.

---

## 5. Pages Refactored

### Worker Pages
1. `src/pages/worker/WorkerHome.jsx`:
   - Replaced hardcoded drawer, toast, header, app shell, and bottom nav with `WorkerDrawer`, `Toast`, `AppShell`, `AppHeader`, and `BottomNavigation`.
2. `src/pages/worker/WorkerJobs.jsx`:
   - Replaced hardcoded drawer, toast, header, app shell, and bottom nav with shared components.
   - Synchronized filter click handler (`handleFilterClick`).
3. `src/pages/worker/WorkerEarnings.jsx`:
   - Replaced hardcoded drawer, toast, header, app shell, and bottom nav with shared components.
   - Synchronized timeframe filter click handler (`handleTimeframeClick`).
4. `src/pages/worker/WorkerMessages.jsx`:
   - Replaced duplicate drawer, toast, shell, header, and bottom navigation across both the message list view and active chat view with shared components.
   - Used `AppHeader`'s `onBackClick` in active chat view with standardized `<HireMeIcon name="back" />`.
5. `src/pages/worker/WorkerProfile.jsx`:
   - Replaced hardcoded drawer, toast, header, app shell, and bottom nav with shared components.
   - Dynamic online status indicator passed through `AppHeader`.

### Customer Pages
1. `src/pages/customer/CustomerHome.jsx`:
   - Replaced hardcoded toast, shell, header, and bottom navigation with `Toast`, `AppShell`, `AppHeader`, and `BottomNavigation`.
   - Removed duplicate `tabs` constant.
2. `src/pages/customer/CustomerExplore.jsx`:
   - Replaced hardcoded toast, shell, header, and bottom navigation with `Toast`, `AppShell`, `AppHeader`, and `BottomNavigation`.
3. `src/pages/customer/CustomerBookings.jsx`:
   - Replaced hardcoded toast, shell, header, and bottom navigation with `Toast`, `AppShell`, `AppHeader`, and `BottomNavigation`.

---

## 6. Summary of Eliminated Code Duplication

- **~900 lines of duplicated JSX eliminated**:
  - Worker drawer (~130 lines) previously duplicated in 5 worker pages -> 1 shared component.
  - Bottom navigation (~60 lines each) previously duplicated across 8 pages and 2 sub-views -> 1 shared component.
  - App headers (~35 lines each) duplicated across all pages -> 1 shared component.
  - Toast and Shell containers duplicated on every page -> standardized wrapper components.
- **Shared Icon Registry**:
  - Standard SVG artwork and glyphs are maintained solely in `HireMeIcon.jsx`. No duplicate SVGs for home, jobs, earnings, messages, profile, menu, search, back, explore, or bookings.
- **Centralized Routing and Active Tab Logic**:
  - Active routes are computed dynamically with `useLocation()`, preventing stale active states across pages.

---

## 7. Quality Assurance & Regression Verification

- **Linting (`npm run lint` / `oxlint`)**: 0 errors, 0 warnings across all 27 project files.
- **Production Build (`npm run build` / `vite build`)**: 0 errors; built cleanly in under 1 second.
- **Visual & Layout Fidelity**: All CSS class names, selectors (`:where(.worker-...)`, `.bottom-nav-bar`, `.app-header`, `.drawer-menu-link`), flex layouts, paddings, and CSS variables remain completely untouched.
- **Accessibility**: Full preservation of `aria-label`, `aria-current`, `aria-expanded`, `aria-controls`, `role="status"`, `role="dialog"`, `role="tablist"`, and keyboard focus trap handling.

