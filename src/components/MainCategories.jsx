import { Link } from "react-router";
import SearchComp from "./SearchComp";

export default function MainCategories() {
  return (
    <div className="hidden md:flex bg-primary text-white items-center justify-between text-xl  h-16 w-full font-serif  ">
      {/* Links */}

      <div className="hidden md:flex overflow-x-auto whitespace-nowrap scroll-smooth bg-primary ">
        <Link
          to="/recipes"
          className="hover:bg-secondary text-white h-full flex items-center justify-center  border-r-2 px-6"
        >
          All Recipes
        </Link>

        <Link
          to="/recipes?category=vegetarian"
          className="hover:bg-secondary h-full flex items-center  border-r-2 justify-center  px-6"
        >
          Vegetarian
        </Link>
        <Link
          to="/recipes?category=vegan"
          className="hover:bg-secondary h-full flex items-center px-6 border-r-2"
        >
          Vegan
        </Link>
        <Link
          to="/recipes?category=meatAndPoultry"
          className="hover:bg-secondary h-full flex items-center px-6 border-r-2"
        >
          Meat & Poultry
        </Link>
        <Link
          to="/recipes?category=seaFood"
          className="hover:bg-secondary h-full flex items-center px-6 border-r-2"
        >
          Seafood
        </Link>
        <Link
          to="/recipes?category=bakingAndDesserts"
          className="hover:bg-secondary h-full flex items-center px-6 border-r-2"
        >
          Baking & Desserts
        </Link>
        <Link
          to="/recipes?category=highProtein"
          className="hover:bg-secondary h-full flex items-center px-6 border-r-2"
        >
          High-Protein
        </Link>
        <Link
          to="/recipes?category=lowCarb"
          className="hover:bg-secondary h-full flex items-center px-4 border-r-2"
        >
          Low-Carb
        </Link>
      </div>

      {/* Search */}
      <div className="text-lg pr-12">
        <SearchComp />
      </div>
    </div>
  );
}
