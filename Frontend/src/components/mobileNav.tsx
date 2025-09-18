import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useAuth } from "@/lib/utils";
import { CiMenuFries } from "react-icons/ci";
import { toast } from "sonner";
import { Book, House, Search } from "lucide-react";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { loginData, logout } = useAuth();
  const isLoggedIn = !!loginData;

  const links = [
    {
      name: "Forside",
      path: "/",
      icon: <House />,
    },
    {
      name: "Find it lift",
      path: "/lift",
      icon: <Search />,
    },
  ];
  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
    toast.success("You have been logged out.", {
      id: "logout",
    });
  };

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col h-full"
        aria-describedby={undefined}
      >
        <SheetTitle className="hidden">Navbar</SheetTitle>

        <h2 className="absolute top-20 text-2xl w-full text-center">
          {loginData?.user.firstname}
        </h2>

        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8 mx-10 mt-40">
          {links.map(({ path, icon, name }, index) => {
            const isActive = path === pathname;
            return (
              <Link
                to={path}
                key={index}
                className={`flex items-center w-full relative max-w-[180px] py-2 px-2 rounded-md hover:text-app-primary transition-colors duration-150 ${isActive ? "text-app-primary font-semibold" : "text-black"}`}
              >
                <span
                  className={`text-2xl mr-3 ${isActive ? "text-app-primary" : "text-black"}`}
                >
                  {icon}
                </span>
                <span
                  className={`text-lg flex-1 ${isActive ? "text-app-primary" : "text-black"}`}
                >
                  {name}
                </span>
                {isActive && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-app-primary rounded" />
                )}
              </Link>
            );
          })}

          {isLoggedIn && (
            <Link
              to={"/min-side/$userId"}
              params={{ userId: loginData.user.id.toString() }}
              className={`flex items-center w-full relative max-w-[180px] py-2 px-2 rounded-md hover:text-app-primary transition-colors duration-150 ${pathname === "/min-side" ? "text-app-primary font-semibold" : "text-black"}`}
            >
              <span
                className={`text-2xl mr-3 ${pathname === "/min-side" ? "text-app-primary" : "text-black"}`}
              >
                <Book />
              </span>
              <span
                className={`text-lg flex-1 ${pathname === "/min-side" ? "text-app-primary" : "text-black"}`}
              >
                Min Side
              </span>
              {pathname === "/min-side" && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-app-primary rounded" />
              )}
            </Link>
          )}

          {isLoggedIn ? (
            <button
              className="bg-transparent rounded-xl hover:cursor-pointer text-black border-2 border-app-primary py-2 px-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-app-primary rounded-xl hover:cursor-pointer text-white py-2 px-4">
                Login
              </button>
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
export default Nav;
