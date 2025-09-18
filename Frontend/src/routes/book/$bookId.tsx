import { Spinner } from "@/components/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { book } from "@/lib/auth";
import { useTripsDetails } from "@/lib/query";
import type { BookFormState } from "@/lib/types";
import { useAuth } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { da } from "date-fns/locale";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/book/$bookId")({
  component: RouteComponent,
  pendingComponent: () => (
    <div className="flex flex-col justify-center items-center w-full min-h-[calc(100vh-80px)]">
      <Spinner />
    </div>
  ),
  head: () => ({
    meta: [
      { title: "Book et lift - WeGo" },
      {
        name: "description",
        content:
          "Book et lift på WeGo - en online service for bæredygtig samkørsel. Vælg antal pladser, skriv besked og betal nemt.",
      },
      {
        name: "keywords",
        content: "book, lift, transport, bæredygtig, WeGo, betaling, pladser",
      },
    ],
  }),
});

function RouteComponent() {
  const { bookId: id } = Route.useParams();
  const { data } = useTripsDetails(+id);

  const { loginData } = useAuth();

  const bookAction = (prevState: BookFormState, formData: FormData) =>
    book(prevState, formData, loginData?.accessToken);

  const [state, action] = useActionState(bookAction, undefined);

  const [seats, setSeats] = useState<number>(1);

  const navigate = useNavigate({ from: "/book/$bookId" });
  const queryClient = useQueryClient();

  const handleClick = () => {
    navigate({
      to: "/lift/$listId",
      params: { listId: data.id.toString() },
    });
  };

  useEffect(() => {
    if (state?.success) {
      toast.success("Din booking er gennemført!", { id: "booking-success" });
      queryClient.invalidateQueries({
        queryKey: ["Trips", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["Trips"],
      });
      queryClient.invalidateQueries({
        queryKey: ["Booking", loginData?.user.id],
      });

      navigate({ to: "/lift/$listId", params: { listId: id } });
    }
  }, [state?.success, id, navigate, data, queryClient, loginData?.user.id]);

  return (
    <section className="container mx-auto mt-10 px-4">
      <h2 className="mb-8 font-bold text-2xl">Book et lift</h2>
      <div className="xl:flex xl:gap-10">
        <form
          action={action}
          className="bg-white rounded-2xl p-6 xl:w-2/3 mb-8 xl:mb-0"
        >
          <div className="mb-8">
            <p className="font-semibold mb-2">Pladser</p>
            <input
              type="number"
              id="numSeats"
              name="numSeats"
              value={seats}
              readOnly
              className="hidden"
            />
            <input
              type="number"
              id="tripId"
              name="tripId"
              value={id}
              readOnly
              className="hidden"
            />
            <Select
              value={seats.toString()}
              onValueChange={(value) => setSeats(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Vælg antal pladser" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from(
                    { length: data.seatsTotal - data.bookings.length },
                    (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {state?.error?.numSeats && (
              <p className="text-sm text-red-500 text-center mt-2">
                {state.error.numSeats}
              </p>
            )}
          </div>

          <div className="grid gap-3 mb-8">
            <label htmlFor="comment" className="font-semibold">
              Besked til {data.user.firstname}
            </label>
            <textarea
              id="comment"
              name="comment"
              rows={4}
              className="border rounded px-2 py-1"
              placeholder="Skriv din kommentar her..."
            />
            {state?.error?.comment && (
              <p className="text-sm text-red-500 text-center mt-2">
                {state.error.comment}
              </p>
            )}
          </div>

          <div className="grid gap-3 mb-8">
            <label htmlFor="cardNumber" className="font-semibold">
              Kortnummer
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 1234 1234 1234"
              className="border rounded px-4 py-2 bg-gray-100 w-full"
              maxLength={19}
              inputMode="numeric"
              autoComplete="cc-number"
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label htmlFor="expiry" className="font-semibold">
                  Udløbsdato
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM / ÅÅ"
                  className="border rounded px-4 py-2 bg-gray-100"
                  maxLength={7}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cvc" className="font-semibold">
                  CVC-kode
                </label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  placeholder="CVC"
                  className="border rounded px-4 py-2 bg-gray-100"
                  maxLength={4}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-app-secondary px-4 py-2 text-white mt-6 w-full rounded-4xl hover:cursor-pointer font-bold"
          >
            Book & betal
          </button>
          <button
            onClick={() => handleClick()}
            className="bg-app-secondary/30 px-4 py-2 mt-5 w-full rounded-4xl hover:cursor-pointer font-bold"
          >
            Tilbage
          </button>
        </form>

        <aside className="min-w-[300px] mx-auto xl:mx-0 xl:w-1/3">
          <div className="p-4 bg-white rounded-t-2xl">
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">
                {data.cityDeparture} til {data.cityDestination}
              </p>
              <img src="/icons/car.svg" alt="car icon" className="w-8 h-8" />
            </div>
            <p className="mt-2">
              {format(
                new Date(data.createdAt),
                "EEEE 'den' d. MMMM 'kl.' HH:mm",
                {
                  locale: da,
                }
              )}
            </p>
            <p className="mt-2">{seats} sæde</p>
          </div>
          <div className="border-2 rounded-b-2xl p-3 flex justify-between font-bold">
            <p>Samlet pris</p>
            <p>DKK {Number(data.pricePerSeat) * seats}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
