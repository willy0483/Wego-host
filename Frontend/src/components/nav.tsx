import { useAuth, useModule } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";

const links = [
  {
    name: "Find et lift",
    path: "/lift",
  },
];

const Nav = () => {
  const { loginData } = useAuth();
  const isLoggedIn = !!loginData;

  const { isWorksOpen, setIsWorksOpen } = useModule();

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="flex items-center gap-8 text-text">
      {links.map(({ name, path }, index) => {
        return (
          <Link
            to={path}
            key={index}
            className={`capitalize font-medium transition-all py-4 px-2 group ${pathname == path ? "border-b-app-secondary border-b-2" : ""}`}
          >
            <span className="group-hover:bg-gray-300 py-2 px-4 rounded">
              {name}
            </span>
          </Link>
        );
      })}

      <button
        onClick={() => setIsWorksOpen(!isWorksOpen)}
        className="capitalize font-medium transition-all py-4 group hover:cursor-pointer"
      >
        <span className="group-hover:bg-gray-300 py-2 px-4 rounded">
          Sådan virker det
        </span>
      </button>

      {isLoggedIn && (
        <Link
          to={"/min-side/$userId"}
          params={{ userId: loginData.user.id.toString() }}
          activeProps={{
            className: "border-b-app-primary border-b-2",
          }}
          className={`capitalize font-medium transition-all group py-4`}
        >
          <span className="group-hover:bg-gray-300 py-2 px-4 rounded">
            Min Side
          </span>
        </Link>
      )}
    </nav>
  );
};

export default Nav;
