import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Rating } from "react-simple-star-rating";
import { review as reviewBase } from "@/lib/auth";

import { useActionState, useEffect, useState } from "react";
import { useAuth } from "@/lib/utils";
import type { ReviewFormState } from "@/lib/types";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ReviewForm = ({
  id,
  reviewedUserId,
}: {
  id: number;
  reviewedUserId: number;
}) => {
  const { loginData } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const review = (prevState: ReviewFormState, formData: FormData) =>
    reviewBase(prevState, formData, loginData?.accessToken);

  const queryClient = useQueryClient();

  const [state, action] = useActionState(review, undefined);
  const navigate = useNavigate();

  const [rating, setRating] = useState<number>(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  useEffect(() => {
    if (state?.success) {
      toast.success("Din anmeldelse er sendt!", { id: "review-success" });
      setIsOpen(false);
      setRating(0);
      queryClient.invalidateQueries({
        queryKey: ["ReviewsByTrips", reviewedUserId],
      });
    }
  }, [state?.success, state, id, queryClient, reviewedUserId]);

  const handleClick = () => {
    if (!loginData) {
      navigate({
        to: "/login",
      });
      toast.error("Du skal være logget ind for at skrive en anmeldelse.", {
        id: "login-required",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="bg-app-secondary xl:flex xl:py-2 xl:px-4 text-white rounded-full xl:rounded-4xl mt-5 hover:cursor-pointer"
          onClick={handleClick}
        >
          <p className="hidden xl:flex"> Skriv en anmeldelse</p>
          <img
            src="/icons/chat.svg"
            alt="chat icon"
            className="xl:hidden w-15 md:w-20"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Skriv en anmeldelse</DialogTitle>
            <DialogDescription>
              Din anmeldelse hjælper andre med at vælge den rette chauffør.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <input
              type="number"
              id="reviewedUserId"
              name="reviewedUserId"
              className="hidden"
              value={reviewedUserId}
              readOnly
            />
            <div className="grid gap-3">
              <input
                type="number"
                className="hidden"
                value={rating}
                readOnly
                id="numStars"
                name="numStars"
              />
              <Rating
                className="flex"
                onClick={handleRating}
                initialValue={rating}
                size={32}
                allowFraction={false}
                SVGstyle={{ display: "inline" }}
              />
              {state?.error?.numStars && (
                <p className="text-sm text-red-500 text-center">
                  {state.error.numStars}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <label htmlFor="comment">Kommentar</label>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                className="border rounded px-2 py-1"
                placeholder="Skriv din kommentar her..."
              />
            </div>
            {state?.error?.comment && (
              <p className="text-sm text-red-500 text-center">
                {state.error.comment}
              </p>
            )}
          </div>
          <DialogFooter></DialogFooter>
          <button
            type="submit"
            className="bg-app-secondary text-white px-4 py-2 rounded-2xl w-full mt-2 hover:cursor-pointer"
          >
            Send anmeldelse
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ReviewForm;
