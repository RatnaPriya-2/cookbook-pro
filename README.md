# 🍳 Cookbook Pro

A premium, high-performance React recipe discovery app powered by **TheMealDB API**. Built with a focus on elite UX, clean architecture, and production-ready code quality.

---

## ✨ Features

- **Hybrid Filtering** — Combine free-text search with category/cuisine chips simultaneously, with zero additional network requests
- **Smart Contextual Chips** — The filter bar dynamically switches between **Category** chips (browse mode) and **Cuisine** chips extracted from live search results (search mode)
- **Skeleton Loading** — Professional pulsing placeholder cards that eliminate layout shifts during all async operations
- **Favorites** — Heart any recipe; favorites persist across sessions via `localStorage` and stay perfectly in sync across all pages through global Context state
- **Recipe Details** — Full ingredient list, step-by-step instructions, and an in-app YouTube video player per recipe
- **Chef's Pro Tips** — Curated culinary knowledge page built with **Lucide React** icons
- **Video Modal** — In-app YouTube player with header/footer chrome; native YouTube controls are never obscured

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 |
| State | Context API + `useCallback` memoization |
| Routing | React Router v6 (lazy-loaded routes + `Suspense`) |
| Icons | Lucide React + FontAwesome 6 |
| Styling | Vanilla CSS with design tokens (CSS custom properties) |
| Data | [TheMealDB API](https://www.themealdb.com/api.php) (free, no key required) |

---

## 🚀 Technical Highlights

### 1. Global Favorites — Single Source of Truth
Favorites state lives in the Context layer (`AppProvider`), not in component-level state. This eliminates the desync bug where `Recipes` and `Favorites` pages could display conflicting data. `localStorage` is hydrated lazily on init and updated atomically through a `toggleFavorite` action.

### 2. Hybrid Filtering Engine
The app fetches once per search query using three concurrent API calls via `Promise.allSettled` (by name, by ingredient, by area), deduplicates results by `idMeal`, and stores the full result set in `allFetchedMeals`. Client-side cuisine filtering then runs at zero network cost.

### 3. Progressive Data Hydration
`RecipeDetails` first checks `location.state` for data passed during navigation (near-instant display). If the data is partial (e.g., from a category browse result missing `strInstructions`), it transparently fetches the full record via the lookup API in the background.

### 4. Lazy Loading + Prefetch
All routes are code-split using `React.lazy`. `RecipeCard` fires a background `import("./RecipeDetails")` on mouse hover, so by the time the user clicks, the bundle is already cached and `Suspense` never fires.

### 5. Stale-Free Effects
`fetchMeals` is memoized with `useCallback`, making it safe to include in `useEffect` dependency arrays without causing infinite re-render loops. The debounced search effect is guarded to only fire on active search queries, preventing redundant fetches on mount.

---

## 📦 Quick Start

```bash
git clone [your-repo-link]
npm install
npm start
```

No environment variables or API keys required.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx          # Landing page
│   ├── Nav.jsx           # Sticky navbar with NavLink active states
│   ├── Recipes.jsx       # Main browse/search page
│   ├── RecipeCard.jsx    # Card with favorite toggle + video player
│   ├── RecipeDetails.jsx # Full recipe detail view
│   ├── Favorites.jsx     # Saved recipes page
│   ├── ChefTips.jsx      # Culinary tips content page
│   └── WatchVideo.jsx    # YouTube video modal
├── context/
│   └── context.js        # Global state (meals, filters, favorites)
├── App.js                # Root layout with Suspense boundary
└── index.js              # Router and lazy route definitions
```

---

*Built as a professional portfolio project demonstrating real-world React patterns: Context API, code splitting, memoization, debouncing, and localStorage persistence.*
