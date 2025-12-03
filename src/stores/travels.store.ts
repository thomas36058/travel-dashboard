import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Travel } from "@/types/travel";

type TravelsState = {
  travels: Travel[];

  fetchTravels: () => void;
  addTravel: (travel: Travel) => void;
  updateTravel: (travel: Travel) => void;
  removeTravel: (id: string) => void;
};

export const useTravelsStore = create<TravelsState>()(
  devtools(
    persist(
      (set, get) => ({
        travels: [],

        fetchTravels: () => {
          return get().travels;
        },

        addTravel: (travel) =>
          set((state) => ({
            travels: [...state.travels, travel],
          })),

        updateTravel: (travel) =>
          set((state) => ({
            travels: state.travels.map((t) =>
              t.id === travel.id ? travel : t
            ),
          })),

        removeTravel: (id) =>
          set((state) => ({
            travels: state.travels.filter((t) => t.id !== id),
          })),
      }),
      {
        name: "travels-storage",
        partialize: (state) => ({
          travels: state.travels,
        }),
      }
    )
  )
);
