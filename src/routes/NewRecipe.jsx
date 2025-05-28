import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { Skeleton } from "@mui/material";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
import { showCustomToast } from "../utilities/toast.jsx";

import Button from "../components/Button";
import ImageUploader from "../components/ImageUploader.jsx";
import toast from "react-hot-toast";

export default function NewRecipe() {
  const { isLoaded, isSignedIn } = useUser();

  const { getToken } = useAuth();

  const formRef = useRef();

  const [ingredients, setIngredients] = useState([""]);
  const [images, setImages] = useState([""]);
  const [valueProcedure, setValueProcedure] = useState("");
  const [procedureImg, setProcedureImg] = useState("");
  const [procedureVideo, setProcedureVideo] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (procedureImg && procedureImg.url) {
      setValueProcedure(
        (prev) =>
          prev +
          `<p><img src="${procedureImg.url}" alt="Uploaded image" style="width: 20px; max-height: 20px; object-fit: contain;" /></p>`
      );
      setProcedureImg(null);
    }
  }, [procedureImg]);

  useEffect(() => {
    if (procedureVideo && procedureVideo.url) {
      setValueProcedure(
        (prev) =>
          prev +
          `<p><video controls
            style="width: 200px; height: auto; max-height: 150px; object-fit: contain;">
            <source src="${procedureVideo.url}" type="video/mp4">
            Your browser does not support the video tag.
          </video></p>`
      );
      setProcedureVideo(null);
    }
  }, [procedureVideo]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      console.log(token);
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      // Show Toast after success
      showCustomToast({
        title: res.data.title,
        category: res.data.category,
        image: res.data.images[0],
        user: res.data.user,
        time: res.data.updatedAt,
      });

      // Reset HTML Form
      if (formRef.current) formRef.current.reset();

      // Reset any state
      setIngredients([]);
      setImages([]);
      setValueProcedure("");
    },
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      toast.error(message);
    },
  });

  useEffect(() => {
    if (mutation.error || Object.keys(formErrors).length > 0) {
      setShowError(true);

      const timer = setTimeout(() => {
        setShowError(false);
        setFormErrors({}); // optional: clear formErrors
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [mutation.error, formErrors]);

  // Handle Cancel
  const handleCancel = () => {
    // Reset HTML Form
    if (formRef.current) formRef.current.reset();

    // Reset any state
    setIngredients([]);
    setImages([]);
    setValueProcedure("");
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      ingredients: ingredients,
      cookingTime: Number(formData.get("cookingTime")),
      difficulty: formData.get("difficulty"),
      images: images,
      procedure: valueProcedure,
    };

    const errors = {};

    if (!data.title) errors.title = "Title is required";
    if (!data.description) errors.description = "Description is required";
    if (!data.category) errors.category = "Please choose atleast one category";
    if (!data.ingredients.length)
      errors.ingredients = "At least one ingredient is required";
    if (!data.cookingTime) errors.cookingTime = "Please choose one";
    if (!data.difficulty) errors.difficulty = "Please choose one";
    // if (!data.images.length) errors.images = "At least one image is required";
    if (!data.procedure) errors.procedure = "Procedure is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setShowError(true);
      const firstErrorField = Object.keys(errors)[0];
      document
        .querySelector(`[name="${firstErrorField}"]`)
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setFormErrors({}); // clear previous errors

    // console.log(data);

    mutation.mutate(data);
  };

  // Mutation using tanstack query

  if (!isLoaded) {
    <Skeleton variant="rectangular" width={210} height={118} />;
  }

  // if (isLoaded && !isSignedIn) {
  //   return <h1>You shoud Sign In first</h1>;
  // }

  // Controlling Ingredients
  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const handleDeleteInput = (indextoRemove) => {
    setIngredients((prevIng) =>
      prevIng.filter((_, index) => index !== indextoRemove)
    );
  };

  // Controlling Images
  const handleAddImage = () => {
    setImages([...images, ""]);
  };

  const handleImageUpload = (url, index) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      console.log(newImages, index);
      newImages[index] = url; // set uploaded image URL at correct index

      return newImages;
    });
  };

  const handleDeleteImage = (indextoRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indextoRemove)
    );
  };

  return (
    <div className=" mt-20 flex flex-col gap-4 w-full px-4 lg:px-64">
      <header className="flex gap-6">
        <div className="border p-3 rounded-lg">
          <Link to="/recipes">
            <ArrowLeft />
          </Link>
        </div>
        <div>
          <p className="text-gray-500">Back to recipe list</p>

          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Add New Recipe
          </h1>
        </div>
      </header>

      <form
        action=""
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-6 box-border mt-12 mb-20 shadow-xl"
      >
        {/* Name and Description */}
        <article className="border p-4 w-full lg:w-[48%]">
          <h1 className="text-lg md:text-xl lg:text-2xl">Description</h1>
          <div className="">
            <p className="my-4">
              <label className="text-gray-500">
                Recipe title <span className="text-red-900">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {formErrors.title && (
                <span className="text-red-600">{formErrors.title}</span>
              )}
            </p>

            <p className="my-4">
              <label className="text-gray-500">Recipe Description</label>
              <textarea
                name="description"
                id=""
                placeholder="Enter Recipe Description"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
              {formErrors.description && (
                <span className="text-red-600">{formErrors.description}</span>
              )}
            </p>
          </div>
        </article>

        {/* Image Section */}
        <article className="border p-4 w-full lg:w-[48%]">
          <h1 className="text-lg md:text-xl lg:text-2xl">
            Add Images <span className="text-red-900">*</span>
          </h1>
          <div className="">
            {images.map((image, index) => (
              <div key={index} className="flex items-center gap-2 my-2">
                <ImageUploader
                  accept="image/"
                  setData={(uploadResponse) => {
                    console.log(uploadResponse.url);
                    // uploadResponse.url has the uploaded image URL
                    handleImageUpload(uploadResponse.url, index);
                  }}
                />

                {image && (
                  <X
                    className="cursor-pointer text-red-500 "
                    onClick={() => handleDeleteImage(index)}
                  />
                )}
              </div>
            ))}
            <label className="text-gray-500">Add Images </label>

            {formErrors.images && (
              <span className="text-red-600">{formErrors.images}</span>
            )}

            {/* Adding More Images */}
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 bg-primary text-white hover:bg-secondary my-4 ml-6"
            >
              + Images
            </button>
          </div>
        </article>

        {/* Categories, Ingredients, and more details*/}

        {/* Category */}

        <article className="border p-4 w-full lg:w-[48%]">
          <h1 className="text-lg md:text-xl lg:text-2xl">
            Categories and Ingredients
          </h1>
          <div className="">
            <div className="my-4">
              <label className="text-gray-500">Choose Category</label>
              <select
                name="category"
                id="category"
                className="border p-2 ml-6 rounded-lg border-neutral-200"
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="meatAndPoultry">Meat & Poultry</option>
                <option value="seafood">Seafood</option>
                <option value="bakingAndDesserts">Baking & Desserts</option>
                <option value="highProtein">High-Protein</option>
                <option value="lowCarb">Low-Carb</option>
              </select>
            </div>
            {formErrors.category && (
              <span className="text-red-600">{formErrors.category}</span>
            )}

            {/* Ingredients */}

            <div className="my-6 border-b-2">
              <label className="text-gray-500">Add Ingredients</label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2 my-2">
                  <input
                    name="ingredients"
                    type="text"
                    value={ingredient}
                    placeholder={`Ingredient ${index + 1}`}
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <X
                    className="cursor-pointer text-red-500"
                    onClick={() => handleDeleteInput(index)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddIngredient}
                className="px-4 py-2 bg-primary text-white hover:bg-secondary my-6 ml-6"
              >
                + Ingredient
              </button>
              {formErrors.ingredients && (
                <span className="text-red-600">{formErrors.ingredients}</span>
              )}
            </div>

            {/* Cooking Time */}
            <div className="p-4 bg-white rounded-md shadow-md border-b-2">
              <p className="text-gray-500 mb-4">
                Cooking Time <span className="text-red-900">*</span>{" "}
                {formErrors.cookingTime && (
                  <span className="text-red-600">{formErrors.cookingTime}</span>
                )}
              </p>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cookingTime"
                    value={1}
                    className="accent-primary"
                  />
                  Under 30 minutes
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cookingTime"
                    value={2}
                    className="accent-primary"
                  />
                  30 to 60 minutes
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cookingTime"
                    value={3}
                    className="accent-primary"
                  />
                  Over 60 minutes
                </label>
              </div>
            </div>

            {/* Difficulty Level */}

            <div className="p-4 bg-white rounded-md shadow-md">
              <p className="text-gray-500 mb-4">
                Difficulty Level <span className="text-red-900">*</span>{" "}
                {formErrors.difficulty && (
                  <span className="text-red-600">{formErrors.difficulty}</span>
                )}
              </p>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="difficulty"
                    value="easy"
                    className="accent-primary"
                  />
                  Easy
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="difficulty"
                    value="medium"
                    className="accent-primary"
                  />
                  Medium
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="difficulty"
                    value="hard"
                    className="accent-primary"
                  />
                  Hard
                </label>
              </div>
            </div>
          </div>
        </article>

        {/* Procedures,tips & tricks */}
        <article className="border p-4 w-full lg:w-[48%]">
          <h1 className="text-lg md:text-xl lg:text-2xl">
            Procedure <span className="text-red-900">*</span>
          </h1>{" "}
          {formErrors.procedure && (
            <span className="text-red-600">{formErrors.procedure}</span>
          )}
          {/* React Quill - Procedure */}
          <div className="my-4 flex flex-col flex-1 gap-4 h-[50vh]">
            <ImageUploader
              label="Upload Image to Editor: "
              accept="image/*"
              className="hidden"
              setData={setProcedureImg}
            />
            <ImageUploader
              label="Upload Video to Editor: "
              accept="video/*"
              className="hidden"
              setData={setProcedureVideo}
            />
            <label className="text-gray-500"></label>
            <ReactQuill
              theme="snow"
              name="procedure"
              value={valueProcedure}
              onChange={setValueProcedure}
              className="flex-1 custom-quill"
            />
          </div>
        </article>

        <div className="space-x-4 w-full flex justify-end m-8">
          {showError && (
            <div>
              <span className="text-red-800">Error saving recipe.</span>
              {/* {toast.error("Error Saving Form")} */}
            </div>
          )}
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="disabled:cursor-not-allowed"
            text={mutation.isPending ? "Saving" : "Save"}
          ></Button>

          <Button type="reset" text="Cancel" onClick={handleCancel}></Button>
        </div>
      </form>
    </div>
  );
}
