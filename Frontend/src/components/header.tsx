import { Link, useNavigate } from "@tanstack/react-router";
import MobileNav from "./mobileNav";
import Nav from "./nav";
import { useAuth } from "@/lib/utils";

const Header = () => {
  const { loginData, logout } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!loginData;

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <header className="h-[80px] px-10 bg-white text-app-text flex items-center justify-between border-b shadow">
      <Link to={"/"} className="flex md:hidden">
        <img src="/icons/wego-logo.svg" alt="wego logo" />
      </Link>

      {/* desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        <Link to={"/"}>
          <img src="/icons/wego-logo.svg" alt="wego logo" />
        </Link>
        <Nav />
      </div>

      <div className="hidden md:flex">
        {isLoggedIn ? (
          <div className=" flex gap-2 items-center">
            {loginData.user.firstname}
            <button
              className="bg-transparent rounded-xl hover:cursor-pointer text-black border-2 border-app-primary py-2 px-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-app-primary rounded-xl hover:cursor-pointer text-white py-2 px-4">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* mobile nav */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </header>
  );
};
export default Header;
