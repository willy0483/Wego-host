type DepartureProps = {
  cityDeparture: string;
  addressDeparture: string;
};

const Departure = ({ cityDeparture, addressDeparture }: DepartureProps) => {
  return (
    <figure className="flex items-center  md:items-start px-2 py-2 gap-3 border-2  rounded-4xl md:border-0 md:rounded-none md:mx-0">
      <img src="icons/Location.svg" alt="Location icon" className="w-6 h-6" />
      <figcaption>
        <p className="font-bold text-md leading-tight">{cityDeparture}</p>
        <p className="text-md leading-tight">{addressDeparture}</p>
      </figcaption>
    </figure>
  );
};
export default Departure;
