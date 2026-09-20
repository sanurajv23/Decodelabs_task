# Global HireMe design rule: one meaning, one standard icon

- Worker UI is the source of truth for icon artwork. Before changing a Customer icon, inspect its corresponding Worker page and reuse the exact artwork through `HireMeIcon`.
- Explicit conflict resolution (2026-09-20): preserve Worker appearance and copy each corresponding page's current mapping. Do not silently correct unusual Worker service assignments or unify conflicting Worker variants by redesigning them. Worker Jobs currently uses the same drop artwork for Electrical and Plumbing and a lightning polygon for Cleaning; Customer service icons follow these mappings.
- `HireMeIconArtwork` is the shared artwork export for legacy SVG shells. Use it to deduplicate exact paths while preserving existing Worker shell dimensions, stroke, fill, colors and classes. New Customer controls use `HireMeIcon` with shared size and semantic color options.

- HireMe is one application. Every function, action, or concept must have one standard icon throughout the application; do not treat pages as independent icon systems.
- This applies to Customer, Worker, registration, and login pages; headers, navigation, cards, buttons, forms, modals, toasts, empty states; and all future pages and components.
- For the same meaning, Customer and Worker must use the same icon source, shape, stroke/fill style, visual weight, size conventions, and appearance. Do not create separate role-specific versions of a shared concept.
- Reuse `src/components/HireMeIcon.jsx` and its shared CSS. Do not make role-specific versions or override shared icon dimensions, stroke, fill, or filters in page styles.
- Home, Messages, and Profile use the existing Worker Home SVG artwork. Notifications, menu, and search also have shared implementations.
- Role-specific Explore, My Bookings, Jobs, and Earnings retain their existing artwork in the shared component.
- Before adding an icon, check the shared component, other React pages, and the original HireMe project. Extract and reuse an existing icon when available.
- An existing icon representing a concept is its standard. If legacy pages contain conflicting variants, use the already standardized shared icon; do not choose another variant because it looks better. If no standard has been established, resolve the conflict before adding another variant.
- Use a shared React icon/component for repeated concepts so every use has the same source. Extend the shared icon registry with existing project artwork when a needed concept is not registered yet.
- Apply this to every concept, including Home, Profile, Messages, Search, Notifications, Settings, Back, Calendar, Location, Edit, Delete, Add, Jobs, Earnings, Bookings, and Explore. Distinct meanings may use distinct icons; the same meaning must not.
- Do not change an established standard without a strong project-wide reason. Any approved standard change must be applied consistently across its uses.
- Do not install icon libraries, replace existing icons with emojis, or invent another icon for an existing function.
- Follow this rule before implementing any future UI. Do not create missing pages just to add icons.
