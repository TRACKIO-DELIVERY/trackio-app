import { AuthContext } from "@/contexts/AuthContext";
import { use } from "react";

export function useAuth() {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be user within an AuthProvider");
  }
  return context;
}
