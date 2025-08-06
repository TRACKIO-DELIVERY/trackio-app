import { LocationContext } from "@/contexts/LocationContext";
import { use } from "react";

export function useLocation() {
  const context = use(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within an LocationProvider");
  }
  return context;
}
