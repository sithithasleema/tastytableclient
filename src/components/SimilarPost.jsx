import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";
import { Imagekit } from "./Image";
import { format } from "timeago.js";

const fetchPosts = async (userId, currentPostId) => {
  const post = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts/user/${userId}/${currentPostId}`
  );
  return post.data;
};

export default function SimilarPost({ userId, currentPostId }) {
  const { data, error, isLoading } = useQuery({
    enabled: !!userId,
    queryKey: ["similar-posts", userId, currentPostId],
    queryFn: async () => fetchPosts(userId, currentPostId),
  });

  if (isLoading) return <p>Loading similar posts...</p>;
  if (error) return <p>Error loading similar posts.</p>;
  return (
    <section className="w-full space-y-4 p-2">
      {data?.map((post, index) => (
        <Link to={`/recipes/${post.slug}`} key={index} className="p-4">
          <article className="flex h-44 md:flex-row  items-center bg-gray-50 rounded-xl shadow-md overflow-hidden hover:bg-accent transition-all ease-in-out 1s mb-8 ">
            <div className="w-52">
              {" "}
              <Imagekit
                src={post.images[0]}
                className="w-48 h-48 object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-center py-4 px-2 ">
              <span className="text-xs text-secondary uppercase font-semibold">
                {post.category}
              </span>
              <h4 className="text-lg font-bold text-gray-800">{post.title}</h4>
              <p className="text-sm text-gray-600 font-semibold">
                By {post.user.username} · {format(post.createAt)}
              </p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2 pr-2">
                {post.description}
              </p>
            </div>
          </article>{" "}
        </Link>
      ))}
    </section>
  );
}
