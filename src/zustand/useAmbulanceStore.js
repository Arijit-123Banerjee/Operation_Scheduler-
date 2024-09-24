import { create } from "zustand";
import { data } from "../../utils";

const useAmbulanceStore = create((set) => ({
  ambulances: data,
  bookAmbulance: (id) =>
    set((state) => ({
      ambulances: state.ambulances.map((ambulance) =>
        ambulance.id === id ? { ...ambulance, isBooked: true } : ambulance
      ),
    })),
}));

export default useAmbulanceStore;
