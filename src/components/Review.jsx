import { Link } from "react-router";
import { Imagekit } from "./Image";
import { format } from "timeago.js";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const Review = ({ data, isLoading = false, postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const role = user?.publicMetadata?.role;
  console.log(data);
  const queryClient = useQueryClient();

  // Deleting Review as Owner or Admin using Mutation
  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return await axios.delete(
        `${import.meta.env.VITE_API_URL}/reviews/${data._id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      // Invalidate the query to refresh reviews
      queryClient.invalidateQueries({ queryKey: ["reviews", postId] });
      toast.success("Review Deleted Successfully");
    },
    onError: () => {
      toast.error("Error deleting review");
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div className="w-3/4 bg-white p-4 rounded-lg border-gray-900  shadow-lg">
      {/* Review header */}
      <div className="flex justify-between w-full mb-2 py-2 border-b-2 border-gray-100">
        <p>{format(data.createdAt)}</p>
        {user &&
          (data?.user?.username === user?.username || role === "admin") && (
            <span
              className="text-primary hover:text-secondary cursor-pointer "
              onClick={handleDelete}
            >
              Delete
            </span>
          )}
      </div>

      {/* Actual Review Content */}
      <div
        className={` w-full transition-all ${
          isLoading ? "opacity-50 italic" : "opacity-100"
        } mb-2 py-2 border-b-2 border-gray-100`}
      >
        <p>{data.review}</p>
      </div>

      {/* Review Author Information */}
      <div className="flex gap-4 items-center mt-8">
        <Imagekit
          src={data.user?.img}
          w="48px"
          h="48px"
          className="rounded-full w-12 h-12 object-cover"
        />
        <Link>
          <h3 className="text-primary text-lg font-semibold">
            {data.user?.username}
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default Review;
