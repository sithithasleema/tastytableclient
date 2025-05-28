import { ChefHat } from "lucide-react";

const Category = ({ data }) => {
  const cookingTimeMap = {
    1: "Under 30 minutes",
    2: "30–60 minutes",
    3: "Over 1 hour",
  };

  const difficultyLabels = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };

  const categoryLabels = {
    vegan: "Vegan",
    vegetarian: "Vegetarian",
    meatAndPoultry: "Meat And Poultry",
    seafood: "Seafood",
    bakingAndDesserts: "Baking And Desserts",
    highProtein: "High - Protein",
    lowCarb: "Low - Carb",
  };

  return (
    <div className="flex flex-col gap-3">
      {" "}
      <div className="flex gap-4 text-lg">
        <ChefHat />
        <p>Category:</p>
        <span>{categoryLabels[data.category]}</span>
      </div>
      <div className="flex gap-4 text-lg">
        <ChefHat />
        <p>Difficulty Level:</p>
        <span>{difficultyLabels[data.difficulty]}</span>
      </div>
      <div className="flex gap-4 text-lg">
        <ChefHat />
        <p>Cooking Time:</p>
        <span>{cookingTimeMap[data.cookingTime]}</span>
      </div>
    </div>
  );
};

export default Category;
