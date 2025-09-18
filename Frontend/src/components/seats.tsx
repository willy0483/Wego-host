const Seats = ({
  seatsTotal,
  seatsBooked,
}: {
  seatsTotal: number;
  seatsBooked: number;
}) => {
  return (
    <div>
      {Array.from({ length: seatsTotal }).map((_, i) => (
        <span
          key={i}
          className={`inline-block w-3 h-3 rounded-full mx-1 ${
            i < seatsBooked ? "bg-red-400" : "bg-green-400"
          }`}
        ></span>
      ))}
    </div>
  );
};
export default Seats;
