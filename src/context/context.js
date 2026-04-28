import { createContext, useCallback, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [allFetchedMeals, setAllFetchedMeals] = useState([]);
    const [displayedMeals, setDisplayedMeals] = useState([]);

    const [inputQuery, setInputQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeCuisine, setActiveCuisine] = useState("");

    // 🔥 FAVORITES — single source of truth
    const [favorites, setFavorites] = useState(
        () => JSON.parse(localStorage.getItem("favoriteToLs")) || []
    );

    const toggleFavorite = useCallback((recipe) => {
        setFavorites((prev) => {
            const isFav = prev.some((f) => f.idMeal === recipe.idMeal);
            const updated = isFav
                ? prev.filter((f) => f.idMeal !== recipe.idMeal)
                : [...prev, recipe];
            localStorage.setItem("favoriteToLs", JSON.stringify(updated));
            return updated;
        });
    }, []);

    const isFavorite = useCallback(
        (recipe) => favorites.some((f) => f.idMeal === recipe.idMeal),
        [favorites]
    );

    // 🔥 MAIN FETCH FUNCTION — memoized to avoid stale closures
    const fetchMeals = useCallback(async (query = "") => {
        const cleanQuery = query.trim();
        setIsLoading(true);
        setError("");
        setDisplayedMeals([]); // immediately clear stale cards to prevent flash

        try {
            let meals = [];

            // 🟢 BROWSING MODE (no search)
            if (!cleanQuery) {
                if (activeCategory === "All") {
                    const res = await fetch(
                        "https://www.themealdb.com/api/json/v1/1/search.php?s="
                    );
                    const data = await res.json();
                    meals = data.meals || [];
                } else {
                    const res = await fetch(
                        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`
                    );
                    const data = await res.json();
                    meals = data.meals || [];
                }
            }

            // 🔵 SEARCH MODE
            else {
                const urls = [
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${cleanQuery}`,
                    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${cleanQuery}`,
                    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cleanQuery}`,
                ];

                const responses = await Promise.allSettled(
                    urls.map((url) => fetch(url).then((res) => res.json()))
                );

                let combined = [];
                responses.forEach((res) => {
                    if (res.status === "fulfilled" && res.value.meals) {
                        combined.push(...res.value.meals);
                    }
                });

                // remove duplicates
                meals = Array.from(
                    new Map(combined.map((m) => [m.idMeal, m])).values()
                );
            }

            setAllFetchedMeals(meals);
        } catch {
            setError("Failed to fetch recipes.");
        } finally {
            setIsLoading(false);
        }
    }, [activeCategory]); // activeCategory is a real dependency here

    // 🔥 FILTER LOGIC — fixed: cuisine filter works independently of search
    useEffect(() => {
        let filtered = allFetchedMeals;

        if (activeCuisine) {
            filtered = allFetchedMeals.filter(
                (meal) => meal.strArea === activeCuisine
            );
        }

        setDisplayedMeals(filtered);
    }, [allFetchedMeals, activeCuisine]);

    // 🔥 CATEGORY CHANGE → FETCH — fixed: correct deps
    useEffect(() => {
        if (!inputQuery.trim()) {
            fetchMeals("");
        }
    }, [activeCategory, fetchMeals, inputQuery]);

    // 🔥 INITIAL LOAD — only fetches category list
    // (The category-change effect below handles the initial meal fetch)
    useEffect(() => {
        const init = async () => {
            try {
                const res = await fetch(
                    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
                );
                const data = await res.json();

                if (data.meals) {
                    setCategories([...data.meals.map((m) => m.strCategory)]);
                }
            } catch {
                console.error("Failed to load categories");
            }
        };

        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // intentionally run only on mount

    return (
        <AppContext.Provider
            value={{
                displayedMeals,
                inputQuery,
                setInputQuery,
                isLoading,
                error,
                fetchMeals,

                categories,
                activeCategory,
                setActiveCategory,

                activeCuisine,
                setActiveCuisine,

                allFetchedMeals,

                // favorites
                favorites,
                toggleFavorite,
                isFavorite,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };