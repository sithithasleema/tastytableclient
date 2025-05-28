import { ArrowLeft } from "lucide-react";
// import RecipeListComp from "../components/RecipeListComp";
import { Link } from "react-router";
import RecipeListItem from "../components/RecipeListItem";
import SearchComp from "../components/SearchComp";
import Sidebar from "../components/Sidebar";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router";

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries(searchParams.entries());

  try {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: {
        page: pageParam,
        limit: 5,
        ...searchParamsObj,
      },
    });
    return result.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
// console.log("Results", result.data);

export default function RecipeList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  console.log(data);

  const allPosts = data?.pages.flatMap((page) => page.posts) || [];

  if (isFetching) return "Loading..";

  if (status === "error") return "Something went wrong in fetching data";

  return (
    <div className="mt-8 flex flex-col gap-4 w-full px-6 md:px-12 lg:px-16 xl:px-48">
      <header className="flex flex-col gap-6 w-full items-start md:flex-row md:justify-between md:items-center mb-8">
        {/* Left Items */}
        <div className="flex gap-6">
          <div className="border p-3 rounded-lg">
            <Link to="/home">
              <ArrowLeft />
            </Link>
          </div>

          <div>
            <p className="text-gray-500">Back</p>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              All Recipes
            </h1>
          </div>
        </div>

        {/* Right Menu */}
        <div className="flex justify-center w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          <SearchComp className="w-full" />
        </div>
      </header>
      {/* Main Recipe lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 box-border">
        <section className="col-span-1 row-start-2 md:col-span-2 md:row-start-1 lg:col-span-3  mb-12 border-b-2 pb-10">
          <InfiniteScroll
            dataLength={allPosts.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            // loader={<h4>Loading...</h4>}
            endMessage={
              <p className="text-center my-12">
                <b>No More Posts to Load.</b>
              </p>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-span-2 xl:grid-cols-3 xl:col-span-3 gap-6">
              {allPosts.map((post) => (
                <RecipeListItem key={post._id} post={post} />
              ))}
            </div>
          </InfiniteScroll>
        </section>

        {/* Right Sidebar */}
        <section className="col-span-1 row-start-1 md:col-span-1 lg:col-span-2 shadow-lg border rounded-lg mb-12 xl:mb-28">
          <Sidebar />
        </section>
      </div>
    </div>
  );
}
