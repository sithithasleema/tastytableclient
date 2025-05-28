import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/clerk-react";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";

import { createBrowserRouter, RouterProvider } from "react-router";

// import Homepage from "./routes/Homepage.jsx";
import RecipeList from "./routes/RecipeList.jsx";
import RecipeDetails from "./routes/RecipeDetails.jsx";
import Loginpage from "./routes/Loginpage.jsx";
import Register from "./routes/Register.jsx";
import NewRecipe from "./routes/NewRecipe.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { dark } from "@clerk/themes";
import LandingPage from "./routes/LandingPage.jsx";
import Homepage from "./routes/Homepage.jsx";

// Create a client
const queryClient = new QueryClient();

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: <Homepage />,
      },
      {
        path: "/recipes",
        element: <RecipeList />,
      },
      {
        path: "/recipes/:slug",
        element: <RecipeDetails />,
      },

      {
        path: "/login",
        element: <Loginpage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/new",
        element: <NewRecipe />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: dark,
        variables: {
          // cardWidth: "1000px",
          // cardHeight: "600px",
          // fontSize: "20px",
          spacingUnit: "1.5rem",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" reverseOrder={false} />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);
