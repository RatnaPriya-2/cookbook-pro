import { createContext, useContext, useEffect, useState, useRef } from "react";

let AppContext = createContext();


const AppProvider = ({ children }) => {
    const [allFetchedMeals, setAllFetchedMeals] = useState([]);
    const [displayedMeals, setDisplayedMeals] = useState([]);
    const [inputQuery, setInputQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("");
    const [activeCuisine, setActiveCuisine] = useState("");
    
    // Using useRef for lastQuery instead of useState to prevent unnecessary re-renders. 
    const lastQuery = useRef(null);

    const fetchMeals = async (query = "") => {
        const cleanQuery = query.trim();

        // Guard Clause: Only fetch if query has changed
        if (cleanQuery === lastQuery.current && allFetchedMeals.length > 0) return;
        
        lastQuery.current = cleanQuery;
        setIsLoading(true);
        setError("");
        
        // When we start a new search, clear active filters to keep things fresh
        setActiveCategory("");
        setActiveCuisine("");

        try {
            if (!cleanQuery) {
                // Initial Load or Empty Search
                const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
                const response = await fetch(url);
                const data = await response.json();
                setAllFetchedMeals(data.meals || []);
            } else {
                // Targeted Search (Name, Ingredient, Area)
                const urls = [
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${cleanQuery}`,
                    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${cleanQuery}`,
                    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cleanQuery}`
                ];

                const responses = await Promise.allSettled(
                    urls.map((url) => fetch(url).then((res) => res.json()))
                );

                let combinedMeals = [];
                responses.forEach((res) => {
                    if (res.status === "fulfilled" && res.value.meals) {
                        combinedMeals = [...combinedMeals, ...res.value.meals];
                    }
                });

                const uniqueMealsMap = new Map();
                combinedMeals.forEach((meal) => {
                    if (!uniqueMealsMap.has(meal.idMeal)) {
                        uniqueMealsMap.set(meal.idMeal, meal);
                    }
                });

                setAllFetchedMeals(Array.from(uniqueMealsMap.values()));
            }
        } catch (err) {
            setError("Failed to fetch recipes. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    // --- Elite Hybrid & Smart Filtering Logic ---
    useEffect(() => {
        let filtered = [...allFetchedMeals];

        // 1. If searching, we filter by Cuisine (strArea)
        if (inputQuery.trim() && activeCuisine) {
            filtered = filtered.filter(meal => meal.strArea === activeCuisine);
        } 
        // 2. If browsing, we filter by Category (strCategory)
        else if (!inputQuery.trim() && activeCategory) {
            filtered = filtered.filter(meal => meal.strCategory === activeCategory);
        }

        setDisplayedMeals(filtered);
    }, [allFetchedMeals, activeCategory, activeCuisine, inputQuery]);

    // Initial load: Only fetch if we don't have meals and the query is empty
    useEffect(() => {
        const initLoad = async () => {
            // Fetch categories for the filter chips
            try {
                const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
                const data = await res.json();
                if (data.meals) setCategories(data.meals.map(m => m.strCategory));
            } catch (err) {
                console.error("Failed to load categories");
            }
            
            if (allFetchedMeals.length === 0 && !inputQuery) {
                fetchMeals();
            }
        };
        initLoad();
    }, []);

    return (
        <AppContext.Provider value={{ 
            displayedMeals, 
            setDisplayedMeals, 
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
            allFetchedMeals
        }}>
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useGlobalContext }
