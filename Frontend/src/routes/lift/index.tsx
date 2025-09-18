import Card from "@/components/card";
import { Spinner } from "@/components/spinner";
import { useTrips } from "@/lib/query";
import { useFilter } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { isToday, isTomorrow } from "date-fns";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export const Route = createFileRoute("/lift/")({
  component: RouteComponent,
  pendingComponent: () => (
    <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-80px)]">
      <Spinner />
    </div>
  ),
  head: () => ({
    meta: [
      { title: `Find et lift - WeGo` },
      {
        name: "description",
        content:
          "WeGo er en online service der tilbyder bæredygtig samkørsel til sine registrerede brugere. Som bruger kan man søge og booke ture med forskellige præferencer til en given destination. Se alle lift på WeGo og støt klimaet!",
      },
      {
        name: "keywords",
        content: `lift, bæredygtig, miljø, tur, transport, Wego`,
      },
    ],
  }),
});

function RouteComponent() {
  const { data: trips, isError, error, refetch } = useTrips();
  const [currentPage, setCurrentPage] = useState(0);

  const {
    seats,
    luggage,
    isComfort,
    isAnimal,
    isChildren,
    isMusik,
    isSmoking,
    location,
    destination,
  } = useFilter();

  const filteredTrips = trips?.filter((trip) => {
    const isSeats = trip.seatsTotal == seats;

    const isLuggageMatch =
      luggage.length === 0 || luggage.includes(trip.bagSizeId);

    const isLocationMatch =
      trip.cityDeparture
        .toLocaleLowerCase()
        .includes(location.toLocaleLowerCase()) ||
      trip.addressDeparture
        .toLocaleLowerCase()
        .includes(location.toLocaleLowerCase());

    const isDestinationMatch =
      trip.cityDestination
        .toLocaleLowerCase()
        .includes(destination.toLocaleLowerCase()) ||
      trip.addressDestination
        .toLocaleLowerCase()
        .includes(destination.toLocaleLowerCase());

    const isComfortMatch = !isComfort || trip.hasComfort === true;
    const isAnimalMatch = !isAnimal || trip.allowPets === true;
    const isChildrenMatch = !isChildren || trip.allowChildren === true;
    const isMusikMatch = !isMusik || trip.allowMusic === true;
    const isSmokingMatch = !isSmoking || trip.allowSmoking === true;

    return (
      isSeats &&
      isLuggageMatch &&
      isComfortMatch &&
      isAnimalMatch &&
      isChildrenMatch &&
      isMusikMatch &&
      isSmokingMatch &&
      isLocationMatch &&
      isDestinationMatch
    );
  });

  useEffect(() => {
    setCurrentPage(0);
  }, [
    seats,
    luggage,
    isComfort,
    isAnimal,
    isChildren,
    isMusik,
    isSmoking,
    location,
    destination,
  ]);

  const todayTrips = filteredTrips.filter((trip) =>
    isToday(new Date(trip.departureDate))
  );
  const tomorrowTrips = filteredTrips.filter((trip) =>
    isTomorrow(new Date(trip.departureDate))
  );

  const otherTrips = filteredTrips.filter(
    (trip) =>
      !isToday(new Date(trip.departureDate)) &&
      !isTomorrow(new Date(trip.departureDate))
  );

  /*
    https://www.npmjs.com/package/react-paginate
    code from react-paginate
  */
  const ITEMS_PER_PAGE = 3;
  const pageCount = Math.ceil(otherTrips.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = otherTrips.slice(offset, offset + ITEMS_PER_PAGE);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-2">
        <div className="bg-app-surface p-6 rounded-xl shadow text-app-text border border-app-secondary w-full max-w-md">
          <p className="text-red-500 mb-2 font-semibold text-center">
            Something went wrong.
          </p>
          <p className="text-app-secondary text-sm mb-4 text-center break-words">
            Error: {error.message}
          </p>
          <button
            className="bg-app-primary text-white px-4 hover:cursor-pointer py-2 rounded transition-colors w-full font-semibold"
            onClick={() => refetch()}
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <>
      {filteredTrips.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-260px)] w-full">
          <div className="bg-app-surface p-6 rounded-xl shadow text-app-text border border-app-secondary w-full max-w-md">
            <p className="text-app-secondary mb-2 font-semibold text-center text-lg">
              trips ikke fundet
            </p>
            <p className="text-app-muted text-sm text-center">
              Der er ingen trips endnu.
            </p>
          </div>
        </div>
      ) : (
        <section>
          <h2 className="font-bold text-2xl mx-5 md:mx-0">Næste lift</h2>
          {todayTrips.length > 0 && (
            <>
              <div className="my-4 flex flex-col gap-4">
                {todayTrips.map((item) => (
                  <div className="w-full" key={item.id}>
                    <div className="hidden md:block w-full">
                      <Link
                        to="/lift/$listId"
                        params={{ listId: item.id.toString() }}
                      >
                        <Card {...item} />
                      </Link>
                    </div>
                    <div className="block md:hidden w-full">
                      <Card {...item} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {tomorrowTrips.length > 0 && (
            <>
              <div className="flex items-center gap-2 mb-2 mx-5 md:mx-0">
                <Calendar className="w-5 h-5 mr-1" />
                <h3 className="font-bold text-lg">I morgen</h3>
              </div>
              <div className="my-4 flex flex-col gap-4">
                {tomorrowTrips.map((item) => (
                  <div className="w-full" key={item.id}>
                    <div className="hidden md:block w-full">
                      <Link
                        to="/lift/$listId"
                        params={{ listId: item.id.toString() }}
                      >
                        <Card {...item} />
                      </Link>
                    </div>
                    <div className="block md:hidden w-full">
                      <Card {...item} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {otherTrips.length > 0 && (
            <>
              <h3 className="font-bold text-lg mb-2 mx-5 md:mx-0">Senere</h3>
              <div className="my-4 flex flex-col gap-4">
                {currentItems.map((item) => (
                  <div className="w-full" key={item.id}>
                    <div className="hidden md:block w-full">
                      <Link
                        to="/lift/$listId"
                        params={{ listId: item.id.toString() }}
                      >
                        <Card {...item} />
                      </Link>
                    </div>
                    <div className="block md:hidden w-full">
                      <Card {...item} />
                    </div>
                  </div>
                ))}
                {otherTrips.length > 3 && (
                  <div className="flex justify-center my-8 w-full">
                    <ReactPaginate
                      breakLabel={"..."}
                      nextLabel={"-›"}
                      previousLabel={"‹-"}
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={1}
                      marginPagesDisplayed={1}
                      pageCount={pageCount}
                      renderOnZeroPageCount={null}
                      containerClassName="flex flex-wrap gap-1 items-center select-none w-full justify-center"
                      pageLinkClassName="px-2 py-1 rounded text-sm sm:text-base hover:cursor-pointer hover:bg-app-surface hover:text-app-accent transition-colors"
                      activeClassName="text-app-accent font-bold"
                      previousLinkClassName="px-2 py-1 rounded text-app-secondary text-sm sm:text-base hover:cursor-pointer hover:bg-app-surface transition-colors"
                      nextLinkClassName="px-2 py-1 rounded text-app-secondary text-sm sm:text-base hover:cursor-pointer hover:bg-app-surface transition-colors"
                      breakLinkClassName="px-2 py-1 text-app-muted text-sm sm:text-base"
                      disabledClassName="opacity-40"
                      forcePage={currentPage}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
