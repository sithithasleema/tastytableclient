import { ListFilter, ArrowDownUp, ChartBarStacked, X } from "lucide-react";

import { useState } from "react";
import { Link } from "react-router";
import { useSearchParams } from "react-router";

const Sidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDifficulty = searchParams.get("difficulty") || "";

  // Handling Filtering By Difficulty level
  const handleRadioChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value === "") {
      params.delete("difficulty"); // allow reset
    } else {
      params.set("difficulty", value);
    }

    setSearchParams(params);
  };

  // Category Change
  const handleCategoryChange = (category) => {
    if (searchParams.get(category) !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        category: category,
      });
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchParams({}); // resets URL params
  };

  return (
    <div className=" flex gap-4 flex-col p-2 ">
      <button
        onClick={clearAllFilters}
        className="px-4 py-2 bg-gray-300 text-black hover:bg-accent text-lg rounded-md flex gap-2 justify-center items-center"
      >
        <X />
        Clear All Filters
      </button>
      {/* Category Links */}
      <div className="border p-6 shadow-lg bg-accent rounded-lg ">
        <div className="flex gap-2 cursor-pointer  items-center mb-2 ">
          <ChartBarStacked />
          <span className="text-lg font-bold ">Categories</span>
        </div>
        <div className="flex flex-col gap-2 ">
          <span
            className="underline hover:text-gray-600 cursor-pointer"
            onClick={() => handleCategoryChange("allRecipes")}
            default
          >
            All Recipes
          </span>
          <span
            className="underline  hover:text-gray-600 cursor-pointer"
            onClick={() => handleCategoryChange("vegetarian")}
          >
            Vegetarian
          </span>
          <span
            className="underline  hover:text-gray-600 cursor-pointer"
            onClick={() => handleCategoryChange("vegan")}
          >
            Vegan
          </span>
          <span
            className="underline  hover:text-gray-600 cursor-pointer"
            onClick={() => handleCategoryChange("meatAndPoultry")}
          >
            Meat & Poultry
          </span>
          <span
            className="underline  hover:text-gray-600 cursor-pointer"
            onClick={() => handleCategoryChange("seafood")}
          >
            Seafood
          </span>
          <span
            className="underline  hover:text-gray-600 cursor-pointer"
            onClick={() => handleCategoryChange("bakingAndDesserts")}
          >
            Baking And Desserts
          </span>
          <span
            className="underline  hover:text-gray-600 cursor-pointer"
            onClick={() => handleCategoryChange("highProtein")}
          >
            High-Protein
          </span>
          <span
            className="underline  hover:text-gray-600 cursor-pointer"
            onClick={() => handleCategoryChange("lowCarb")}
          >
            Low-Carb
          </span>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-col border rounded-lg">
        <div className="flex gap-2 cursor-pointer bg-accent-1 border rounded-lg items-center py-2 px-4 h-1/2 border-b-2">
          <ListFilter />
          <span className="text-lg ">Filter By:</span>
        </div>

        {/* Filter by Difficulty Level */}

        <div className="p-4 rounded-md w-full max-w-md space-y-3">
          <h2 className="text-lg font-semibold">Filter By Difficulty level</h2>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="difficulty"
                value=""
                checked={selectedDifficulty === ""}
                onChange={handleRadioChange}
              />
              <span>All</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="difficulty"
                value="easy"
                checked={selectedDifficulty === "easy"}
                onChange={handleRadioChange}
              />
              <span>Easy</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="difficulty"
                value="medium"
                checked={selectedDifficulty === "medium"}
                onChange={handleRadioChange}
              />
              <span>Medium</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="difficulty"
                value="hard"
                checked={selectedDifficulty === "hard"}
                onChange={handleRadioChange}
              />
              <span>Hard</span>
            </label>
          </div>
        </div>

        {/* Sort */}

        <div className="flex flex-col border rounded-lg">
          <div className="flex gap-2 cursor-pointer bg-accent-1  items-center py-2 px-4 h-1/2">
            <ArrowDownUp />
            <span className="text-lg ">Sort</span>
          </div>

          <select
            value={searchParams.get("sort") || ""}
            onChange={(e) => {
              const updatedParams = new URLSearchParams(
                searchParams.toString()
              );
              updatedParams.set("sort", e.target.value);
              setSearchParams(updatedParams);
            }}
            className="focus:outline-none rounded px-3 py-2 mt-1"
          >
            <option value="most-popular">Most Popular</option>
            <option value="name-asc">Name (A–Z)</option>
            <option value="name-desc">Name (Z–A)</option>
            <option value="time-asc">Cooking Time (Low to High)</option>
            <option value="time-desc">Cooking Time (High to Low)</option>
            <option value="date-newest">Newest First</option>
            <option value="date-oldest">Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
