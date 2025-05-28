import axios from "axios";
import RecipeListItem from "./RecipeListItem";
import { useQuery } from "@tanstack/react-query";

const fetchPost = async () => {
  const post = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?limit=10&sort=date-newest`
  );

  return post.data;
};

export default function RecentPosts() {
  const { isPending, error, data } = useQuery({
    queryKey: ["recentPosts"],
    queryFn: async () => fetchPost(),
  });

  if (isPending) return "Loading Recipe Page...";
  if (error) return "Something went wrong loading the recipe.";

  const posts = data.posts;

  console.log(posts);
  if (!posts || posts.length === 0) return;

  return (
    <>
      {posts.map((post, index) => (
        <RecipeListItem key={index} post={post} />
      ))}
    </>
  );
}
