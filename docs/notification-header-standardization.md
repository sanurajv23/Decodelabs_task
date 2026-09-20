# Notification header standardization

## Change

The existing `AppHeader` now renders one shared `NotificationButton`. Its white/glass circular surface, subtle blue shadow, navy outline bell, and small red badge follow the supplied reference. The bell artwork remains the existing Worker-derived `HireMeIcon` notifications artwork; no icon library or dependency was added.

Page-specific notification button, icon, hover, and badge rules were removed from all ten dashboard stylesheets. Combined selectors retain their existing profile/back-button declarations. The old Customer `<i>` indicator and Worker CSS pseudo-element indicators are replaced by one badge span.

## Files

- Modified `src/components/AppHeader.jsx`.
- Created `src/components/NotificationButton.jsx` and `NotificationButton.css`.
- Updated Customer stylesheets: `CustomerHome.css`, `CustomerExplore.css`, `CustomerBookings.css`, `CustomerMessages.css`, `CustomerProfile.css`.
- Updated Worker stylesheets: `WorkerHome.css`, `WorkerJobs.css`, `WorkerEarnings.css`, `WorkerMessages.css`, `WorkerProfile.css`.
- Created this document.

Existing page JSX callers inherit the shared control without individual edits. Existing unrelated working-tree changes were preserved.

## Dimensions and appearance

- Button: 36 × 36 CSS pixels, border-box, non-shrinking flex item, 50% radius, 1px translucent white border.
- Surface: white to pale blue translucent gradient; `3px 4px 10px` blue-tinted shadow and an inset white highlight.
- Bell: `HireMeIcon name="notifications" size="action"`, 22 × 22 pixels, existing `#394b88` color, 2-unit stroke, round caps/joins. Dimensions are controlled by the shared icon system, not page CSS.
- Badge: 11 × 11 pixels including its 2px white border, circular, `#ff424c`, absolute `top: -1px; right: -1px`. It slightly overlaps the button edge and cannot intercept clicks.
- Hover uses a pale white/blue surface. Keyboard focus has a visible navy outline. No scaling or zoom is used.

## Behavior and responsive rules

The component forwards the existing notification click handler and accessible label and retains `notificationBtn`. Every existing header already displayed a static unread dot; there was no dynamic badge count/state. That static indicator remains, with existing toast text and interactions unchanged. No notification panel, count, or clearing behavior was introduced.

The same compact dimensions apply on mobile, tablet, and desktop because the existing app remains within its centered mobile shell. Header containers, safe-area padding, logo, menu/back controls, profile controls, and bottom navigation retain their existing styles. One necessary adjustment reduces Worker chat's notification/profile gap from 14px to 6px at widths up to 360px, preventing an overlap with the centered logo at 320px without resizing either control or the logo.

## Coverage and validation

All ten header routes use the shared component:

| Customer | Worker |
| --- | --- |
| `/customer/home` | `/worker/home` |
| `/customer/explore` | `/worker/jobs` |
| `/customer/bookings` | `/worker/earnings` |
| `/customer/messages` (inbox and conversation) | `/worker/messages` (inbox and conversation) |
| `/customer/profile` | `/worker/profile` |

Login and all Customer/Worker registration source files were audited: they use registration/auth headers with no notification control, so no new button or page was added.

Browser verification uses the existing local Playwright/Chromium installation because the browser plugin reported no connected browser. Checks cover 320px and 390px mobile widths and 1440px desktop: 36 page/view combinations. They measure button, icon, and badge dimensions, detect duplicate badges/pseudo-elements, check logo/profile/menu overlap and viewport overflow, exercise notification handlers and profile links, and capture screenshots for visual inspection. Bottom Home navigation, menu opening/Escape dismissal, and logo interaction are also exercised.

Required commands: `npm.cmd run lint` and `npm.cmd run build`.

## Consistency rule

One item / one meaning = one icon. Every application header must use `AppHeader` and its `NotificationButton`; all notification bells use the existing `HireMeIcon` artwork. Do not add page-specific notification sizes, artwork, colors, or badge pseudo-elements. Shared visual changes belong in `NotificationButton.css`; icon sizing and artwork remain owned by `HireMeIcon`.
