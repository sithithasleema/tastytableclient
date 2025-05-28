import { Link } from "react-router-dom";
import { Imagekit } from "./Image";
import { format } from "timeago.js";

export default function RecipeListItem({ post }) {
  return (
    <div>
      <article className="md:col-span-2 relative rounded-xl overflow-hidden border border-opacity-30   border-gray-500 bg-white flex flex-col h-[500px]">
        <div className="p-4 flex justify-center min-w-full h-[250px] overflow-hidden border-b-2 flex-shrink-0">
          <Imagekit
            src={post?.images[0]}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <Link to={`/recipes?category=${post?.category}`}>
            <span className="text-sm text-secondary uppercase font-semibold">
              {post?.category}
            </span>
          </Link>
          <Link to={`/recipes/${post?.slug}`}>
            <h3 className="text-2xl font-bold text-gray-800 my-2 cursor-pointer hover:text-gray-600">
              {post?.title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 px-1">
            By
            <Link to={`/recipes?author=${post?.user?.username}`}>
              <span className="font-semibold text-primary px-1">
                {post?.user?.username}
              </span>
            </Link>
            - {format(post?.createdAt)}
          </p>
          <div className="flex flex-col justify-between flex-grow mt-4">
            <p className="text-sm lg:text-lg text-gray-700 mt-4 line-clamp-3">
              {post?.description}
              <Link to={`/recipes/${post?.slug}`}>
                <span className="text-left text-primary text-sm font-semibold px-2 underline">
                  Read More
                </span>
              </Link>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
