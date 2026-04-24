import { createContext, useContext, useEffect, useState } from "react";

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

    // 🔥 MAIN FETCH FUNCTION
    const fetchMeals = async (query = "") => {
        const cleanQuery = query.trim();
        setIsLoading(true);
        setError("");

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

                    // fetch full details (optional but you chose this approach)
                    // const results = await Promise.allSettled(
                    //     baseMeals.map(async (recipe) => {
                    //         const res = await fetch(
                    //             `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
                    //         );
                    //         const data = await res.json();
                    //         return data.meals[0];
                    //     })
                    // );

                    // meals = results
                    //     .filter(r => r.status === "fulfilled")
                    //     .map(r => r.value);



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
    };

    // 🔥 FILTER LOGIC
    useEffect(() => {
        let filtered = allFetchedMeals;

        if (inputQuery.trim() && activeCuisine) {
            filtered = allFetchedMeals.filter(
                (meal) => meal.strArea === activeCuisine
            );
        }

        setDisplayedMeals(filtered);
    }, [allFetchedMeals, activeCuisine, inputQuery]);

    // 🔥 CATEGORY CHANGE → FETCH
    useEffect(() => {
        if (!inputQuery.trim()) {
            fetchMeals("");
        }
    }, [activeCategory]);

    // 🔥 INITIAL LOAD
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

            fetchMeals("");
        };

        init();
    }, []);

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
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };