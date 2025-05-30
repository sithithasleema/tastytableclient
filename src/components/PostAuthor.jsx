import { Link } from "react-router";
import { Imagekit } from "./Image";

export default function PostAuthor({ user }) {
  // console.log(user);
  return (
    <div className="flex flex-col  w-full ">
      {/* <h1 className="text-xl font-bold">Author</h1> */}

      <div className="flex gap-4 items-center mb-4">
        <Imagekit
          src={user.img}
          w="48px"
          h="48px"
          className="rounded-full w-12 h-12 object-cover"
        />
        <Link>
          <h3 className="text-primary text-lg font-semibold">
            {user.username}
          </h3>
        </Link>
      </div>

      {/* <p>
        &Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et a id
        debitis alias animi voluptatibus non quos quae officiis, fuga eveniet
        hic. Cupiditate, soluta ea asperiores maxime fugiat error voluptatum.
      </p> */}

      {/* Social Media Icons */}
      <div className="flex gap-4 mb-6 ">
        <Link>
          <Imagekit
            src="https://ik.imagekit.io/sthasleema/_Pngtree_facebook%20social%20media%20icon_8704814.png?updatedAt=1748522446689"
            w="24px"
            h="24px"
          />
        </Link>

        <Link>
          <Imagekit
            src="https://ik.imagekit.io/sthasleema/_Pngtree_instagram_icon_8704817_OKvhud7hQ.png?updatedAt=1748404686155"
            w="24px"
            h="24px"
          />
        </Link>
      </div>
    </div>
  );
}
