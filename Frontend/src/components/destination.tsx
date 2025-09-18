type DestinationProps = {
  cityDestination: string;
  addressDestination: string;
};

const Destination = ({
  addressDestination,
  cityDestination,
}: DestinationProps) => {
  return (
    <figure className="flex items-center  md:items-start px-2 py-2 gap-3 border-2  rounded-4xl md:border-0 md:rounded-none md:mx-0">
      <img
        src="icons/Destination.svg"
        alt="Destination icon"
        className="w-6 h-6"
      />
      <figcaption>
        <p className="font-bold text-md leading-tight">{addressDestination}</p>
        <p className="text-md leading-tight">{cityDestination}</p>
      </figcaption>
    </figure>
  );
};
export default Destination;
