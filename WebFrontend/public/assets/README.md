# Standalone Static Screens

These are static, standalone HTML pages built from extracted design references. They do not use React routing and can be opened directly.

Paths (from the running WebFrontend dev server):
- Sign In: /assets/sign-in.html
- Home: /assets/home.html
- Search: /assets/search.html

Notes:
- All pages include a shared stylesheet (common.css) and their screen-specific stylesheet.
- JavaScript interactivity is in app.js:
  - Sign In: clicking the Sign In button logs the form values and navigates to home.html.
  - Home: category chips and recipe cards have click handlers that log selections.
  - Search: typing into the search input filters the mock grid (debounced), the filter button toggles a simple filter panel, and the back button navigates to home.html.
- These are design-faithful static pages intended as a visual reference and simple demo.
