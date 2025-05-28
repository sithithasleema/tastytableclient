import { Search } from "lucide-react";
import { useSearchParams, useNavigate, useLocation } from "react-router";

export default function SearchComp({ className }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value;
      if (location.pathname === "/recipes") {
        setSearchParams({ ...Object.fromEntries(searchParams), search: query });
      } else {
        navigate(`/recipes?search=${query}`);
      }
    }
  };

  return (
    <div
      className={`flex gap-4 pr-6 border border-gray-300 focus:outline-none ${className} bg-accent-1 rounded-full overflow-hidden`}
    >
      <input
        type="text"
        name="search"
        placeholder="Search for"
        className={`text-gray-900 focus:border-accent px-10 outline-none h-9 bg-accent-1 overflow-hidden ${className}`}
        onKeyDown={handleKeyPress}
      />
      <button type="button" className="text-black">
        <Search />
      </button>
    </div>
  );
}
