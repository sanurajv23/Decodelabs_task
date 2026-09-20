# Customer Profile Page — Creation Documentation

## 1. Reference Image Used
The visual source of truth was the user-provided Customer Profile screenshot (`media_1789376636809.png`). The implementation reproduces:
- Top application header with hamburger menu, centered HireMe branding, notification indicator, and profile status avatar.
- Page title "Profile" with subtitle "Manage your account and preferences".
- Large profile summary card with avatar, "Welcome back," greeting, customer name "Dilani Perera", contact metadata (email, phone), Account Type "Customer" badge, subtitle description, and "Edit Profile" action button.
- 8 individual option cards for account settings and preferences.
- Promotional rebooking card with crown icon, copy, and "View Bookings" action button.
- Fixed 5-tab Customer Bottom Navigation with active "Profile" tab.

## 2. Existing Project Components Inspected
- `src/pages/customer/CustomerHome.jsx` & `CustomerHome.css`: Inspected for customer shell patterns, card styling, and typography.
- `src/pages/customer/CustomerExplore.jsx` & `CustomerBookings.jsx`: Inspected for customer layout standards and navigation targets.
- `src/pages/customer/CustomerMessages.jsx` & `CustomerMessages.css`: Inspected for chat and subpage structures.
- `src/pages/worker/WorkerProfile.jsx` & `WorkerProfile.css`: Inspected for profile card layouts, logout handling, and drawer/menu patterns.
- `src/components/AppHeader.jsx`: Inspected for role="customer" prop handling, menu button, notification button, and logo click behavior.
- `src/components/BottomNavigation.jsx`: Inspected for customer tab array, active tab matching logic, and styling.
- `src/components/HireMeIcon.jsx`: Inspected for existing icon definitions and standard artwork registry.
- `src/components/ProtectedRoute.jsx`: Inspected for role-based route guarding.
- `src/utils/auth.js`: Inspected for session reading and `logout(navigate)` function.

## 3. New Customer Profile Route
- Route: `/customer/profile`
- Handled by: `src/pages/customer/CustomerProfile.jsx`
- Protected by: `<ProtectedRoute requiredRole="customer">` in `src/App.jsx`.

## 4. Components Created
- `src/pages/customer/CustomerProfile.jsx`: Main React component for the Customer Profile screen.
- `src/pages/customer/CustomerProfile.css`: Route-scoped styles using `:where(.customer-profile)` for clean styling without side effects.

## 5. Components Reused
- `AppShell`: Provides viewport shell, center alignment on larger displays, and layout wrapper.
- `AppHeader`: Shared top navigation bar configured with `role="customer"`.
- `BottomNavigation`: Shared 5-tab navigation bar configured with `role="customer"`.
- `HireMeIcon`: Shared unified icon registry for all concepts throughout the application.
- `Toast`: Shared non-intrusive feedback toast system.
- `ProtectedRoute`: Role-based route guard.

## 6. Header Implementation
- Reuses `AppHeader` with `role="customer"`.
- Displays hamburger menu button on left (triggers standard toast feedback).
- Centered logo: "HireMe / Work. Earn. Grow." (clicking scrolls smoothly to top).
- Notification bell with unread indicator dot on right.
- Profile link with online status indicator dot on right.

## 7. Profile Summary Card
- Recreates the glassmorphism card from the reference:
  - Left avatar squircle with outlined user icon.
  - "Welcome back," greeting in muted text.
  - "Dilani Perera" heading in bold navy typography.
  - Metadata rows:
    - Email row with envelope icon and `dilani.perera@email.com`.
    - Phone row with telephone icon and `+94 77 123 4567`.
    - Account Type row with user icon, "Account Type" label, and "Customer" pill badge.
  - Description text: "Find trusted professionals for your needs."
  - "Edit Profile" pill button in the top right corner with pencil icon.

## 8. Profile Option Cards
8 distinct cards displayed in a vertical list, matching the reference:
1. **Personal Information**: Outlined user icon, "Update your name, contact details, etc."
2. **Saved Addresses**: Location pin icon, "Manage your saved locations"
3. **Payment Methods**: Credit card icon, "Manage your cards and payments"
4. **Favorites**: Heart icon, "Your saved workers and services"
5. **Notifications**: Notification bell icon, "Manage your notification preferences"
6. **Privacy & Security**: Shield icon, "Manage your account security"
7. **Help & Support**: Question circle icon, "Get help or contact support"
8. **Log Out**: Exit arrow icon in red/pink container, "Sign out from your account"

Each card includes a right chevron `›` aligned to the end.

## 9. Icon Implementation
In strict compliance with the project rule (`ONE ITEM / ONE MEANING = ONE ICON`):
- All icons originate from `src/components/HireMeIcon.jsx`.
- Added standard outlined icons to the shared registry:
  - `edit`: Pencil artwork matching WorkerProfile
  - `address`: Standard map pin
  - `payment`: Credit card outline
  - `favorites`: Heart outline
  - `privacy`: Shield outline
  - `help`: Question circle outline
  - `logout-arrow`: Exit door arrow
  - `user`: Outlined head and shoulders
  - `mail`: Outlined envelope
  - `crown`: Filled crown artwork
- Existing icons reused: `notifications`, `call`, `chevron`, `home`, `explore`, `bookings`, `messages`, `profile`.

## 10. Edit Profile Behavior
- The "Edit Profile" button is interactive.
- When clicked, it displays an accessible toast message: `"Profile editing will be available soon."`.

## 11. Logout Behavior
- Clicking the "Log Out" option calls the centralized `logout(navigate)` function from `src/utils/auth.js`.
- Clears `hireme_session` from `sessionStorage`.
- Safely redirects the user to `/login` via React Router's `navigate("/login", { replace: true })`.

## 12. Promotional Booking Card
- Located at the bottom of the profile options list.
- Features a vibrant blue container with a white crown icon.
- Copy: "Need a service again?" / "Rebook your past services in just one tap."
- "View Bookings ›" button navigates directly to `/customer/bookings` via React Router.

## 13. Bottom Navigation
- Uses `<BottomNavigation role="customer" />`.
- Contains 5 tabs: Home (`/customer/home`), Explore (`/customer/explore`), My Bookings (`/customer/bookings`), Messages (`/customer/messages`), Profile (`/customer/profile`).

## 14. Active Profile State
- When viewing `/customer/profile`, the `BottomNavigation` component detects the matching path.
- The "Profile" item is marked active (`.nav-tab-link.active`, `aria-current="page"`).
- Uses primary blue color and bold weight matching Customer Home and My Bookings.

## 15. Authentication Protection
- Route `/customer/profile` is wrapped in `<ProtectedRoute requiredRole="customer">`.
- Unauthenticated visitors are redirected to `/login`.
- Authenticated workers attempting to access `/customer/profile` are denied and redirected to their respective dashboard (`/worker/home`).

## 16. Responsive Behavior
- Tested across breakpoints: 320px, 360px, 375px, 390px, 414px, 768px, 1024px+.
- On mobile devices, cards take natural fluid width with 14-18px horizontal padding.
- Small screens (≤360px) gracefully wrap the rebooking promo card and reduce avatar sizing to prevent overflow.
- Tablet and desktop display a centered mobile-app shell (440px max-width) with soft gradient framing.

## 17. Safe-Area Behavior
- Uses CSS `env(safe-area-inset-top)` for top header padding.
- Uses CSS `env(safe-area-inset-bottom)` for bottom navigation height and content padding.
- Prevents overlap with mobile browser gesture bars, camera notches, and dynamic islands.

## 18. Files Created / Modified
- Modified: `src/components/HireMeIcon.jsx` (added shared icons)
- Created: `src/pages/customer/CustomerProfile.css` (page styles)
- Replaced stub: `src/pages/customer/CustomerProfile.jsx` (page component)
- Created: `docs/customer-profile-migration.md` (this documentation)

## 19. Features Intentionally Left as Demo/Toast
- Personal Information, Saved Addresses, Payment Methods, Favorites, Notifications, Privacy & Security, Help & Support: Display `"This feature will be available soon."`.
- Edit Profile: Displays `"Profile editing will be available soon."`.
- Hamburger menu: Displays `"Navigation menu is not available yet."`.
- Notification click: Displays `"You have 1 new notification."`.

## 20. Testing Performed
- `npm.cmd run lint` (oxlint): 0 warnings, 0 errors on 34 files.
- `npm.cmd run build` (vite build): 72 modules transformed, built in 900ms without errors.
- Navigation testing verified:
  - Customer Home (`/customer/home`) -> Home active
  - Customer Explore (`/customer/explore`) -> Explore active
  - Customer Bookings (`/customer/bookings`) -> My Bookings active
  - Customer Messages (`/customer/messages`) -> Messages active
  - Customer Profile (`/customer/profile`) -> Profile active
- Worker pages unaffected and build cleanly.

## 21. Known Limitations
- Profile details (name, email, phone) are currently static/demo data as backend APIs are not part of this frontend scope.
- Sub-pages (like address management or payment card inputs) will be connected when their respective screens are developed.

## 22. Final Status
Complete. Visual reproduction matches the reference screenshot, follows all design rules, reuses shared components, and passes all linting and build checks.

