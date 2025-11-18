import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Travel } from "@/types/travel";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const initialState: Travel[] = [];

export const fetchTravels = createAsyncThunk(
  "travels/fetchTravels",
  async () => {
    const snapshot = await getDocs(collection(db, "travels"));

    const travels: Travel[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Travel, "id">),
    }));

    return travels;
  }
);

export const removeTravel = createAsyncThunk(
  "travels/removeTravel",
  async (id: string) => {
    await deleteDoc(doc(db, "travels", id));
    return id;
  }
);

const travelsSlice = createSlice({
  name: "travels",
  initialState,
  reducers: {
    addTravel(state, action: PayloadAction<Travel>) {
      state.push(action.payload);
    },
    updateTravel(state, action: PayloadAction<Travel>) {
      return state.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTravels.fulfilled, (_, action) => action.payload);

    builder.addCase(removeTravel.fulfilled, (state, action) =>
      state.filter((t) => t.id !== action.payload)
    );
  },
});

export const { addTravel, updateTravel } = travelsSlice.actions;
export default travelsSlice.reducer;
