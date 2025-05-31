import { Link } from "react-router";
import { Imagekit } from "../components/Image";
import Button from "../components/Button";

export default function LandingPage() {
  return (
    <div className="w-screen h-[calc(100vh-100px)] mt-[30px] bg-accent flex flex-col-reverse items-center md:flex-row px-4 lg:px-64 overflow-auto overflow-y-auto">
      <div className=" md:flex flex-col justify-center items-center w-full text-center p-10 h-[100%] ">
        <h1 className="text-4xl font-bold text-orange-700 mb-4">
          Welcome to Tasty Table!
        </h1>
        <p className="text-sm md:text-lg lg:text-xl text-gray-700 max-w-md font-bold mb-4">
          Discover, share, and manage your favorite recipes in one place.
        </p>
        <p className="text-sm md:text-lg lg:text-xl text-gray-700 max-w-lg  font-bold mb-4 ">
          Sign in to create new dishes, explore culinary ideas, and keep your
          kitchen creativity flowing.
        </p>
        <p className="text-sm md:text-lg lg:text-xl max-w-xl font-semibold mb-6">
          Ready to embark on a delicious culinary journey? Discover a world of
          mouthwatering recipes, from quick weeknight meals to impressive dishes
          for special occasions. Find inspiration, save your favorites, and
          unleash your inner chef. Lets get cooking! 🎉
        </p>
        <Link to="/home">
          <Button text="Get Started" />
        </Link>
      </div>
      <div className="w-1/2 md:w-full mt-6">
        <Imagekit
          src="https://ik.imagekit.io/sthasleema/newburger.png?updatedAt=1748524910752"
          w={700}
          h={700}
          alt="Welcome image"
        />
      </div>
    </div>
  );
}
