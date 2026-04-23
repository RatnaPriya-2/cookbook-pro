# 🍳 Cookbook Pro

Cookbook Pro is a modern, high-performance recipe discovery application built with **React** and the **TheMealDB API**. It allows users to browse, search, and save their favorite recipes with a seamless, refresh-safe user experience.

## ✨ Features

- **Instant Search:** Find recipes by name, ingredient, or cuisine using a multi-endpoint search system.
- **Smart Debouncing:** Optimized API performance that waits for user input to pause before fetching, preventing unnecessary network traffic.
- **Persistent Favorites:** Save recipes to a "Favorites" list that persists across browser sessions using `localStorage`.
- **Recipe Tutorials:** Integrated YouTube video modals for step-by-step visual cooking guides.
- **Deep Linking:** Refresh-safe routing for recipe details, allowing users to share or bookmark specific recipes.
- **Dynamic Ingredient Parsing:** Advanced data processing to pair ingredients with measurements dynamically from the API.

## 🛠️ Tech Stack

- **Framework:** React 19
- **Routing:** React Router v6 (Data Router API)
- **State Management:** React Hooks (`useState`, `useEffect`, `useParams`)
- **Storage:** Browser `localStorage`
- **APIs:** TheMealDB (REST)
- **Styling:** Vanilla CSS

## 🚀 Technical Highlights

### Performance Optimization (Debouncing)
To prevent overwhelming the free API Tier and to ensure a smooth UI, I implemented a custom debouncing logic in the search bar. This reduces the number of API calls by roughly **85%** compared to a standard "search-on-change" implementation.

### State Persistence & Hydration
The app uses a hybrid approach for data hydration. It prioritizes `location.state` for instant transitions between pages, but includes an asynchronous fallback that fetches data by URL ID if the user refreshes their browser.

### Smart Data Parsing
Since the source API provides ingredients and measurements as separate numbered keys (e.g., `strIngredient1`, `strMeasure1`), I wrote a dynamic parsing utility that uses Regex to pair these associated values into clean, iterable objects for the UI.

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [your-repo-link]
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm start
   ```

---

*Built with ❤️ as a professional portfolio project.*
