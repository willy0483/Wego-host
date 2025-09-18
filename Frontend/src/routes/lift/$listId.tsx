import ReviewForm from "@/components/reviewForm";
import { Spinner } from "@/components/spinner";
import Stars from "@/components/stars";
import { api } from "@/lib/api";
import { useReviewsbyUser, useTripsDetails } from "@/lib/query";
import { useAuth } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import { toast } from "sonner";

export const Route = createFileRoute("/lift/$listId")({
  component: RouteComponent,
  pendingComponent: () => (
    <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-80px)]">
      <Spinner />
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Lift detaljer - WeGo" },
      {
        name: "description",
        content:
          "WeGo er en online service der tilbyder bæredygtig samkørsel til sine registrerede brugere. Som bruger kan man søge og booke ture med forskellige præferencer til en given destination. Se alle lift på WeGo og støt klimaet!",
      },
      {
        name: "keywords",
        content:
          "lift, bæredygtig, miljø, transport, transport, handel, tur, detaljer",
      },
    ],
  }),
});

function RouteComponent() {
  const { listId } = Route.useParams();
  const {
    data: trip,
    isPending,
    isError,
    error,
    refetch,
  } = useTripsDetails(+listId);

  const { loginData } = useAuth();

  const {
    data: reviews,
    isPending: reviewsIsPending,
    isError: reviewsIsError,
    refetch: reviewsRefetch,
  } = useReviewsbyUser(trip.userId);

  const {
    allowChildren,
    allowMusic,
    allowPets,
    allowSmoking,
    bagsize,
    bookings,
    cityDeparture,
    cityDestination,
    comment,
    createdAt,
    hasComfort,
    isElectric,
    pricePerSeat,
    routeDeviation,
    seatsTotal,
    seatsBooked,
    useFerry,
    user,
    id,
    userId,
  } = trip;

  const navigate = useNavigate({ from: "/lift/$listId" });

  const handleClick = () => {
    navigate({
      to: "..",
    });
  };

  const queryClient = useQueryClient();

  const handleDelete = async (id: number) => {
    if (!loginData) {
      toast.error("Du skal være logget ind for at slette en kommentar.", {
        id: "NeedLogin",
      });
      return;
    }
    if (await api.delete(`reviews/${id}`, loginData?.accessToken)) {
      queryClient.invalidateQueries({
        queryKey: ["ReviewsByTrips", trip.userId],
      });
    }

    toast.success("review delete", { id: "review delete" });
  };

  const handleBook = () => {
    if (!loginData) {
      navigate({
        to: "/login",
      });
      toast.error("Du skal være logget ind for book et lift.", {
        id: "login-required",
      });
    } else {
      navigate({
        to: "/book/$bookId",
        params: { bookId: listId },
      });
    }
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
      {isPending ? (
        <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-80px)]">
          <Spinner />
        </div>
      ) : (
        <div className="xl:flex xl:gap-10 px-4 sm:px-0">
          <section className="container mx-auto relative py-5 bg-white w-full px-6 rounded-2xl">
            <header>
              <h2 className="font-bold text-2xl">
                {cityDeparture} <span>til</span> {cityDestination}
              </h2>
            </header>
            <p>
              {format(
                new Date(createdAt),
                "eeee 'd.' d. MMMM yyyy 'kl.' HH:mm",
                { locale: da }
              )}
            </p>

            <h3 className="mt-10 mb-4 font-bold text-xl">Information</h3>
            <ul className="flex flex-col gap-2">
              {useFerry && (
                <li className="flex gap-2">
                  <img
                    src="/icons/Ship.svg"
                    alt="Ship icon"
                    className="w-6 h-6"
                  />
                  <p className="font-semibold">Rute inkluderer en færge</p>
                </li>
              )}
              {isElectric && (
                <li className="flex gap-2">
                  <img
                    src="/icons/Lightning.svg"
                    alt="Ship icon"
                    className="w-6 h-6"
                  />
                  <p className="font-semibold">
                    Denne rute køres med en elbil.
                  </p>
                </li>
              )}
            </ul>

            <h4 className="text-[18px] mb-4">Detaljer</h4>
            <ul className="flex flex-col xl:grid xl:grid-cols-2 gap-4">
              {hasComfort && (
                <li>
                  <figure className="flex items-center gap-3">
                    <img
                      src="/icons/details/Comfort.svg"
                      alt="Bagage icon"
                      className="w-10 h-10"
                    />
                    <figcaption>
                      <p className="text-[#999999]">KOMFORT</p>
                      <p>Maks. 2 personer på bagsædet</p>
                    </figcaption>
                  </figure>
                </li>
              )}
              <li>
                <figure className="flex items-center gap-3">
                  <img
                    src={`/icons/details/bagage/${bagsize.name}.svg`}
                    alt="Bagage icon"
                    className="w-10 h-10"
                  />
                  <figcaption>
                    <p className="text-[#999999]">BAGAGESTØRRELSE</p>
                    <p>{`${bagsize.name} skuldertaske eller rygsæk`}</p>
                  </figcaption>
                </figure>
              </li>

              <li>
                <figure className="flex items-center gap-3">
                  <img
                    src={`/icons/details/Flexdriver.svg`}
                    alt="Bagage icon"
                    className="w-10 h-10"
                  />
                  <figcaption>
                    <p className="text-[#999999]">AFVIGELSER FRA RUTEN</p>
                    <p>
                      {routeDeviation === 0
                        ? "Bilisten er ikke fleksibel"
                        : routeDeviation <= 5
                          ? "Bilisten er lidt fleksibel"
                          : routeDeviation <= 10
                            ? "Bilisten er fleksibel"
                            : "Bilisten er meget fleksibel"}
                    </p>
                  </figcaption>
                </figure>
              </li>

              <li>
                <figure className="flex items-center gap-3">
                  <img
                    src={`/icons/details/Lightning.svg`}
                    alt="Bagage icon"
                    className="w-10 h-10"
                  />
                  <figcaption>
                    <p className="text-[#999999]">BRÆNDSTOFTYPE</p>
                    <p>
                      {isElectric
                        ? "Bilen er elektrisk"
                        : "Bilen er ikke elektrisk"}
                    </p>
                  </figcaption>
                </figure>
              </li>
            </ul>

            <h4 className="text-[18px] my-4">Præferencer</h4>
            <ul className="grid grid-cols-2 gap-4">
              <li>
                <figure className="flex items-center gap-3">
                  <img
                    src={`/icons/${allowPets ? "yes" : "no"}.svg`}
                    alt={allowPets ? "Kæledyr tilladt" : "Kæledyr ikke tilladt"}
                    className="w-5 h-5"
                  />
                  <figcaption>
                    <p>Kæledyr</p>
                  </figcaption>
                </figure>
              </li>

              <li>
                <figure className="flex items-center gap-3">
                  <img
                    src={`/icons/${allowMusic ? "yes" : "no"}.svg`}
                    alt={allowMusic ? "Musik tilladt" : "Musik ikke tilladt"}
                    className="w-5 h-5"
                  />
                  <figcaption>
                    <p>Musik</p>
                  </figcaption>
                </figure>
              </li>

              <li>
                <figure className="flex items-center gap-3">
                  <img
                    src={`/icons/${allowChildren ? "yes" : "no"}.svg`}
                    alt={allowChildren ? "Børn tilladt" : "Børn ikke tilladt"}
                    className="w-5 h-5"
                  />
                  <figcaption>
                    <p>Børn</p>
                  </figcaption>
                </figure>
              </li>

              <li>
                <figure className="flex items-center gap-3">
                  <img
                    src={`/icons/${allowSmoking ? "yes" : "no"}.svg`}
                    alt={
                      allowSmoking ? "Rygning tilladt" : "Rygning ikke tilladt"
                    }
                    className="w-5 h-5"
                  />
                  <figcaption>
                    <p>Rygning</p>
                  </figcaption>
                </figure>
              </li>
            </ul>

            <h4 className="text-[18px] my-4">Chaufførens kommentar:</h4>
            <div>
              <figure className="flex gap-4">
                <img
                  src="/icons/entypo_quote.svg"
                  alt="quote icon"
                  className="w-15 h-15"
                />
                <figcaption>
                  {comment ? (
                    <article>{comment}</article>
                  ) : (
                    <div className="flex items-center gap-2 text-[#999999] italic mt-2">
                      <span>Ingen kommentar fra chaufføren.</span>
                    </div>
                  )}
                </figcaption>
              </figure>
            </div>

            <h4 className="text-[18px] my-4">Chaufføren:</h4>
            <div>
              <figure className="flex gap-6 justify-center">
                <img
                  src={user.imageUrl}
                  alt="user image"
                  className="rounded-full w-40"
                />
                <figcaption className="flex xl:flex-col items-center gap-5">
                  <div>
                    <h3 className="font-bold text-2xl">{user.firstname}</h3>
                    <div className="flex gap-2">
                      <Stars avgStars={user.avgStars} />
                      {`( ${reviews.length} anmeldelser)`}
                    </div>
                  </div>
                  <ReviewForm id={id} reviewedUserId={userId} />
                </figcaption>
              </figure>

              {reviewsIsError ? (
                <div className="flex flex-col items-center gap-2 text-red-500 font-semibold mt-4">
                  <div className="flex items-center gap-2">
                    <span>Kunne ikke hente anmeldelser.</span>
                  </div>
                  <button
                    onClick={() => reviewsRefetch()}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors font-normal"
                  >
                    Prøv igen
                  </button>
                </div>
              ) : reviewsIsPending ? (
                <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-80px)]">
                  <Spinner />
                </div>
              ) : (
                <ul className="mt-15 flex flex-col gap-10">
                  {reviews.map(
                    (
                      {
                        comment,
                        numStars,
                        reviewer,
                        id,
                        reviewerId,
                        createdAt,
                      },
                      index
                    ) => {
                      const isOwn = reviewerId === loginData?.user.id;

                      return (
                        <li
                          key={index}
                          className="bg-app-background p-4 rounded-2xl"
                        >
                          <figure className="flex gap-5">
                            <img
                              src={reviewer.imageUrl}
                              alt="user image"
                              className=" rounded-full w-20 h-20"
                            />
                            <figcaption>
                              <div>
                                <p className="font-bold text-xl">
                                  {reviewer.firstname}{" "}
                                  {reviewer.lastname.charAt(0)}.
                                </p>
                                {isOwn ? (
                                  <p
                                    className={` ${isOwn ? "text-left" : "text-right"} text-red-500 text-[14px] hover:cursor-pointer`}
                                    onClick={() => handleDelete(id)}
                                  >
                                    slet kommentar
                                  </p>
                                ) : (
                                  <div></div>
                                )}
                              </div>
                              <div className="flex gap-3">
                                {format(
                                  new Date(createdAt),
                                  "d. MMMM yyyy 'kl.' HH:mm",
                                  { locale: da }
                                )}
                                <Stars avgStars={numStars} />
                              </div>
                              <article className="mt-3">{comment}</article>
                            </figcaption>
                          </figure>
                        </li>
                      );
                    }
                  )}
                </ul>
              )}
            </div>

            <aside className="absolute top-0 -left-20 hidden xl:flex">
              <button
                className="bg-white py-4 px-5 rounded-2xl hover:cursor-pointer"
                onClick={handleClick}
              >
                <img
                  src="/icons/arrowHead-left.svg"
                  alt="arrowHead left icon"
                />
              </button>
            </aside>
          </section>

          <aside className="min-w-[300px] mx-auto px-2 sticky top-20 self-start">
            <h2 className="font-medium my-4 text-xl">Pladser</h2>
            <div className="bg-white rounded-2xl">
              <div className="flex justify-between px-4">
                <img
                  src="/icons/seat-passenger.svg"
                  alt="seat-passenger icon"
                  className="xl:hidden"
                />
                <ul className="flex flex-row justify-center gap-4 p-4 xl:flex-col xl:gap-2">
                  {[...Array(seatsTotal)].map((_, idx) => {
                    const booking = bookings[idx];
                    return (
                      <li
                        key={idx}
                        className="flex flex-col items-center xl:flex-row xl:items-center gap-1 xl:gap-3 xl:border-b xl:last:border-b-0 pb-2"
                      >
                        {booking && booking.user ? (
                          <>
                            <img
                              src={booking.user.imageUrl}
                              alt={booking.user.firstname}
                              className="rounded-full w-12 h-12 object-cover"
                            />
                            <span className="hidden xl:inline font-bold">
                              {booking.user.firstname}
                            </span>
                          </>
                        ) : (
                          <>
                            <img
                              src="/icons/UserAvatar.svg"
                              alt="Dig?"
                              className="rounded-full w-12 h-12 object-cover"
                            />
                            <span className="font-bold hidden xl:inline">
                              Dig?
                            </span>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="p-4">
                <div className="flex justify-between">
                  <p>Pris per plads</p>
                  <p>
                    <span className="text-[#999999]">DKK</span>{" "}
                    <span className="font-bold">{pricePerSeat}</span>
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <button
                  disabled={seatsBooked >= seatsTotal}
                  onClick={() => handleBook()}
                  className={`rounded-2xl w-full py-2 text-white font-semibold transition-colors
                    ${
                      seatsBooked >= seatsTotal
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                        : "bg-app-secondary hover:cursor-pointer hover:bg-app-primary90"
                    }
                  `}
                >
                  Book plads
                </button>
                <button
                  onClick={() => navigate({ to: ".." })}
                  className="xl:hidden bg-app-secondary/30 px-4 py-2 mt-5 w-full rounded-4xl hover:cursor-pointer"
                >
                  Tilbage
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
