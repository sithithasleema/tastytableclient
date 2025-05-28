import { Link } from "react-router";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
// import RecipeListComp from "../components/RecipeListComp";

import RecentPosts from "../components/RecentPosts";

export default function Homepage() {
  return (
    <div className="mt-8 flex flex-col gap-4 w-full px-6 md:px-24 lg:px-28 xl:px-48">
      {/* Breadcrumbs */}
      <div className="flex gap-4 items-center">
        <Link to="/home" className="hover:text-gray-500">
          Home
        </Link>
        <span>.</span>
        <span>Blogs and Articles</span>
      </div>

      {/* Categories  */}

      <MainCategories />
      <FeaturedPosts />

      <div className="">
        <h2 className="text-3xl font-semibold text-primary  border-secondary inline-block mb-6">
          Recent Posts
        </h2>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 border-b-2 pb-10 ">
          <RecentPosts />
        </section>
      </div>
    </div>
  );
}
