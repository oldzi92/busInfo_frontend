import { create } from "zustand";

export type TTimetable = {
  busId: number;
  id: number;
  delayInSeconds: number;
  estimatedTime: number;
  headsign: string;
  routeId: number;
  status: string;
  theoreticalTime: number;
  timestamp: number;
  trip: number;
  tripId: number;
  vehicleCode: number;
  vehicleId: number;
};

export type TTimetableSingleItem = {
  busId: number;
  headsign: string;
  theoreticalTime: number;
  estimatedTime: number;
  delayInSeconds: number;
};

export interface IBus {
  busId: number;
  headsign: string;
}

export interface Stop {
  selectedStop: string;
  stopsList: string[];
  singleStop: string | number[];
  timetable: TTimetable[];
  stopName: string;
  addedItems: string[];

  setSelectedStop: (stop: string) => void;
  setStopsList: (newStopsList: string[]) => void;
  setSingleStop: (stopName: string) => void;
  setTimetable: (singleTimeTable: TTimetable[]) => void;
  addToFavorite: (singleStopName: string) => void;
}

export interface StopsReceiveType {
  [s: string]: number[];
}

export const useStopStore = create<Stop>((set) => ({
  selectedStop: "",
  stopsList: [],
  singleStop: [],
  timetable: [],
  stopName: "",

  setSelectedStop: (stop) => {
    set(() => ({ selectedStop: stop }));
  },

  setStopsList: (newStopsList) => {
    set(() => ({ stopsList: newStopsList }));
  },

  setSingleStop: (stopName) => {
    set(() => ({ stopName: stopName }));
  },

  setTimetable: (timetable) => {
    set(() => ({ timetable: timetable }));
  },
  // locale storage dla ulubionych
  addedItems: JSON.parse(localStorage.getItem("favoriteStops") || "[]"),
  addToFavorite: (stopName) => {
    set((state) => {
      // Sprawdź, czy stopName jest już w ulubionych
      const isAlreadyAdded = state.addedItems.includes(stopName);

      // Jeśli nie jest dodany, dodaj go do ulubionych
      if (!isAlreadyAdded) {
        const newValues = [...state.addedItems, stopName];
        localStorage.setItem("favoriteStops", JSON.stringify(newValues));
        return { addedItems: newValues };
      }

      // Jeśli jest już dodany, usuń go z ulubionych
      const filteredValues = state.addedItems.filter(
        (item) => item !== stopName
      );
      localStorage.setItem("favoriteStops", JSON.stringify(filteredValues));
      return { addedItems: filteredValues };
    });
  },
}));
