import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Session } from "./types";
import { createContext, useContext } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface AuthContextType {
  loginData: Session | null;
  createSession: (payload: Session) => boolean;
  logout: () => boolean;
  loading: boolean;
  checkAuth: () => Promise<boolean>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface ModuleProviderType {
  isWorksOpen: boolean;
  setIsWorksOpen: (value: boolean) => void;
}

export const ModuleContext = createContext<ModuleProviderType>({
  isWorksOpen: false,
  setIsWorksOpen: () => {},
});

export const useModule = () => {
  const ctx = useContext(ModuleContext);
  if (!ctx) throw new Error("useModule must be used within <moduleProvider>");
  return ctx;
};

interface FilterContextType {
  seats: number;
  setSeats: (value: number) => void;
  luggage: number[];
  setLuggage: (value: number[]) => void;
  isComfort: boolean;
  setIsComfort: (value: boolean) => void;
  isMusik: boolean;
  setIsMusik: (value: boolean) => void;
  isAnimal: boolean;
  setIsAnimal: (value: boolean) => void;
  isChildren: boolean;
  setIsChildren: (value: boolean) => void;
  isSmoking: boolean;
  setIsSmoking: (value: boolean) => void;
  location: string;
  setLocation: (value: string) => void;
  destination: string;
  setDestination: (value: string) => void;
}
export const FilterContext = createContext<FilterContextType>({
  seats: 0,
  setSeats: () => {},
  luggage: [],
  setLuggage: () => {},
  isComfort: false,
  setIsComfort: () => {},
  isMusik: false,
  setIsMusik: () => {},
  isAnimal: false,
  setIsAnimal: () => {},
  isChildren: false,
  setIsChildren: () => {},
  isSmoking: false,
  setIsSmoking: () => {},
  location: "",
  setLocation: () => {},
  destination: "",
  setDestination: () => {},
});

export const useFilter = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilter must be used within <FilterProvider>");
  return ctx;
};
