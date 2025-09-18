import { useEffect, useState } from "react";
import { AuthContext } from "../lib/utils";
import { useNavigate } from "@tanstack/react-router";
import type { Session } from "@/lib/types";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loginData, setLoginData] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const sessionData = sessionStorage.getItem("session");

    if (sessionData) {
      try {
        const parsedUserData: Session = JSON.parse(sessionData);
        setLoginData(parsedUserData);
      } catch (error) {
        console.error("Error parsing userData:", error);
        setLoginData(null);
      }
    } else {
      setLoginData(null);
    }
    setLoading(false);
  }, []);

  const createSession = (payload: Session): boolean => {
    setLoginData(payload);
    sessionStorage.setItem("session", JSON.stringify(payload));
    return true;
  };

  const logout = (): boolean => {
    setLoginData(null);
    sessionStorage.removeItem("session");
    return true;
  };

  const checkAuth = async (): Promise<boolean> => {
    const sessionData = sessionStorage.getItem("session");

    if (!sessionData) {
      logout();
      navigate({ to: "/login" });
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ loginData, loading, createSession, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};
