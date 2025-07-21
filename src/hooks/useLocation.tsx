import { LocationContext } from "@/contexts/LocationContext"
import { use } from "react"

export const useLocation = () => {
    return use(LocationContext)
}