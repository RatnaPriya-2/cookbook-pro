import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import About from "./components/About";
import Hero from "./components/Hero";
import Recipes from "./components/Recipes";
import Favorites from "./components/Favorites";
import RecipeDetails from "./components/RecipeDetails";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />, // Use App as the wrapper
      children: [
        {
          path: "/", // Home Page
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
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
