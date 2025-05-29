import { Link } from "react-router";
import { Imagekit } from "../components/Image";
import Button from "../components/Button";

export default function LandingPage() {
  return (
    <div className="w-screen h-[calc(100vh-100px)] mt-[30px] bg-accent flex items-center px-4 lg:px-64 ">
      <div className="hidden md:flex flex-col justify-center items-center  text-center p-10 h-[100%]  gap-8 w-1/2">
        <h1 className="text-4xl font-bold text-orange-700 mb-4">
          Welcome to Tasty Table!
        </h1>
        <p className="text-xl text-gray-700 max-w-md font-bold">
          Discover, share, and manage your favorite recipes in one place.
        </p>
        <p className="text-xl text-gray-700 max-w-lg  font-bold ">
          Sign in to create new dishes, explore culinary ideas, and keep your
          kitchen creativity flowing.
        </p>
        <p className="max-w-xl font-semibold ">
          Ready to embark on a delicious culinary journey? Discover a world of
          mouthwatering recipes, from quick weeknight meals to impressive dishes
          for special occasions. Find inspiration, save your favorites, and
          unleash your inner chef. Lets get cooking! 🎉
        </p>
        <Link to="/home">
          <Button text="Get Started" />
        </Link>
      </div>
      <div className="w-1/2">
        <Imagekit
          src="https://ik.imagekit.io/sthasleema/newburger.png?updatedAt=1748524910752"
          w={800}
          h={800}
          alt="Welcome image"
        />
      </div>
    </div>
  );
}
