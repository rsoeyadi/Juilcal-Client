import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>(); // this hook is so that we have the correct typing from our store
