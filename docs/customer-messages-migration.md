# Customer Messages Page — Creation Documentation

## 1. Overview

The Customer Messages page is a new chat interface created for the HireMe React project at the route `/customer/messages`. It provides a direct 1-on-1 chat view between a customer and a service provider (worker), closely matching the provided reference screenshot.

## 2. Source of Truth

A reference screenshot was provided as the visual source of truth. The screenshot depicts a chat conversation between a customer and "Suneth Electrical" worker, including: app header with back button, worker header with service icon, booking information card, chat message thread, message composer, and customer bottom navigation.

## 3. Route

| Route | Component | Protected |
|---|---|---|
| `/customer/messages` | `CustomerMessages` | Yes — `<ProtectedRoute requiredRole="customer">` |

The route was already configured in `src/App.jsx` (lines 86-91) and did not require modification.

## 4. Files Created

| File | Purpose |
|---|---|
| `src/pages/customer/CustomerMessages.jsx` | Full chat page component |
| `src/pages/customer/CustomerMessages.css` | Scoped styles under `:where(.customer-messages)` |
| `docs/customer-messages-migration.md` | This documentation |

## 5. Files NOT Modified

- `src/App.jsx` — Route already existed
- `src/components/AppHeader.jsx` — Used as-is with `role="customer"` and `onBackClick`
- `src/components/BottomNavigation.jsx` — Used as-is with `role="customer"`
- `src/components/HireMeIcon.jsx` — Used existing icons: `back`, `notifications`, `profile`, `home`, `messages`, `explore`, `bookings`, `calendar`, `electrical`
- `src/components/AppShell.jsx` — Used as-is
- `src/components/Toast.jsx` — Used as-is

## 6. Component Structure

The `CustomerMessages` component renders a single chat view (no conversation list) consisting of:

1. **AppHeader** — Back button (←), centered HireMe logo, notification bell, profile avatar
2. **Worker Header** — Lightning bolt electrical glyph in avatar circle, "Suneth Electrical" name, green "Online now" status, "Electrical Repair" subtitle, phone call and more options buttons
3. **Booking Info Card** — Calendar icon, "Upcoming Booking" label, date/time, location, "Confirmed" badge, "View Details" link
4. **Chat Thread** — "Today" date divider, incoming (light) and outgoing (blue gradient) message bubbles with timestamps and read receipts
5. **Message Composer** — Plus (+) attachment button, text input with emoji button, blue send button
6. **BottomNavigation** — Home, Explore, My Bookings, Messages (active), Profile

## 7. Demo Conversation

Pre-populated messages match the reference screenshot exactly:

| # | Type | Text | Time |
|---|---|---|---|
| 1 | Incoming | "Hi! Thank you for booking an electrical repair service. How can I help you?" | 10:24 AM |
| 2 | Outgoing | "Hi, I have an issue with a power outlet in my living room. It's not working. Can you check and fix it?" | 10:26 AM |
| 3 | Incoming | "Sure! I can fix that. Is it just one outlet or multiple outlets?" | 10:28 AM |
| 4 | Outgoing | "Just one outlet. Also, can you bring a new outlet if needed?" | 10:30 AM |
| 5 | Incoming | "Yes, I will bring the required materials. See you at 12:00 PM tomorrow." | 10:32 AM |
| 6 | Outgoing | "Great! Thank you! 🤩" | 10:33 AM |
| 7 | Incoming | "You're welcome! If you have any other questions, feel free to message me." | 10:34 AM |

## 8. Send Message Functionality

Frontend-only message sending:
- User types in the composer input
- Pressing Enter or clicking the send button appends a new outgoing message
- New messages include the current time and ✓✓ read receipt
- Chat thread auto-scrolls to the bottom after sending

## 9. Icon Usage (AGENTS.md Compliance)

All icons comply with the global "one meaning, one icon" rule:

| Concept | Source | Implementation |
|---|---|---|
| Back | `HireMeIcon` `back` | Via AppHeader `onBackClick` prop |
| Notifications | `HireMeIcon` `notifications` | Via AppHeader |
| Profile | `HireMeIcon` `profile` | Via AppHeader |
| Home | `HireMeIcon` `home` | Via BottomNavigation |
| Messages | `HireMeIcon` `messages` | Via BottomNavigation |
| Explore | `HireMeIcon` `explore` | Via BottomNavigation |
| Bookings | `HireMeIcon` `bookings` | Via BottomNavigation |
| Calendar | `HireMeIcon` `calendar` | Booking info card icon |
| Electrical service | `HireMeIcon` `electrical` glyph (ϟ) | Worker avatar |
| Phone call | Inline SVG (same as WorkerMessages) | Call button in worker header |
| More options | Inline SVG (3 circles, same as WorkerMessages) | More options button |
| Attachment (+) | Inline SVG (plus cross) | Composer attachment button |
| Emoji | Inline SVG (smiley face, same as WorkerMessages) | Composer emoji button |
| Send | Inline SVG (paper plane, same as WorkerMessages) | Composer send button |

## 10. CSS Architecture

- All styles scoped under `:where(.customer-messages)` to prevent global CSS leakage
- Design system variables match the project standard (colors, radii, shadows, fonts)
- Glassmorphism/neumorphic visual style consistent with worker pages

## 11. Design Differences from Worker Chat

| Feature | Worker Chat | Customer Chat |
|---|---|---|
| Incoming message avatars | Shows initials (e.g., "AP") | No avatars (per screenshot) |
| Header actions | Phone, Video, More | Phone, More (no video per screenshot) |
| Booking card icon | Wrench/tools SVG | Calendar icon (HireMeIcon `calendar`) |
| Booking card label | Service name (e.g., "AC Repair") | "Upcoming Booking" |
| Booking card link | Chevron (›) | "View Details ›" |
| Conversation list | Yes (list + chat views) | No (direct chat view only) |
| Bottom navigation | Worker tabs | Customer tabs |

## 12. Responsive Behavior

- **Mobile (≤360px)**: Reduced padding, smaller avatar/buttons, tighter spacing
- **Mobile (≤1023px)**: Full-width layout, fixed bottom nav
- **Tablet (768-1023px)**: Centered shell with max-width 440px, rounded corners
- **Desktop (≥1024px)**: Centered 440px shell with 900px height, gradient background, rounded corners with shadow

## 13. Safe Area Handling

All safe area insets handled via CSS custom properties:
- `env(safe-area-inset-top)` — Header padding
- `env(safe-area-inset-bottom)` — Bottom nav height
- `env(safe-area-inset-left/right)` — Content horizontal padding

## 14. Toast Messages

| Action | Toast Message |
|---|---|
| Back button | "Back navigation will be available soon." |
| Notification bell | "You have 1 new notification." |
| Phone call button | "Phone call will be available soon." |
| More options button | "More options will be available soon." |
| Attachment button | "Attachments will be available soon." |
| View Details link | "Booking details will be available soon." |

## 15. Accessibility

- `aria-label` on all interactive elements
- `aria-live="polite"` on chat thread for screen reader announcements
- Keyboard-accessible composer (Enter to send)
- Focus-visible outlines on all interactive elements
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<form>`, `<time>`

## 16. Shared Component Usage Pattern

```jsx
<AppHeader
  role="customer"
  onBackClick={handler}       // Shows back arrow instead of menu
  onLogoClick={scrollToTop}
  onNotificationClick={handler}
/>
<BottomNavigation role="customer" onActiveTabClick={scrollToTop} />
```

## 17. State Management

| State | Type | Purpose |
|---|---|---|
| `messages` | `Array` | Chat message list (demo + user-sent) |
| `chatInput` | `String` | Current composer input value |
| `toast` | `String` | Active toast message (empty = hidden) |

## 18. Lifecycle Effects

1. **Title/viewport** — Sets document title to "HireMe — Messages" and viewport meta; restores on unmount
2. **Initial scroll** — Scrolls chat thread to bottom on mount

## 19. Lint & Build Results

```
oxlint: 0 warnings, 0 errors (34 files, 104 rules)
vite build: 71 modules, 1.01s, success
```

## 20. Future Enhancements

- Conversation list view (multiple chats)
- Real-time messaging via WebSocket/API
- Back navigation to conversation list
- File/image attachments
- Typing indicators
- Message status (sent/delivered/read)
- Push notifications integration

