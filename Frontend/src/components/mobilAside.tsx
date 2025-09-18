import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useFilter } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

const luggageOptions = [
  {
    icon: "icons/bagage/Small.svg",
    fillIcon: "icons/bagage/Small-Fill.svg",
    text: "Lille",
    id: 1,
  },
  {
    icon: "icons/bagage/Mellem.svg",
    fillIcon: "icons/bagage/Mellem-Fill.svg",
    text: "Mellem",
    id: 2,
  },
  {
    icon: "icons/bagage/Large.svg",
    fillIcon: "icons/bagage/Large-Fill.svg",

    text: "Stor",
    id: 3,
  },
];

const MobilAside = () => {
  const {
    seats,
    setSeats,
    luggage,
    setLuggage,
    isComfort,
    setIsComfort,
    isMusik,
    setIsMusik,
    isAnimal,
    setIsAnimal,
    isChildren,
    setIsChildren,
    isSmoking,
    setIsSmoking,
  } = useFilter();

  const preferencesList = [
    {
      name: "Musik",
      value: isMusik,
      fn: setIsMusik,
    },
    {
      name: "Dyr",
      value: isAnimal,
      fn: setIsAnimal,
    },
    {
      name: "Børn",
      value: isChildren,
      fn: setIsChildren,
    },
    {
      name: "Rygning",
      value: isSmoking,
      fn: setIsSmoking,
    },
  ];

  const handleLuggageChange = (id: number) => {
    if (luggage.includes(id)) {
      setLuggage(luggage.filter((i) => i !== id));
    } else {
      setLuggage([...luggage, id]);
    }
  };

  const handleClick = () => {
    setIsAnimal(false);
    setIsChildren(false);
    setIsComfort(false);
    setIsMusik(false);
    setIsSmoking(false);
    setLuggage([]);
    setSeats(3);
  };

  return (
    <section className="xl:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <div className="max-w-[500px] px-8 mx-auto">
            <button className="flex items-center gap-2 bg-app-primary text-white font-semibold rounded-full px-6 py-3 shadow hover:bg-app-primary/90 transition hover:cursor-pointer w-full justify-center mb-4">
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Filter</DrawerTitle>
          <DrawerDescription className="mb-5">
            Vælg dine filtre for at finde et lift.
          </DrawerDescription>
          <section className="border-b-2 pb-4 mb-2">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-[18px]">Antal Pladser</p>
              <span className="font-bold text-xl">{seats}</span>
            </div>
            <input
              type="range"
              value={seats}
              min={1}
              max={5}
              onChange={(e) => setSeats(+e.target.value)}
              className="w-full"
            />
          </section>
          <section className="border-b-2">
            <p className="font-bold text-[18px]">Bagage</p>
            <div className="flex justify-between my-2">
              {luggageOptions.map(({ icon, fillIcon, text, id }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleLuggageChange(id)}
                  className={`flex flex-col justify-center items-center mb-2 hover:cursor-pointer px-2 py-1 rounded ${
                    luggage.includes(id) ? "bg-blue-100 text-app-secondary" : ""
                  }`}
                >
                  <img
                    src={luggage.includes(id) ? fillIcon : icon}
                    alt={text}
                    className="w-6 h-6 mb-1"
                  />
                  <span>{text}</span>
                </button>
              ))}
            </div>
          </section>
          <section className="border-b-2 py-4">
            <p className="font-bold text-[18px]">Komfort</p>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                name={"comfort-mobil"}
                checked={isComfort}
                onChange={() => setIsComfort(!isComfort)}
                className="w-5 h-5 accent-app-primary focus:ring-2 focus:ring-app-primary/50 rounded-sm"
              />
              <span className="text-app-text group-hover:text-app-primary transition-colors duration-200">
                Højst to personer på bagsædet
              </span>
            </label>
          </section>
          <section className=" border-b-2 py-4 flex flex-col gap-2">
            {preferencesList.map(({ name, value, fn }, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  name={name + "mobil"}
                  checked={value}
                  onChange={() => fn(!value)}
                  className="w-5 h-5 accent-app-primary focus:ring-2 focus:ring-app-primary/50 rounded-sm"
                />
                <span className="text-app-text group-hover:text-app-primary transition-colors duration-200">
                  {name}
                </span>
              </label>
            ))}
          </section>
          <button
            onClick={handleClick}
            className="bg-app-secondary text-white w-full py-4 my-4 rounded-4xl hover:cursor-pointer"
          >
            Nulstil
          </button>
        </DrawerContent>
      </Drawer>
    </section>
  );
};
export default MobilAside;
