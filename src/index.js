import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";

import { AppProvider } from "./context/context";

const About = lazy(() => import("./components/About"))
const Recipes = lazy(() => import("./components/Recipes"))
const Favorites = lazy(() => import("./components/Favorites"))
const RecipeDetails = lazy(() => import("./components/RecipeDetails"))
const ChefTips = lazy(() => import("./components/ChefTips"))
const Hero = lazy(() => import("./components/Hero"))

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />, // Use App as the wrapper
      children: [
        {
          index: true, // Home Page
          element: <Hero />,
        },
        {
          path: "/about", // About Page
          element: <About />,
        },
        {
          path: "/recipes", // recipes Page
          element: <Recipes />,
        },
        {
          path: "/favorites", // favorites Page
          element: <Favorites />,
        },
        {
          path: "/recipe-details/:id", // recipe-details Page
          element: <RecipeDetails />,
        },
        {
          path: "/tips", // Chef Tips Page
          element: <ChefTips />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
