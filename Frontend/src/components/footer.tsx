import { useLocation } from "@tanstack/react-router";

const Footer = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <footer
      className={`${pathname == "/" ? "relative md:fixed bottom-0 z-10" : " relative"} w-full `}
    >
      <figure>
        <img
          src="/bg/Footer.svg"
          alt="wego footer background"
          className="w-full m-0 min-h-28 object-cover"
        />
        <figcaption className=" absolute bottom-0">
          <div className="text-app-secondary md:text-xl text-[14px] font-light mb-2 mx-4">
            <p> © 2025 WeGo ApS</p>
            <p> Fartstræde 12c, 2. sal, 9000 Aalborg</p>
          </div>
        </figcaption>
      </figure>
    </footer>
  );
};
export default Footer;
