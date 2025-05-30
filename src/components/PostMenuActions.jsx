import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Bookmark, Star } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import Modal from "./Modal";

export default function PostMenuActions({ post }) {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [modalConfig, setModalConfig] = useState(null);
  const { isSignedIn } = useAuth();

  const closeModal = () => setModalConfig(null);

  // Fetching Saved Posts
  const {
    isPending,
    error,
    data: savedPosts,
  } = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const token = await getToken();
      return await axios.get(
        `${import.meta.env.VITE_API_URL}/user/savedPosts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
  });

  // console.log(savedPosts);

  // Checking if the current user is admin or not
  const isAdmin = user?.publicMetadata?.role === "admin" || false;

  // Checking if the current post is already saved in bookmark or not
  const isSaved = savedPosts?.data?.some((p) => p === post._id) || false;
  console.log("Saved Posts:", savedPosts?.data); // e.g., ['abc123', 'xyz456']
  console.log("Current Post ID:", post._id); // e.g., 'abc123'
  console.log(isSaved);

  // Delete Post
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return await axios.delete(
        `${import.meta.env.VITE_API_URL}/posts/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Post Deleted Successfully!");
      navigate("/");
    },
    onError: () => {
      toast.error(error.response.data);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  // Bookmarking Post
  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/bookmarkPost`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
      queryClient.refetchQueries({ queryKey: ["savedPosts"] });
      toast.success(response.data.message);
    },
    onError: () => {
      toast.error(error.response.data);
    },
  });

  const handleSave = () => {
    if (!isSignedIn) {
      setModalConfig({
        title: "Login Required",
        message: "You need to be logged in to bookmark a recipe.",
        buttons: [
          { label: "Cancel" },
          {
            label: "Login",
            onClick: () => navigate("/login"),
            style: "px-4 py-2 bg-primary text-white rounded hover:bg-secondary",
          },
        ],
      });
    } else {
      saveMutation.mutate();
    }
  };

  // Featuring Post
  const featureMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return await axios.patch(
        `${import.meta.env.VITE_API_URL}/posts/featurePost`,
        {
          postId: post._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["post", post.slug] });
      toast.success(response.data.message);
    },
    onError: () => {
      toast.error(error.response.data);
    },
  });

  const handleFeature = () => {
    featureMutation.mutate();
  };

  return (
    <>
      <div className="">
        <div className="flex gap-2 cursor-pointer" onClick={handleSave}>
          <Bookmark
            fill={isSaved ? "black" : "none"}
            stroke="black"
            strokeWidth={post.isSaved ? 0 : 1.5}
          />
          Save this post
        </div>

        {/* Conditionally rendering feature button only for admin */}
        {isAdmin && (
          <div className="flex gap-2 cursor-pointer" onClick={handleFeature}>
            <Star
              fill={post.isFeatured ? "black" : "none"}
              stroke="black"
              strokeWidth={post.isFeatured ? 0 : 1.5}
            />
            Feature
            {featureMutation.isPending && <p>Loading...</p>}
          </div>
        )}

        {/* Conditionally rendering delete button only for owner of post */}
        {user && (post.user.username === user.username || isAdmin) && (
          <div className="flex gap-2 cursor-pointer" onClick={handleDelete}>
            <Trash2 />
            Delete this post
          </div>
        )}
      </div>
      {modalConfig && (
        <Modal
          title={modalConfig.title}
          message={modalConfig.message}
          buttons={modalConfig.buttons}
          onClose={closeModal}
        />
      )}
    </>
  );
}
