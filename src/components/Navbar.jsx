import { X, Menu } from "lucide-react";
import { useState } from "react";
import { Imagekit } from "./Image";
import { Link, useNavigate } from "react-router";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";
import { useEffect } from "react";
import Modal from "./Modal";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => console.log(token));
  });

  const handleAddRecipe = () => {
    if (!isSignedIn) {
      setModalConfig({
        title: "Login Required",
        message: "You need to be logged in to add a new recipe.",
        buttons: [
          { label: "Cancel" },
          {
            label: "Login",
            onClick: () => {
              navigate("/login");
              setOpen(false);
            },
            style: "px-4 py-2 bg-primary text-white rounded hover:bg-secondary",
          },
        ],
      });
    } else {
      navigate("/new");
      setOpen(false);
    }
  };

  const closeModal = () => setModalConfig(null);

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
            <Link
              to="/home"
              className=" hover:text-gray-500"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/recipes"
              className=" hover:text-gray-500"
              href="/"
              onClick={() => setOpen(false)}
            >
              Recipes
            </Link>
            <button onClick={handleAddRecipe} className="hover:text-gray-500">
              Add New Recipe
            </button>

            <Link to="/login" className=" hover:text-gray-500">
              <button
                className="py-2 px-8  bg-primary text-white hover:bg-secondary"
                onClick={() => setOpen(false)}
              >
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
