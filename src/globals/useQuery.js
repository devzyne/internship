import { useLocation } from "react-router-dom";

//todo use everywhere
export const useQuery = () => new URLSearchParams(useLocation().search);
