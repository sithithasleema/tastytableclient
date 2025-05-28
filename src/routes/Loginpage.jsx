import { SignIn } from "@clerk/clerk-react";

export default function Loginpage() {
  return (
    <div className="w-full px-6 md:px-24 lg:px-28 xl:px-48  flex flex-col text-center xl:flex-row justify-around min-h-[90vh] items-center">
      {/* Left welcome message */}
      <div className="lg:flex flex-col justify-center items-center  py-10">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className=" text-xl">
          Sign in to access your recipes and manage your account.
        </p>
      </div>

      <div className="bg-green-500 shrink-0">
        <SignIn />
      </div>
    </div>
  );
}
