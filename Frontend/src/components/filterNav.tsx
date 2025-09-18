import { useFilter } from "@/lib/utils";
import { useState } from "react";

const FilterNav = () => {
  const { setLocation, setDestination } = useFilter();
  const [tempLocation, setTempLocation] = useState<string>("");
  const [tempDestination, setTempDestination] = useState<string>("");

  const handleSøg = () => {
    setLocation(tempLocation);
    setDestination(tempDestination);
  };

  const handleSwap = () => {
    setTempDestination(tempLocation);
    setTempLocation(tempDestination);
  };

  return (
    <section className="bg-white hidden xl:flex sticky top-0 w-full z-20">
      <div className="max-w-5xl mx-auto py-4 flex items-center gap-3">
        <div className="relative flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 bg-white shadow-sm w-full h-12">
          <img
            src="/icons/Location.svg"
            alt="Location icon"
            className="w-5 h-5 text-app-secondary"
          />
          <input
            type="text"
            id="location-desktop"
            name="location"
            placeholder="Hvor fra?"
            value={tempLocation}
            onChange={(e) => setTempLocation(e.target.value)}
            className="flex-1 border-none outline-none bg-transparent text-base placeholder:text-gray-400"
          />
        </div>

        <button
          onClick={handleSwap}
          className="flex items-center justify-center w-36 h-12 rounded-xl bg-[#E6F9FE] mx-2 hover:cursor-pointer"
        >
          <img
            src="/icons/arrows-left-right-fill.svg"
            alt="Arrows icon"
            className="w-6 h-6 text-app-secondary"
          />
        </button>

        <div className="relative flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 bg-white shadow-sm w-full h-12">
          <img
            src="/icons/Destination.svg"
            alt="destination icon"
            className="w-5 h-5 text-app-secondary"
          />
          <input
            type="text"
            id="destination-desktop"
            name="destination"
            placeholder="Hvor til?"
            value={tempDestination}
            onChange={(e) => setTempDestination(e.target.value)}
            className="flex-1 border-none outline-none bg-transparent text-base placeholder:text-gray-400"
          />
        </div>

        <button
          onClick={handleSøg}
          className="bg-app-secondary w-60 text-white font-semibold rounded-3xl px-6 py-2 ml-2 shadow hover:bg-app-secondary/90 transition hover:cursor-pointer"
        >
          Søg lift
        </button>
      </div>
    </section>
  );
};
export default FilterNav;
