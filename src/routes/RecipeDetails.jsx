import { Imagekit } from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import PostAuthor from "../components/PostAuthor";
import Ingredients from "../components/Ingredients";
import SimilarPost from "../components/SimilarPost";
import SearchComp from "../components/SearchComp";
import Category from "../components/Category";
import ReviewSection from "../components/ReviewSection";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Eye } from "lucide-react";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const post = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);

  return post.data;
};

export default function RecipeDetails() {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => fetchPost(slug),
  });

  if (isPending) return "Loading Recipe Page...";
  if (error) return "Something went wrong loading the recipe.";

  return (
    <main className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-4 w-full px-6 md:px-12 lg:px-28 xl:px-48 my-12 relative">
      {/* Main Grid on Left */}
      <section className="md:col-span-3  xl:col-span-4">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-serif md:text-2xl xl:text-5xl">
            {data.title}
          </h1>
          <div className="text-sm text-muted-foreground flex items-center gap-3 mt-1">
            <Link to={`/recipes?author=${data?.user?.username}`}>
              <span className="font-semibold text-primary px-1">
                {data?.user?.username}
              </span>
            </Link>
            <span>{format(data.createdAt)}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-5 h-5" />{" "}
              <span className="">{data.visit} views</span>
            </span>
          </div>
          <p className="text-sm lg:text-lg text-gray-700 mt-2">
            {data.description}
          </p>
        </header>
        <div className="mt-8">
          <Imagekit
            src={data.images[0]}
            className="w-full h-[calc(100vh-600px)] object-cover md:h-[calc(100vh-400px)]"
          />
        </div>

        <h2 className="text-3xl font-semibold mt-12">Procedure</h2>
        <p
          className="text-lg lg:text-xl text-gray-700 mt-8 px-6 leading-loose procedure-content"
          dangerouslySetInnerHTML={{ __html: data.procedure }}
        ></p>

        <div className="p-2 my-8 border shadow-md rounded-md bg-accent-1">
          <ReviewSection postId={data._id} />
        </div>
      </section>

      {/* Right Side Bar */}
      <section className="col-span-1 md:col-span-1 xl:col-span-2  h-max sticky top-10">
        {/* Search */}
        <aside className="hidden xl:flex p-2 my-8 border shadow-md rounded-md">
          <SearchComp className="w-full" />
        </aside>
        {/* Author */}
        <aside className="py-6 px-8 h-auto flex flex-col  items-start mb-8 border shadow-lg rounded-lg">
          <PostAuthor user={data.user} />
          <PostMenuActions post={data} />
        </aside>
        {/* Category */}
        <aside className="p-6 bg-accent h-auto mb-8 border shadow-lg rounded-lg">
          <Category data={data} />
        </aside>
        {/* Ingredients */}
        <aside className="p-6 bg-accent h-auto flex flex-col gap-4 items-center mb-8 border shadow-lg rounded-lg">
          <Ingredients ingredients={data.ingredients} />
        </aside>

        {/* Similar Posts by Same User */}
        <aside className="py-6 h-auto flex flex-col gap-4 mb-8 border shadow-lg rounded-lg">
          <h2 className="px-6 text-2xl font-semibold text-primary">
            {`More Recipe by ${data.user.username}`}
          </h2>
          <SimilarPost userId={data.user._id} currentPostId={data._id} />
        </aside>
      </section>
    </main>
  );
}
