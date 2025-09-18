import type { T_Trips } from "@/lib/types";
import Stars from "./stars";
import { formatDate } from "./formatDate";
import Departure from "./departure";
import Destination from "./destination";
import Seats from "./seats";
import { Clock } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const Card = ({
  user,
  departureDate,
  useFerry,
  isElectric,
  addressDeparture,
  cityDeparture,
  addressDestination,
  cityDestination,
  pricePerSeat,
  seatsBooked,
  seatsTotal,
  id,
}: T_Trips) => {
  const navigate = useNavigate({ from: "/lift" });

  const handleClick = (id: number) => {
    navigate({
      to: "$listId",
      params: { listId: id.toString() },
    });
  };
  return (
    <section className="bg-white rounded-xl shadow p-0 overflow-hidden grid grid-cols-1 md:grid-cols-[220px_1fr_220px] items-stretch m-4 md:m-0">
      <figure className="order-3 md:order-1 flex items-center md:flex-col md:justify-center md:items-center md:border-r-2 px-4 py-4 md:py-6 gap-3 md:gap-0 h-full">
        <img
          src={user.imageUrl}
          alt={`${user.imageUrl} user image`}
          className="rounded-full w-12 h-12 md:w-16 md:h-16 object-cover md:mb-2"
        />
        <figcaption className="flex-1 flex justify-between">
          <div>
            <h3 className="text-left md:text-center font-medium text-base mb-1">
              {user.firstname}
            </h3>
            <Stars avgStars={user.avgStars} />
          </div>
          <button
            className="bg-app-secondary w-12 flex justify-center items-center rounded-full md:hidden hover:cursor-pointer"
            onClick={() => handleClick(id)}
          >
            <img
              src="icons/arrowHead.svg"
              alt="arrowhead icon"
              className="w-5 h-5"
            />
          </button>
        </figcaption>
      </figure>

      <div className="order-1 md:order-2 flex flex-col gap-2 px-4 py-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-base md:text-lg flex justify-center items-center gap-2">
            <Clock className="w-5 h-5 xl:hidden" />
            {formatDate(departureDate)}
          </span>
          <div className="flex gap-2">
            {useFerry && (
              <img src="icons/Ship.svg" alt="Ship image" className="w-6 h-6" />
            )}
            {isElectric && (
              <img
                src="icons/Lightning.svg"
                alt="Lightning image"
                className="w-6 h-6"
              />
            )}
            <img src="icons/car.svg" alt="car icon" className="md:hidden" />
          </div>
        </div>
        <Departure
          addressDeparture={addressDeparture}
          cityDeparture={cityDeparture}
        />
        <Destination
          addressDestination={addressDestination}
          cityDestination={cityDestination}
        />
      </div>

      <div className="order-2 md:order-3 md:border-l-2 md:py-8 h-full flex md:flex-col items-center justify-between md:justify-center px-4 py-3 gap-4 border-2 mx-4 rounded-4xl md:border-0 md:rounded-none">
        <Seats seatsBooked={seatsBooked} seatsTotal={seatsTotal} />
        <div className="font-bold text-xl md:text-2xl text-right md:text-center">
          DKK {pricePerSeat}
        </div>
      </div>
    </section>
  );
};
export default Card;
