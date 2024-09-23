import { create } from "zustand";

const useGraphStore = create((set) => ({
  data: [
    { name: "Total Doctors", value: 50, icon: "FaUserMd", color: "#3498db" },
    {
      name: "Total Patients",
      value: 120,
      icon: "FaUserInjured",
      color: "#e74c3c",
    },
    {
      name: "Appointments Today",
      value: 5,
      icon: "FaCalendarCheck",
      color: "#2ecc71",
    },
    { name: "Emergencies", value: 3, icon: "FaAmbulance", color: "#f39c12" },
  ],
  updateData: (newData) => set((state) => ({ data: newData })),
}));

export default useGraphStore;
