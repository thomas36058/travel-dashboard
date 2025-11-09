import type { PayloadAction } from "node_modules/@reduxjs/toolkit/src/createAction";
import { createSlice } from "./../../node_modules/@reduxjs/toolkit/src/createSlice";
import type { Travel } from "@/types/travel";

const initialState: Travel[] = [];

const travelsSlice = createSlice({
  name: "travels",
  initialState,
  reducers: {
    addTravel(state, action: PayloadAction<Travel>) {
      state.push(action.payload);
    },
    deleteTravel(state, action: PayloadAction<number>) {
      return state.filter((t) => t.id !== action.payload);
    },
    updateTravel(state, action: PayloadAction<Travel>) {
      return state.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
    },
  },
});

export const { addTravel, deleteTravel, updateTravel } = travelsSlice.actions;
export default travelsSlice.reducer;
