import { FilterContext } from "@/lib/utils";
import { useState, type ReactNode } from "react";

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [seats, setSeats] = useState<number>(3);
  const [luggage, setLuggage] = useState<number[]>([]);
  const [isComfort, setIsComfort] = useState<boolean>(false);
  const [isMusik, setIsMusik] = useState<boolean>(false);
  const [isAnimal, setIsAnimal] = useState<boolean>(false);
  const [isChildren, setIsChildren] = useState<boolean>(false);
  const [isSmoking, setIsSmoking] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  return (
    <FilterContext.Provider
      value={{
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
        location,
        setLocation,
        destination,
        setDestination,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
