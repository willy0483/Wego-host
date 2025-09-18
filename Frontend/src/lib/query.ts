import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { api } from "./api";
import type {
  T_Booking,
  T_Reviewer,
  T_Slides,
  T_SådanVirkerDet,
  T_Trips,
  T_Trips_Details,
} from "./types";

export const useSlides = () =>
  useSuspenseQuery({
    queryKey: ["slides"],
    queryFn: () => api.get<T_Slides[]>(`slides`),
    staleTime: 1000 * 60 * 60,
  });

export const useSådan = () =>
  useSuspenseQuery({
    queryKey: ["Sådan virker det"],
    queryFn: () => api.get<T_SådanVirkerDet[]>(`content`),
    staleTime: 1000 * 60 * 60,
  });

export const useTrips = () =>
  useSuspenseQuery({
    queryKey: ["Trips"],
    queryFn: () => api.get<T_Trips[]>(`trips`),
    staleTime: 1000 * 60 * 5,
  });

export const useTripsDetails = (id: number) =>
  useSuspenseQuery({
    queryKey: ["Trips", id],
    queryFn: () => api.get<T_Trips_Details>(`trips/${id}`),
    staleTime: 1000 * 60 * 5,
  });

export const useReviewsbyUser = (id: number) =>
  useSuspenseQuery({
    queryKey: ["ReviewsByTrips", id],
    queryFn: () => api.get<T_Reviewer[]>(`reviews/byUser/${id}`),
    staleTime: 1000 * 60 * 5,
  });

export const useBooking = (id: number, token?: string) =>
  useQuery({
    queryKey: ["Booking", id],
    queryFn: () => api.get<T_Booking[]>(`bookings/byUser`, token),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });
