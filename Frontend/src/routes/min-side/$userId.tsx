import { api } from "@/lib/api";
import { useBooking } from "@/lib/query";
import { useAuth } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/min-side/$userId")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Mine bookinger - WeGo" },
      {
        name: "description",
        content:
          "Se og administrer dine bookinger på WeGo. Slet bookinger og se detaljer om dine ture.",
      },
      {
        name: "keywords",
        content: "bookinger, bruger, lift, WeGo, slet, tur, detaljer",
      },
    ],
  }),
});

function RouteComponent() {
  const { userId } = Route.useParams();

  const { loginData } = useAuth();
  const token = loginData?.accessToken;

  const {
    data: Bookings,
    isPending,
    isError,
    error,
  } = useBooking(+userId, token ?? "");

  const queryClient = useQueryClient();

  const handleDelete = async (id: number) => {
    if (!loginData) {
      toast.error("Du skal være logget ind for at slette en Booking.", {
        id: "NeedLogin",
      });
      return;
    }
    if (await api.delete(`bookings/${id}`, loginData?.accessToken)) {
      queryClient.invalidateQueries({
        queryKey: ["Trips"],
      });
      queryClient.invalidateQueries({
        queryKey: ["Trips", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["Booking", +userId],
      });
      toast.success("review delete", { id: "review delete" });
    }
  };

  return (
    <section className="container mx-auto my-10 px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">Mine bookinger</h2>
        <h2>
          {loginData?.user.firstname} {loginData?.user.lastname}
        </h2>
      </div>
      {isPending ? (
        <div className="text-center py-8 text-gray-500">
          Indlæser dine bookinger...
        </div>
      ) : isError ? (
        <div className="text-center py-8 text-red-500">
          Kunne ikke hente bookinger.
          <br />
          {error?.message}
        </div>
      ) : (
        <ul className="space-y-3">
          {Array.isArray(Bookings) && Bookings.length > 0 ? (
            Bookings.map(({ comment, id, tripId }) => (
              <li
                key={id}
                className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold text-app-secondary">
                    Trip #{tripId}
                  </div>
                  <div className="text-gray-700">{comment}</div>
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(id)}
                    className="text-red-500 hover:cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500">Ingen bookinger fundet.</li>
          )}
        </ul>
      )}
    </section>
  );
}
