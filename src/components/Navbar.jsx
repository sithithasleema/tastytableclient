import { X, Menu } from "lucide-react";
import { useState } from "react";
import { Imagekit } from "./Image";
import { Link, useNavigate } from "react-router";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";
import { useEffect } from "react";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => console.log(token));
  });

  const handleAddRecipe = () => {
    if (!isSignedIn) {
      setModalOpen(true);
    } else {
      navigate("/new");
    }
  };

  const closeModal = () => setModalOpen(false);

  const goToLogin = () => {
    setModalOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div className="flex w-full h-16 md:20 items-center justify-between mt-8 bg-white  px-6 md:px-12 lg:px-28 xl:px-48 sticky top-0 z-20">
        {/* Logo */}
        <Link to="/">
          <Imagekit
            src="https://ik.imagekit.io/sthasleema/Orange%20Yellow%20Simple%20Kitchen%20Food%20Logo-Photoroom.png?updatedAt=1748522888928"
            alt="Tasty table logo"
            w={92}
            h={92}
          />
        </Link>

        {/* Mobile Menu */}
        <div className="flex md:hidden">
          {/* Mobile Button */}
          <div
            className="cursor-pointer text-4xl"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X /> : <Menu />}
          </div>
          {/* Mobile Link List */}
          <div
            className={`fixed top-32 right-0 w-full h-screen bg-accent text-2xl flex flex-col items-center justify-center gap-6 transform transition-transform duration-300 z-50 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <Link to="/home" className=" hover:text-gray-500">
              Home
            </Link>
            <Link to="/recipes" className=" hover:text-gray-500" href="/">
              Recipes
            </Link>
            <button onClick={handleAddRecipe} className="hover:text-gray-500">
              Add New Recipe
            </button>

            <Link to="/login" className=" hover:text-gray-500">
              <button className="py-2 px-8  bg-primary text-white hover:bg-secondary">
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center gap-10 items-center font-sans text-lg font-semibold">
          <Link to="/home" className=" hover:text-gray-500">
            Home
          </Link>
          <Link to="/recipes" className=" hover:text-gray-500" href="/">
            Recipes
          </Link>
          <button onClick={handleAddRecipe} className="hover:text-gray-500">
            Add New Recipe
          </button>

          <SignedOut>
            <Link to="/login" className=" hover:text-gray-500">
              <button className="py-2 px-8  bg-primary text-white hover:bg-secondary">
                Login
              </button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Simple Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Login Required</h2>
            <p className="mb-6">
              You need to be logged in to add a new recipe.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={goToLogin}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
