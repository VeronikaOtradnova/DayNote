import { TypedUseSelectorHook, useSelector } from "react-redux";
import { TRootState } from "../store/redusers";

export const useTypedSelector:TypedUseSelectorHook<TRootState> = useSelector;