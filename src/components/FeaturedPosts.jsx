import { Link } from "react-router";
import { Imagekit } from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";

const fetchPost = async () => {
  const post = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true`
  );

  return post.data;
};

export default function FeaturedPosts() {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: async () => fetchPost(),
  });

  if (isPending) return "Loading Recipe Page...";
  if (error) return "Something went wrong loading the recipe.";

  const posts = data.posts;

  console.log(posts);
  if (!posts || posts.length === 0) return;

  return (
    <section className="mb-12 py-6 border-b-2 ">
      {/* Introduction */}
      <header className="flex flex-col items-start gap-6">
        <h1 className="text-gray-800 text-xl md:text-3xl lg:text-6xl font-cookie font-bold">
          Recipe of the day
        </h1>
        <p className="text-gray-700 font-delius text-lg">
          Today’s featured recipe, chosen to delight your taste buds and spark
          creativity in the kitchen.
        </p>
      </header>

      {/* SOME FEATURED RECIPE POSTS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 my-8">
        {/* Post 1 */}
        {/* Left: Big Featured Post */}
        <article className="lg:col-span-3 relative rounded-xl overflow-hidden shadow-lg bg-white">
          <Imagekit src={posts[0].images[0]} w="895" />
          <div className="p-4">
            <Link to={`/recipes?category=${posts[0]?.category}`}>
              <span className="text-sm text-secondary uppercase font-semibold">
                {posts[0].category}
              </span>
            </Link>
            <Link to={`/recipes/${posts[0]?.slug}`}>
              <h3 className="text-2xl font-bold text-gray-800 my-2">
                {posts[0].title}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 px-1">
              By
              <Link to={`/recipes?author=${posts[0].user.username}`}>
                <span className="font-semibold text-primary px-1">
                  {posts[0].user.username}
                </span>
              </Link>
              {format(posts[0].createdAt)}
            </p>
            <p className="text-sm lg:text-lg text-gray-700 mt-4">
              {posts[0].description}
            </p>
          </div>
        </article>

        {/* Right: 3 Smaller Posts */}
        {/* Post 2 */}

        <div className="lg:col-span-2 flex flex-col item items-stretch gap-6 shrink-0">
          <Link
            to={`/recipes/${posts[1]?.slug}`}
            className="flex  items-center bg-white rounded-xl shadow-md overflow-hidden hover:bg-accent cursor-pointer"
          >
            <div className="w-96">
              {" "}
              <Imagekit
                src={posts[1]?.images[0]}
                className="w-48 h-48 object-cover"
              />
            </div>
            <div className="p-3">
              <span className="text-xs text-secondary uppercase font-semibold">
                {posts[1]?.category}
              </span>
              <h4 className="text-lg font-bold text-gray-800">
                {posts[1]?.title}
              </h4>
              <p className="text-sm text-gray-600">
                By {posts[1]?.user.username} · {format(posts[1]?.createdAt)}
              </p>
              <p className="text-sm lg:text-lg text-gray-700 mt-4 line-clamp-2">
                {posts[1]?.description}
              </p>
            </div>
          </Link>

          {/* Post 3 */}
          <Link
            to={`/recipes/${posts[2]?.slug}`}
            className="flex  items-center bg-white rounded-xl shadow-md overflow-hidden hover:bg-accent cursor-pointer"
          >
            <div className="w-96">
              {" "}
              <Imagekit
                src={posts[2]?.images[0]}
                className="w-48 h-48 object-cover"
              />
            </div>
            <div className="p-3">
              <span className="text-xs text-secondary uppercase font-semibold">
                {posts[2]?.category}
              </span>
              <h4 className="text-lg font-bold text-gray-800">
                {posts[2]?.title}
              </h4>
              <p className="text-sm text-gray-600">
                By {posts[2]?.user.username} · {format(posts[2]?.createdAt)}
              </p>
              <p className="text-sm lg:text-lg text-gray-700 mt-4 line-clamp-2">
                {posts[2]?.description}
              </p>
            </div>
          </Link>

          {/* Post 4 */}
          <Link
            to={`/recipes/${posts[3]?.slug}`}
            className="flex  items-center bg-white rounded-xl shadow-md overflow-hidden hover:bg-accent cursor-pointer"
          >
            <div className="w-96">
              {" "}
              <Imagekit
                src={posts[3]?.images[0]}
                className="w-48 h-48 object-cover"
              />
            </div>
            <div className="p-3">
              <span className="text-xs text-secondary uppercase font-semibold">
                {posts[3]?.category}
              </span>
              <h4 className="text-lg font-bold text-gray-800">
                {posts[3]?.title}
              </h4>
              <p className="text-sm text-gray-600">
                By {posts[3]?.user.username} · {format(posts[3]?.createdAt)}
              </p>
              <p className="text-sm lg:text-lg text-gray-700 mt-4 line-clamp-2">
                {posts[3]?.description}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
