import { useState } from "react";
import Button from "./Button";
import { toast } from "react-hot-toast";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useAuth, useUser } from "@clerk/clerk-react";
import Review from "./Review";
import axios from "axios";
import { useNavigate } from "react-router";
import Modal from "./Modal";

const fetchReviews = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/reviews/${postId}`
  );
  console.log(res.data);
  return res.data;
};

const ReviewSection = ({ postId }) => {
  console.log(postId);
  const [modalConfig, setModalConfig] = useState(null);
  const { isSignedIn } = useAuth();
  const { getToken } = useAuth();
  // const { user } = useUser();
  const navigate = useNavigate();
  const [showTextarea, setShowTextarea] = useState(false);
  // const [review, setReview] = useState("");

  const closeModal = () => setModalConfig(null);

  const { isPending, error, data } = useQuery({
    queryKey: ["reviews", postId],
    queryFn: () => fetchReviews(postId),
  });

  const queryClient = useQueryClient();
  // console.log(`${import.meta.env.VITE_API_URL}/reviews/${postId}`);

  // Adding New Review using Mutation
  const mutation = useMutation({
    mutationFn: async (newReview) => {
      const token = await getToken();
      return await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews/${postId}`,
        newReview,
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
    },
    onError: () => {
      toast.error("Error posting review");
    },
  });

  if (isPending) return "Loading..";
  if (error) return "Error Loading Comments";

  const handleChange = () => {
    setShowTextarea((prev) => {
      return !prev;
    });
  };

  // Controlling Review Submission

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      setModalConfig({
        title: "Login Required",
        message: "You need to be logged in to add a review.",
        buttons: [
          { label: "Cancel" },
          {
            label: "Login",
            onClick: () => navigate("/login"),
            style: "px-4 py-2 bg-primary text-white rounded hover:bg-secondary",
          },
        ],
      });
    }

    const formData = new FormData(e.target);

    const data = {
      review: formData.get("review"),
    };
    if (!data.review.trim()) return;
    console.log(data);
    mutation.mutate(data);

    e.target.reset();
    //Resetting text area and Hiding Text area
    // setReview("");
    setShowTextarea(false);
  };

  return (
    <>
      <div className="my-8 flex flex-col gap-8 items-center">
        {/* Review Section Header */}
        <div className="flex justify-between w-3/4">
          <h2 className=" text-2xl font-semibold text-primary">Reviews</h2>
          <Button
            text={showTextarea ? "Cancel" : "Write a Review"}
            type="button"
            onClick={handleChange}
            className="transition-all ease-in duration-1000"
          ></Button>
        </div>

        {/* Textarea and Submit form */}
        <div className="w-3/4 flex mt-8">
          {showTextarea && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 items-end w-full"
            >
              <textarea
                name="review"
                id="review"
                rows="5"
                placeholder="Write your comment"
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-accent bg-accent-1 overflow-y-auto mb-4 bg-white"
              ></textarea>

              <Button text="Submit" type="submit" />
            </form>
          )}
        </div>

        {data.map((review) => (
          <Review key={review._id} data={review} postId={postId} />
        ))}
        {mutation.isPending && mutation.variables?.review && (
          <Review
            key="optimistic"
            data={{
              _id: "temp-id",
              review: mutation.variables.review,
              createdAt: new Date().toISOString(),
            }}
            isLoading={true}
          />
        )}

        {mutation.isError && (
          <li style={{ color: "red" }}>
            {mutation.variables?.review}
            <button onClick={() => mutation.mutate(mutation.variables)}>
              Retry
            </button>
          </li>
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
};

export default ReviewSection;
