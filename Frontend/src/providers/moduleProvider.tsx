import { ModuleContext } from "@/lib/utils";
import { useState, type ReactNode } from "react";

const ModuleProvider = ({ children }: { children: ReactNode }) => {
  const [isWorksOpen, setIsWorksOpen] = useState<boolean>(false);
  return (
    <ModuleContext.Provider
      value={{
        isWorksOpen,
        setIsWorksOpen,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
};
export default ModuleProvider;
